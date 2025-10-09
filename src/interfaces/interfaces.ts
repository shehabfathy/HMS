import type { ApiItem } from "../types/types";
// Import the missing type from the Stripe package
import type { StripeCheckout } from "@stripe/stripe-js";

// Define the structure of a Facility object based on your API response
export interface IFacility {
  _id: string;
  name: string;
}

// Define a specific interface for a Room, reflecting the new data structure
export interface IRoom extends ApiItem {
  roomNumber: string;
  price: number;
  discount: number;
  capacity: number;
  facilities: IFacility[]; // Facilities are an array of objects
}

// This interface now represents the data for the form state
export interface IUpdateRoomForm {
  roomNumber: string;
  price: number;
  discount: number;
  capacity: number;
  facilities: string; // Facilities are now a single string for display
}

export interface Room {
  id: number;
  title: string;
  img: string;
  desc: string;
}

export interface FeaturedRoomsProps {
  title: string;
  rooms: Room[];
}

// Define a specific type for checkoutActions to avoid using 'any'
export interface ICheckoutActions {
  // NOTE: You should update these properties to match your actual object structure
  onClose: () => void;
  onComplete: (result: unknown) => void;
}

// Define the possible shapes for your result
interface SuccessResult {
  type: "success";
  checkout: StripeCheckout; // This type is now recognized
}

interface OtherResult {
  type: "other_type";
  checkoutActions: ICheckoutActions; // This is now strongly typed
}

// Export the final union type
export type CheckoutResult = SuccessResult | OtherResult;
