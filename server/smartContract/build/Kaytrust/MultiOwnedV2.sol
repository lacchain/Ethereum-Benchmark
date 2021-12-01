// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./BaseRelayRecipient.sol";

contract MultiOwned is Initializable, BaseRelayRecipient {
  event OwnerAdded(address indexed newOwner);
  event OwnerRemoved(address indexed formerOwner);
  mapping (address => bool) public owners;
  modifier onlyOwner() {
    require(isOwner(_msgSender()));
    _;
  }
  
  function __multiOwnedInit(address newOwner) initializer internal {
      owners[newOwner] = true;
      //emit OwnerAdded(newOwner);
  }

  function isOwner(address addr) public view returns(bool) {
    return owners[addr];
  }

  function addOwner(address newOwner) public onlyOwner {
    owners[newOwner] = true;
    emit OwnerAdded(newOwner);
  }

  function renounce() public onlyOwner {
    owners[_msgSender()] = false;
    emit OwnerRemoved(_msgSender());
  }
  
}