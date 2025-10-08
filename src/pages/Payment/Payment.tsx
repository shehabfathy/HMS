import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Box,
  Paper,
  Typography,
  Stack,
  CircularProgress,
  Alert,
  AlertTitle,
  Button,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { useParams } from "react-router-dom";
import api from "../../utils/axios/axiosInstance";
import CookieService from "../../service/Cookies/Cookies";

// --- Stripe Initialization ---
const stripePromise = loadStripe(
  "pk_test_51OTjhhK2qN3wZ8xJNaI3U8I3D0XCeCa2eTv4vrrsi1i29G0H5iysxtYcwIWtDYWb7U88Q"
);

// --- Helper: Create Payment Intent ---
const createPaymentIntent = async (
  bookingId: string
): Promise<{ clientSecret: string }> => {
  try {
    const response = await api.post(`/portal/booking/${bookingId}/pay`, {});
    const result = response.data;

    if (result?.status !== "success") {
      throw new Error(result?.message || "Failed to create payment intent.");
    }

    const clientSecret = result?.data?.client_secret;
    if (!clientSecret)
      throw new Error("Client secret not found in API response.");

    return { clientSecret };
  } catch (error: any) {
    if (error.isAxiosError && error.response) {
      throw new Error(
        error.response.data?.message || "Server responded with an error."
      );
    }
    throw new Error(
      error.message || "Unknown error while creating payment intent."
    );
  }
};

// --- Checkout Form Component ---
const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe.js not yet loaded. Please wait a moment.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(
        submitError.message || "Error submitting payment details."
      );
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/success` },
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected payment error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h5" gutterBottom>
          Payment Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your card details to complete your payment.
        </Typography>

        <Box
          sx={{
            p: 2,
            border: "1px solid #ddd",
            borderRadius: 1,
            bgcolor: "grey.50",
          }}
        >
          <PaymentElement />
        </Box>

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={!stripe || !elements || isLoading}
          startIcon={
            isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <PaymentIcon />
            )
          }
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </Button>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Stack>
    </form>
  );
};

// --- Main Payment Component ---
const PaymentForm: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [options, setOptions] = useState<StripeElementsOptions | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError(
        "Booking ID not found in the URL. Expected /payment/:bookingId."
      );
      return;
    }

    const token = CookieService.get("token");
    console.log("Token from cookie:", token);

    if (!token) {
      setError("Authorization token not found. Please log in and try again.");
      return;
    }

    const fetchIntent = async () => {
      try {
        const { clientSecret } = await createPaymentIntent(bookingId);
        setOptions({
          clientSecret,
          appearance: { theme: "stripe", labels: "floating" },
        });
        setError(null);
      } catch (err: any) {
        console.error("Failed to create payment intent:", err);
        setError(err.message);
      }
    };

    fetchIntent();
  }, [bookingId]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, width: "100%", maxWidth: "500px", borderRadius: 3 }}
      >
        {options && !error ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 200,
            }}
          >
            {error ? (
              <Alert severity="error" sx={{ width: "100%" }}>
                <AlertTitle>Could not load payment form</AlertTitle>
                {error}
              </Alert>
            ) : (
              <>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Initializing Payment...
                </Typography>
              </>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PaymentForm;
