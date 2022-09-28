import { useSchedules } from "$hooks";
import React, { type ReactNode } from "react";
import { GeneralLoader } from "$templates";

const LoadGeneralData: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading] = useSchedules();

  if (loading) return <GeneralLoader />;

  return <>{children}</>;
};

export default LoadGeneralData;
