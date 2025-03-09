"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Ensure this component exists

export default function ResultPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [cheatCounter, setCheatCounter] = useState<number>(0);
  const [resultStatus, setResultStatus] = useState<string>("");
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    // Retrieve stored values
    const storedWallet = sessionStorage.getItem("walletAddress");
    const storedScore = Number(sessionStorage.getItem("quizScore")) || 0;
    const storedCheatCounter = Number(sessionStorage.getItem("cheatCounter")) || 0;
    const totalMarks = 30; // Adjust if needed

    setWalletAddress(storedWallet);
    setScore(storedScore);
    
    setCheatCounter(storedCheatCounter);

    // Determine Pass/Fail
    const passThreshold = totalMarks * 0.5;
    if (storedScore >= passThreshold && storedCheatCounter < 70) {
      setResultStatus("Pass 🎉");
    } else {
      setResultStatus("Fail ❌");
    }

    // Set current timestamp
    const now = new Date();
    setTimestamp(now.toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" }));
  }, []);

  return (
    <div className="min-h-screen bg-blue-950 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Exam Result</h1>
      <div className="bg-blue-900 rounded-xl p-6 shadow-md text-center w-full max-w-md">
        
        {/* Wallet Address Display */}
        {walletAddress && (
          <p className="text-md text-blue-300 mb-4">
            <span className="font-semibold">Wallet Address:</span> {walletAddress}
          </p>
        )}

        {/* Result Details */}
        <p className="text-xl">Total Marks: <span className="font-bold">{score}</span></p>
        <p className="text-xl">Cheat Counter: <span className="font-bold">{cheatCounter}</span></p>
        <p className="text-xl">
          Result Status:{" "}
          <span className={`font-bold ${resultStatus === "Pass 🎉" ? "text-green-400" : "text-red-400"}`}>
            {resultStatus}
          </span>
        </p>
        <p className="text-sm text-blue-200 mt-4">Date & Time: {timestamp}</p>

        {/* Static Mint NFT Button */}
        <Button
          className="mt-6 bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded"
          onClick={() => alert("Minting feature coming soon!")}
        >
          Mint NFT
        </Button>
      </div>
    </div>
  );
}
