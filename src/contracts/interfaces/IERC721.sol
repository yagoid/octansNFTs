// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// Aportar criptografia a los datos que son importantes
interface IERC721 {

    // Se crean los eventos para usarlos mas tarde, con el fin de proporcionar informacion
    event Tranfer (address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval (address indexed _owner, address indexed _approved, uint256 indexed tokenId);


    function balanceOf(address _owner) external view returns (uint256);

    function ownerOf(uint256 _tokenId) external view returns (address);

    function transferFrom(address _from, address _to, uint256 _tokenId) external;

}