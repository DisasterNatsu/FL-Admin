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
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import { DateFormatterQuery } from "../helpers/QueryDate";
import { LivePostLink } from "./LiveLink";
import { Axios } from "@/utils/AxiosConfig";

const LiveGameNoModal = ({
  visible,
  setVisible,
  activeGameType,
  currentGameNo,
  setLiveGameNo,
}: LiveGameModalType) => {
  const [gameNo, setGameNo] = useState<number>(currentGameNo);
  const [open, setOpen] = useState<boolean>(false);

  const date = DateFormatterQuery();

  const isSunday = new Date().getDay() === 0;
  const arraySize = activeGameType === "OpenClose" ? 2 : isSunday ? 4 : 8;

  const postLiveGameNumber = async () => {
    // Checck for any changes

    if (gameNo === currentGameNo) {
      return toast({
        title: "Opps",
        description: "No Changes were made!",
        variant: "destructive",
      });
    }

    const linkBlob = LivePostLink(activeGameType);

    try {
      const data = {
        date,
        gameNo,
      };

      const token = Cookies.get("fl-admin-token");

      const request = await Axios.post(`/admin/${linkBlob}`, data, {
        headers: {
          "fataluck-admin-token": token,
        },
      });

      const res = await request.data;

      console.log(res);

      setVisible(false);

      setLiveGameNo(res.currentGameNumber);

      return toast({
        title: "Success",
        description: `The Current Game No set to ${res.currentGameNumber + 1}`,
      });
    } catch (error) {
      console.log(error);
      return toast({
        title: "Error",
        description: `Server Error!`,
        variant: "destructive",
      });
    }
  };

  const closeBets = async () => {
    // Checck for any changes

    if (gameNo === currentGameNo) {
      return toast({
        title: "Opps",
        description: "No Changes were made!",
        variant: "destructive",
      });
    }

    const linkBlob = LivePostLink(activeGameType);

    try {
      const data = {
        date,
        gameNo: 8,
      };

      const token = Cookies.get("fl-admin-token");

      const request = await Axios.post(`/admin/${linkBlob}`, data, {
        headers: {
          "fataluck-admin-token": token,
        },
      });

      const res = await request.data;

      console.log(res);

      setVisible(false);

      setLiveGameNo(res.currentGameNumber);

      return toast({
        title: "Success",
        description: `The Bet Closed for today!`,
      });
    } catch (error) {
      console.log(error);
      return toast({
        title: "Error",
        description: `Server Error!`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={visible} onOpenChange={() => setVisible(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Live Game Number</DialogTitle>
          <DialogDescription>
            Make changes to Live Game No. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Game Type</Label>
            <Input
              id="name"
              value={activeGameType}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Game No.</Label>
            <div className="col-span-3">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {gameNo + 1}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {Array.from({ length: arraySize }).map((_, index) => (
                          <CommandItem
                            key={index}
                            value={index.toString()}
                            onSelect={() => {
                              setGameNo(index);
                              setOpen(false);
                            }}
                          >
                            {index + 1}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                gameNo === index ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant={"destructive"} onClick={closeBets}>
            Close for Today
          </Button>
          <Button onClick={postLiveGameNumber}>Save changes</Button>
        </DialogFooter>
        <p className="text-xs font-semibold">
          <span>Note: </span>
          <span className="text-red-600">
            Setting Live Game No. to ({gameNo + 2}) will mean users won&apos;t
            be able to bet on ({gameNo + 1}) .
          </span>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LiveGameNoModal;
