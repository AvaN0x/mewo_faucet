// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Mewo.sol";
import "../src/Faucetable.sol";
import "../src/Faucet.sol";

contract FaucetTest is Test {
    Mewo mewo;
    Faucet faucet;

    address owner = makeAddr("owner");
    address user = makeAddr("user");

    function setUp() public {
        vm.startPrank(owner);
        mewo = new Mewo();
        faucet = new Faucet(mewo);
        mewo.addFaucet(address(faucet));
        vm.stopPrank();
    }

    function test_mint_revertMaxMint(address recipient, uint256 amount) public {
        vm.assume(recipient != address(0));
        vm.assume(amount > faucet.MAX_MINT());

        vm.expectRevert(abi.encodeWithSelector(Faucet.MaxMint.selector));
        vm.prank(address(faucet));
        faucet.mint(recipient, amount);
    }

    function test_mint_revertMintCooldown(
        address recipient,
        uint256 amount
    ) public {
        vm.assume(recipient != address(0));
        vm.assume(amount > 0 && amount <= faucet.MAX_MINT());
        vm.assume(block.timestamp > 0);

        vm.startPrank(address(faucet));
        faucet.mint(recipient, amount);
        vm.expectRevert(abi.encodeWithSelector(Faucet.MintCooldown.selector));
        faucet.mint(recipient, amount);
        vm.warp(block.timestamp + faucet.MINT_INTERVAL() - 1);
        vm.expectRevert(abi.encodeWithSelector(Faucet.MintCooldown.selector));
        faucet.mint(recipient, amount);
        vm.stopPrank();
    }

    function test_mint_pass(address recipient, uint256 amount) public {
        vm.assume(recipient != address(0));
        vm.assume(faucet.lastMinted(recipient) == 0);
        vm.assume(amount > 0 && amount <= faucet.MAX_MINT());

        vm.startPrank(address(faucet));
        uint256 initial = mewo.balanceOf(recipient);
        faucet.mint(recipient, amount);
        assertEq(mewo.balanceOf(recipient), initial + amount);

        vm.warp(block.timestamp + faucet.MINT_INTERVAL());

        faucet.mint(recipient, amount);
        assertEq(mewo.balanceOf(recipient), initial + 2 * amount);
        vm.stopPrank();
    }

    function test_resetCooldown_revertOnlyOwner() public {
        vm.expectRevert("Ownable: caller is not the owner");
        vm.prank(user);
        faucet.resetCooldown(user);
    }

    function test_resetCooldown_pass() public {
        vm.prank(owner);
        faucet.resetCooldown(user);
    }
}
