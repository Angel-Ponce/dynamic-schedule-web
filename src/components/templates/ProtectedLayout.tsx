import React, { type ReactNode } from "react";
import { emptyUser, setUser } from "$slices/userSlice";
import { getUserFromLocalStorage } from "$helpers";
import { useAppDispatch, useAppSelector } from "$hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

const ProtectedLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loadingPath, setLoadingPath] = useState(false);
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.user);

  useEffect(() => {
    const redirect = async () => {
      router.events.on("routeChangeComplete", () => {
        setLoadingPath(false);
      });

      let [user, exists, logedIn] = getUserFromLocalStorage();
      if (router.pathname == "/login" || router.pathname == "/register") {
        if (exists && logedIn && user) {
          setLoadingPath(true);
          await router.push("/");
          if (emptyUser(userStore)) {
            dispatch(setUser(user));
          }
          console.log("asdfasdfsadfñljkdsajklñdfsajkldsf");
        }
        setMounted(true);
        return;
      }

      if (!exists || !logedIn) {
        setLoadingPath(true);
        await router.push("/login");
      }

      if (emptyUser(userStore) && user) {
        dispatch(setUser(user));
      }
      setMounted(true);
    };

    redirect();
  }, [router, setMounted, setLoadingPath, dispatch, userStore]);

  return <>{!mounted || loadingPath ? <></> : <>{children}</>}</>;
};

export default ProtectedLayout;
