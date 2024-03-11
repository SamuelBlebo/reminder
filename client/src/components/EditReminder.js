import React, { useState } from "react";
import axios from "axios";

const EditReminder = ({ reminder, onCancel, onSave }) => {
  const [editedReminder, setEditedReminder] = useState({
    title: reminder.title,
    description: reminder.description,
    date: new Date(reminder.date).toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedReminder((prevReminder) => ({
      ...prevReminder,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      await axios.patch(
        `http://localhost:4000/api/reminder/${reminder._id}`,
        editedReminder,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onSave();
      //   closing the Editing window
      setTimeout(() => {
        onCancel();
      }, 500);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-white opacity-80 z-50"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-md shadow-xl w-[25%]">
        <h2 className="text-xl font-bold mb-4">Edit Reminder</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedReminder.title}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={editedReminder.description}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full h-[120px]"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={editedReminder.date}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onCancel}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default EditReminder;
