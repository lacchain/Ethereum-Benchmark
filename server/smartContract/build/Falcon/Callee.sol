//SPDX-License-Identifier: APACHE2
pragma solidity ^0.8.9;

import "./ICallee.sol";

contract Callee is ICallee {
    event stored(address _to, uint256 _amount);
    uint256 _value;

    function setValue(uint256 _amount) public {
        emit stored(msg.sender, _amount);
        _value = _amount;
    }

    function getValue() public view returns (uint256) {
        return _value;
    }
}
