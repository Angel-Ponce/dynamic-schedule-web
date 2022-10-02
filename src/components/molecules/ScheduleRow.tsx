import { type ScheduleRow as ScheduleRowType } from "$types";
import { Grid, HoverCard, Group, ActionIcon } from "@mantine/core";
import { RowCell } from "$atoms";
import { IoClose, IoAdd } from "react-icons/io5";
import React from "react";
import { addRow, deleteRow } from "$app/firebase/schedule";
import { useAppSelector } from "$hooks";

const ScheduleRow: React.FC<{
  row: ScheduleRowType;
  size: number;
  index: number;
}> = ({ row, size, index }) => {
  const schedule = useAppSelector((state) => state.schedule);

  const handleRowAdded = async () => {
    await addRow(schedule, index);
  };
  const handleRowDeleted = async (uid: string) => {
    await deleteRow(schedule, uid);
  };

  return (
    <HoverCard position="bottom-end" offset={0} openDelay={0} withinPortal>
      <HoverCard.Target>
        <Grid columns={size} gutter={0} sx={{ flexWrap: "nowrap" }}>
          {row.cells
            .filter((cell) => {
              if (cell.order == 0) return false;

              if (schedule.hiddeWeek && cell.order > 0 && cell.order < 6) {
                return false;
              }

              if (schedule.hiddeSaturday && cell.order == 6) {
                return false;
              }

              if (schedule.hiddeSunday && cell.order == 7) {
                return false;
              }

              return true;
            })
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
          <ActionIcon
            variant="light"
            size="md"
            color="green"
            onClick={handleRowAdded}
          >
            <IoAdd />
          </ActionIcon>
          {index != -1 && (
            <ActionIcon
              variant="light"
              color="red"
              size="md"
              onClick={() => handleRowDeleted(row.uid)}
            >
              <IoClose />
            </ActionIcon>
          )}
        </Group>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default ScheduleRow;
