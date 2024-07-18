"use client";

import { CheckAuth } from "@/components/custom/hooks/CheckAuth";
import Loading from "@/components/custom/shared/Loading";
import { ModeToggle } from "@/components/custom/shared/ThemeToggle";
import SideNav from "@/components/custom/shared/SideNav";
import { setUser } from "@/redux/slices/AuthSlice";
import { RootState } from "@/redux/store/store";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  // initiate router
  const Router = useRouter();

  // get pathName
  const pathName = usePathname();

  // declare dispatch
  const dispatch = useDispatch();

  // get the current nav state
  const open = useSelector((state: RootState) => state.navState.open);

  // check if logged in
  const checkIfLoggedIn = useCallback(async () => {
    setLoading(true);

    const valid: User = await CheckAuth();

    if (valid.authenticated) {
      setLoading(false);
      dispatch(setUser({ email: valid.email }));
    } else {
      Router.replace("/");
    }
  }, [Router, dispatch]);

  useEffect(() => {
    checkIfLoggedIn();
  }, [checkIfLoggedIn, pathName]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="h-screen fixed">
        <SideNav />
      </div>
      <div
        className={`${
          open ? "ml-72" : "ml-20"
        } duration-300 text-2xl flex-1 h-screen cursor-default select-none`}
      >
        <ModeToggle />
        {children}
      </div>
    </div>
  );
};

export default Layout;
