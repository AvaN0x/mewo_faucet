// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Mewo.sol";
import "../src/Faucetable.sol";

contract FaucetableTest is Test {
    Mewo mewo;

    address owner = makeAddr("owner");
    address faucet = makeAddr("faucet");
    address user = makeAddr("user");

    function setUp() public {
        vm.startPrank(owner);
        mewo = new Mewo();
        mewo.addFaucet(faucet);
        vm.stopPrank();
    }

    function test_addFaucet_revertOnlyOwner() public {
        vm.expectRevert("Ownable: caller is not the owner");
        vm.prank(user);
        mewo.addFaucet(user);
    }

    function test_addFaucet_pass(address who) public {
        vm.prank(owner);
        mewo.addFaucet(who);
        assertTrue(mewo.faucets(who));
    }

    function test_removeFaucet_revertOnlyOwner() public {
        vm.expectRevert("Ownable: caller is not the owner");
        vm.prank(user);
        mewo.removeFaucet(user);
    }

    function test_removeFaucet_pass(address who) public {
        vm.prank(owner);
        mewo.addFaucet(who);
        assertTrue(mewo.faucets(who));

        vm.prank(owner);
        mewo.removeFaucet(who);
        assertFalse(mewo.faucets(who));
    }

    function test_mint_revertOnlyFaucet() public {
        vm.expectRevert(abi.encodeWithSelector(Faucetable.OnlyFaucet.selector));
        vm.prank(user);
        mewo.mint(user, 1 ether);
    }

    function test_mint_pass(address recipient, uint256 amount) public {
        vm.assume(recipient != address(0));
        vm.assume(amount > 0);

        uint256 initial = mewo.balanceOf(recipient);
        vm.prank(faucet);
        mewo.mint(recipient, amount);
        assertEq(mewo.balanceOf(recipient), initial + amount);
    }
}
