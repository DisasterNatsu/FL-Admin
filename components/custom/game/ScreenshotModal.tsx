"use client";

import React, { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
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
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Axios } from "@/utils/AxiosConfig";

const data = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Approved",
    label: "Approved",
  },
  {
    value: "Denied",
    label: "Denied",
  },
];

const ScreenshotModal = ({
  visible,
  setVisible,
  item,
  fetchData,
}: ActiveItemModal) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<statusType>(item.status);

  const [showImage, setShowImage] = useState<boolean>(false);

  const Router = useRouter();

  const submitFunction = async () => {
    // If there are no changes

    if (value === item.status) {
      return toast({
        title: "Opps!",
        description: `You haven\'t made any changes!`,
        variant: "destructive",
      });
    }

    const token = Cookies.get("fl-admin-token");

    if (!token) {
      return Router.replace("/");
    }

    const data = {
      id: item._id,
      mobileNo: item.mobileNo,
    };

    try {
      const request = await Axios.post("/admin/assign-coins", data, {
        headers: {
          "fataluck-admin-token": token,
        },
      });

      const response = await request.data;

      await fetchData();

      return toast({
        title: "Great!",
        description: response.message,
      });
    } catch (error) {
      console.log(error);

      return toast({
        title: "Opps!",
        description: `Server Error Occured!`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={visible} onOpenChange={() => setVisible(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{item._id}</DialogTitle>
          {showImage ? (
            <Image
              src={`http://localhost:8080${item.screenshot}`}
              width={300}
              height={350}
              alt="Screenshot"
              className="cursor-pointer object-contain m-auto w-[100%] h-[80%]"
            />
          ) : (
            <>
              {/* Details */}

              {/* Username */}
              <div className="flex justify-between items-center my-2">
                <h4 className="font-semibold">Username:</h4>
                <span className="text-black dark:text-white">{item.name}</span>
              </div>

              {/* Mobile No */}
              <div className="flex justify-between items-center my-2">
                <h4 className="font-semibold">Mobile No:</h4>
                <span className="text-black dark:text-white">
                  {item.mobileNo}
                </span>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center my-2">
                <h4 className="font-semibold">Status:</h4>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={`w-[200px] justify-between ${
                        value === "Pending"
                          ? "text-orange-500"
                          : value === "Approved"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {value}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          {data.map((data) => (
                            <CommandItem
                              key={data.value}
                              value={data.value}
                              onSelect={(currentValue) => {
                                setValue(currentValue as statusType);
                                setOpen(false);
                              }}
                            >
                              {data.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  value === data.value
                                    ? "opacity-100"
                                    : "opacity-0"
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

              {/* Screenshot */}
              <div className="flex justify-between items-center my-2">
                <h4 className="font-semibold">Screenshot:</h4>
                {item.screenshot ? (
                  <Image
                    src={`http://localhost:8080${item.screenshot}`}
                    width={80}
                    height={120}
                    alt="Screenshot"
                    className="cursor-pointer h-auto"
                    onClick={() => setShowImage(true)}
                  />
                ) : (
                  <span className="text-red-500">Not Present</span>
                )}
              </div>
            </>
          )}
        </DialogHeader>
        <DialogFooter>
          {showImage ? (
            <div className="flex w-full justify-end gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowImage(false)}
              >
                Close
              </Button>

              <Button type="button" variant="default">
                Delete
              </Button>
            </div>
          ) : (
            <div className="flex w-full justify-end gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setVisible(false)}
              >
                Close
              </Button>

              <Button type="button" variant="default" onClick={submitFunction}>
                Submit
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScreenshotModal;
