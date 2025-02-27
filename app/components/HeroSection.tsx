"use client"
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = Math.max(window.innerHeight * 0.8, 600); // Min height to ensure content fits
      }
    };
    
    resizeCanvas();

    const particles: Particle[] = [];
    const particleCount = 90;
    const connectionDistance = 170;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: Math.random() > 0.5 ? "#3b82f6" : "#1e3a8a"
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const particle2 = particles[j];
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        }
      });
    };

    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-black to-slate-900"
      />
      
      <div className="container relative z-10 py-16 md:py-20 lg:py-24 flex flex-col items-center justify-center text-center">
        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6 backdrop-blur-sm">
          Decentralized Verification
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-white">
          Secure AI Proctoring with <br className="hidden sm:block" />
          <span className="text-secondary">Blockchain Verification</span>
        </h1>
        <p className="max-w-[700px] text-blue-100/80 text-base sm:text-lg mb-8 px-4">
          VerifED combines advanced AI proctoring with ICP blockchain technology to provide secure, tamper-proof
          verification for online assessments.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4">
          <Link href="/dashboard">
          <Button size="lg" className="px-8 bg-blue-700 hover:bg-blue-900 w-full sm:w-auto">
            Get Started
          </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-blue-400 text-black hover:bg-blue-900/30 w-full sm:w-auto">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}