import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

export default async function VendorDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-gray-50 p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Vendor Dashboard
        </h1>

        <p className="text-gray-600 mb-10">
          Welcome back, {session?.user?.email}
        </p>

        <div className="mt-12">
  <h2 className="text-2xl font-bold mb-6">
    Open Procurement Requests
  </h2>

  <div className="grid gap-6">
    {/* PROCUREMENT CARDS WILL COME HERE */}
  </div>
</div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl p-6 shadow border">
            <h2 className="text-lg font-semibold mb-2">
              Open Requests
            </h2>

            <p className="text-4xl font-bold text-blue-600">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border">
            <h2 className="text-lg font-semibold mb-2">
              Submitted Quotations
            </h2>

            <p className="text-4xl font-bold text-green-600">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border">
            <h2 className="text-lg font-semibold mb-2">
              Approved Quotations
            </h2>

            <p className="text-4xl font-bold text-purple-600">
              0
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}