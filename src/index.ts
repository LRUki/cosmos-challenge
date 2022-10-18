import OsmosisServiceClient from "./OsmosisServiceClient";

const main = async () => {
  const client = await OsmosisServiceClient.create();
  let prevHeight = 0;
  while (true) {
    const height = await client.getBlockHeight();

    if (height != undefined && height % 10 == 0 && height != prevHeight) {
      console.log(
        `======================= Block height ${height} =======================`
      );
      console.log("Block hash: ", await client.getBlockHash());
      console.log("Number of pools: ", await client.getNumPools());
      console.log(
        `Check "https://www.mintscan.io/osmosis/blocks/${height}" for more details.`
      );
      prevHeight = height;
    }
  }
};

main();
