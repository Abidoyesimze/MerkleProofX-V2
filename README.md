# MerkleProofX

> A complete utility for creating, managing, and verifying Merkle Trees and Merkle Proofs — ideal for whitelisting, airdrops, DAO access, and other Web3 use cases.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Scaffold-ETH 2](https://img.shields.io/badge/Built%20with-Scaffold--ETH%202-blue)](https://scaffoldeth.io)

## Overview

**MerkleProofX** is built on **Scaffold-ETH 2** and provides a powerful developer UI for generating Merkle proofs, managing root hashes, and integrating on-chain verification in seconds. It enables secure, gas-efficient verification of large datasets on-chain while maintaining privacy and minimizing contract complexity.

## Why Merkle Trees?

Merkle Trees provide significant advantages for Web3 applications:

- **Efficient Verification**: Verify user inclusion with a single root hash
- **Gas Optimization**: Save storage costs by keeping only the root on-chain
- **Privacy Protection**: Use hashed proofs to protect sensitive data
- **Scalability**: Handle large datasets with minimal on-chain footprint

## Use Cases

- **NFT Presale Whitelisting**: Manage exclusive access to NFT mints
- **Token Airdrops**: Distribute tokens to eligible addresses efficiently
- **DAO Governance**: Verify voter eligibility without storing all addresses
- **Access Control**: Implement role-based permissions
- **KYC Validation**: Verify user credentials while maintaining privacy

## Quick Start

### Prerequisites

- Node.js >= 18.17.0
- Yarn or npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abidoyesimze/MerkleProofX-V2.git
   cd MerkleProofX-V2
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

 3.  **Navigate to the frontend folder**
   ```bash
   cd packages/nextjs
   ```
  

4. **Start the development server**
   ```bash
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to access MerkleProofX.

### Alternative: Using Scaffold-ETH 2

If you want to integrate MerkleProofX into an existing Scaffold-ETH 2 project:

1. **Clone into your Scaffold-ETH 2 monorepo**
   ```bash
   cd your-scaffold-eth-2-project
   git clone https://github.com/Abidoyesimze/MerkleProofX-V2.git packages/merkletree
   cd packages/merkletree
   yarn install
   ```

2. **Start the development server**
   ```bash
   yarn dev
   ```

3. **Access the application**
   Open `http://localhost:3000/merkletree`

## Features

- **🌐 Web Interface**: Intuitive UI for inputting or uploading whitelists
- **🔐 Real-time Generation**: On-the-fly Merkle tree and proof creation
- **🧪 Live Verification**: Real-time address proof verification
- **📤 Export Functionality**: Export proofs as JSON for easy integration
- **📄 Smart Contract Examples**: Ready-to-use contract templates
- **🌓 Modern UI**: Clean, responsive design with light/dark mode support
- **🧩 Modular Design**: Easily integrate into other Web3 applications

## Smart Contract Examples

### Basic Merkle Verifier

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MerkleVerifier {
    bytes32 public merkleRoot;

    constructor(bytes32 _merkleRoot) {
        merkleRoot = _merkleRoot;
    }

    function verify(
        bytes32[] calldata proof,
        address account
    ) public view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(account));
        bytes32 hash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];
            hash = hash <= proofElement
                ? keccak256(abi.encodePacked(hash, proofElement))
                : keccak256(abi.encodePacked(proofElement, hash));
        }

        return hash == merkleRoot;
    }
}
```

### NFT Whitelist Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./MerkleVerifier.sol";

contract WhitelistedNFT is ERC721, MerkleVerifier {
    uint256 public totalSupply;

    constructor(bytes32 _root) 
        ERC721("Whitelist NFT", "WNFT") 
        MerkleVerifier(_root) {}

    function mint(bytes32[] calldata proof) external {
        require(verify(proof, msg.sender), "Not whitelisted");
        _mint(msg.sender, totalSupply++);
    }
}
```

### ERC20 Airdrop Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./MerkleVerifier.sol";

contract MerkleAirdrop is ERC20, MerkleVerifier {
    mapping(address => bool) public claimed;

    constructor(bytes32 _root) 
        ERC20("AirdropToken", "ADT") 
        MerkleVerifier(_root) {}

    function claim(bytes32[] calldata proof) external {
        require(!claimed[msg.sender], "Already claimed");
        require(verify(proof, msg.sender), "Invalid proof");
        
        claimed[msg.sender] = true;
        _mint(msg.sender, 100 * 1e18); // 100 tokens
    }
}
```

## Developer API
COMING SOON!!!

## Best Practices

### Security

- **Sort Addresses**: Always sort addresses before generating the tree to ensure consistency
- **Dual Validation**: Validate proofs on both client-side and smart contract
- **Root Protection**: Never share Merkle roots without proper proof verification

### Development

- **Audit Records**: Keep original address lists and generated proofs for auditing
- **Testing**: Thoroughly test proof generation and verification processes
- **Gas Optimization**: Consider proof length when designing large trees
- **Error Handling**: Implement proper error handling for invalid proofs

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
   ```bash
   git fork https://github.com/Abidoyesimze/MerkleProofX-V2.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make your changes and commit**
   ```bash
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork and create a Pull Request**
   ```bash
   git push origin feat/your-feature-name
   ```

### Development Setup

```bash
# Install dependencies
yarn install

# Run tests
yarn test

# Build the project
yarn build

# Lint code
yarn lint
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact & Support

- **GitHub**: [@Abidoyesimze](https://github.com/Abidoyesimze)
- **Email**: similoluwaeyitayoabidoye@gmail.com
- **Twitter**: [@simze_eth](https://twitter.com/simze_eth)

## Acknowledgements

Special thanks to the following projects and communities:

- [Scaffold-ETH 2](https://scaffoldeth.io) - The foundation for rapid dApp development
- [OpenZeppelin](https://openzeppelin.com) - Secure smart contract libraries
- [Buidlguidl](https://app.buidlguidl.com/) - For supporting this project and fostering the builder community 
- [Ethereum Community](https://ethereum.org) - For building the future of decentralized applications

---

<div align="center">
  <strong>Built with ❤️ for the Web3 community</strong>
</div>
