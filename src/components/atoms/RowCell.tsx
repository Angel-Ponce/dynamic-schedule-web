import { type RowCell as RowCellType } from "$types";
import { Box, Text, useMantineColorScheme } from "@mantine/core";
import React from "react";

const RowCell: React.FC<{
  cell: RowCellType;
}> = ({ cell }) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        border: "2px solid",
        borderColor:
          colorScheme == "light" ? theme.colors.gray[1] : theme.colors.gray[9],
        backgroundColor:
          colorScheme == "light" ? theme.colors.gray[1] : theme.colors.gray[9],
      })}
      py="xs"
    >
      <Text align="center" weight={cell.type == "header" ? 600 : 400}>
        {cell.title}
      </Text>
    </Box>
  );
};

export default RowCell;
