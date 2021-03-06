// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/ERC721Enumerable.sol";
// // import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts@4.5.0/security/Pausable.sol";
// import "@openzeppelin/contracts@4.5.0/access/Ownable.sol";
// import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/ERC721Burnable.sol";
// import "@openzeppelin/contracts@4.5.0/utils/cryptography/draft-EIP712.sol";
// import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/draft-ERC721Votes.sol";
// import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";
// import "./StringLib.sol";

// contract LazyMintTest is ERC721, ERC721Enumerable, /*ERC721URIStorage, */ Pausable, Ownable, ERC721Burnable, EIP712, ERC721Votes {
//     using Counters for Counters.Counter;

//     Counters.Counter private _tokenIdCounter;

//     string public constant INVALID_TOKEN_ID = "Invalid Token ID";

//     bool public saleIsActive = false;

//     uint256 public maxPurchasePerMint = 3;
//     uint256 public price = 0.2 ether;

//     uint256 public randomSeed;

//     string private tokenUriBase;

//     uint256 internal constant MAX_NFTS = 10;

//     constructor() ERC721("LazyMintTest", "LMT") EIP712("LazyMintTest", "1") {}

//     event TokenUriBaseSet(string tokenUriBase);

//     modifier onlyOnSale() {
//         require(saleIsActive, "Not in public sale period");
//         _;
//     }

//     function setTokenUriBase(string calldata _tokenUriBase) external onlyOwner {
//         tokenUriBase = _tokenUriBase;
//         emit TokenUriBaseSet(_tokenUriBase);
//     }

//     function setMaxPurchasePerMint(uint256 _maxPurchasePerMint) external onlyOwner {
//         maxPurchasePerMint = _maxPurchasePerMint;
//     }

//     function getMaxNfts() external pure returns (uint256) {
//         return MAX_NFTS;
//     }

//     function setPrice(uint256 _price) external onlyOwner {
//         price = _price;
//     }

//     function flipSaleState() external onlyOwner {
//         saleIsActive = !saleIsActive;
//     }

//     // function safeMint(address to, string memory uri) public onlyOwner {
//     //     uint256 tokenId = _tokenIdCounter.current();
//     //     _tokenIdCounter.increment();
//     //     _safeMint(to, tokenId);
//     //     // _setTokenURI(tokenId, uri);
//     // }

//      function lazyMint(uint256 numberOfTokens) public payable onlyOnSale {
//         require(numberOfTokens <= maxPurchasePerMint, "Tried to mint too many nfts");
//         require(totalSupply() + numberOfTokens <= MAX_NFTS, "Purchase would exceed max supply of nfts");
//         require(price * numberOfTokens <= msg.value, "inefficient ether");

//         uint256 count = 0;
//         for (uint256 i = 0; i < numberOfTokens; i++) {
//             if (totalSupply() < MAX_NFTS) {
//                 _safeMint(msg.sender, totalSupply());
//                 count += 1;
//             }
//         }
//         if (price * count < msg.value) {
//             uint256 ethToRefund = msg.value - price * count;
//             (bool sent, ) = msg.sender.call{ value: ethToRefund }("");
//             require(sent, "Failed to send Ether");
//         }

//         if (randomSeed == 0 && (totalSupply() == MAX_NFTS)) {
//             _setRandomSeed();
//         }
//     }

//     function setRandomSeed() external onlyOwner {
//         _setRandomSeed();
//     }

//     function _setRandomSeed() private {
//         require(randomSeed == 0, "Seed number is already set");

//         randomSeed = uint(keccak256(abi.encodePacked(block.timestamp, blockhash(block.number - 1))));
//         // Prevent default sequence
//         if (randomSeed == 0) {
//             randomSeed += 1;
//         }
//     }

//     function withdraw() public onlyOwner {
//         uint256 balance = address(this).balance;
//         payable(msg.sender).transfer(balance);
//     }

//     function _beforeTokenTransfer(address from, address to, uint256 tokenId)
//         internal
//         whenNotPaused
//         override(ERC721, ERC721Enumerable)
//     {
//         super._beforeTokenTransfer(from, to, tokenId);
//     }

//     // The following functions are overrides required by Solidity.

//     function _afterTokenTransfer(address from, address to, uint256 tokenId)
//         internal
//         override(ERC721, ERC721Votes)
//     {
//         super._afterTokenTransfer(from, to, tokenId);
//     }

//     function _burn(uint256 tokenId) internal override(ERC721 /*, ERC721URIStorage */) {
//         super._burn(tokenId);
//     }

//     function tokenURI(uint256 _tokenId)
//     public view override
//     returns (string memory uri) {
//         require(_exists(_tokenId), INVALID_TOKEN_ID);
//         uri = bytes(tokenUriBase).length > 0 ? string(abi.encodePacked(tokenUriBase, StringLib.uint2str(_tokenId), '.json')) : "";
//     }

//     // function tokenURI(uint256 tokenId)
//     //     public
//     //     view
//     //     override(ERC721, ERC721URIStorage)
//     //     returns (string memory)
//     // {
//     //     return super.tokenURI(tokenId);
//     // }

//     function supportsInterface(bytes4 interfaceId)
//         public
//         view
//         override(ERC721, ERC721Enumerable)
//         returns (bool)
//     {
//         return super.supportsInterface(interfaceId);
//     }
// }
