import { Note } from "$types";
import { FC } from "react";
import { Box, Title, Text, Skeleton } from "@mantine/core";
import { Chance } from "chance";

const Note: FC<{ note?: Note; loading?: boolean }> = ({
  note,
  loading = false,
}) => {
  if (loading) {
    return (
      <Skeleton
        className="w-60 rounded-xl my-3"
        sx={{ height: new Chance().integer({ min: 100, max: 300 }) }}
      />
    );
  }

  return (
    <Box className="min-w-[240px] min-h-[100px] max-h-[300px] overflow-auto h-auto rounded-xl inline-flex flex-col gap-2 p-6 relative my-3">
      <Title className="max-w-max" order={4}>
        {note?.title}
      </Title>
      <Text className="max-w-max">{note?.content}</Text>
      {note?.important && (
        <Box className="absolute -top-1 -right-1 rounded-full w-3 h-3 bg-blue-600"></Box>
      )}
      <Box
        className="absolute w-full h-full top-0 left-0 -z-10 opacity-30 rounded-xl"
        sx={{ backgroundColor: note?.color }}
      />
    </Box>
  );
};

export default Note;
