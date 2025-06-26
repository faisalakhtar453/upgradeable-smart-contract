// scripts/test-v2.js
const { ethers } = require("hardhat");

async function main() {
    const proxyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    const MyContractV2 = await ethers.getContractFactory("MyContractV2");
    const contract = await MyContractV2.attach(proxyAddress);

    console.log("Current value:", (await contract.value()).toString());
    const val = 10
    await contract.setValue(val);
    console.log("New value after setValue", val);
    console.log("getDouble():", (await contract.value()).toString());
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
