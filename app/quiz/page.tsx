"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import questionsData from "../questions/basic-aptitude.json";

interface Question {
  questionNumber: number;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const getMarkForDifficulty = (difficulty: string): number => {
  if (difficulty === "Easy") return 1;
  if (difficulty === "Medium") return 2;
  if (difficulty === "Hard") return 3;
  return 0;
};

export default function QuizExam() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  interface Response {
    questionNumber: number;
    selectedAnswer: string;
    correct: boolean;
    obtainedMarks: number;
  }

  const [responses, setResponses] = useState<Response[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 minutes = 900 seconds
  const questions: Question[] = questionsData.map((q) => ({
    ...q,
    difficulty: q.difficulty as "Easy" | "Medium" | "Hard",
  }));

  // Retrieve wallet address from sessionStorage
  useEffect(() => {
    const storedWallet = sessionStorage.getItem("walletAddress");
    if (!storedWallet) {
      alert("Wallet not found. Please connect your wallet.");
      router.push("/");
    } else {
      setWalletAddress(storedWallet);
    }
  }, [router]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitQuiz();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      let questionScore = 0;
      if (selectedOption === currentQuestion.correctAnswer) {
        questionScore = getMarkForDifficulty(currentQuestion.difficulty);
      }
      setScore((prev) => prev + questionScore);
      setResponses((prev) => [
        ...prev,
        {
          questionNumber: currentQuestion.questionNumber,
          selectedAnswer: selectedOption,
          correct: selectedOption === currentQuestion.correctAnswer,
          obtainedMarks: questionScore,
        },
      ]);
    }
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    // Store final results (responses and score) in sessionStorage.
    sessionStorage.setItem("quizScore", score.toString());
    sessionStorage.setItem("quizResponses", JSON.stringify(responses));
    alert(`Quiz submitted! Your score: ${score}`);
    router.push("/");
  };

  // Format timer as MM:SS
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-blue-950 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Quiz Exam</h1>
          {walletAddress && (
            <p className="text-sm">
              Wallet: {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
            </p>
          )}
        </div>
        <div className="text-lg font-mono">{formatTime(timeLeft)}</div>
      </div>
      <div className="bg-blue-900 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Question {currentQuestion.questionNumber}
        </h2>
        <p className="mb-4">{currentQuestion.question}</p>
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`px-4 py-2 border rounded transition ${
                selectedOption === option
                  ? "bg-blue-500 border-blue-700"
                  : "bg-blue-800 border-blue-600 hover:bg-blue-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
          className={`px-6 py-2 rounded ${
            selectedOption
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-blue-400 cursor-not-allowed"
          }`}
        >
          {currentQuestionIndex === questions.length - 1
            ? "Submit Quiz"
            : "Next"}
        </button>
      </div>
      <div className="mt-4">
        <p>
          Score: {score} | Question {currentQuestionIndex + 1} of{" "}
          {questions.length}
        </p>
      </div>
    </div>
  );
}
