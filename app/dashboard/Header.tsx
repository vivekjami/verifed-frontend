"use client";
import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const getProvider = () => {
    if (typeof window !== "undefined" && "solana" in window) {
      const provider = (window as unknown as { solana?: { isPhantom?: boolean; connect?: () => Promise<{ publicKey: { toString: () => string } }> } }).solana;
      if (provider?.isPhantom) {
        return provider;
      }
    }
    return null;
  };

  const connectWallet = async () => {
    const provider = getProvider();
    if (!provider) {
      alert("Phantom wallet not found. Please install it.");
      return;
    }
    try {
      if (provider.connect) {
        const resp = await provider.connect();
        const address = resp.publicKey.toString();
        setWalletAddress(address);
        sessionStorage.setItem("walletAddress", address);
      } else {
        throw new Error("Provider connect method is undefined");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    const provider = getProvider();
    try {
      if (provider) {
        // Phantom wallet does not have a disconnect method, so we just clear the wallet address
      }
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
    setWalletAddress(null);
    sessionStorage.removeItem("walletAddress");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-blue-900 shadow-md">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-blue-400" />
        <span className="text-xl font-bold text-white">VerifED</span>
      </div>
      <div className="flex items-center gap-4">
        {walletAddress ? (
          <>
            <span className="text-white bg-blue-700 px-3 py-1 rounded">
              {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
            </span>
            <Button
              onClick={disconnectWallet}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
}
