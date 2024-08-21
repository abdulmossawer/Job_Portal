import React from "react";

const Footer = () => {
  return (
    <div className="bg-black text-white py-6 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-lg md:text-2xl font-bold">Employ Hunter</h1>
        <p className="text-xs md:text-sm text-center md:text-left">© 2024 Employ Hunter. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
