// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


library SafeMath {
    // Sumar: r = x + y
    function add(uint256 x, uint256 y) internal pure returns(uint256) {
        uint256 r = x + y;
        require(r >= x, 'SafeMath: addition overflow');
        return r;
    }

    // restar: r = x - y
    function sub(uint256 x, uint256 y) internal pure returns(uint256) {
        require(y <= x, 'SafeMath: subtraction overflow');
        uint256 r = x - y;
        return r;
    }

    // Multiplicar (optimizar uso de gas)
    function mul(uint256 x, uint256 y) internal pure returns(uint256) {
        // gas optimization
        if(x == 0 || y == 0) {
            return 0;
        }
        
        uint256 r = x * y;
        require(r / x == y, 'SafeMath: multiplication overflow');
        return r;
    }

    // Division (optimizar uso de gas)
    function div(uint256 x, uint256 y) internal pure returns(uint256) {
        require(y > 0, 'SafeMath: division by zero');
        uint256 r = x / y;
        return r;
    }

    // El gasto de gas se mantiene intacto
    function mod(uint256 x, uint256 y) internal pure returns(uint256) {
        require(y != 0, 'SafeMath: modulo by zero');
        return x % y;
    }
}