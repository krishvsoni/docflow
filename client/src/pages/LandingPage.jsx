"use client"

import { ArrowRight, CheckCircle, Edit3, FileText, HardDrive, Lock, Mail } from "lucide-react";
import Navbar from "../components/Navbar";

export default function HomePage() {




  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col">


      <section className="relative bg-gradient-to-br from-[#f8faff] to-[#edf5ff] py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#e8f0fe] text-[#1a73e8] text-sm font-medium">
                <span>DocFlow integrated with Google Drive</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Write letters that <span className="text-[#1a73e8]">matter</span>, save them where it{" "}
                <span className="text-[#34a853]">counts</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Create, edit, and store your important letters directly to Google Drive with our intuitive letter
                writing platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://docflow-bncjgqaya5gtfwb0.eastasia-01.azurewebsites.net/auth/google"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#1a73e8] hover:bg-[#1558b3] text-white rounded-md transition-colors text-lg font-medium"
                >
                  Start Writing Now 
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>

              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1a73e8]/10 to-[#34a853]/10 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-gray-200 transform -rotate-2">
                <div className="bg-[#f8faff] p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#ea4335]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#fbbc05]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#34a853]"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <div className="h-8 w-24 bg-[#1a73e8] rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-[#1a73e8] to-[#34a853] rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to streamline your letter writing?</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Join thousands of users who trust LetterDrive for their important correspondence. Sign up today and get
                your first month free!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://docflow-bncjgqaya5gtfwb0.eastasia-01.azurewebsites.net/auth/google"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#1a73e8] hover:bg-opacity-90 rounded-md transition-colors text-lg font-medium"
                >
                  Sign Up Free
                </a>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-[#f8faff]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Effortless Letter Writing
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create, manage, and store your important correspondence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#e8f0fe] rounded-lg flex items-center justify-center mb-6">
                <Edit3 className="h-6 w-6 text-[#1a73e8]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Intuitive Letter Editor</h3>
              <p className="text-gray-600 mb-4">
                Write and format your letters with our clean, distraction-free editor.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#34a853] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Rich text formatting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#34a853] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Auto-save functionality</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#34a853] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Multiple templates</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#e8f0fe] rounded-lg flex items-center justify-center mb-6">
                <HardDrive className="h-6 w-6 text-[#1a73e8]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Google Drive Integration</h3>
              <p className="text-gray-600 mb-4">Save your letters directly to Google Drive in Google Docs format.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#34a853] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">One-click Google Drive save</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#34a853] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Google Docs format support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#34a853] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Access letters from any device</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#e8f0fe] rounded-lg flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-[#1a73e8]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Draft Management</h3>
              <p className="text-gray-600 mb-4">Save drafts locally before finalizing and uploading to Google Drive.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#34a853] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Unlimited drafts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#34a853] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Version history</span>
                </li>
                
              </ul>
            </div>

            
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-6 w-6 text-[#1a73e8]" />
                <span className="text-xl font-bold">DocFlow</span>
              </div>
              <p className="text-gray-400 mb-4">
                The easiest way to write and store your important letters with Google Drive integration.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} DocFlow. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm mr-4">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
