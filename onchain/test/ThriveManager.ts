import hre, { ethers } from "hardhat";
import { expect } from "chai";

describe("ThriveManager", function () {
  it("should deploy ThriveManager and her token", async function () {
    const ThriveManager = await hre.ethers.deployContract("ThriveManager");
    expect(await ThriveManager.getThriveToken()).to.be.properAddress;
  });

  it("should buy Thrive tokens", async function () {
    const ThriveManager = await hre.ethers.deployContract("ThriveManager");
    const [owner, account2] = await hre.ethers.getSigners();
    const thriveAddress = await ThriveManager.getAddress()
    const ThriveToken = await hre.ethers.getContractAt("Thrive", await ThriveManager.getThriveToken());
    const transaction = await owner.sendTransaction({
      to: thriveAddress,
      value: ethers.parseEther("0.01")
    });
    const balance = await ThriveToken.balanceOf(owner.address);
    expect(balance).not.to.be.equal(0);
  });
});
