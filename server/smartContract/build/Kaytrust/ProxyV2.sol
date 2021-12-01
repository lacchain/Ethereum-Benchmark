// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./MultiOwnedV2.sol";

contract Proxy is MultiOwned {
  
  event Forwarded (address indexed destination, uint value, bytes data);
  
  function initialize(address _addr) public {
      __multiOwnedInit(_addr);
  }
  
  function forward(address destination, uint value, bytes memory data) public onlyOwner {
    (bool success, bytes memory returnData) = destination.call{value:value}(data);
    require(success, string(returnData));
    emit Forwarded(destination, value, data);
  }
}