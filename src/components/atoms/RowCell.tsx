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
          cell.type != "course"
            ? colorScheme == "light"
              ? theme.colors.gray[0]
              : theme.colors.gray[8]
            : cell.bgColor || "transparent",
        transitionDuration: "0.15s",
        cursor: cell.type != "header" ? "pointer" : "default",
        "&:hover": {
          border: "2px solid",
          borderColor:
            cell.type != "header"
              ? theme.colors.blue[5]
              : colorScheme == "light"
              ? theme.colors.gray[1]
              : theme.colors.gray[9],
        },
      })}
      py={8}
    >
      <Text
        size={cell.type != "header" ? "xs" : "sm"}
        align="center"
        weight={cell.type != "course" ? 600 : 400}
        sx={{
          color:
            cell.textColor && cell.type == "course"
              ? cell.textColor
              : undefined,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {cell.title}
      </Text>
    </Box>
  );
};

export default RowCell;
