// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import './interfaces/IERC721.sol';
import './libraries/Counters.sol';
import './ERC165.sol';

/*
Crear funcion para minear tokens
    1. NFT debe apuntar a una direccion
    2. Mantener registro de los ids de los tokens
    3. Mantener registro del dueño (direccion) del token id
    4. Cuantos tokens tiene un dueño (direccion)
    5. Crear un evento que emita un registro de tranferencia - direccion del contrato, donde se esta haciendo el minteo, el id.

*/

contract ERC721 is ERC165, IERC721 {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    mapping(uint256 => address) private _tokenOwner;
    mapping(address => Counters.Counter) private _ownedTokensCount;
    // Direccion verificar token aprovados
    mapping(uint256 => address) private _tokenApprovals;

    constructor() {
        // Registrar la interfaz con una funcion de hashing
        _registrerInterface(bytes4(keccak256('balanceOf(bytes4)')^keccak256('ownerOf(bytes4)')^keccak256('transferFrom(bytes4)')));
    }

    // Nos retorna el balance de una persona
    function balanceOf(address _owner) public override view returns (uint256) {
        require(_owner != address(0), 'Address is zero');
        return _ownedTokensCount[_owner].current();
    }

    // Nos retorna quien es el dueño de este token
    function ownerOf(uint256 _tokenId) public override view returns (address) {
        address owner = _tokenOwner[_tokenId];
        require(owner != address(0), 'Address is zero');
        return owner;
    }

    function _exist(uint256 tokenId) internal view returns(bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    function _mint(address to, uint256 tokenId) internal virtual {
        // Revisar que el addres no sea cero
        require(to != address(0), 'ERC721 minting to zero address');

        // Token debe No existir anteriormente
        require(!_exist(tokenId), 'ERC721 already exist');

        // Apuntar a direccion del dueño
        _tokenOwner[tokenId] = to;
        // Cuantos tokens tiene ese dueño
        _ownedTokensCount[to].increment();

        // Se emite el evento anteriormente creado para informar con los datos
        emit Tranfer(address(0), to, tokenId);
    }

    // Tranferir un token
    function _transferFrom(address _from, address _to, uint256 _tokenId) internal {
        // Se requiere que la direccion a la que s eenvia no sea cero
        require(_to != address(0), 'Error - ERC721 Transfer to the zero address');
        // Se requiere que el token que se va a transferir sea del owner
        require(ownerOf(_tokenId) == _from, 'Trying to transfer a token the address does not own!');
        
        // Se resta un token a la cuenta de los token del owner
        _ownedTokensCount[_from].decrement();
        // Se suma un token a la cuenta que lo recive
        _ownedTokensCount[_to].increment();

        // El nuevo owner del token es _to
        _tokenOwner[_tokenId] = _to;

        emit Tranfer(_from, _to, _tokenId);
    }
    function transferFrom(address _from, address _to, uint256 _tokenId) override public {
        // Se requiere que el owner sea el verdadero
        require(isApproveOrOwner(msg.sender, _tokenId));
        _transferFrom(_from, _to, _tokenId);
    }

    function approve(address _to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(_to != owner, 'Error - approval to current owner');
        require(msg.sender == owner, 'Current caller must be owner');
        _tokenApprovals[tokenId] = _to;
        emit Approval(owner, _to, tokenId);
    }

    function isApproveOrOwner(address spender, uint256 tokenId) internal view returns(bool) {
        require(_exist(tokenId), 'token does not exist');
        address owner = ownerOf(tokenId);
        return(spender == owner);
    }

}