import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";

import { DateFormatterQuery } from "../helpers/QueryDate";
import { useRouter } from "next/navigation";
import { Axios } from "@/utils/AxiosConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GameDataModal from "./GameDataModal";

const GameNumberTable = ({ activeCatagory }: { activeCatagory: string }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [gameNumber, setGameNumber] = useState<number>(0);
  const [gameData, setGameData] = useState<GameBetsType[]>([]);

  const [activeItem, setActiveItem] = useState<GameBetsType | null>(null);

  const isSunday = new Date().getDay() === 0;
  const arraySize = activeCatagory === "OpenClose" ? 2 : isSunday ? 4 : 8;

  const date = DateFormatterQuery();

  const router = useRouter();

  const getGameData = useCallback(async () => {
    setLoading(true);

    const token = Cookies.get("fl-admin-token");

    if (!token) {
      return router.replace("/");
    }

    try {
      const request = await Axios.get(
        `/admin/get-game-data/${date}/${activeCatagory}/${gameNumber}/Single-Digit`,
        {
          headers: {
            "fataluck-admin-token": token,
          },
        }
      );

      const res = await request.data;

      setGameData(res);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [date, activeCatagory, gameNumber, router]);

  useEffect(() => {
    getGameData();
  }, [getGameData, activeCatagory, gameNumber]);

  return (
    <div className="px-5 mx-auto">
      <title>Fata Luck - Games</title>
      <h2 className="text-center font-semibold">Select Game Number</h2>

      <div className="flex items-center justify-center space-x-10 mt-5">
        {Array(arraySize)
          .fill(null)
          .map((_, index: number) => {
            return (
              <div
                key={index}
                className={`cursor-pointer border-2 rounded-md w-10 h-12 flex items-center justify-center ${
                  index === gameNumber && "bg-lime-300 text-black font-semibold"
                }`}
                onClick={() => setGameNumber(index)}
              >
                <span>{index + 1}</span>
              </div>
            );
          })}
      </div>

      {gameData.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10 border-2 rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Bazi No.</TableHead>
                <TableHead>Single Digit</TableHead>
                <TableHead className="text-right">Total Diamond</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gameData.map((item: GameBetsType, index: number) => (
                <TableRow
                  key={index}
                  className="cursor-pointer"
                  onClick={() => {
                    setActiveItem(item);
                    setVisible(true);
                  }}
                >
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell>{gameNumber}</TableCell>
                  <TableCell>{item.bettingNo}</TableCell>
                  <TableCell className="text-right">
                    {item.totalDiamond}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {activeItem && (
        <GameDataModal
          item={activeItem}
          setVisible={setVisible}
          visible={visible}
          baziNo={gameNumber}
          gameType={activeCatagory}
          setActiveItem={setActiveItem}
        />
      )}
    </div>
  );
};

export default GameNumberTable;
