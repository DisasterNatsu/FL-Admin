"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DNA } from "react-loader-spinner";
import Typewriter from "typewriter-effect";
import Cookies from "js-cookie";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/custom/shared/Header";
import { Axios } from "@/utils/AxiosConfig";

const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
});

const Records = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [wins, setWins] = useState<WinLossType[]>([]);
  const [losses, setLosses] = useState<WinLossType[]>([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    // format the date in the way required

    const formattedDate = format(data.date, "dd-MM-yyyy");

    try {
      const token = Cookies.get("fl-admin-token");

      if (!token) {
        return router.push("/");
      }

      const req = await Axios.get(`/admin/win-loss/${formattedDate}`, {
        headers: {
          "fataluck-admin-token": token,
        },
      });

      const { wins, loss } = await req.data;

      setWins(wins);
      setLosses(loss);

      setLoading(false);

      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Reloaded</code>
          </pre>
        ),
      });
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const totalWin = wins.reduce((acc, item) => acc + item.diamond, 0);
  const totalLoss = losses.reduce((acc, item) => acc + item.diamond, 0);

  return (
    <main className="h-screen flex flex-col">
      <Header title="Records" />

      <div className="flex items-center justify-center mt-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex space-x-4"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

      {loading ? (
        <div className="flex-1 flex space-x-2 items-center justify-center">
          <DNA height="80" width="80" key="loader" ariaLabel="loading" />
          <Typewriter
            options={{
              strings: ["Loading..."],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      ) : (
        <div className="flex-1 flex space-x-10 items-start mt-10 justify-center overflow-y-scroll px-5 mb-2">
          {/* Left Win Section */}

          <div className="border-2 w-1/2 rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Game</TableHead>
                  <TableHead>Bazi No.</TableHead>
                  <TableHead>Bet No.</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wins.length > 0 &&
                  wins.map((item: WinLossType, index: number) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">{item.date}</TableCell>
                      <TableCell>{item.user.mobileNo}</TableCell>
                      <TableCell>{item.gameType}</TableCell>
                      <TableCell>{item.baziNo + 1}</TableCell>
                      <TableCell>{item.bettingNo}</TableCell>
                      <TableCell className="text-right text-green-500">
                        {item.diamond}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5}>Total</TableCell>
                  <TableCell className="text-right">{totalWin}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          {/* Right Loss Section */}

          <div className="border-2 w-1/2 rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Game</TableHead>
                  <TableHead>Bazi No.</TableHead>
                  <TableHead>Bet No.</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {losses.length > 0 &&
                  losses.map((item: WinLossType, index: number) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">{item.date}</TableCell>
                      <TableCell>{item.user.mobileNo}</TableCell>
                      <TableCell>{item.gameType}</TableCell>
                      <TableCell>{item.baziNo + 1}</TableCell>
                      <TableCell>{item.bettingNo}</TableCell>
                      <TableCell className="text-right text-red-500 font-semibold">
                        {item.diamond}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5}>Total</TableCell>
                  <TableCell className="text-right">{totalLoss}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      )}
    </main>
  );
};

export default Records;
