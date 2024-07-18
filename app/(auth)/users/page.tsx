import React from "react";
import { cookies } from "next/headers";

import Header from "@/components/custom/shared/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Axios } from "@/utils/AxiosConfig";

const getUsers = async (token: string) => {
  try {
    const req = await Axios.get("/admin/get-all-users", {
      headers: {
        "fataluck-admin-token": token,
      },
    });

    const users = await req.data;

    return users;
  } catch (error) {
    console.log(error);
  }
};

const Users = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get("fl-admin-token")?.value;

  const users = await getUsers(token || "");

  return (
    <main>
      <Header title="Users" />

      <div className="xl:w-[80%] md:w-[100%] mx-auto border-2 rounded-md mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Phone No.</TableHead>
              <TableHead>Diamonds</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-right">Account Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((item: UserDetails, index: number) => {
              return (
                <TableRow key={index} className="cursor-pointer">
                  <TableCell className="font-medium">{item._id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.mobileNo}</TableCell>
                  <TableCell>{item.diamonds}</TableCell>
                  <TableCell>
                    {item.verified ? "Verified" : "Not Verified"}
                  </TableCell>
                  <TableCell className="text-right">Active</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default Users;
