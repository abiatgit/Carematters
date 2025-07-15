"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoveRight, Rabbit, CheckCircle, Shield, Users, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 font-semibold text-xl text-gray-900 hover:text-green-700 transition-colors"
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <Rabbit className="text-green-700 w-6 h-6" />
              </div>
              Care Matters
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Button variant="ghost" asChild>
                <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="#support" className="text-gray-600 hover:text-gray-900">Support</Link>
              </Button>
              <Link href="/auth/sign-in">
                <Button variant="outline" className="border-gray-300">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-green-700 hover:bg-green-800">
                  Start Free Trial
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
              <CheckCircle className="w-4 h-4 mr-2" />
              Focus on what really matters
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 max-w-5xl">
              You care for others.
              <br />
              We care for your{" "}
              <span className="text-green-700 relative">
                workflow
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-200 rounded-full" />
              </span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
              Running a care home is already challenging. Don&apos;t let outdated systems slow you down. 
              CareMatters simplifies care management, empowering teams to deliver better care with less hassle.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 px-8 py-6 text-lg font-semibold shadow-lg">
                Start Free Trial
                <MoveRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/sign-in">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold border-gray-300">
                Sign In
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mt-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Free 30-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Setup in 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="container mx-auto px-6 py-16">
        <div className="relative">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 shadow-xl">
            <Image 
              src="/cm.png" 
              alt="CareMatters Dashboard Preview" 
              width={1200} 
              height={600} 
              className="rounded-lg shadow-2xl border border-gray-200"
            />
          </div>
          <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
            <Shield className="w-8 h-8 text-green-700" />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simplified Care Home Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline daily operations with intuitive tools designed for care staff. From resident care plans to medication tracking, our AI-assisted workflows keep your team coordinated and residents safe.
            </p>
          </div>
          
          <div className="grid gap-12 md:grid-cols-3">
            <div className="group text-center">
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors">
                  <Users className="w-10 h-10 text-green-700" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Resident Care Plans</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Easily create, update, and share personalized care plans to ensure every resident receives the attention they need.
              </p>
            </div>
            
            <div className="group text-center">
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors">
                  <Shield className="w-10 h-10 text-green-700" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Medication Management</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Track medication schedules and alerts to reduce errors and improve resident health outcomes.
              </p>
            </div>
            
            <div className="group text-center">
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors">
                  <Calendar className="w-10 h-10 text-green-700" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Staff Coordination</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Manage shifts, assign tasks, and communicate seamlessly across your care team to maintain smooth operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Care Professionals
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of care teams who trust CareMatters for their daily operations
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-5xl font-bold text-green-700 mb-2">150+</div>
              <p className="text-gray-600 text-lg font-medium">Care Homes Managed</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-5xl font-bold text-green-700 mb-2">98%</div>
              <p className="text-gray-600 text-lg font-medium">Resident Satisfaction Rate</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-5xl font-bold text-green-700 mb-2">1200+</div>
              <p className="text-gray-600 text-lg font-medium">Daily Tasks Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="about" className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Care Home?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Join the growing community of care professionals who have simplified their workflow with CareMatters. 
            Start your free trial today and experience the difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 px-8 py-6 text-lg font-semibold">
                Start Free Trial
                <MoveRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/sign-in">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold border-gray-600 text-gray-300 hover:bg-gray-800">
                Sign In
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-center items-center gap-6 text-sm text-gray-400 mt-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Free 30-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>24/7 support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="support" className="border-t border-gray-200 py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-green-100 rounded-lg">
                <Rabbit className="text-green-700 w-6 h-6" />
              </div>
              <span className="font-semibold text-xl text-gray-900">Care Matters</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2024 CareMatters. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
