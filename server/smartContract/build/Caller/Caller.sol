pragma solidity >=0.4.0 <0.6.0;

contract Caller {
    function storeAction(address addr) public {
        Callee c = Callee(addr);
        c.setValue(100);
    }
    
    function getAction(address addr) view public returns (uint) {
        Callee c = Callee(addr);
        return c.getValue();
    }
    
}

contract Callee {
    function setValue(uint value) public;
    function getValue() public view returns(uint);
}