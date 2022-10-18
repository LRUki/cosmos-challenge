## Getting Started
To install all the pacakges:
```sh
yarn
```

To run the tracker:
```sh
tsc  --esModuleInterop src/index.ts && node src/index.js
```

## Explanation

The `index.ts` is the entry point and calls `OsmosisServiceClient` to fetch data from osmosis mainnet.