import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEllipsisV,
  faEye,
  faEdit,
  faTrash,
  faTimes,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

// --- Hardcoded Data for UI Mockup ---
const mockUsers = [
  {
    id: 1,
    roomNumber: "Room 1",
    price: 500,
    startDate: "01-01-2024",
    endDate: "10-01-2024",
    user: "UpSkilling",
  },
  {
    id: 2,
    roomNumber: "Single Room",
    price: 500,
    startDate: "01-01-2024",
    endDate: "07-01-2024",
    user: "Ahmed Mohamed",
  },
  {
    id: 3,
    roomNumber: "Double Rooms",
    price: 500,
    startDate: "01-01-2024",
    endDate: "11-01-2024",
    user: "UpSkilling",
  },
  {
    id: 4,
    roomNumber: "Double Rooms",
    price: 500,
    startDate: "01-01-2024",
    endDate: "15-01-2024",
    user: "UpSkilling",
  },
  {
    id: 5,
    roomNumber: "Double Rooms",
    price: 900,
    startDate: "01-01-2024",
    endDate: "02-01-2024",
    user: "UpSkilling",
  },
];

// --- The UI Component ---
export default function UsersListUI() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Booking Table Details
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              You can check all details
            </p>
          </div>
          <div className="relative mt-4 sm:mt-0 w-full sm:w-auto">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </span>
            <input
              type="text"
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[15px] shadow-md overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-[#E2E5EB] ">
              <tr>
                <th scope="col" className="px-[30px] py-[30px] font-semibold">
                  Room Number
                </th>
                <th scope="col" className=" font-semibold">
                  Price
                </th>
                <th scope="col" className=" font-semibold">
                  Start Date
                </th>
                <th scope="col" className=" font-semibold">
                  End Date
                </th>
                <th scope="col" className=" font-semibold">
                  User
                </th>
                <th scope="col" className=" font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((booking) => (
                <tr
                  key={booking.id}
                  className="bg-white border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {booking.roomNumber}
                  </td>
                  <td className="px-6 py-4">{booking.price}</td>
                  <td className="px-6 py-4">{booking.startDate}</td>
                  <td className="px-6 py-4">{booking.endDate}</td>
                  <td className="px-6 py-4">{booking.user}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === booking.id ? null : booking.id
                          )
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FontAwesomeIcon icon={faEye} /> View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="h-6 w-6 text-red-600"
                />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                Delete Item
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Update Item
              </h3>
              <button
                onClick={() => setUpdateModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="p-6">
              <p>Update form fields would go here...</p>
            </div>
            <div className="flex justify-end gap-4 p-4 bg-gray-50 rounded-b-lg">
              <button
                type="button"
                onClick={() => setUpdateModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
