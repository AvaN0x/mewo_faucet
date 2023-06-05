// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {Faucetable} from "./Faucetable.sol";

contract Faucet is Ownable {
    /// @dev 30 * 60 = 30 minutes
    uint256 public constant MINT_INTERVAL = 1_800;
    uint256 public constant MAX_MINT = 0.5 ether;

    Faucetable token;
    mapping(address => uint) public lastMinted;

    error MintCooldown();
    error MaxMint();

    constructor(Faucetable _token) {
        token = _token;
    }

    function mint(address who, uint256 amount) public {
        if (amount > MAX_MINT) {
            revert MaxMint();
        }
        if (
            lastMinted[who] > 0 &&
            lastMinted[who] + MINT_INTERVAL > block.timestamp
        ) {
            revert MintCooldown();
        }

        token.mint(who, amount);
        lastMinted[who] = block.timestamp;
    }

    function withdraw() public {
        payable(owner()).transfer(address(this).balance);
    }
}
