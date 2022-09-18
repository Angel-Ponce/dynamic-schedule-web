import { type RowCell as RowCellType } from "$types";
import { Grid } from "@mantine/core";
import { RowCell } from "$atoms";
import React from "react";

const ScheduleRow: React.FC<{ row: RowCellType[]; size: number }> = ({
  row,
  size,
}) => {
  return (
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
  );
};

export default ScheduleRow;
