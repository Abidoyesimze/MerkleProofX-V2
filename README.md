MerkleProofX 🌳
MerkleProofX is a comprehensive platform for creating, validating, and managing Merkle trees and proofs in Web3 applications. It streamlines whitelisting, access control, and eligibility verification for NFTs, token airdrops, and DAOs.
🎯 Why MerkleProofX?
Problem: Managing allowlists, verifying eligibility, and implementing access control on-chain can be expensive, complex, and error-prone.
Solution: MerkleProofX provides a gas-efficient, secure, and user-friendly approach to verification using Merkle trees. Store just one hash on-chain and verify thousands of addresses without prohibitive gas costs.
🤔 Who Needs MerkleProofX?

NFT Creators implementing whitelists for presales
Token Projects managing airdrops to eligible addresses
DAOs verifying membership and voting rights
dApp Developers requiring secure on-chain verification
Community Managers managing access to gated content
Protocol Teams implementing multi-tier access control

✨ Key Features

📝 Streamlined List Management: Upload addresses via text input or file upload
🌲 Merkle Tree Generation: Create Merkle roots and proofs with one click
🔍 Flexible Verification: Validate proofs client-side or on-chain
🔐 On-chain Registration: Store Merkle roots with descriptions for permanent reference
📊 Usage Analytics: Track validation counts and usage statistics
📁 Easy Data Handling: Import/export proof data in JSON format
🔄 Developer-friendly: Seamlessly integrate with existing smart contracts
🎨 Polished UI: Modern, responsive interface with dark mode
⚡ Gas Optimized: Cost-efficient smart contract implementations
🛡️ Security Focused: Built-in address validation and safety features

🔧 How It Works

Create Your List: Upload or input the addresses you want to whitelist
Generate the Merkle Tree: System creates a Merkle root hash from your addresses
Register On-chain: Store your Merkle root with metadata for future reference
Generate Proofs: Create verification proofs for each whitelisted address
Distribute Proofs: Share proofs with users or integrate with your frontend
Validate Eligibility: Users verify their inclusion through our interface or your smart contracts
Track Usage: Monitor validation statistics to understand user engagement

🔗 Smart Contract Integration
Basic Verifier Implementation
solidity// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MerkleVerifier {
    bytes32 public merkleRoot;

    constructor(bytes32 _merkleRoot) {
        merkleRoot = _merkleRoot;
    }

    function verify(bytes32[] calldata proof, address account) public view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(account));
        bytes32 computedHash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];
            if (computedHash <= proofElement) {
                computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
            } else {
                computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
            }
        }

        return computedHash == merkleRoot;
    }
}
Integration Examples
NFT Whitelist
soliditycontract WhitelistedNFT is ERC721, MerkleVerifier {
    constructor(bytes32 _merkleRoot) ERC721("WhitelistedNFT", "WNFT") MerkleVerifier(_merkleRoot) {}

    function mint(bytes32[] calldata proof) external {
        require(verify(proof, msg.sender), "Not whitelisted");
        _mint(msg.sender, totalSupply());
    }
}
Token Airdrop
soliditycontract MerkleAirdrop is ERC20, MerkleVerifier {
    mapping(address => bool) public claimed;

    constructor(bytes32 _merkleRoot) ERC20("AirdropToken", "AIR") MerkleVerifier(_merkleRoot) {}

    function claim(bytes32[] calldata proof) external {
        require(!claimed[msg.sender], "Already claimed");
        require(verify(proof, msg.sender), "Not eligible");
        
        claimed[msg.sender] = true;
        _mint(msg.sender, 100 * 10**decimals());
    }
}
DAO Voting Rights
soliditycontract MerkleDAO {
    MerkleVerifier public verifier;
    
    constructor(bytes32 _merkleRoot) {
        verifier = new MerkleVerifier(_merkleRoot);
    }

    function vote(uint256 proposalId, bool support, bytes32[] calldata proof) external {
        require(verifier.verify(proof, msg.sender), "Not a member");
        // Voting logic here
    }
}
🛠️ Developer API
Generate Merkle Tree
javascriptimport { generateMerkleTree } from '@merkleproofx/utils';

const addresses = [
  '0x1234...', 
  '0x5678...'
];

const merkleTree = generateMerkleTree(addresses);
const root = merkleTree.getHexRoot();
Generate Proof for Address
javascriptimport { generateMerkleProof } from '@merkleproofx/utils';

const proof = generateMerkleProof(merkleTree, address);
Validate Proof
javascriptimport { verifyMerkleProof } from '@merkleproofx/utils';

const isValid = verifyMerkleProof(proof, merkleRoot, address);
Register Merkle Root
javascriptimport { MerkleVerifierContract } from '@merkleproofx/contracts';

const transaction = await MerkleVerifierContract.registerMerkleRoot(
  merkleRoot,
  "My Whitelist"
);

await transaction.wait();
📚 Implementation Best Practices
Gas Optimization

Sort Addresses: Always sort addresses lexicographically before generating the Merkle tree
Optimal Tree Depth: Balance your tree to minimize proof length (usually 20 addresses per level)
Batch Operations: Implement batch claim/verification functions when possible
View Functions: Use view functions for pre-validation to save users gas

Security Considerations

Input Validation: Always normalize and validate addresses before tree generation
Proof Verification: Verify proofs client-side before initiating on-chain transactions
Access Control: Implement proper permissions for admin functions
Deterministic Generation: Ensure your tree generation algorithm is consistent across platforms

Scalability Tips

Off-chain Storage: Store proofs off-chain, only putting the root hash on-chain
Efficient Distribution: Consider using IPFS or similar for proof distribution
Pagination: Implement pagination when displaying large address lists
Optimistic UI: Update UI optimistically while transactions confirm

Proof Management

Standardized Format: Use consistent JSON schema for proof exports
Metadata: Include descriptive information with your Merkle trees
Versioning: Implement version control for your Merkle trees
Automated Testing: Verify your trees with automated testing before deployment

🚀 Getting Started
Prerequisites

Node.js >= 16
npm or yarn
MetaMask or another Web3 wallet

Installation

Clone the repository:

bash git clone https://github.com/Abidoyesimze/MerkleProofX-V2
cd merkleproofx

Install dependencies:

bashnpm install

Start the development server:

bashnpm run dev

Open http://localhost:3000

🤝 Contributing
Contributions make the open source community thrive. Here's how you can help:

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

OpenZeppelin for their Merkle tree implementation
The Ethereum community for continuous innovation
All contributors who have helped shape MerkleProofX
