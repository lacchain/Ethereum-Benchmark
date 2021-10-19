pragma solidity >=0.4.22 <0.7.0;

import "./BaseRelayRecipient.sol";

/**
 * @title Storage2
 * @dev Store & retreive value in a variable
 */
contract Storage2 is BaseRelayRecipient{

    uint256 number;
    address owner;

    constructor() public {
        owner = _msgSender();
    }

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;

        emit ValueSeted(msg.sender, _msgSender());
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retreive() public view returns (uint256){
        return number;
    }

    function getOwner() public view returns (address){
        return owner;
    }

    event ValueSeted(address sender, address op);
}