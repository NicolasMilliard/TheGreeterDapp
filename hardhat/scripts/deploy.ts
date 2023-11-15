import { ethers } from "hardhat";
import type { Greetings } from "../typechain-types/Greetings";

async function main() {
  const greetings: Greetings = await ethers.deployContract("Greetings");
  await greetings.waitForDeployment();

  console.log(`Greetings deployed to ${greetings.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
