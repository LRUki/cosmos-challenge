import {
  createProtobufRpcClient,
  ProtobufRpcClient,
  QueryClient,
} from "@cosmjs/stargate";
import { ServiceClientImpl as BaseQueryServiceClient } from "cosmjs-types/cosmos/base/tendermint/v1beta1/query";

import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryNumPoolsRequest, QueryNumPoolsResponse } from "./numPools";
import * as minimal from "protobufjs/minimal";

// Class responsible for connecting to the rpc endpoint and provide osmosis data.
export default class OsmosisServiceClient {
  static rpcEndpoint = "https://osmosis-mainnet-rpc.allthatnode.com:26657";
  private readonly rpcClient: ProtobufRpcClient;
  private readonly baseQueryServiceClient: BaseQueryServiceClient;

  private constructor(tc: Tendermint34Client) {
    const queryClient = new QueryClient(tc);
    this.rpcClient = createProtobufRpcClient(queryClient);
    // Used to query block information.
    this.baseQueryServiceClient = new BaseQueryServiceClient(this.rpcClient);
  }

  // Create an instance of this class.
  // Connects to the osmosis mainnet rpc endpoint.
  static create = async (): Promise<OsmosisServiceClient> => {
    const tmClient = await Tendermint34Client.connect(this.rpcEndpoint);
    return new OsmosisServiceClient(tmClient);
  };

  getBlockHeight = async (): Promise<number | undefined> => {
    const { block } = await this.baseQueryServiceClient.GetLatestBlock({});

    return block?.header?.height.low;
  };

  getBlockHash = async (): Promise<string | undefined> => {
    const { blockId } = await this.baseQueryServiceClient.GetLatestBlock({});
    if (blockId === undefined) {
      return;
    }

    let hash: string = "";
    blockId?.hash.forEach((h) => {
      hash = hash + h.toString(16).toUpperCase();
    });
    return hash;
  };

  getNumPools = async (): Promise<number> => {
    const request = QueryNumPoolsRequest.encode({}).finish();
    const response = await this.rpcClient.request(
      "osmosis.gamm.v1beta1.Query",
      "NumPools",
      request
    );
    return QueryNumPoolsResponse.decode(new minimal.Reader(response)).numPools
      .low;
  };
}
