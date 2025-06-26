const { ethers, upgrades } = require("hardhat");

async function main() {
  const proxyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // 👈 Replace with your actual proxy address

  const MyContractV2 = await ethers.getContractFactory("MyContractV2");

  const upgraded = await upgrades.upgradeProxy(proxyAddress, MyContractV2);

  console.log("✅ Contract upgraded at proxy:", await upgraded.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
