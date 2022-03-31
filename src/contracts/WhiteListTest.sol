// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// // import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/ERC721Enumerable.sol";
// // import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/ERC721URIStorage.sol";
// // import "@openzeppelin/contracts@4.5.0/security/Pausable.sol";
// // import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/ERC721Burnable.sol";
// // import "@openzeppelin/contracts@4.5.0/utils/cryptography/draft-EIP712.sol";
// // import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/draft-ERC721Votes.sol";
// // import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";
// // import "./StringLib.sol";

// contract WhiteListTest is ERC721, Ownable, ReentrancyGuard {
//     using Counters for Counters.Counter;
//     using SafeMath for uint256;
//     using ECDSA for bytes32;
//     using Strings for uint256;

//     uint256 public MAX_NFTS = 10;
//     uint256 public MAX_PURCHASE_PER_MINT = 3;
//     uint256 public MAX_PRESALE_MINT = 1;
//     uint256 public PRICE = 0.002 ether;
//     uint256 public RESERVED_NFTS = 2;

//     string public tokenBaseURI;
//     string public unrevealedURI;
//     bool public presaleActive = false;
//     bool public mintActive = false;
//     bool public reservesMinted = false;

//     mapping(address => uint256) private whitelistAddressMintCount;
//     Counters.Counter public tokenSupply;

//     constructor() ERC721("WhiteListTest", "WLT") {}

//     function setTokenBaseURI(string memory _baseURI) external onlyOwner {
//         tokenBaseURI = _baseURI;
//     }

//     function setUnrevealedURI(string memory _unrevealedUri) external onlyOwner {
//         unrevealedURI = _unrevealedUri;
//     }

//     function setWhitelistCap(uint256 _whitelist_cap) external onlyOwner {
//         require(_whitelist_cap > RESERVED_NFTS, "New reserved count must be higher than old");
//         RESERVED_NFTS = _whitelist_cap;
//     }

//     function setMaxPurchasePerMint(uint256 _maxPurchasePerMint) external onlyOwner {
//         MAX_PURCHASE_PER_MINT = _maxPurchasePerMint;
//     }

//     function getMaxNfts() external view returns (uint256) {
//         return MAX_NFTS;
//     }

//     function setPrice(uint256 _price) external onlyOwner {
//         PRICE = _price;
//     }

//     function flipPresaleState() external onlyOwner {
//         presaleActive = !presaleActive;
//     }

//     function flipSaleState() external onlyOwner {
//         mintActive = !mintActive;
//     }

//     function tokenURI(uint256 _tokenId)
//         public
//         view
//         override
//         returns (string memory)
//     {
//         bool revealed = bytes(tokenBaseURI).length > 0;

//         if (!revealed) {
//             return unrevealedURI;
//         }

//         require(
//             _exists(_tokenId),
//             "ERC721Metadata: URI query for nonexistent token"
//         );

//         return string(abi.encodePacked(tokenBaseURI, _tokenId.toString()));
//     }

//     function withdraw() public onlyOwner {
//         uint256 balance = address(this).balance;
//         payable(msg.sender).transfer(balance);
//     }

//     function verifyOwnerSignature(bytes32 hash, bytes memory signature)
//         private
//         view
//         returns (bool)
//     {
//         return hash.toEthSignedMessageHash().recover(signature) == owner();
//     }

//     // Mint

//     function presaleMint(uint256 _quantity, bytes calldata _whitelistSignature)
//         external
//         payable
//         nonReentrant
//     {
//         require(
//             verifyOwnerSignature(
//                 keccak256(abi.encode(msg.sender)),
//                 _whitelistSignature
//             ),
//             "Invalid whitelist signature"
//         );
//         require(presaleActive, "Presale is not active");
//         require(
//             _quantity <= MAX_PRESALE_MINT,
//             "You can only mint a maximum of 1 for presale"
//         );
//         require(
//             whitelistAddressMintCount[msg.sender].add(_quantity) <=
//                 MAX_PRESALE_MINT,
//             "This purchase would exceed the maximum Hero Galaxy Heroes you are allowed to mint in the presale"
//         );

//         whitelistAddressMintCount[msg.sender] += _quantity;
//         _safeMint(_quantity);
//     }

//     function publicMint(uint256 _quantity) external payable {
//         require(mintActive, "Sale is not active.");
//         require(
//             _quantity <= MAX_PURCHASE_PER_MINT,
//             "Quantity is more than allowed per transaction."
//         );

//         _safeMint(_quantity);
//     }

//     function _safeMint(uint256 _quantity) internal {
//         require(_quantity > 0, "You must mint at least 1 hero");    
//         require(
//             tokenSupply.current().add(_quantity) <= MAX_NFTS,
//             "This purchase would exceed max supply of Hero Galaxy Heroes"
//         );
//         require(
//             msg.value >= PRICE.mul(_quantity),
//             "The ether value sent is not correct"
//         );

//         for (uint256 i = 0; i < _quantity; i++) {
//             uint256 mintIndex = tokenSupply.current();

//             if (mintIndex < MAX_NFTS) {
//                 tokenSupply.increment();
//                 _safeMint(msg.sender, mintIndex);
//             }
//         }
//     }

//     function mintReservedHeroes() external onlyOwner {
//         require(!reservesMinted, "Reserves have already been minted.");
//         require(
//             tokenSupply.current().add(RESERVED_NFTS) <= MAX_NFTS,
//             "This mint would exceed max supply of Heroes"
//         );

//         for (uint256 i = 0; i < RESERVED_NFTS; i++) {
//             uint256 mintIndex = tokenSupply.current();

//             if (mintIndex < MAX_NFTS) {
//                 tokenSupply.increment();
//                 _safeMint(msg.sender, mintIndex);
//             }
//         }

//         reservesMinted = true;
//     }

// }
