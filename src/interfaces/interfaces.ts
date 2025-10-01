import type { ApiItem } from "../types/types";

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
