import React from "react";

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
