import React, { useState } from "react";
import Card from "../components/Card"
 const Navbar = () => {
  const [active, setActive] = useState("Weather");

  return (
    <div>
      <nav className="flex items-center border-b p-3 gap-8">
      <div className="flex items-center text-xl font-bold">
       <span className="text-gray-600 text-2xl">🌱</span>
      </div>
      <div className="flex space-x-6">
        <a
          href="#"
          className={`pb-1 transition-all duration-100 ${
            active === "Weather"
              ? "text-green-500 border-b-2 border-green-500"
              : "text-gray-700 hover:text-green-500 hover:border-b-2 hover:border-green-500"
          }`}
          onMouseEnter={() => setActive("Weather")}
        >
          Weather
        </a>
        <a
          href="#"
          className={`pb-1 transition-all duration-100 ${
            active === "History"
              ? "text-green-500 border-b-2 border-green-500"
              : "text-gray-700 hover:text-green-500 hover:border-b-2 hover:border-green-500"
          }`}
          onMouseEnter={() => setActive("History")}
        >
          Weather History
        </a>
      </div>
    </nav>
    <Card />
    </div>
    
  );
};

export default Navbar;
