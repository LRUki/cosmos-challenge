import OsmosisServiceClient from "./OsmosisServiceClient";

const main = async () => {
  const client = await OsmosisServiceClient.create();
  let prevHeight = 0;
  while (true) {
    const height = await client.getBlockHeight();

    if (height != undefined && height % 10 == 0 && height != prevHeight) {
      console.log(
        `======================= BLOCK HEIGHT ${height} =======================`
      );
      console.log(await client.getBlockHash(), "BLOCKHASH");
      console.log(await client.getNumPools(), "NUM POOLS");
      console.log(
        `check https://www.mintscan.io/osmosis/blocks/${height} for more details`
      );
      prevHeight = height;
    }
  }
};

main();
