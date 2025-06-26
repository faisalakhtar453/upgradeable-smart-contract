# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/MyContractModule.js --network localhost
npx hardhat run scripts/deploy-upgradeable.js --network localhost

Proxy deployed at: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

npx hardhat run scripts/read-value.js --network localhost
npx hardhat run scripts/upgrade.js --network localhost
npx hardhat run scripts/test-v2.js --network localhost

```
