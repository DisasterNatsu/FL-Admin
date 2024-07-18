import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Button } from "@/components/ui/button";

const UserModal = ({ visible, setVisible, users }: UserModalTypes) => {
  console.log(users);

  return (
    <Dialog open={visible} onOpenChange={() => setVisible(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-scroll h-72">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phone No.</TableHead>
                <TableHead className="text-right">Diamond</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: Users, index: number) => {
                return (
                  <TableRow key={index} className="cursor-pointer">
                    <TableCell className="font-medium">{user.user}</TableCell>

                    <TableCell className="text-right">{user.diamond}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button onClick={() => setVisible(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
