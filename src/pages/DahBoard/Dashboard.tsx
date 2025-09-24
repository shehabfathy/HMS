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
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

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

// --- StatCard Sub-component ---
function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <Card
      elevation={2}
      // ✅ Add the sx prop here for styling
      sx={{
        backgroundColor: "#1A1B1E", // A nice indigo color
        color: "white", // Make the text white for contrast
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h4" component="div" fontWeight="bold">
          {value}
        </Typography>
        <Typography sx={{ mt: 1, color: "rgba(255, 255, 255, 0.8)" }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
}

// --- Main Dashboard Component ---
export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = CookieService.get("token");
        if (!token) throw new Error("Authentication token not found.");

        const response = await axios.get(
          "https://upskilling-egypt.com:3000/api/v0/admin/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
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
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ClipLoader size={50} color={"#4f46e5"} />
      </div>
    );
  }

  if (error) {
    return (
      <Card
        sx={{ backgroundColor: "#ffebee", color: "#c62828", padding: "16px" }}
      >
        <Typography variant="h6">Error</Typography>
        <Typography>{error}</Typography>
      </Card>
    );
  }

  if (!dashboardData) {
    return (
      <Typography sx={{ textAlign: "center", color: "text.secondary", mt: 4 }}>
        No dashboard data available.
      </Typography>
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
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container rowSpacing={4} columnSpacing={4} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard value={dashboardData.rooms} label="Rooms" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard value={dashboardData.facilities} label="Facilities" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard value={dashboardData.ads} label="Ads" />
        </Grid>
      </Grid>

      <Grid container rowSpacing={4} columnSpacing={4}>
        <Grid size={{ xs: 12, md: 4, lg: 6 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Booking Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
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
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4, lg: 6 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                User Roles
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={userRoleData}
                  layout="vertical"
                  margin={{ left: 10, top: 5, right: 20, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={80}
                    tickMargin={10}
                  />
                  <Tooltip cursor={{ fill: "#f3f4f6" }} />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Total"
                    fill="#82ca9d"
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
