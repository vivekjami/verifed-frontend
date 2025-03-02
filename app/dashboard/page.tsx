// "use client";

// import { useState, useEffect } from "react";
// import { 
//   Shield, Wallet, LogOut,  Sun, Moon
// } from "lucide-react"; // Clock, CheckCircle, AlertCircle,BarChart3,

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Progress } from "@/components/ui/progress";
// // import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useTheme } from "next-themes"; // Dark mode support

// // Types for Wallet and Exam
// interface Wallet {
//   connected: boolean;
//   address: string;
//   balance: string;
// }

// interface Exam {
//   id: string;
//   title: string;
//   subject: string;
//   duration: number;
//   questions: number;
//   status: "upcoming" | "available" | "in-progress" | "completed" | "verified";
//   date: string;
//   verificationStatus?: "pending" | "verified" | "failed";
// }

// // Countdown Timer Hook
// const useCountdown = (targetDate: string) => {
//   const [timeLeft, setTimeLeft] = useState("");

//   useEffect(() => {
//     const updateCountdown = () => {
//       const now = new Date().getTime();
//       const target = new Date(targetDate).getTime();
//       const difference = target - now;

//       if (difference <= 0) {
//         setTimeLeft("Now");
//         return;
//       }

//       const hours = Math.floor(difference / (1000 * 60 * 60));
//       const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

//       setTimeLeft(`${hours}h ${minutes}m`);
//     };

//     updateCountdown();
//     const interval = setInterval(updateCountdown, 60000); // Update every minute
//     return () => clearInterval(interval);
//   }, [targetDate]);

//   return timeLeft;
// };

// export default function DashboardPage() {
//   const { theme, setTheme } = useTheme(); // Dark mode support
//   const [wallet, setWallet] = useState<Wallet | null>(null);
//   const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
//   const [exams, setExams] = useState<Exam[]>([
//     { id: "exam-123", title: "Introduction to Blockchain", subject: "Computer Science", duration: 120, questions: 45, status: "available", date: "2025-03-05T10:00:00.000Z" },
//     { id: "exam-124", title: "Distributed Systems", subject: "Computer Science", duration: 90, questions: 30, status: "upcoming", date: "2025-03-15T14:00:00.000Z" },
//     { id: "exam-121", title: "Cryptography Fundamentals", subject: "Computer Science", duration: 60, questions: 25, status: "completed", date: "2025-02-20T09:00:00.000Z", verificationStatus: "verified" }
//   ]);

//   const connectWallet = async () => {
//     console.log("Connecting to wallet...");
//     setTimeout(() => {
//       setWallet({ connected: true, address: "0x71C7...d8976F", balance: "1.234 ICP" });
//     }, 1000);
//   };

//   const disconnectWallet = () => {
//     setWallet(null);
//     setWalletDropdownOpen(false);
//   };

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
//       {/* Header */}
//       <header className="sticky top-0 z-10 border-b bg-white dark:bg-gray-800 shadow-md">
//         <div className="container flex h-16 items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Shield className="h-6 w-6 text-primary" />
//             <span className="text-xl font-bold dark:text-white">VerifED</span>
//           </div>
          
//           <div className="flex items-center gap-4">
//             {/* Theme Toggle */}
//             <Button variant="ghost" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
//               {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//             </Button>

//             {/* Wallet Connection */}
//             {wallet ? (
//               <div className="relative">
//                 <Button variant="outline" className="flex items-center gap-2" onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}>
//                   <Wallet className="h-4 w-4" />
//                   {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
//                 </Button>
//                 {walletDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 shadow-lg rounded-md">
//                     <div className="p-4">
//                       <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Wallet</div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">Address</div>
//                       <div className="text-sm">{wallet.address}</div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">Balance</div>
//                       <div className="text-sm">{wallet.balance}</div>
//                       <Button variant="destructive" size="sm" className="w-full mt-4" onClick={disconnectWallet}>
//                         <LogOut className="h-4 w-4" />
//                         Disconnect
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Button onClick={connectWallet}>
//                 <Wallet className="h-4 w-4" />
//                 Connect Wallet
//               </Button>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Main Dashboard Content */}
//       <main className="container py-8">
//         <h1 className="text-3xl font-bold dark:text-white mb-6">Exam Dashboard</h1>

//         <Tabs defaultValue="available">
//           <TabsList className="mb-4">
//             <TabsTrigger value="available">Available Exams</TabsTrigger>
//             <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//             <TabsTrigger value="completed">Completed</TabsTrigger>
//           </TabsList>

//           <TabsContent value="available" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {exams.filter(e => e.status === "available").map(exam => (
//               <Card key={exam.id}>
//                 <CardHeader>
//                   <CardTitle>{exam.title}</CardTitle>
//                   <CardDescription>{exam.subject}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div>Duration: {exam.duration} minutes</div>
//                   <div>Questions: {exam.questions}</div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button>Start Exam</Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </TabsContent>
//         </Tabs>
//       </main>
//     </div>
//   );
// }
