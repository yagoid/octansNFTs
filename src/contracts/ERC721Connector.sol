// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import './ERC721Metadata.sol';
import './ERC721Enumerable.sol';


contract ERC721Connector is ERC721Metadata, ERC721Enumerable {

    // Desplegamos el connector. Queremos alimentar los metadatos
    constructor (string memory name, string memory symbol) ERC721Metadata(name, symbol) {

    }

}