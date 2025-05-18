// components/Header.tsx
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import Logo from "./logo";

/**
 * Site header - simplified version similar to original MerkleProofX layout
 */
export const Header = () => {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const router = useRouter();

  // Protect the generate page
  useEffect(() => {
    if (pathname === "/generate" && !isConnected) {
      notification.error("Please connect your wallet to access this feature");
      router.push("/");
    }
  }, [pathname, isConnected, router]);

  return (
    <div className="navbar bg-base-200 border-b border-base-300 min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2">
      <div className="flex">
        <Link href="/" className="flex items-center">
          <div className="flex items-center space-x-2">
            {/* Logo can be replaced with your own Logo component */}
            {/* <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-bold">MerkleProofX</span> */}
            <Logo className="w-8 h-8" />
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};

export default Header;
