"use client";

import { useState } from "react";


type FormData = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  category: string;
  requirement: string;
  quantity: string;
};

export default function QuotePage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    organization: "",
    email: "",
    phone: "",
    category: "",
    requirement: "",
    quantity: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Something went wrong");
      return;
    }

    setSubmitted(true);
  } catch (error) {
    console.error(error);
    alert("Network error");
  }
};

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">
        Request a Quote
      </h1>

      <p className="text-gray-600 mb-10">
        Tell us what you need. We’ll connect you with verified vendors
        in a transparent and efficient way.
      </p>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
          <h2 className="text-green-700 font-medium">
            Request submitted successfully ✅
          </h2>
          <p className="text-green-600 text-sm mt-2">
            Our team will contact you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          {/* Organization */}
          <input
            type="text"
            name="organization"
            placeholder="Organization Name"
            value={form.organization}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Category</option>
            <option>IT Equipment</option>
            <option>Lab Equipment</option>
            <option>Furniture</option>
            <option>Books & Academic</option>
            <option>Office Supplies</option>
            <option>Services</option>
          </select>

          {/* Requirement */}
          <textarea
            name="requirement"
            placeholder="Describe your requirement"
            value={form.requirement}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 h-32"
          />

          {/* Quantity */}
          <input
            type="text"
            name="quantity"
            placeholder="Quantity (optional)"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-xl w-full"
          >
            Submit Request
          </button>

        </form>
      )}
    </main>
  );
}