// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {Faucetable} from "./Faucetable.sol";

contract Mewo is Faucetable {
    constructor() ERC20("Mewo", "MEWO") {}

    function withdraw() public {
        payable(owner()).transfer(address(this).balance);
    }
}
