"use client";

import { useEffect, useState } from "react";

type Request = {
  id: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  category: string;
  requirement: string;
  quantity?: string;
  status?: string;
};

export default function AdminPage() {
  const [data, setData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selected, setSelected] = useState<Request | null>(null);

  // FETCH DATA
  useEffect(() => {
    fetch("/api/quote")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data || []);
        setLoading(false);
      });
  }, []);

  // STATS
  const total = data.length;
  const pending = data.filter((d) => !d.status || d.status === "PENDING").length;
  const approved = data.filter((d) => d.status === "APPROVED").length;
  const rejected = data.filter((d) => d.status === "REJECTED").length;

  // 🔍 FILTER LOGIC
  const filteredData = data.filter((item) => {
    const matchesSearch =
      (item.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.organization || "").toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "ALL" || item.status === filter;

    return matchesSearch && matchesFilter;
  });

  // 🔄 UPDATE STATUS
  const updateStatus = async (id: string, status: string) => {
  await fetch(`/api/quote/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  // update UI
  setData((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, status } : item
    )
  );
};
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold mb-8">
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Requests" value={total} />
        <StatCard title="Pending" value={pending} />
        <StatCard title="Approved" value={approved} />
        <StatCard title="Rejected" value={rejected} />
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="Search by name or organization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-1/2"
        />

        <div className="flex gap-2">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl border ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-6 py-4 border-b font-medium">
          Requests
        </div>

        {loading ? (
          <div className="p-6 text-gray-500">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Organization</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Requirement</th> 
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.organization}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4 max-w-xs truncate">
    {item.requirement}
  </td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4">{item.phone}</td>

                  <td className="p-4 space-x-2">
                    <button
  onClick={() => setSelected(item)}
  className="text-blue-600 hover:underline mr-2"
>
  View
</button>
                    <button
                      onClick={() => updateStatus(item.id, "APPROVED")}
                      className="text-green-600 hover:underline"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(item.id, "REJECTED")}
                      className="text-red-600 hover:underline"
                    >
                      Reject
                    </button>

                    <div className="text-xs mt-1">
                      <StatusBadge status={item.status} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
      {selected && (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    onClick={() => setSelected(null)} // click outside to close
  >
    <div
      className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-xl"
      onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
    >
      <h2 className="text-xl font-semibold mb-4">
        Request Details
      </h2>

      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Name:</strong> {selected.name}</p>
        <p><strong>Organization:</strong> {selected.organization}</p>
        <p><strong>Email:</strong> {selected.email}</p>
        <p><strong>Phone:</strong> {selected.phone}</p>
        <p><strong>Category:</strong> {selected.category}</p>

        <p>
          <strong>Requirement:</strong><br />
          <span className="text-gray-600">
            {selected.requirement}
          </span>
        </p>

        {selected.quantity && (
          <p><strong>Quantity:</strong> {selected.quantity}</p>
        )}

        <p>
          <strong>Status:</strong>{" "}
          <StatusBadge status={selected.status} />
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setSelected(null)}
          className="px-4 py-2 rounded-xl border"
        >
          Close
        </button>

        <button
          onClick={() => {
            updateStatus(selected.id, "APPROVED");
            setSelected(null);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          Approve
        </button>

        <button
          onClick={() => {
            updateStatus(selected.id, "REJECTED");
            setSelected(null);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-xl"
        >
          Reject
        </button>
      </div>

    </div>
  </div>
)}
    </main>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-semibold mt-2">{value}</h2>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  if (status === "APPROVED")
    return <span className="text-green-600 font-medium">Approved</span>;

  if (status === "REJECTED")
    return <span className="text-red-600 font-medium">Rejected</span>;

  return <span className="text-yellow-600 font-medium">Pending</span>;
}