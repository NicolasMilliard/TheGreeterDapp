require("dotenv").config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    artifacts: "../client/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.WALLET_DEV_MNEMONIC,
        accountsBalance: "1000000000000000000000",
        count: 10,
      },
    },
    goerli: {
      url: process.env.GOERLI_ENDPOINT,
      accounts: {
        mnemonic: process.env.WALLET_DEV_MNEMONIC,
        accountsBalance: "1000000000000000000000",
        count: 10,
      },
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_KEY as string,
    },
  },
};

export default config;
