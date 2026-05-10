"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setSubmitted(true);

      setForm({
        name: "",
        email: "",
        message: "",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold mb-4">
        Contact Us
      </h1>

      <p className="text-gray-600 mb-10">
        Have questions or need help? Reach out to us and we’ll get back to you.
      </p>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT: INFO */}
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">Email</h2>
            <p className="text-gray-600">fundman1105@gmail.com</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Phone</h2>
            <p className="text-gray-600">+91 9873912233</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Officer City-2 Ghaziabad</h2>
            <p className="text-gray-600">
              FundMan<br />
              India
            </p>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          {submitted ? (
            <p className="text-green-600">
              Message sent successfully ✅
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 h-32"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full"
              >
                Send Message
              </button>

            </form>
          )}

        </div>

      </div>
    </main>
  );
}