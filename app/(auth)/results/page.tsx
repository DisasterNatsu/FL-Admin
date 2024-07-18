"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";

import Header from "@/components/custom/shared/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gameName } from "@/components/custom/helpers/GameName";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { DateFormatterQuery } from "@/components/custom/helpers/QueryDate";
import { LinkProvider } from "@/components/custom/helpers/LinkProvider";
import { Axios } from "@/utils/AxiosConfig";

const Results = () => {
  const [gameType, setGameType] = useState<gameCatagories | undefined>(
    undefined
  );
  const [baziNo, setBaziNo] = useState<number | null>(null);
  const [singleDigit, setSingleDigit] = useState<string>("");
  const [singlePanna, setSinglePanna] = useState<string>("");

  const isSunday = new Date().getDay() === 0;
  const arraySize = gameType === "OpenClose" ? 2 : isSunday ? 4 : 8;

  const date = DateFormatterQuery();

  const handleSubmit = async () => {
    // check if all data is provided
    if (
      !gameType ||
      baziNo === null ||
      singleDigit === "" ||
      singlePanna === ""
    ) {
      return toast({
        title: "Invalid Request!",
        variant: "destructive",
      });
    }

    // validate the data
    if (singlePanna.length !== 3) {
      return toast({
        title: "Invalid Single Panna",
        variant: "destructive",
      });
    }

    if (singleDigit.length !== 1) {
      return toast({
        title: "Invalid Single Digit",
        variant: "destructive",
      });
    }

    try {
      const link = LinkProvider(gameType);

      const token = Cookies.get("fl-admin-token");

      if (!token) return;

      const data = {
        baziNo,
        singleDigit: Number(singleDigit),
        singlePanna: Number(singlePanna),
        gameType,
        date,
      };

      const req = await Axios.post(`/admin/${link}`, data, {
        headers: {
          "fataluck-admin-token": token,
        },
      });

      const res = await req.data;

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Header title="Results" />

      <div className="flex justify-center items-center space-x-10">
        <button
          className={`px-5 py-3 mt-5 rounded-3xl border-gray-400 border-2 hover:bg-lime-300 hover:text-black ${
            gameType === "LuckBazar" && "bg-lime-400 text-black"
          }`}
          onClick={() => setGameType("LuckBazar")}
        >
          Luck Bazar
        </button>
        <button
          className={`px-5 py-3 mt-5 rounded-3xl border-gray-400 border-2 hover:bg-lime-300 hover:text-black ${
            gameType === "Fatafat" && "bg-lime-400 text-black"
          }`}
          onClick={() => setGameType("Fatafat")}
        >
          Kolkata FF
        </button>
        <button
          className={`px-5 py-3 mt-5 rounded-3xl border-gray-400 border-2 hover:bg-lime-300 hover:text-black ${
            gameType === "SmartMatka" && "bg-lime-400 text-black"
          }`}
          onClick={() => setGameType("SmartMatka")}
        >
          Smart Matka
        </button>
        <button
          className={`px-5 py-3 mt-5 rounded-3xl border-gray-400 border-2 hover:bg-lime-300 hover:text-black ${
            gameType === "OpenClose" && "bg-lime-400 text-black"
          }`}
          onClick={() => setGameType("OpenClose")}
        >
          Open Close
        </button>
      </div>

      {/* Input Field and Heading */}

      <div className="flex flex-col items-center justify-center mt-5">
        {gameType === undefined && <h2>Please Select a Game to continue</h2>}

        {/* Game Number  */}

        {gameType !== undefined && (
          <div className="flex flex-col items-center justify-center">
            <h2 className="my-5 text-3xl">Post {gameName(gameType)} result</h2>

            <h3 className="mb-5 text-xl">Please Select the Bazi No.</h3>

            <div className="flex gap-5">
              {Array(arraySize)
                .fill(null)
                .map((_, index: number) => (
                  <button
                    key={index}
                    className={`h-10 w-10 text-black rounded-md font-semibold border-white border-2 hover:bg-lime-300 ${
                      baziNo === index ? "bg-lime-300" : "bg-lime-200"
                    }`}
                    onClick={() => setBaziNo(index)}
                  >
                    <p>{index + 1}</p>
                  </button>
                ))}
            </div>

            {baziNo === null ? (
              <h3 className="my-5 text-xl">Select a Bazi No to continue</h3>
            ) : (
              <div>
                <h3 className="my-5 text-xl">Enter result details</h3>
                <div className="w-[450px]">
                  {/* Single Digit */}
                  <Label htmlFor="singleDigit" className="text-right">
                    Single Digit:
                  </Label>
                  <Input
                    id="singleDigit"
                    className="col-span-3"
                    type="number"
                    value={singleDigit}
                    onChange={(e) => setSingleDigit(e.target.value)}
                  />

                  {/* Single Panna */}
                  <Label htmlFor="singlePanna" className="text-right">
                    Single Panna:
                  </Label>
                  <Input
                    id="singlePanna"
                    className="col-span-3"
                    type="number"
                    value={singlePanna}
                    onChange={(e) => setSinglePanna(e.target.value)}
                  />

                  <Button className="mt-5 w-full" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Results;
