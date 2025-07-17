"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rabbit, CheckCircle, Shield, Users, Brain, TrendingUp, Zap, Eye, Heart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
      
      {/* Minimal Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-sm text-gray-900 hover:text-green-600 transition-colors"
            >
              <div className="p-1.5 bg-green-50 rounded-md">
                <Rabbit className="text-green-600 w-4 h-4" />
              </div>
              CareO
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/auth/sign-in">
                <Button variant="ghost" size="sm" className="text-xs text-gray-600 hover:text-green-600">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs px-4 py-2">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <Badge className="px-3 py-1 bg-green-50 text-green-700 border-green-200 text-xs font-medium">
            <Brain className="w-3 h-3 mr-1" />
            AI-Powered Care Intelligence
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
            Turn Your Care Facility Into a{" "}
            <span className="text-green-600">Predictive, Intelligent</span>{" "}
            Operation
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            AI-powered insights that predict, prevent, and optimize care before problems arise. 
            Transform from reactive management to intelligent operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 items-center pt-4">
            <Link href="/auth/sign-up">
              <Button className="bg-green-600 hover:bg-green-700 px-6 py-2 text-sm font-medium">
                See AI in Action
                <Eye className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/sign-in">
              <Button variant="outline" className="px-6 py-2 text-sm font-medium border-gray-200 text-gray-700 hover:bg-gray-50">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
              Intelligent Care Management
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Transform your facility with AI-powered predictive intelligence that prevents problems before they happen.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-5 border border-gray-100">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Real-time Analysis</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                AI continuously monitors resident health patterns and identifies trends before they become critical.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-100">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Predictive Risk</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Advanced algorithms predict potential health risks and complications days or weeks in advance.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-100">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Smart Optimization</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                AI optimizes staffing, resources, and workflows based on predicted needs and patterns.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-100">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Auto Compliance</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Continuous monitoring ensures regulatory compliance and prevents violations before they occur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Experience Predictive Care Intelligence
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Transform your operations today. See how AI-powered predictive intelligence prevents problems before they happen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
              <Link href="/auth/sign-up">
                <Button className="bg-green-600 hover:bg-green-700 px-6 py-2 text-sm font-medium">
                  Start Free Trial
                  <Heart className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/auth/sign-in">
                <Button variant="outline" className="px-6 py-2 text-sm font-medium border-gray-200 text-gray-700 hover:bg-gray-50">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-3 md:mb-0">
              <div className="p-1.5 bg-green-50 rounded-md">
                <Rabbit className="text-green-600 w-4 h-4" />
              </div>
              <span className="font-medium text-sm text-gray-900">CareO</span>
            </div>
            <div className="text-gray-500 text-xs">
              © 2024 CareO. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}