// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract Greetings {
    string private greetings = "Hello, World!";

    function getGreetings() external view returns (string memory) {
        return greetings;
    }

    function setGreetings(string memory _greetings) external {
        greetings = _greetings;
    }
}
