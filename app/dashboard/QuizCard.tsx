"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface QuizProps {
  examName: string;
  examDescription: string;
}

export default function QuizCard({ examName, examDescription }: QuizProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const router = useRouter();

  const handleStartQuiz = () => {
    // Optionally, you could store exam details here if needed.
    router.push("/quiz");
  };

  return (
    <div className="max-w-md mx-auto bg-blue-900 rounded-xl shadow-md p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">{examName}</h2>
      <p className="text-blue-200 mb-4">{examDescription}</p>
      {!showInstructions ? (
        <Button
          onClick={() => setShowInstructions(true)}
          className="bg-blue-500 hover:bg-blue-700"
        >
          Start Quiz
        </Button>
      ) : (
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Instructions</h3>
            <p className="text-blue-200">
              You have 15 minutes to complete this quiz exam. Each correct answer awards marks based on difficulty:
              Easy = 1 mark, Medium = 2 marks, Hard = 3 marks.
            </p>
          </div>
          <Button
            onClick={handleStartQuiz}
            className="bg-blue-500 hover:bg-blue-700"
          >
            Begin Exam
          </Button>
        </div>
      )}
    </div>
  );
}
