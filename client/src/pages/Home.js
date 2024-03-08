import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/reminder/");
      setData(response.data);
      setOriginalData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-[12vh] h-[300px]  px-[300px]">
        {data.map((reminder) => (
          <div
            key={reminder._id}
            className="bg-[#D9D9D9] rounded-[10px] overflow-hidden flex flex-col mb-[16]"
          >
            <div className="py-4 px-6 flex flex-col flex-grow">
              <div>
                <h3 className="text-[15px] font-bold mb-2 text-[#4C4C4C]">
                  {reminder.title}
                </h3>
                <p className="text-[13px] font-normal text-[#4C4C4C]">
                  {reminder.description}
                </p>
              </div>
              <div className="mt-auto">
                <p className="text-[12px] font-bold text-[#4C4C4C]">
                  {reminder.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
