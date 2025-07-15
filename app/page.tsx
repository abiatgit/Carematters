"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rabbit, CheckCircle, Shield, Users, Brain, TrendingUp, Zap, Eye, AlertTriangle, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 font-semibold text-xl text-slate-900 hover:text-green-700 transition-colors"
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <Rabbit className="text-green-700 w-6 h-6" />
              </div>
              Care Matters
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Button variant="ghost" asChild>
                <a href="#problem" className="text-slate-600 hover:text-slate-900">The Problem</a>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="#solution" className="text-slate-600 hover:text-slate-900">AI Solution</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="#predictions" className="text-slate-600 hover:text-slate-900">Predictions</Link>
              </Button>
              <Link href="/auth/sign-in">
                <Button variant="outline" className="border-slate-300">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-green-700 hover:bg-green-800">
                  See AI in Action
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="flex flex-col items-center text-center space-y-12">
          <div className="space-y-6">
            <Badge className="px-4 py-2 bg-green-50 text-green-700 border-green-200 text-sm font-medium">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered Predictive Intelligence
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 max-w-6xl">
              Turn Your Care Facility Into a{" "}
              <span className="text-green-700  relative">
                Predictive, Intelligent
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-200 rounded-full" />
              </span>{" "}
              Operation
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-slate-600 max-w-4xl mx-auto">
              AI-powered insights that predict, prevent, and optimize care before problems arise. 
              Transform from reactive crisis management to intelligent, data-driven operations.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 px-8 py-6 text-lg font-semibold shadow-lg">
                See AI in Action
                <Eye className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/sign-in">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold border-slate-300">
                Get Predictive Insights
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-slate-500 mt-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>Reactive → Proactive</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-green-600" />
              <span>Guesswork → Intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-600" />
              <span>Manual → Automated</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              The Problem with Traditional Care Management
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Most healthcare facilities are stuck in reactive mode, constantly responding to crises instead of preventing them.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="w-16 h-16  rounded-2xl flex items-center justify-center bg-green-50 mb-4">
                <AlertTriangle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Reactive Crisis Management</h3>
              <p className="text-slate-600">
                Always putting out fires instead of preventing them. Problems escalate before anyone notices.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Manual Reporting</h3>
              <p className="text-slate-600">
                Hours spent on paperwork that could be automated. Data analysis happens too late to be useful.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Missed Warning Signs</h3>
              <p className="text-slate-600">
                Critical patterns go unnoticed until it&apos;s too late. Early intervention opportunities are lost.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Inefficient Resources</h3>
              <p className="text-slate-600">
                Guesswork-based staffing and resource allocation leads to waste and burnout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Solution Section */}
      <section id="solution" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            AI-Powered Predictive Intelligence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transform your facility into a proactive, intelligent operation that prevents problems before they happen.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Real-time Health Analysis</h3>
              <p className="text-slate-600">
                AI continuously monitors resident health patterns and identifies trends before they become critical.
              </p>
            </div>
            
            <div className=" rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Pgreenictive Risk Assessment</h3>
              <p className="text-slate-600">
                Advanced algorithms pgreenict potential health risks and complications days or weeks in advance.
              </p>
            </div>
            
            <div className=" rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Intelligent Optimization</h3>
              <p className="text-slate-600">
                AI optimizes staffing, resources, and workflows based on predicted needs and patterns.
              </p>
            </div>
            
            <div className=" rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Automated Compliance</h3>
              <p className="text-slate-600">
                Continuous monitoring ensures regulatory compliance and prevents violations before they occur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-slate-50 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-700">
            Experience Predictive Care Intelligence
          </h2>
          <p className="text-xl  max-w-3xl mx-auto mb-12 text-slate-700">
            Transform your operations today. See how AI-powered predictive intelligence prevents problems before they happen and optimizes care delivery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 px-8 py-6 text-lg font-semibold">
                See AI Predictions Demo
                <Eye className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/sign-in">
              <Button size="lg" variant="outline" className="px-8  py-6 text-lg font-semibold border-slate-600 text-slate-700 hover:bg-slate-800">
                Transform Your Operations Today
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-center items-center gap-6 text-sm text-slate-400 mt-8">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-green-400" />
              <span>AI-powered predictions</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span>Proactive care delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-400" />
              <span>Automated intelligence</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-green-100 rounded-lg">
                <Rabbit className="text-green-700 w-6 h-6" />
              </div>
              <span className="font-semibold text-xl text-slate-900">Care Matters</span>
            </div>
            <div className="text-slate-600 text-sm">
              © 2024 CareMatters. All rights reserved. | AI-Powered Predictive Care Intelligence
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}