// ignition/modules/MyContractModule.js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { deployProxy } = require("@openzeppelin/hardhat-upgrades");

module.exports = buildModule("MyContractModule", (m) => {
  const deployMyContract = async ({ deploy }) => {
    const MyContract = await ethers.getContractFactory("MyContract");
    const proxy = await deployProxy(MyContract, [42], { initializer: "initialize" });
    await proxy.waitForDeployment();
    console.log("Proxy deployed to:", await proxy.getAddress());
    return proxy;
  };

  return {
    myContract: m.call(deployMyContract),
  };
});
