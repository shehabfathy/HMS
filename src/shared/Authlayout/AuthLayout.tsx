import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return <Outlet />;
}

// import { Outlet, useLocation } from "react-router-dom";
// import ResetImage from "../../assets/Reset.png";
// import ForgetImage from "../../assets/Forget.png";

// // Import Material-UI components
// import { Box, Grid, Paper } from "@mui/material";

// export const AuthLayout = () => {
//   // Data for different authentication pages
//   const pageData: Record<
//     string,
//     { src: string; title: string; subtitle: string }
//   > = {
//     "/forget-password": {
//       src: ForgetImage,
//       title: "Forgot Password",
//       subtitle: "Enter your email to receive a reset link.",
//     },
//     "/reset-password": {
//       src: ResetImage,
//       title: "Reset Password",
//       subtitle: "Create a new, strong password.",
//     },
//   };

//   const location = useLocation();
//   // Determine which page data to show based on the current URL
//   const currentData =
//     pageData[location.pathname] || pageData["/forget-password"];

//   return (
//     // Main container using Box, sets the background and takes up the full screen
//     <Box
//       sx={{
//         width: "100vw",
//         height: "100vh",
//         overflow: "hidden",
//         p: 2, // Padding around the entire layout
//         bgcolor: "grey.50", // A light grey background color
//       }}
//     >
//       {/* Grid container to manage the two-column layout */}
//       <Grid container sx={{ height: "100%" }}>
//         {/* Left Side: Form Area */}
//         <Grid
//           size={6}
//           // ADDED: Padding to the right to create a gap between columns
//         >
//           {/* Paper provides the white background, shadow, and rounded corners */}
//           <Paper
//             elevation={2} // Controls the shadow depth
//             sx={{
//               p: { xs: 3, md: 5 }, // Responsive padding
//               height: "80.5%",
//               overflowY: "auto", // Allows scrolling if content is too long
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center", // Center the form vertically
//             }}
//           >
//             {/* The Outlet renders the specific form component (e.g., ResetPassword) */}
//             <Outlet />
//           </Paper>
//         </Grid>

//         {/* Right Side: Dynamic Image */}
//         <Grid
//           sx={{
//             // Hide on mobile (xs), display as a block on large screens (lg)
//             display: { xs: "none", lg: "block" },
//             // ADDED: Padding to the left and bottom for spacing

//             pb: 2,
//           }}
//         >
//           <Box
//             component="img" // Use Box as an img tag
//             src={currentData.src}
//             alt={currentData.title}
//             sx={{
//               width: "100%",
//               height: "82%", // Changed back to 100% to fill the padded container
//               objectFit: "cover", // Ensures the image covers the area without distortion
//               borderRadius: 2, // Applies rounded corners
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default AuthLayout;
