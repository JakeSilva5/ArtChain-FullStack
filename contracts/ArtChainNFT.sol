// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


//importing OpenZeppelin contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

//declaring my smart contract which inherits from ERC721
contract ArtChainNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    //creating private counter object to track next tokenID
    Counters.Counter private _tokenIdCounter;
    
    //tracking parent for each NFT if parent exists
    mapping(uint256 => uint256) public parentOf;

    //constructor
    constructor() ERC721("ArtChain", "ARTC") {}

    //minting function that takes in a tokenURI and optional parent token ID
    function mintNFT(string memory _tokenURI, uint256 _parentTokenId) public {
        //gets current ID from counter
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        //saving parent-child lineage
        if (_parentTokenId != 0) {
            parentOf[tokenId] = _parentTokenId;
        }
        //incrementing counter
        _tokenIdCounter.increment();
    }
}