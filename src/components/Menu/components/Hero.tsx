import React from "react";

export const Hero: React.FC = () => {
  return (
    <div
      className="relative h-48 bg-cover bg-center"
      style={{ backgroundImage: "url('/burger-hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Menu</h1>
      </div>
    </div>
  );
};