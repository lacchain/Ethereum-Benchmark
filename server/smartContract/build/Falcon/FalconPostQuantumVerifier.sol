//SPDX-License-Identifier: APACHE2
pragma solidity ^0.8.9;

contract PostQuantumPermissioning {
    function falconVerify(
        bytes memory signature,
        bytes memory pubKey,
        bytes memory data
    ) public returns (bool) {
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
        require(success && verifies.length == 32, "Invalid signature");
        return verifies[verifies.length - 1] == 0;
    }
}
