import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsers, FaGamepad, FaGooglePay } from "react-icons/fa";
import { FaDice, FaMoneyBillTransfer } from "react-icons/fa6";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

export const SideNavData = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    title: "Games",
    link: "/games",
    icon: FaGamepad,
  },
  {
    title: "Recharges",
    link: "/recharges",
    icon: FaMoneyBillTransfer,
    gap: true,
  },
  {
    title: "Users",
    link: "/users",
    icon: FaUsers,
  },
  {
    title: "Bets",
    link: "/bets",
    icon: FaDice,
  },
  {
    title: "Results",
    link: "/results",
    icon: RiMoneyRupeeCircleLine,
  },
  {
    title: "Records",
    link: "/records",
    icon: FaGooglePay,
  },
];
