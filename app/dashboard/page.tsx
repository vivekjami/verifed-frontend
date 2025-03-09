"use client";
import Header from "./Header";
import QuizCard from "./QuizCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-950 transition-all">
      <Header />
      <main className="flex items-center justify-center p-8">
        <QuizCard 
          examName="Basic Apptitude Questions" 
          examDescription="Test your knowledge on basic apptitude questions." 
        />
      </main>
    </div>
  );
}
