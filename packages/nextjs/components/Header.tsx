// components/Header.tsx
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Logo from "./logo";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

/**
 * Site header - simplified version similar to original MerkleProofX layout
 */
export const Header = () => {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const router = useRouter();

  // Protect protected pages
  useEffect(() => {
    if ((pathname === "/merkleproofgenerator" || pathname === "/merklevalidator") && !isConnected) {
      notification.error("Please connect your wallet to access this feature");
      router.push("/");
    }
  }, [pathname, isConnected, router]);

  // Function to determine if a nav link is active
  const isActive = (path: string) => {
    if (pathname === path) {
      // Use a lighter background with higher contrast text for active state
      return "bg-purple-900/40 text-white font-medium border border-purple-500/50";
    }
    return "hover:bg-base-300 text-gray-200"; // Default state
  };

  // Custom navigation handler for protected routes
  const handleProtectedNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault(); // Always prevent default navigation

    if (!isConnected) {
      notification.warning("Please connect your wallet to access this feature");
      return false;
    }

    // If connected, manually navigate
    router.push(path);
    return true;
  };

  return (
    <div className="navbar bg-[#121d33] border-b border-[#283450] min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2">
      {/* Logo */}
      <div className="flex-none">
        <Link
          href="/"
          className="flex items-center"
          onClick={e => {
            e.stopPropagation();
            router.push("/");
          }}
        >
          <div className="flex items-center space-x-2">
            <Logo className="w-8 h-8 pointer-events-none" />
            <span className="text-xl font-bold text-white hidden sm:inline">MerkleProofX</span>
          </div>
        </Link>
      </div>

      {/* Center Navigation - Desktop */}
      <div className="flex-1 justify-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <button
              className={`px-4 py-2 rounded-lg text-sm transition-colors text-left ${isActive("/merkleproofgenerator")} ${!isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={e => handleProtectedNavigation(e, "/merkleproofgenerator")}
              disabled={!isConnected}
            >
              Generate Proofs
            </button>
          </li>
          <li>
            <button
              className={`px-4 py-2 rounded-lg text-sm transition-colors text-left ${isActive("/merklevalidator")} ${!isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={e => handleProtectedNavigation(e, "/merklevalidator")}
              disabled={!isConnected}
            >
              Validate Proofs
            </button>
          </li>
        </ul>
      </div>

      {/* Center Navigation - Mobile */}
      <div className="flex-1 justify-center md:hidden">
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm text-white">
            {pathname === "/"
              ? "Select Feature"
              : pathname === "/merkleproofgenerator"
                ? "Generate Proofs"
                : pathname === "/merklevalidator"
                  ? "Validate Proofs"
                  : "Menu"}
            <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#1c2941] rounded-box w-52 mt-1">
            <li className={!isConnected ? "disabled opacity-50" : ""}>
              <button
                className={`${pathname === "/merkleproofgenerator" ? "bg-purple-900/40 text-white" : "text-gray-200"}`}
                onClick={e => handleProtectedNavigation(e, "/merkleproofgenerator")}
                disabled={!isConnected}
              >
                Generate Proofs
              </button>
            </li>
            <li className={!isConnected ? "disabled opacity-50" : ""}>
              <button
                className={`${pathname === "/merklevalidator" ? "bg-purple-900/40 text-white" : "text-gray-200"}`}
                onClick={e => handleProtectedNavigation(e, "/merklevalidator")}
                disabled={!isConnected}
              >
                Validate Proofs
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-none flex items-center space-x-4">
        <ThemeToggle />
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};

export default Header;
