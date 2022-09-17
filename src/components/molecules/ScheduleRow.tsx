import { type RowCell as RowCellType } from "$types";
import { Grid } from "@mantine/core";
import { RowCell } from "$atoms";
import React from "react";

const ScheduleRow: React.FC<{ columns: RowCellType[]; size: number }> = ({
  columns,
  size,
}) => {
  return (
    <Grid columns={size} gutter={0} sx={{ flexWrap: "nowrap" }}>
      {columns.map((col) => {
        return (
          <Grid.Col
            key={`column-${col.uid}`}
            span={1}
            sx={{ minWidth: "130px" }}
          >
            <RowCell row={col} />
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default ScheduleRow;
