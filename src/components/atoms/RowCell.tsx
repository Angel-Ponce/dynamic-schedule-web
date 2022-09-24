import { useAppSelector } from "$hooks";
import { emptyClipboard } from "$slices/clipboard";
import { type RowCell as RowCellType } from "$types";
import {
  ActionIcon,
  Box,
  Text,
  useMantineColorScheme,
  Group,
} from "@mantine/core";
import React, { useState } from "react";
import { IoPencil, IoCopyOutline, IoNewspaperOutline } from "react-icons/io5";

const RowCell: React.FC<{
  cell: RowCellType;
}> = ({ cell }) => {
  const { colorScheme } = useMantineColorScheme();
  const [hoverCell, setHoverCell] = useState<boolean>(false);
  const clipboard = useAppSelector((state) => state.clipboard);

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
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
      onMouseEnter={() => setHoverCell(true)}
      onMouseLeave={() => setHoverCell(false)}
    >
      {cell.type != "header" && hoverCell && (
        <Group sx={{ position: "absolute", top: 0, right: 0 }} spacing={1}>
          <ActionIcon variant="light" size="xs" color="yellow">
            <IoPencil />
          </ActionIcon>
          {cell.type != "hour" && (
            <>
              <ActionIcon variant="light" size="xs" color="blue">
                <IoCopyOutline />
              </ActionIcon>
              {!emptyClipboard(clipboard) && (
                <ActionIcon variant="light" size="xs" color="cyan">
                  <IoNewspaperOutline />
                </ActionIcon>
              )}
            </>
          )}
        </Group>
      )}
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
