import React from "react";
import UserDropDown from "./UserDropDown";

export default function Header() {
  return (
    <>
      <div className="h-[50px]  bg-[#d9d9d9] px-[20%] flex flex-row justify-between items-center mb-[8vh]">
        <a href="/">
          {" "}
          <div className="h-[25px] w-[60px] bg-slate-50 rounded-md"></div>
        </a>
        <div className="h-[30px] w-[30px] bg-slate-50 flex items-center justify-center rounded-[50%]">
          <UserDropDown />
        </div>
      </div>
    </>
  );
}
