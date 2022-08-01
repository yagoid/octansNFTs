// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import './ERC721Connector.sol';


contract Octans is ERC721Connector {

    // Matriz para guardar nuestros nfts
    string[] public OctansNFTS;
    // Saber si el NFT ya existe
    mapping(string => bool) _octansNFTExists;

    // Función para mintear, pasandole como parametro el token que queremos crear
    function mint(string memory _octans) public {

        // Si el NFT (token) ya existe, da error
        require(!_octansNFTExists[_octans], 'Error - token already exist');

        // Se añade el NFT a la lista
        OctansNFTS.push(_octans);
        // Se crea el id, dependiendo de el tamanio de la lista
        uint _id = OctansNFTS.length - 1;

        // Se llama a la funcion "mint" de ERC721
        _mint(msg.sender, _id);

        // Se cambia a true para que conste como que exista y no se pueda crear de nuevo
        _octansNFTExists[_octans] = true;
    }

    constructor() ERC721Connector('Octans', 'OTAN') {}

}