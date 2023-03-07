//SPDX-License-Identifier: APACHE2
pragma solidity ^0.8.9;

contract PostQuantumPermissioning {
    address relayHub;
    uint256 private version = 1000000;

    constructor(address _relayHub) {
        relayHub = _relayHub;
    }

    function transactionAllowed(
        address, /*sender*/
        address target,
        uint256, /*value*/
        uint256, /*gasPrice*/
        uint256, /*gasLimit*/
        bytes calldata payload
    ) external returns (bool) {
        if (target != relayHub) {
            return false;
        }
        bytes memory signingData;
        uint8 v;
        bytes32 r;
        bytes32 s;
        bytes memory falconPublicKey;
        bytes memory falconSignature;
        (signingData, v, r, s, falconPublicKey, falconSignature) = abi.decode(
            payload[4:],
            (bytes, uint8, bytes32, bytes32, bytes, bytes)
        );
        return falconVerify(falconSignature, falconPublicKey, signingData);
    }

    function setRelayHub(address _relayHub) public {
        relayHub = _relayHub;
    }

    function getRelayHub() public view returns (address) {
        return relayHub;
    }

    function falconVerify(
        bytes memory signature,
        bytes memory pubKey,
        bytes memory data
    ) internal returns (bool) {
        (bool success, bytes memory verifies) = address(
            0x0000000000000000000000000000000000000013
        ).call(
                abi.encodeWithSignature(
                    "verify(bytes,bytes,bytes)",
                    signature,
                    pubKey,
                    data
                )
            );
        require(success && verifies.length == 32);
        return verifies[verifies.length - 1] == 0;
    }

    // VERSION
    function getContractVersion() public view returns (uint256) {
        return version;
    }
}
