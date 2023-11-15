import { ethers } from "hardhat";
import { expect } from "chai";
import type { Greetings } from "../typechain-types/Greetings";

describe("Greetings Contract", function () {
  let greetingsContract: Greetings;

  beforeEach(async () => {
    const GreetingsFactory = await ethers.getContractFactory("Greetings");
    greetingsContract = await GreetingsFactory.deploy();
    await greetingsContract.waitForDeployment();
  });

  it("Should return the default greeting", async function () {
    const defaultGreetings = await greetingsContract.getGreetings();
    expect(defaultGreetings).to.equal("Hello, World!");
  });

  it("Should set new greetings", async function () {
    const newGreetings = "Hola, Mundo!";
    await greetingsContract.setGreetings(newGreetings);
    // @ts-ignore
    const updatedGreetings = await greetingsContract.getGreetings();
    expect(updatedGreetings).to.equal(newGreetings);
  });
});
