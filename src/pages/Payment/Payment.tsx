// App.tsx
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Container, Box, Typography, Paper } from "@mui/material";
import CheckoutForm from "./CheckoutForm";

// Load Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

const App: React.FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        mt: 1,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 2,
          borderRadius: 3,
          width: "100%",
          maxWidth: 480,
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          gutterBottom
          sx={{ color: "#0d47a1" }}
        >
          Card Payment
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 3, color: "text.secondary" }}>
          Complete your payment securely with Stripe
        </Typography>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Paper>

      <Box mt={4}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Staycation. All Rights Reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default App;
