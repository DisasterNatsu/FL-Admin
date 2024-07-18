import React, { useState } from "react";
import Cookies from "js-cookie";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DateFormatterQuery } from "../helpers/QueryDate";
import { toast } from "@/components/ui/use-toast";
import { Axios } from "@/utils/AxiosConfig";

const RechargeModal = ({ visible, setVisible }: RechargeModalType) => {
  const [mobileNo, setMobileNo] = useState<string | undefined>();
  const [diamond, setDiamond] = useState<number | undefined>();

  const date = DateFormatterQuery();

  const handleSubmit = async () => {
    // Error Handling

    if (!mobileNo || mobileNo === undefined) {
      return toast({
        title: "Enter Mobile Number",
        variant: "destructive",
      });
    }

    if (!diamond || diamond === undefined) {
      return toast({
        title: "Please enter Diamond Amount",
        variant: "destructive",
      });
    }

    if (mobileNo.length < 10 || mobileNo.length > 10) {
      return toast({
        title: "Invalid Mobile No",
        variant: "destructive",
      });
    }

    try {
      const data = { mobileNo: "+91" + mobileNo, amount: diamond, date };

      const token = Cookies.get("fl-admin-token");

      const request = await Axios.post(
        "/admin/assign-coin-without-request",
        data,
        {
          headers: {
            "fataluck-admin-token": token,
          },
        }
      );

      const res = await request.data;

      return toast({
        title: res.message,
        description: `Diamonds: ${res.amount}`,
      });
    } catch (error) {
      console.log(error);

      return toast({
        title: "Server Error",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={visible} onOpenChange={() => setVisible(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Don&apos;t add Country Code in Phone No. field!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mobileNo" className="text-right">
              Phone No.
            </Label>
            <Input
              id="mobileNo"
              className="col-span-3"
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="diamond" className="text-right">
              Diamond
            </Label>
            <Input
              id="diamond"
              className="col-span-3"
              type="number"
              value={diamond === undefined || diamond === 0 ? "" : diamond}
              onChange={(e) => setDiamond(Number(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RechargeModal;
