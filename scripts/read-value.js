const { ethers } = require("hardhat");

async function main() {
  const proxyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // 👈 Replace with actual address from deployment output

  const MyContract = await ethers.getContractFactory("MyContract");
  const contract = await MyContract.attach(proxyAddress);

  const value = await contract.value();
  console.log("Stored value:", value.toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
