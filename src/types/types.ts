import React from "react";
import type { ReactNode } from "react";
/**
 * A generic interface for any data item fetched from the API.
 * It requires an `_id` property for keying in React lists.
 */
export interface ApiItem {
  _id: string;
  [key: string]: unknown; // Allows for other properties of any type
}

/**
 * Defines the structure for a single column in the data table.
 * @template T - The type of the data item for the row.
 */
export interface ColumnDef<T extends ApiItem> {
  header: string;
  align?: "left" | "right" | "center";
  renderCell: (item: T) => React.ReactNode;
}

/**
 * Defines the props for the reusable DataTable component.
 * @template T - The type of the data item for the rows.
 */
export interface DataTableProps<T extends ApiItem> {
  endpoint: string;
  title: string;
  subtitle: string;
  columns: ColumnDef<T>[];
  headerContent?: React.ReactNode;
}

export type tRegister = {
  confirmPassword: string;
  country: string;
  email: string;
  password: string;
  phoneNumber: string;
  profileImage: File[];
  role: string;
  userName: string;
};

export interface LoginData {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  exp?: number; // from JWT
  iat?: number; // from JWT
}

export type AuthContextType = {
  loginData: LoginData | null;
  logOut: () => void;
  getUser: () => void;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export type TUserForget = {
  email: string;
};

export type TResetUser = {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
};

// Booking from API
export type TBookingApi = {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: {
    _id: string;
    userName: string;
  };
  room: {
    _id: string;
    roomNumber: string;
  } | null;
  status: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
};

// Booking for DataGrid
export type TBookingItem = {
  id: string;
  roomNumber: string;
  price: number; // ✅ matches component
  startDate: string;
  endDate: string;
  user: string;
  status: string;
  action: ReactNode; // ✅ allows Button
};

//  Ads

export type TAdsApi = {
  _id: string;
  isActive: boolean;
  room: {
    id: string;
    roomNumber: string;
    price: number;
    capacity: number;
    discount: number;
    facilities: string[];
    createdBy: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
  };
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type TAds = {
  id: string;
  roomName: string;
  image: string;
  price: number;
  Discount: number;
  Capacity: number;
  Active: boolean;
};

// ++ ADD THIS TYPE ++
export type HeaderProps = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

/**
 * A generic interface for any data item fetched from the API.
 * It requires an `_id` property for keying in React lists.
 */

export type SelectedAds = {
  id: string;
  image: string;
  Discount: number;
  Capacity: number;
  price: number;
  Active: boolean;
  roomName: string;
};

export type tExRoom = {
  _id: string;
  images: string[];
  price: number;
  name?: string;
  location?: string;
  roomNumber: string;
  facilities: {
    name: string;
  }[];
};

export type tPopAds = {
  _id: string;
  room: {
    images: string[];
    price: number;
    _id: string;
  };
};

export type tRoomList = {
  capacity: number;
  createdAt: string;
  createdBy: {
    _id: string;
    userName: string;
  };
  discount: number;
  facilities: object[];
  images: string[];
  price: number;
  roomNumber: string;
  updatedAt: string;
  _id: string;
};

export type TFacilityApi = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

// ✅ This is the type used for DataGrid rows
export type TFacility = {
  id: string;
  name: string;
  createdAt: string;
};
