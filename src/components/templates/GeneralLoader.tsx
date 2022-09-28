import React from "react";
import { Loader, Center } from "@mantine/core";

const GeneralLoader: React.FC = () => {
  return (
    <Center className="w-screen h-screen">
      <Loader />
    </Center>
  );
};

export default GeneralLoader;
