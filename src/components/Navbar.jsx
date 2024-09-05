import React from "react";

const Navbar = () => {
  return (
      //  nav points
    <nav className="bg-slate-500">
      <div className="flex justify-around p-3">
        <div className="logo font-bold text-2xl">
          <span className="text-green-600">&lt;</span>
          Pass
          <span className="text-green-600">OP/&gt;</span>
        </div>
          <button className="bg-green-400 py-2 px-2 rounded-full flex gap-2 items-center ring-black ring-[0.5px]">
            <img className="w-6 " src="github.svg" alt="" />
            <span className="font-semibold text-[12px]">GitHub</span>
          </button>
      </div>
    </nav>
  );
};

export default Navbar;
