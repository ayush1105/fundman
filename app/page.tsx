"use client";

import {
  Laptop,
  FlaskConical,
  Sofa,
  BookOpen,
  Package,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

/* ✅ ADD THIS (MISSING) */
const categories = [
  { name: "IT Equipment", icon: Laptop },
  { name: "Lab Equipment", icon: FlaskConical },
  { name: "Furniture", icon: Sofa },
  { name: "Books & Academic", icon: BookOpen },
  { name: "Office Supplies", icon: Package },
  { name: "Services", icon: Briefcase },
];

export default function Home() {
  return (
    <main className="bg-white text-gray-900">

      {/* NAVBAR */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">

          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="FundMan Logo"
              className="h-16 md:h-20 w-auto object-contain"
            />

            <div className="leading-tight">
              <h1 className="text-base font-semibold text-gray-900">
                FundMan
              </h1>
              <p className="text-xs text-gray-500">
                Spend Smarter
              </p>
            </div>
          </Link>

          {/* ✅ FIXED (Link instead of <a>) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/#categories" className="hover:text-blue-600 transition">Categories</Link>
            <Link href="/quote" className="hover:text-blue-600 transition">Request</Link>
            <Link href="/login" className="hover:text-blue-600 transition">Admin</Link>
            <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
            <Link
    href="/vendor/register"
    className="border border-blue-600 text-blue-600 px-5 py-2 rounded-xl font-medium hover:bg-blue-50 transition"
  >
    Become a Vendor
  </Link>

  <Link
    href="/login"
    className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
  >
    Login
  </Link>
          </div>

        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">

  {/* BACKGROUND GLOW */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-100 rounded-full blur-3xl opacity-40 -z-10" />

  <div className="max-w-7xl mx-auto px-6 py-24">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* LEFT CONTENT */}
      <div>

        {/* TAG */}
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-100">
          <span className="w-2 h-2 bg-blue-500 rounded-full" />
          Transparent Procurement Platform
        </div>

        {/* HEADLINE */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">

          Spend Smarter.
          <br />

          <span className="text-blue-600">
            Procure With Transparency.
          </span>

        </h1>

        {/* DESCRIPTION */}
        <p className="text-lg text-gray-600 mt-8 leading-relaxed max-w-xl">

          FundMan helps institutions and organizations simplify procurement
          through verified vendors, transparent pricing, and smarter decision-making.

        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4 mt-10">

          <a href="/quote">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-medium shadow-lg shadow-blue-200 transition">
              Request a Quote
            </button>
          </a>

          <a href="/contact">
            <button className="bg-white border border-gray-200 hover:border-blue-300 px-8 py-4 rounded-2xl font-medium transition">
              Contact Us
            </button>
          </a>

        </div>

        {/* STATS */}
        <div className="flex gap-10 mt-14">

          <div>
            <h3 className="text-3xl font-bold text-gray-900">100+</h3>
            <p className="text-gray-500 text-sm mt-1">
              Verified Vendors
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-gray-900">500+</h3>
            <p className="text-gray-500 text-sm mt-1">
              Requests Managed
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-gray-900">99%</h3>
            <p className="text-gray-500 text-sm mt-1">
              Transparent Process
            </p>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="relative">

        {/* CARD BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white rounded-[40px] rotate-3 scale-105 opacity-70" />

        {/* MAIN CARD */}
        <div className="relative bg-white border border-gray-200 rounded-[40px] p-10 shadow-2xl">

          <img
            src="/hero.png"
            alt="FundMan Illustration"
            className="w-full"
          />

        </div>

      </div>

    </div>

  </div>

</section>

<section className="max-w-6xl mx-auto px-6 py-24">

  <h2 className="text-3xl font-semibold text-center mb-12">
    Why Choose FundMan
  </h2>

  {/* 🔥 IMPROVED TRANSPARENCY STRIP */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6">

          {[
            "Clear Vendor Selection",
            "No Hidden Costs",
            "Open Communication",
            "Full Transparency",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <CheckCircle className="mx-auto text-blue-600 mb-3" />
              <p className="font-medium text-gray-800">{item}</p>
            </div>
          ))}

        </div>

</section>

      <section className="bg-gray-50 py-20">

  <div className="max-w-6xl mx-auto px-6 text-center">

    <p className="text-sm uppercase tracking-wider text-blue-600 font-medium mb-4">
      Trusted Procurement Platform
    </p>

    <h2 className="text-3xl font-semibold text-gray-900 mb-6">
      Trusted by Institutions & Organizations
    </h2>

    <p className="text-gray-500 max-w-2xl mx-auto mb-12">
      Helping organizations simplify procurement with transparency,
      accountability, and verified vendor access.
    </p>

    {/*<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        "University A",
        "Institute B",
        "Organization C",
        "College D",
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl py-6 border border-gray-200 shadow-sm text-gray-700 font-medium"
        >
          {item}
        </div>
      ))}
    </div>*/}

  </div>

</section>



<section className="max-w-7xl mx-auto px-6 py-24">

  <div className="text-center mb-16">
    <h2 className="text-4xl font-semibold">
      What Organizations Say
    </h2>

    <p className="text-gray-500 mt-4">
      Real feedback from institutions using FundMan.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8">

    {[
      {
        name: "Rahul Sharma",
        role: "Procurement Head",
        text: "FundMan helped us streamline vendor comparison and improve transparency across purchases.",
      },
      {
        name: "Ananya Verma",
        role: "Finance Manager",
        text: "The platform made procurement decisions faster and more accountable.",
      },
      {
        name: "Amit Patel",
        role: "Operations Lead",
        text: "A clean and transparent process that saved both time and operational effort.",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition"
      >

        <div className="flex items-center gap-4 mb-6">

          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
            {item.name[0]}
          </div>

          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.role}</p>
          </div>

        </div>

        <p className="text-gray-600 leading-relaxed">
          "{item.text}"
        </p>

      </div>
    ))}

  </div>

</section>
      

      {/* CATEGORIES */}
      <section id="categories" className="max-w-6xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-semibold mb-14 text-center tracking-tight">
          What We Help You Procure
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, i) => {
            const Icon = cat.icon;

            return (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl mb-4">
                  <Icon size={24} />
                </div>

                <h3 className="text-lg font-semibold mb-2">{cat.name}</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Transparent sourcing and verified vendor options
                </p>

                {/* ✅ FIXED */}
                <Link href="/quote" className="text-blue-600 font-medium">
                  Request Quote →
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-24">
  <div className="max-w-5xl mx-auto text-center px-6">

    <h2 className="text-3xl font-semibold mb-12">
      How FundMan Works
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      {[
        {
          title: "Submit Requirement",
          desc: "Tell us what you need across categories",
        },
        {
          title: "Compare Vendors",
          desc: "We provide transparent options from verified vendors",
        },
        {
          title: "Make Smart Decision",
          desc: "Choose based on clarity, pricing, and trust",
        },
      ].map((step, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="text-blue-600 font-bold text-xl mb-2">
            {i + 1}
          </div>
          <h3 className="font-semibold mb-2">{step.title}</h3>
          <p className="text-gray-500 text-sm">{step.desc}</p>
        </div>
      ))}

    </div>
  </div>
</section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-24">

  <h2 className="text-4xl font-semibold mb-4">
    Start Procuring Smarter Today
  </h2>

  <p className="mb-8 text-blue-100">
    Get transparent quotes and make confident decisions
  </p>

  <a href="/quote">
    <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
      Request a Quote
    </button>
  </a>

</section>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-10 text-center text-gray-600">
        © 2026 FundMan. All rights reserved.
      </footer>

    </main>
  );
}