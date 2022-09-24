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
        border: "1px solid",
        borderColor:
          colorScheme == "light" ? theme.colors.gray[1] : theme.colors.gray[9],
        backgroundColor:
          cell.type != "course"
            ? colorScheme == "light"
              ? theme.colors.gray[0]
              : theme.colors.gray[8]
            : cell.bgColor || "transparent",
      })}
      py={8}
    >
      <Text
        size="sm"
        align="center"
        weight={cell.type != "course" ? 600 : 400}
        sx={{
          color:
            cell.textColor && cell.type == "course"
              ? cell.textColor
              : undefined,
        }}
      >
        {cell.title}
      </Text>
    </Box>
  );
};

export default RowCell;
