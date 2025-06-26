# 🔄 Upgradeable Smart Contract with Hardhat & OpenZeppelin

This project demonstrates how to create and manage **Upgradeable Smart Contracts** using the **Proxy Pattern** with:

- ✅ Hardhat (development framework)
- ✅ OpenZeppelin Upgrades Plugin
- ✅ Ethers.js
- ✅ Hardhat local network

---

## 🛠️ Prerequisites

Make sure the following are installed:

- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/)
- VS Code or any IDE

---

## 📦 Install Dependencies

```bash
npm install
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts-upgradeable
npm install --save-dev @openzeppelin/hardhat-upgrades
```

---

## ⚙️ Hardhat Config

Ensure your `hardhat.config.js` includes:

```js
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
```

---

## 📁 Folder Structure

```
.
├── contracts/
│   ├── MyContract.sol
│   └── MyContractV2.sol
├── scripts/
│   ├── deploy-upgradeable.js
│   ├── upgrade.js
│   └── test-v2.js
├── hardhat.config.js
└── README.md
```

---

## 🔨 Step 1: Write the Contract

**contracts/MyContract.sol**
```solidity
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyContract is Initializable {
    uint256 public value;

    function initialize(uint256 _value) public initializer {
        value = _value;
    }

    function setValue(uint256 _newValue) public {
        value = _newValue;
    }
}
```

---

## 🚀 Step 2: Deploy Proxy

**scripts/deploy-upgradeable.js**
```js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const MyContract = await ethers.getContractFactory("MyContract");
  const instance = await upgrades.deployProxy(MyContract, [42], {
    initializer: "initialize",
  });
  await instance.waitForDeployment();

  console.log("Proxy deployed at:", await instance.getAddress());
}

main().catch(console.error);
```

Run:

```bash
npx hardhat run scripts/deploy-upgradeable.js --network localhost
```

---

## 🧪 Step 3: Check Value

**scripts/test-v2.js**
```js
const { ethers } = require("hardhat");

async function main() {
  const proxyAddress = "0xYourProxyAddressHere";

  const MyContract = await ethers.getContractFactory("MyContract");
  const contract = await MyContract.attach(proxyAddress);

  console.log("Stored value:", (await contract.value()).toString());
}

main().catch(console.error);
```

Run:

```bash
npx hardhat run scripts/test-v2.js --network localhost
```

---

## 🔁 Step 4: Create V2 for Upgrade

**contracts/MyContractV2.sol**
```solidity
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyContractV2 is Initializable {
    uint256 public value;

    function initialize(uint256 _value) public initializer {
        value = _value;
    }

    function setValue(uint256 _newValue) public {
        value = _newValue * 2;
    }

    function getDouble() public view returns (uint256) {
        return value * 2;
    }
}
```

---

## ⬆️ Step 5: Upgrade the Contract

**scripts/upgrade.js**
```js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const proxyAddress = "0xYourProxyAddressHere";

  const MyContractV2 = await ethers.getContractFactory("MyContractV2");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, MyContractV2);

  console.log("Contract upgraded at:", await upgraded.getAddress());
}

main().catch(console.error);
```

Run:

```bash
npx hardhat run scripts/upgrade.js --network localhost
```

---

## ✅ Step 6: Test the New Version

**scripts/test-v2.js**
```js
const { ethers } = require("hardhat");

async function main() {
  const proxyAddress = "0xYourProxyAddressHere";

  const MyContractV2 = await ethers.getContractFactory("MyContractV2");
  const contract = await MyContractV2.attach(proxyAddress);

  await contract.setValue(10);

  console.log("Updated value:", (await contract.value()).toString());
  console.log("Double value:", (await contract.getDouble()).toString());
}

main().catch(console.error);
```

---

## 🔐 Proxy Pattern Explained

- Only the **logic contract** is upgraded.
- The **proxy address stays the same**.
- **Storage is preserved** between upgrades.
- Use `Initializable` and remove constructors.
- `deployProxy` and `upgradeProxy` handle all the complexity.

---

## 🧠 Tips

- Always back up your proxy address.
- Don't use `constructor`; use `initialize` instead.
- You can manage access with OpenZeppelin's `OwnableUpgradeable`.

---

## 📚 Resources

- OpenZeppelin Upgradeable Docs: https://docs.openzeppelin.com/upgrades-plugins/1.x/
- Hardhat Docs: https://hardhat.org

---

## 🤝 License

MIT