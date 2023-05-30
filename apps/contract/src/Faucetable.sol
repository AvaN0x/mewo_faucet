// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

abstract contract Faucetable is ERC20, Ownable {
    mapping(address => bool) public faucets;

    constructor() {}

    error OnlyFaucet();

    modifier onlyFaucet() {
        if (!faucets[msg.sender]) {
            revert OnlyFaucet();
        }
        _;
    }

    /// @param who The address to add to the faucets
    function addFaucet(address who) external onlyOwner {
        faucets[who] = true;
    }

    /// @param who The address to remove from the faucets
    function removeFaucet(address who) external onlyOwner {
        faucets[who] = false;
    }

    function mint(address who, uint256 amount) public onlyFaucet {
        _mint(who, amount);
    }
}
