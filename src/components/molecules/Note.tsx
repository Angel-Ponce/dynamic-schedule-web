import { Note } from "$types";
import { FC } from "react";
import { Box, Title, Text } from "@mantine/core";

const Note: FC<{ note: Note; loading?: boolean }> = ({
  note,
  loading = false,
}) => {
  return (
    <Box className="w-64 h-auto rounded-xl flex flex-col gap-2 p-6 relative">
      <Title order={4}>{note.title}</Title>
      <Text>{note.content}</Text>
      {note.important && (
        <Box className="absolute -top-1 -right-1 rounded-full w-3 h-3 bg-blue-600"></Box>
      )}
      <Box
        className="absolute w-full h-full top-0 left-0 -z-10 opacity-30 rounded-xl"
        sx={{ backgroundColor: note.color }}
      />
    </Box>
  );
};

export default Note;
