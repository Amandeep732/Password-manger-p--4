import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-500  w-full">
      <div className=" text-2xl font-bold text-center  ">
      <span className="text-green-600">&lt;</span>
      Pass
      <span className="text-green-600">OP/&gt;</span>
      </div>
      <div className="flex items-center justify-center gap-1 font-semibold">
        Created by
        <img className="w-7" src="icons/heart.png" alt="" />
        by Kunwar Achal Rana
     
      </div>
    </div>

  
  )
};

export default Footer;
