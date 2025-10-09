import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import api from "../../utils/axios/axiosInstance"; // adjust this import path to your axios instance

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { bookingId } = useParams<{ bookingId: string }>(); // ✅ dynamic booking id from URL

  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please wait...");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card input not found.");
      return;
    }

    if (!bookingId) {
      setError("Booking ID not found in URL.");
      return;
    }

    setProcessing(true);

    try {
      // ✅ Create a token using Stripe
      const { token, error: tokenError } = await stripe.createToken(
        cardElement
      );

      if (tokenError || !token) {
        throw new Error(
          tokenError?.message || "Failed to create payment token."
        );
      }

      // ✅ Send payment to your backend
      const response = await api.post(`/portal/booking/${bookingId}/pay`, {
        token: token.id,
      });

      // ✅ Check backend success response (not just status)
      const success = response.data?.success;
      const message =
        response.data?.message || "Payment processed successfully.";

      if (success) {
        setSucceeded(true);
        setError(undefined);
        console.log("✅ Payment success:", message);
      } else {
        throw new Error(message || "Payment failed. Please try again.");
      }
    } catch (err: any) {
      console.error("❌ Payment error:", err);
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Payment failed. Please try again."
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Complete Your Payment
      </Typography>

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          padding: 2,
          backgroundColor: "#fafafa",
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </Box>

      {error && <Alert severity="error">{error}</Alert>}
      {succeeded && <Alert severity="success">Payment succeeded! 🎉</Alert>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={processing || succeeded || !stripe}
        sx={{ mt: 2 }}
      >
        {processing ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Pay Now"
        )}
      </Button>
    </Box>
  );
};

export default CheckoutForm;
