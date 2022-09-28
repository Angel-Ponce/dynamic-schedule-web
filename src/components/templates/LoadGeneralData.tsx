import { useSchedules } from "$hooks";
import React, { type ReactNode } from "react";

const LoadGeneralData: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [, loading] = useSchedules();

  if (loading) return <></>;

  return <>{children}</>;
};

export { LoadGeneralData };
