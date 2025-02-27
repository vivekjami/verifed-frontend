"use client"

import { Shield, Mail, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-blue-800 bg-blue-950 text-white py-8">
      <div className="max-w-7xl mx-auto flex flex-col space-y-6 px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-semibold">VerifED</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="flex items-center gap-2 text-sm text-blue-300 hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-blue-300 hover:text-white transition-colors">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-blue-300 hover:text-white transition-colors">
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          <div>
            <h4 className="font-medium text-blue-300 mb-3">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">How it works</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-300 mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-300 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© 2025 VerifED. All rights reserved.</p>
          <p className="text-xs text-gray-500">Designed with care for educational verification</p>
        </div>
      </div>
    </footer>
  );
}
