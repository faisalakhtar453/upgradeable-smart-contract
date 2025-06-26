// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyContractV2 is Initializable {
    uint256 public value;

    function initialize(uint256 _value) public initializer {
        value = _value;
    }

    function setValue(uint256 _newValue) public {
        value = _newValue * 2; // Modified logic
    }

    function getDouble() public view returns (uint256) {
        return value * 2;
    }
}
