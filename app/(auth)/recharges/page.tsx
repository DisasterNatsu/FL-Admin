"use client";

import Header from "@/components/custom/shared/Header";
import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/components/custom/shared/Loading";
import { DateFormatterQuery } from "@/components/custom/helpers/QueryDate";
import { Axios } from "@/utils/AxiosConfig";
import ScreenshotModal from "@/components/custom/game/ScreenshotModal";
import RechargeModal from "@/components/custom/recharges/RechargeModal";

const Recharges = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeCatagory, setActiveCatagory] = useState<string>("Recharges");
  const [withdrawData, setWithdrawData] = useState<RechargeWithdrawType[]>([]);
  const [rechargeData, setRechargeData] = useState<RechargeWithdrawType[]>([]);
  const [totalWithdraw, setTotalWithdraw] = useState<number>();
  const [totalRecharge, setTotalRecharge] = useState<number>();

  const [activeItem, setActiveItem] = useState<RechargeWithdrawType>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showRechargeModal, setShowRechargeModal] = useState<boolean>(false);

  const date = DateFormatterQuery();

  const fetchRechargeData = useCallback(async () => {
    const token = Cookies.get("fl-admin-token");

    try {
      const req = await Axios.get(`/admin/all-withdraw-requests/${date}`, {
        headers: {
          "fataluck-admin-token": token,
        },
      });

      const req2 = await Axios.get(`/admin/all-recharge-requests/${date}`, {
        headers: {
          "fataluck-admin-token": token,
        },
      });

      const res = await req.data;
      const res2 = await req2.data;

      setWithdrawData(res);
      setRechargeData(res2);

      if (res.length > 0) {
        const totalAmount = res.reduce(
          (total: number, withdraw: RechargeWithdrawType) =>
            total + withdraw.diamond,
          0
        );

        setTotalWithdraw(totalAmount);
      }

      if (res2.length > 0) {
        const totalAmount = res2.reduce(
          (total: number, withdraw: RechargeWithdrawType) =>
            total + withdraw.diamond,
          0
        );

        setTotalRecharge(totalAmount);
      }
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    await fetchRechargeData();

    setLoading(false);
  }, [fetchRechargeData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <Header title="Recharges" />

      <div className="flex justify-center items-center space-x-10">
        <button
          className={`px-5 py-3 mt-5 rounded-3xl border-gray-400 border-2 ${
            activeCatagory === "Recharges" && "bg-lime-300 text-black"
          }`}
          onClick={() => setActiveCatagory("Recharges")}
        >
          Recharges
        </button>
        <button
          className={`px-5 py-3 mt-5 rounded-3xl border-gray-400 border-2 ${
            activeCatagory === "Withdraws" && "bg-lime-300 text-black"
          }`}
          onClick={() => setActiveCatagory("Withdraws")}
        >
          Withdraws
        </button>

        <button
          className={`px-5 py-3 mt-5 rounded-3xl border-black border-2 bg-lime-600 text-black`}
          onClick={() => setShowRechargeModal(true)}
        >
          Custom Recharge
        </button>
      </div>

      {activeItem && (
        <ScreenshotModal
          visible={showModal}
          setVisible={setShowModal}
          item={activeItem}
          fetchData={fetchData}
        />
      )}

      <RechargeModal
        visible={showRechargeModal}
        setVisible={setShowRechargeModal}
      />

      <div className="xl:w-[80%] md:w-[100%] mx-auto border-2 rounded-md mt-5">
        {activeCatagory === "Recharges" && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Phone No.</TableHead>
                <TableHead>Screenshot</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rechargeData.map((item: RechargeWithdrawType, index: number) => {
                return (
                  <TableRow
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                      setActiveItem(item);
                      setShowModal(true);
                    }}
                  >
                    <TableCell className="font-medium">{item._id}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.mobileNo}</TableCell>
                    <TableCell
                      className={`${
                        item.screenshot ? "text-green-500" : "text-red-600"
                      }`}
                    >
                      {item.screenshot ? "Present" : "Not Provided"}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.diamond}₹
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className="text-right">
                  {totalRecharge ? totalRecharge : 0}₹
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}

        {activeCatagory === "Withdraws" && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Phone No.</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawData.map((item: RechargeWithdrawType, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item._id}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.mobileNo}</TableCell>
                    <TableCell className="text-right">
                      {item.diamond}₹
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">{totalWithdraw}₹</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </main>
  );
};

export default Recharges;
