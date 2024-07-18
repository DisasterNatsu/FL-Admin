import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateFormatterQuery } from "../helpers/QueryDate";
import { Axios } from "@/utils/AxiosConfig";

const GameDataModal = ({
  visible,
  setVisible,
  item,
  baziNo,
  gameType,
  setActiveItem,
}: {
  visible: boolean;
  setVisible: (state: boolean) => void;
  item: GameBetsType;
  baziNo: number;
  gameType: string;
  setActiveItem: (state: any) => void;
}) => {
  const [activeCatagory, setActiveCatagory] = useState<string>("SingleDigit");
  const [pattiArray, setPattiArray] = useState<PattiDataArray[]>([]);

  const date = DateFormatterQuery();
  const router = useRouter();

  const getPattiData = useCallback(async () => {
    try {
      const token = Cookies.get("fl-admin-token");

      if (!token) {
        return router.replace("/");
      }

      const request = await Axios.get(
        `/admin/get-patti-game-data/${date}/${gameType}/${baziNo}/Single-Panna/${item.bettingNo}`,
        {
          headers: {
            "fataluck-admin-token": token,
          },
        }
      );

      const res = await request.data;

      setPattiArray(res);
    } catch (error) {
      console.log(error);
    }
  }, [date, gameType, baziNo, item.bettingNo, router]);

  useEffect(() => {
    getPattiData();
  }, [getPattiData, activeCatagory, baziNo, gameType]);

  return (
    <Dialog
      open={visible}
      onOpenChange={() => {
        setActiveItem(null);
        setVisible(false);
      }}
    >
      <DialogContent className="max-w-3xl">
        <DialogTitle className="text-center">Bet Data</DialogTitle>
        <DialogHeader>
          {/* Catagory */}

          <div className="flex justify-around items-center my-5">
            <h4
              className={`${
                activeCatagory === "SingleDigit" && "border-b-2"
              } py-2 px-4 cursor-pointer`}
              onClick={() => setActiveCatagory("SingleDigit")}
            >
              Single Digit
            </h4>
            <h4
              className={`${
                activeCatagory === "SinglePanna" && "border-b-2"
              } py-2 px-4 cursor-pointer`}
              onClick={() => setActiveCatagory("SinglePanna")}
            >
              Single Panna
            </h4>
          </div>

          {/* Single Digit */}

          {activeCatagory === "SingleDigit" && (
            <>
              {/* Date */}

              <div className="flex justify-between items-center my-2 mt-5">
                <h4 className="font-semibold">Date:</h4>
                <span className="text-black dark:text-white">{item.date}</span>
              </div>

              {/* Total Diamond */}

              <div className="flex justify-between items-center my-2 mt-5">
                <h4 className="font-semibold">Total Diamond:</h4>
                <span className="text-black dark:text-white">
                  {item.totalDiamond}
                </span>
              </div>

              {/* Betting Number */}

              <div className="flex justify-between items-center my-2 mt-5">
                <h4 className="font-semibold">Betting Number:</h4>
                <span className="text-black dark:text-white">
                  {item.bettingNo}
                </span>
              </div>

              {/* Bazi Number */}

              <div className="flex justify-between items-center my-2 mt-5">
                <h4 className="font-semibold">Bazi Number:</h4>
                <span className="text-black dark:text-white">{baziNo + 1}</span>
              </div>

              {/* Table */}

              <div className="h-80 dark:bg-slate-900 bg-slate-300 mt-5 rounded-md p-2 overflow-y-auto custom-scrollbar">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Mobile No.</TableHead>
                      <TableHead className="text-right">Diamond</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {item.users.map((item: GameUsers, index: number) => (
                      <TableRow key={index} className="cursor-pointer">
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.user}</TableCell>

                        <TableCell className="text-right">
                          {item.diamond}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          {/* Single Panna */}

          {activeCatagory === "SinglePanna" && (
            <>
              {/* Date */}

              <div className="flex justify-between items-center my-2 mt-5">
                <h4 className="font-semibold">Date:</h4>
                <span className="text-black dark:text-white">{item.date}</span>
              </div>

              {/* Betting Number */}

              <div className="flex justify-between items-center my-2 mt-5">
                <h4 className="font-semibold">Betting Type:</h4>
                <span className="text-black dark:text-white">Single Panna</span>
              </div>

              {/* Table */}

              <div className="h-80 dark:bg-slate-900 bg-slate-300 mt-5 rounded-md p-2 overflow-y-auto custom-scrollbar">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Panna</TableHead>
                      <TableHead className="text-right">
                        Total Diamond
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pattiArray.map((item: PattiDataArray, index: number) => (
                      <TableRow key={index} className="cursor-pointer">
                        <TableCell className="font-medium">
                          {item.label}
                        </TableCell>

                        <TableCell className="text-right">
                          {item.totalDiamond}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GameDataModal;
