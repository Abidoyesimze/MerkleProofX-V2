"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  ArrowPathIcon,
  ArrowUpTrayIcon,
  BoltIcon,
  ChartBarIcon,
  ClockIcon,
  CodeBracketIcon,
  CubeIcon,
  DocumentCheckIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Easy Upload",
    description: "Upload your address list via CSV or paste directly into the interface.",
    icon: ArrowUpTrayIcon,
  },
  {
    title: "Instant Generation",
    description: "Generate Merkle proofs instantly for any address in your list.",
    icon: BoltIcon,
  },
  {
    title: "Gas Efficient",
    description: "Save on gas costs by using Merkle proofs instead of storing full lists on-chain.",
    icon: ChartBarIcon,
  },
  {
    title: "Developer Friendly",
    description: "Simple integration with your smart contracts using standard Merkle proof verification.",
    icon: CodeBracketIcon,
  },
  {
    title: "Scalable",
    description: "Handle thousands of addresses efficiently with Merkle tree structure.",
    icon: ScaleIcon,
  },
  {
    title: "Time Saving",
    description: "Generate all necessary proofs in seconds, ready for your smart contract.",
    icon: ClockIcon,
  },
];

const useCases = [
  {
    title: "Airdrops",
    description: "Efficiently distribute tokens to multiple addresses without storing the full list on-chain.",
  },
  {
    title: "Whitelists",
    description: "Create permissioned access for NFT mints, token sales, or special events.",
  },
  {
    title: "Claims",
    description: "Set up efficient claim systems for rewards, refunds, or special benefits.",
  },
  {
    title: "Voting",
    description: "Implement permissioned voting systems for DAOs or governance protocols.",
  },
];

const Home = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // Handle navigation to the generator page with wallet check
  const handleNavigateToGenerator = () => {
    if (isConnected) {
      // If wallet is connected, navigate directly
      router.push("/merkleproofgenerator");
    } else {
      // If wallet is not connected, prompt to connect
      setIsButtonLoading(true);
      try {
        // Connect to the first available connector (usually MetaMask)
        connect({ connector: connectors[0] });
        toast.info("Please connect your wallet to continue");
      } catch (error) {
        console.error("Connection error:", error);
        toast.error("Failed to connect wallet. Please try again.");
      } finally {
        setIsButtonLoading(false);
      }
    }
  };

  // Effect to redirect once connected
  useEffect(() => {
    if (isConnected && isButtonLoading) {
      // Only redirect if the user clicked the button (isButtonLoading is true)
      router.push("/merkleproofgenerator");
      setIsButtonLoading(false);
    }
  }, [isConnected, isButtonLoading, router]);

  return (
    // Always use dark theme for content area regardless of site-wide theme setting
    <div className="bg-[#121d33]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wallet Connection Status */}
        {/* <div className="py-4 flex justify-end">
          {isConnected ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors text-sm"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => connect({ connector: connectors[0] })}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              Connect Wallet
            </button>
          )}
        </div> */}

        {/* Hero Section */}
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold mb-6 text-white">Generate Merkle Proofs for Your Web3 Project</h1>
          <p className="text-xl text-gray-300 mb-8">
            Create efficient whitelists, airdrops, and permissioned systems with Merkle proofs
          </p>
          <button
            onClick={handleNavigateToGenerator}
            className={`bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors ${
              isButtonLoading ? "opacity-75 cursor-wait" : ""
            }`}
            disabled={isButtonLoading}
          >
            {isButtonLoading ? "Connecting..." : isConnected ? "Generate Proofs" : "Connect Wallet to Generate Proofs"}
          </button>
        </div>

        {/* Benefits Section */}
        <div className="py-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-white">Why Use MerkleProofX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-[#1c2941]">
              <BoltIcon className="h-8 w-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Gas Efficient</h3>
              <p className="text-gray-300">
                Save thousands in gas fees by using Merkle proofs instead of storing full lists on-chain.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-[#1c2941]">
              <ClockIcon className="h-8 w-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Time Saving</h3>
              <p className="text-gray-300">Generate all necessary proofs in seconds, ready for your smart contract.</p>
            </div>
            <div className="p-6 rounded-lg bg-[#1c2941]">
              <ScaleIcon className="h-8 w-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Scalable</h3>
              <p className="text-gray-300">Handle thousands of addresses efficiently with Merkle tree structure.</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-white">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-[#1c2941]">
                <feature.icon className="h-8 w-8 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="py-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-white">Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="p-6 rounded-lg bg-[#1c2941]">
                <h3 className="text-xl font-semibold mb-2 text-white">{useCase.title}</h3>
                <p className="text-gray-300">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500 mb-2">1</div>
              <h3 className="font-semibold mb-2 text-white">Upload Addresses</h3>
              <p className="text-gray-300">Upload your list of eligible addresses</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500 mb-2">2</div>
              <h3 className="font-semibold mb-2 text-white">Generate Tree</h3>
              <p className="text-gray-300">We create a Merkle tree from your addresses</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500 mb-2">3</div>
              <h3 className="font-semibold mb-2 text-white">Get Root</h3>
              <p className="text-gray-300">Receive the Merkle root for your smart contract</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500 mb-2">4</div>
              <h3 className="font-semibold mb-2 text-white">Download Proofs</h3>
              <p className="text-gray-300">Get individual proofs for each address</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8">Generate your first Merkle proof in seconds</p>
          <button
            onClick={handleNavigateToGenerator}
            className={`bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors ${
              isButtonLoading ? "opacity-75 cursor-wait" : ""
            }`}
            disabled={isButtonLoading}
          >
            {isButtonLoading ? "Connecting..." : isConnected ? "Generate Proofs Now" : "Connect Wallet to Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
