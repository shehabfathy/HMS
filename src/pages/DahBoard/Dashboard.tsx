import { useState, useEffect } from "react";
import axios from "axios";
import CookieService from "../../service/Cookies/Cookies";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ClipLoader } from "react-spinners";

// --- Type Definitions ---
interface DashboardData {
  rooms: number;
  facilities: number;
  bookings: {
    pending: number;
    completed: number;
  };
  ads: number;
  users: {
    user: number;
    admin: number;
  };
}

interface StatCardProps {
  value: string | number;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg text-center flex-1 min-w-[180px] shadow-md">
      <h3 className="text-4xl font-bold mb-2">{value}</h3>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      // ✅ Get token via CookieService
      const token = CookieService.get("authToken");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDashboardData(response.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Failed to fetch dashboard data."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader size={40} color="#4f46e5" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6 text-center text-gray-500">
        No dashboard data available.
      </div>
    );
  }

  const bookingStatusData = [
    { name: "Pending", value: dashboardData.bookings.pending },
    { name: "Completed", value: dashboardData.bookings.completed },
  ];
  const BOOKING_COLORS = ["#FFBB28", "#0088FE"];

  const userRoleData = [
    { name: "Users", count: dashboardData.users.user },
    { name: "Admins", count: dashboardData.users.admin },
  ];

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

      <div className="flex flex-wrap gap-6 mb-8">
        <StatCard value={dashboardData.rooms} label="Rooms" />
        <StatCard value={dashboardData.facilities} label="Facilities" />
        <StatCard value={dashboardData.ads} label="Ads" />
      </div>

      <div className="flex flex-wrap lg:flex-nowrap gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-h-[300px] w-full lg:w-1/2">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Booking Status
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={bookingStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {bookingStatusData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={BOOKING_COLORS[index % BOOKING_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-h-[300px] w-full lg:w-1/2">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            User Roles
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userRoleData} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={60} />
              <Tooltip cursor={{ fill: "#f3f4f6" }} />
              <Legend />
              <Bar dataKey="count" name="Total" fill="#82ca9d" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
