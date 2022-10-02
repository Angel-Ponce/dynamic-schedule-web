import { useAppSelector, useSchedules } from "$hooks";
import React, { type ReactNode } from "react";
import { GeneralLoader } from "$templates";
import { emptyUser } from "$slices/userSlice";

const LoadGeneralData: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAppSelector((state) => state.user);

  if (emptyUser(user)) return <>{children}</>;

  return <GeneralData>{children}</GeneralData>;
};

const GeneralData: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading] = useSchedules();

  if (loading) return <GeneralLoader />;

  return <>{children}</>;
};

export default LoadGeneralData;
