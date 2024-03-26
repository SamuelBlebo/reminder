import React, { useState } from "react";
import axios from "axios";

import { useAuth } from "../auth/AuthContext";

import { LuBellPlus } from "react-icons/lu";
import { MdClose } from "react-icons/md";

export default function AddReminder({ onFormSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopupOpen(false);

    const userId = currentUser.uid;
    const userEmail = currentUser.email;
    const userName = currentUser.displayName;

    const reminder = {
      title,
      description,
      dueDate,
      userId,
      userEmail,
      userName,
    };
    console.log("Form Data:", reminder);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/reminder/",
        reminder,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.data;

      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setError(null);
        setTitle("");
        setDescription("");
        setDueDate("");
      }

      onFormSubmit();
    } catch (error) {
      setError(error.message);
    }
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  return (
    <>
      <div className=" bg-[#d9d9d9] rounded-[50%] p-[0.8rem]">
        <LuBellPlus className=" text-[1.2rem]" onClick={openPopup} />
      </div>
      {isPopupOpen && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-white opacity-80 z-50"
            onClick={closePopup}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-md shadow-xl w-[25%]">
            <div className="flex  justify-between h-[70px]  items-center">
              <div>
                <h4 className="text-xl font-bold">Add a Reminder</h4>
              </div>
              <div>
                <MdClose
                  className="close-button cursor-pointer text-black font-bold"
                  onClick={closePopup}
                />
              </div>
            </div>
            <div className=" w-[100%] h-[90%] flex flex-col justify-center rounded-b-[10px] s">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <input
                  className="mt-1 p-2 border rounded-md w-full mb-4"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <textarea
                  className="mt-1 p-2 border rounded-md w-full h-[120px] mb-4"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={150}
                  required
                />

                <input
                  className="mt-1 p-2 border rounded-md w-full mb-4"
                  type="date"
                  placeholder="Date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />

                <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300">
                  SUBMIT
                </button>
                {error && <div className="error">{error}</div>}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
