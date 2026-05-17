"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VendorRegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    companyName: "",
    email: "",
    password: "",
    phone: "",
    gstNumber: "",
    address: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/vendor/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Vendor registered successfully");

        router.push("/login");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-10 border">

        <h1 className="text-4xl font-bold mb-2">
          Vendor Registration
        </h1>

        <p className="text-gray-500 mb-8">
          Join FundMan procurement ecosystem
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Business Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-4"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-4"
          />

          <input
            type="text"
            name="gstNumber"
            placeholder="GST Number"
            value={form.gstNumber}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
          />

          <input
            type="text"
            name="address"
            placeholder="Business Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
          />

          <input
            type="text"
            name="category"
            placeholder="Procurement Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"
          >
            {loading ? "Creating Account..." : "Register Vendor"}
          </button>

        </form>
      </div>
    </main>
  );
}