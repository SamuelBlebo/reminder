import React, { useState, useEffect } from "react";
import axios from "axios";
import AddReminder from "../components/AddReminder";
import EditReminder from "../components/EditReminder";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

import { MdMoreHoriz } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";

import SignIn from "../pages/SignIn";

function ReminderList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editingReminder, setEditingReminder] = useState(null);
  const { currentUser } = useAuth();

  const fetchData = async () => {
    try {
      if (!currentUser) {
        // Handle case where currentUser is null or undefined
        console.log("No user is currently signed in.");
        setLoading(false);
        return;
      }
      const userId = currentUser.uid;
      console.log("Current user ID:", userId);

      const response = await axios.get("http://localhost:4000/api/reminder/");
      const userReminders = response.data.filter(
        (reminder) => reminder.userId === userId
      );
      setData(userReminders);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  //Add New Reminder
  const handleFormSubmit = async () => {
    setLoading(true);

    try {
      await fetchData();
      setSuccessMessage("Added successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };
  if (loading) {
    return <p className="flex justify-center ">Loading...</p>;
  }

  if (error) {
    return <p className="flex justify-center ">{error.message}</p>;
  }

  //Delete Reminder
  const deleteReminder = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/reminder/${id}`, {
        method: "DELETE",
      });

      setLoading(true);

      try {
        await fetchData();
        setSuccessMessage("Deleted successfully!");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleMoreIconClick = (id) => {
    setSelectedItemId(selectedItemId === id ? null : id);
  };

  // Edit Reminder
  const editReminder = (reminder) => {
    setEditingReminder(reminder);
  };

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const getColorClass = (index) => {
    if (index <= 2) {
      return "bg-[#891522]";
    } else {
      return "bg-green-600";
    }
  };

  return (
    <>
      <div>
        {successMessage && (
          <div className="bg-green-500 w-[20em]  text-white py-1 px-4 mt-2 rounded-md mb-[2em] mx-auto ">
            {successMessage}
          </div>
        )}

        {currentUser ? (
          <div className=" px-[20%]">
            {" "}
            {data.length === 0 && !loading && (
              <h3 className="flex justify-center font-bold">
                😎 Get started by adding reminders.
              </h3>
            )}
            {data.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4  h-[px]  ">
                {sortedData.map((reminder, index) => (
                  <div
                    key={reminder._id}
                    className="bg-[#D9D9D9] rounded-[10px] overflow-hidden flex flex-col mb-[16]"
                  >
                    <div className="py-4 px-6 flex flex-col flex-grow">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-[15px] font-bold  text-[#4C4C4C]">
                            {reminder.title}
                          </h3>
                          <div
                            className={`${getColorClass(
                              index
                            )} w-[10px] h-[10px] rounded-[50%]`}
                          ></div>
                        </div>
                        <p className="text-[13px] font-normal mb-2 text-[#4C4C4C]">
                          {reminder.description}
                        </p>
                      </div>
                      <div className="mt-auto flex justify-between">
                        <p className="text-[12px] font-bold text-[#4C4C4C]">
                          {new Date(reminder.date).toLocaleDateString("en-GB")}
                        </p>
                        <MdMoreHoriz
                          onClick={() => handleMoreIconClick(reminder._id)}
                          className={
                            selectedItemId === reminder._id ? "hidden" : ""
                          }
                        />
                        {selectedItemId === reminder._id && (
                          <div className=" w-[45px] flex flex-row items-center justify-between">
                            <CiEdit
                              className="text-[1.3em]"
                              onClick={() => editReminder(reminder)}
                            />
                            <GoTrash
                              className="text-[0.9em]"
                              onClick={() => deleteReminder(reminder._id)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="flex justify-center font-bold">
              🔒
              <Link
                to="/login "
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
              &nbsp;
              <span> </span> to get continue...
            </h3>
            <div>
              <SignIn />
            </div>
          </div>
        )}

        <div className="fixed bottom-[20px] right-[300px]">
          {/* Render the AddReminder or EditReminder component based on the editingReminder state */}
          {editingReminder ? (
            <EditReminder
              reminder={editingReminder}
              onCancel={() => setEditingReminder(null)}
              onSave={fetchData}
            />
          ) : (
            <AddReminder onFormSubmit={handleFormSubmit} />
          )}
        </div>
      </div>
    </>
  );
}

export default ReminderList;
