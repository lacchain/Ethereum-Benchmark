//SPDX-License-Identifier: APACHE2
pragma solidity ^0.8.9;

interface ICallee {
    function setValue(uint256 value) external;

    function getValue() external view returns (uint256);
}
