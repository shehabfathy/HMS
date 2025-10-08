import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import api from "../../utils/axios/axiosInstance";
import { useParams } from "react-router-dom";
import CookieService from "../../service/Cookies/Cookies";

// --- API Interaction ---
// This function now uses the configured axios instance to create a PaymentIntent.
const createPaymentIntent = async (
  bookingId: string
): Promise<{ clientSecret: string }> => {
  const apiEndpoint = `/portal/booking/${bookingId}/pay`;
  console.log(
    `Fetching client_secret from: ${api.defaults.baseURL}${apiEndpoint}`
  );

  try {
    const response = await api.post(apiEndpoint);
    const result = response.data; // axios puts the response body in `data`

    if (!result.success) {
      throw new Error(result.message || "API returned success: false.");
    }

    if (!result.data || !result.data.client_secret) {
      throw new Error("Client secret not found in API response.");
    }

    return { clientSecret: result.data.client_secret };
  } catch (error: any) {
    if (error.isAxiosError && error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const apiError = error.response.data;
      throw new Error(
        apiError.message || `API Error: ${error.response.status}`
      );
    } else {
      // Something happened in setting up the request that triggered an Error or a network error
      throw new Error(error.message || "An unknown error occurred.");
    }
  }
};

// --- CheckoutForm Component ---
const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message || "An unexpected error occurred.");
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setErrorMessage(
          error.message || "A card or validation error occurred."
        );
      } else {
        setErrorMessage(
          "An unexpected error occurred during payment confirmation."
        );
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800">Payment Details</h3>
        <p className="text-sm text-gray-500 mt-1">
          Enter your card information below. This is a test environment.
        </p>
      </div>
      <div className="p-4 border rounded-lg bg-gray-50">
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          `Pay $10.99`
        )}
      </button>

      {errorMessage && (
        <div
          className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm"
          role="alert"
        >
          {errorMessage}
        </div>
      )}
    </form>
  );
};

// --- Main Payment Component ---
// This now uses the `useParams` hook from react-router-dom to get the bookingId from the URL.
const PaymentForm: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [options, setOptions] = useState<StripeElementsOptions | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Stripe configuration
  const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

  useEffect(() => {
    if (!bookingId) {
      setError(
        "Booking ID not found in the URL. Please ensure the URL is correct (e.g., /payment/your-id)."
      );
      return;
    }

    // For this simplified version, you must manually set the token in your browser's
    // developer console for the payment to initialize.
    // Example: CookieService.set('token', 'your_auth_token_here');
    if (!CookieService.get("token")) {
      setError(
        "Authorization token not found in cookies. Please set it via the console to proceed."
      );
      return;
    }

    setError(null);
    const fetchIntent = async () => {
      try {
        const { clientSecret } = await createPaymentIntent(bookingId);
        setOptions({
          clientSecret: clientSecret,
          appearance: {
            theme: "stripe",
            labels: "floating",
          },
        });
      } catch (err: any) {
        console.error("Failed to create payment intent:", err);
        setError(err.message);
      }
    };
    fetchIntent();
  }, [bookingId]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
        {options && !error ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            {error ? (
              <div
                className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm text-center"
                role="alert"
              >
                <h4 className="font-bold">Could not load payment form</h4>
                <p>{error}</p>
              </div>
            ) : (
              <>
                <svg
                  className="animate-spin h-8 w-8 text-blue-600 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-lg">Initializing Payment...</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
