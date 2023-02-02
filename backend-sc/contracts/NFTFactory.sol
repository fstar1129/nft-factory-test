// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./NFT.sol";
contract NFTFactory {
    event CollectionCreated(address collection, string name, string symbol);
    event TokenMinted(address collection, address recipient, uint256 tokenId, string tokenUri);

    function createNewCollection(string memory name, string memory symbol) external {
        NFT nft = new NFT(name, symbol);
        emit CollectionCreated(address(nft), name, symbol);
    }

    function mint(address collection, uint256 tokenId, address to, string memory uri) external {
        NFT(collection).safeMint(to, tokenId, uri);
        emit TokenMinted(collection, to, tokenId, uri);
    }
}