// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Metavrs.sol";

contract MetavrsV2 is Metavrs {
    function version() pure public returns(uint) {
        return 2; 
    }
}