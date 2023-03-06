//SPDX-License-Identifier: APACHE2
pragma solidity ^0.8.9;

import "./ICallee.sol";

contract RelayHub {
    event Relayed(address indexed writer, address signer);

    ICallee private callee;

    constructor(address _callee) {
        callee = ICallee(_callee);
    }

    mapping(address => uint256) nonces;

    function relayMetaTx(
        bytes memory signingData,
        uint8 v,
        bytes32 r,
        bytes32 s,
        bytes memory, /*falconPublicKey*/
        bytes memory /*falconSignature*/
    ) public returns (bool) {
        bytes32 hashedSigningData = keccak256(signingData);
        address signer = ecrecover(hashedSigningData, v + 27, r, s);
        nonces[signer]++;
        // simulate simple call
        callee.setValue(5);

        emit Relayed(msg.sender, signer);
        return true;
    }

    function getNonce(address signer) public view returns (uint256) {
        return nonces[signer];
    }
}
