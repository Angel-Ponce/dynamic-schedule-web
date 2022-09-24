import { type RowCell as RowCellType } from "$types";
import { Grid, HoverCard, Group, ActionIcon } from "@mantine/core";
import { RowCell } from "$atoms";
import { IoClose, IoAdd } from "react-icons/io5";
import React from "react";

const ScheduleRow: React.FC<{ row: RowCellType[]; size: number }> = ({
  row,
  size,
}) => {
  return (
    <HoverCard position="bottom-end" offset={0} openDelay={0}>
      <HoverCard.Target>
        <Grid columns={size} gutter={0} sx={{ flexWrap: "nowrap" }}>
          {row
            .filter((cell) => cell.order != 0)
            .map((cell) => {
              return (
                <Grid.Col
                  key={`column-${cell.uid}`}
                  span={1}
                  sx={{ minWidth: "130px" }}
                >
                  <RowCell cell={cell} />
                </Grid.Col>
              );
            })}
        </Grid>
      </HoverCard.Target>
      <HoverCard.Dropdown sx={{ padding: 0 }}>
        <Group
          spacing={3}
          sx={(theme) => ({
            padding: 5,
            backgroundColor:
              theme.colorScheme == "light"
                ? theme.colors.gray[0]
                : theme.colors.gray[8],
          })}
        >
          <ActionIcon variant="light" size="md" color="green">
            <IoAdd />
          </ActionIcon>
          <ActionIcon variant="light" color="red" size="md">
            <IoClose />
          </ActionIcon>
        </Group>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default ScheduleRow;
