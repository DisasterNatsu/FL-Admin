"use client";

import GameNumberTable from "@/components/custom/game/GameNumberTable";
import Header from "@/components/custom/shared/Header";
import React, { useState } from "react";

const Game = () => {
  const [aciveCatagory, setActiveCatagory] =
    useState<gameCatagories>("LuckBazar");

  return (
    <main>
      <Header title="Games" />

      <div className="flex justify-center items-center my-5 space-x-10">
        {/* Luck Bazar */}
        <div
          className={`cursor-pointer px-10 py-2 rounded-full border-2 border-white font-semibold ${
            aciveCatagory === "LuckBazar" && "bg-lime-300 text-black"
          }`}
          onClick={() => setActiveCatagory("LuckBazar")}
        >
          <h3>Luck Bazar</h3>
        </div>

        {/* Kolkata FF */}
        <div
          className={`cursor-pointer px-10 py-2 rounded-full border-2 border-white font-semibold ${
            aciveCatagory === "Fatafat" && "bg-lime-300 text-black"
          }`}
          onClick={() => setActiveCatagory("Fatafat")}
        >
          <h3>Kolkata FF</h3>
        </div>

        {/* Smart Matka */}
        <div
          className={`cursor-pointer px-10 py-2 rounded-full border-2 border-white font-semibold ${
            aciveCatagory === "SmartMatka" && "bg-lime-300 text-black"
          }`}
          onClick={() => setActiveCatagory("SmartMatka")}
        >
          <h3>Smart Matka</h3>
        </div>

        {/* Open Close */}
        <div
          className={`cursor-pointer px-10 py-2 rounded-full border-2 border-white font-semibold ${
            aciveCatagory === "OpenClose" && "bg-lime-300 text-black"
          }`}
          onClick={() => setActiveCatagory("OpenClose")}
        >
          <h3>Open Close</h3>
        </div>
      </div>

      <GameNumberTable activeCatagory={aciveCatagory} />
    </main>
  );
};

export default Game;
