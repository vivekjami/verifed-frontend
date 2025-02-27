"use client"


import { Lock, CheckCircle, Award, Users, Globe, Eye } from "lucide-react";

const features = [
  { icon: Lock, title: "Secure Proctoring", description: "Advanced AI monitoring that ensures assessment integrity while respecting privacy." },
  { icon: CheckCircle, title: "Verified Credentials", description: "Blockchain-backed credentials that cannot be tampered with or falsified." },
  { icon: Award, title: "NFT Certification", description: "Receive unique NFT certificates on the ICP blockchain upon successful verification." },
  { icon: Users, title: "User-Friendly Interface", description: "Intuitive and easy-to-use interface for seamless user experience." },
  { icon: Globe, title: "Global Access", description: "Accessible from anywhere in the world with seamless cross-border verification." },
  { icon: Eye, title: "Real-Time Monitoring", description: "AI-driven real-time monitoring to detect anomalies and prevent misconduct." },
];

export default function FeaturesSection() {

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      

      {/* Features Section */}
      <section id="features" className="py-20 container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose VerifED</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center text-center p-6 rounded-xl border bg-gray-800">
              <div className="h-12 w-12 rounded-full bg-blue-400/10 flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
