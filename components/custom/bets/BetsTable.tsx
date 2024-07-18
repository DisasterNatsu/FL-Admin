import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";

import { DateFormatterQuery } from "../helpers/QueryDate";
import { Axios } from "@/utils/AxiosConfig";
import { LiveLinks, LivePostLink } from "./LiveLink";
import { Button } from "@/components/ui/button";
import Loading from "../shared/Loading";
import LiveGameNoModal from "./LiveGameNoModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserModal from "./UserModal";

const BetsTable = ({ activeCatagory }: { activeCatagory: string }) => {
  const [gameNumber, setGameNumber] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<boolean>(false);
  const [liveGameNo, setLiveGameNo] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<Users[]>([]);
  const [betData, setBetData] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [visible2, setVisible2] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);

  const isSunday = new Date().getDay() === 0;
  const arraySize = activeCatagory === "OpenClose" ? 2 : isSunday ? 4 : 8;

  const date = DateFormatterQuery();

  const getGameStatus = useCallback(async () => {
    setLoading(true);
    try {
      const linkBlob = LiveLinks(activeCatagory);
      const data = await Axios.get(`/users/${linkBlob}/${date}`);
      const res = await data.data;

      if (!res.live) {
        setLoading(false);
        return setGameStatus(res.live);
      }

      console.log(res);
      setGameStatus(res.live);
      setLiveGameNo(res.getLiveGame.currentGameNumber);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [activeCatagory, date]);

  const setGameToLive = async () => {
    const linkBlob = LivePostLink(activeCatagory);

    try {
      const data = { date, gameNo: 0 };
      const token = Cookies.get("fl-admin-token");

      const req = await Axios.post(`/admin/${linkBlob}`, data, {
        headers: { "fataluck-admin-token": token },
      });

      const res = await req.data;
      if (req.status === 200) setGameStatus(res.open);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getGameBets = useCallback(async () => {
    setLoading2(true);
    try {
      const token = Cookies.get("fl-admin-token");

      const req = await Axios.get(
        `/admin/get-game-data/${date}/${activeCatagory}/${gameNumber}/Single-Digit`,
        { headers: { "fataluck-admin-token": token } }
      );

      const res = await req.data;
      console.log(res);
      setBetData(res);
      setLoading2(false);
    } catch (error) {
      console.log(error);
      setLoading2(false);
    }
  }, [activeCatagory, date, gameNumber]);

  useEffect(() => {
    getGameStatus();
  }, [getGameStatus]);

  useEffect(() => {
    getGameBets();
  }, [getGameBets]);

  if (loading || loading2) {
    return <Loading />;
  }

  return (
    <div className="px-5 mx-auto">
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

      {/* Modal */}

      {gameStatus && (
        <LiveGameNoModal
          visible={visible}
          setVisible={setVisible}
          activeGameType={activeCatagory}
          currentGameNo={liveGameNo}
          setLiveGameNo={setLiveGameNo}
        />
      )}

      {activeUsers && (
        <UserModal
          visible={visible2}
          setVisible={setVisible2}
          users={activeUsers}
        />
      )}

      {/* Status */}

      {/* Luck Bazar */}

      {activeCatagory === "LuckBazar" && (
        <div className="my-5 flex flex-col items-center justify-center space-y-1">
          <div className="flex items-center justify-center space-x-3">
            <h1 className="text-lg">Luck Bazar Status:</h1>
            <span
              className={`text-lg ${
                gameStatus ? "text-green-500" : "text-red-600"
              }`}
            >
              {gameStatus ? "Live" : "Closed"}
            </span>
          </div>
          {!gameStatus ? (
            <Button
              className="bg-lime-300 font-semibold hover:bg-lime-400 text-black"
              onClick={setGameToLive}
            >
              Take it live
            </Button>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-3">
                <h1 className="text-base">Current Game No:</h1>
                <span className="text-base">{liveGameNo + 1}</span>

                <Button
                  className="bg-lime-300 font-semibold hover:bg-lime-400 text-black"
                  onClick={() => setVisible(true)}
                >
                  Change Number
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Kolkata FF */}

      {activeCatagory === "Fatafat" && (
        <div className="my-5 flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <h1 className="text-lg">Kolkata FF Status:</h1>
            <span
              className={`text-lg ${
                gameStatus ? "text-green-500" : "text-red-600"
              }`}
            >
              {gameStatus ? "Live" : "Closed"}
            </span>
          </div>
          {!gameStatus ? (
            <Button
              className="bg-lime-300 font-semibold hover:bg-lime-400 text-black"
              onClick={setGameToLive}
            >
              Take it live
            </Button>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-3">
                <h1 className="text-base">Current Game No:</h1>
                <span className="text-base">{liveGameNo + 1}</span>

                <Button
                  className="bg-lime-300 font-semibold hover:bg-lime-400 text-black"
                  onClick={() => setVisible(true)}
                >
                  Change Number
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Smart Matka */}

      {activeCatagory === "SmartMatka" && (
        <div className="my-5 flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <h1 className="text-lg">Smart Matka Status:</h1>
            <span
              className={`text-lg ${
                gameStatus ? "text-green-500" : "text-red-600"
              }`}
            >
              {gameStatus ? "Live" : "Closed"}
            </span>
          </div>
          {!gameStatus ? (
            <Button
              className="bg-lime-300 font-semibold hover:bg-lime-400 text-black"
              onClick={setGameToLive}
            >
              Take it live
            </Button>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-3">
                <h1 className="text-base">Current Game No:</h1>
                <span className="text-base">{liveGameNo + 1}</span>

                <Button
                  className="bg-lime-300 font-semibold hover:bg-lime-400 text-black"
                  onClick={() => setVisible(true)}
                >
                  Change Number
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Open Close */}

      {activeCatagory === "OpenClose" && (
        <div className="my-5 flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <h1 className="text-lg">Open Close Status:</h1>
            <span
              className={`text-lg ${
                gameStatus ? "text-green-500" : "text-red-600"
              }`}
            >
              {gameStatus ? "Live" : "Closed"}
            </span>
          </div>
          {!gameStatus ? (
            <Button
              className="bg-lime-300 font-semibold hover:bg-lime-400 text-black"
              onClick={setGameToLive}
            >
              Take it live
            </Button>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-3">
                <h1 className="text-base">Current Game No:</h1>
                <span className="text-base">{liveGameNo + 1}</span>

                <Button
                  className="bg-lime-300 font-semibold hover:bg-lime-400 text-black"
                  onClick={() => setVisible(true)}
                >
                  Change Number
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {betData.length > 0 ? (
        <div className="xl:w-[80%] md:w-[100%] mx-auto border-2 rounded-md mt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Betting Number</TableHead>
                <TableHead>Bet Count</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {betData.map((item: BetResponseData, index: number) => {
                return (
                  <TableRow
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                      setActiveUsers(item.users);
                      setVisible2(true);
                    }}
                  >
                    <TableCell className="font-medium">
                      {item.bettingNo}
                    </TableCell>
                    <TableCell>{item.users.length}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="text-right">
                      {item.totalDiamond}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <h2 className="text-center">No Bets</h2>
      )}
    </div>
  );
};

export default BetsTable;
