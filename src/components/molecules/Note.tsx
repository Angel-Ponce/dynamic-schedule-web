import { Note } from "$types";
import { FC, useState } from "react";
import {
  Box,
  Title,
  Text,
  Skeleton,
  TextInput,
  Textarea,
  DEFAULT_THEME,
  ColorPicker,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { Chance } from "chance";
import { useForm } from "@mantine/form";
import { IoCheckmarkCircle, IoTrash } from "react-icons/io5";
import { updateNote } from "$app/firebase/notes/updateNote";

const colors = [
  ...Object.keys(DEFAULT_THEME.colors).map(
    (color) => DEFAULT_THEME.colors[color][6]
  ),
];

const Note: FC<{ note?: Note; loading?: boolean }> = ({
  note,
  loading = false,
}) => {
  const [editing, setEditing] = useState(false);
  const [color, setColor] = useState(note?.color);
  const form = useForm({
    initialValues: {
      title: note?.title || "",
      content: note?.content || "",
      color: color || "",
      important: note?.important || false,
    },
  });
  const theme = useMantineTheme();

  const onUpdate = async () => {
    await updateNote({ ...form.values, uid: note?.uid || "" });
    setEditing(false);
  };

  const onDelete = async () => {
    setEditing(false);
  };

  if (loading) {
    return (
      <Skeleton
        className="w-60 rounded-xl my-3"
        sx={{ height: new Chance().integer({ min: 100, max: 300 }) }}
      />
    );
  }

  return (
    <Box
      className="cursor-pointer min-w-[240px] max-w-[240px] min-h-[100px] max-h-[300px] overflow-y-auto h-auto rounded-xl inline-flex flex-col gap-2 p-6 relative my-3"
      onClick={() => setEditing(true)}
      sx={{
        backgroundColor: theme.fn.rgba(color || theme.colors.gray[6], 0.2),
      }}
    >
      {!editing && (
        <Title className="max-w-max" order={4}>
          {note?.title}
        </Title>
      )}
      {editing && (
        <TextInput
          placeholder="Escribe algo"
          variant="unstyled"
          {...form.getInputProps("title")}
        />
      )}
      {!editing && <Text className="max-w-max">{note?.content}</Text>}
      {editing && (
        <Textarea
          placeholder="Completa tu nota"
          variant="unstyled"
          {...form.getInputProps("content")}
        />
      )}
      {note?.important && (
        <Box className="absolute -top-1 -right-1 rounded-full w-3 h-3 bg-blue-600"></Box>
      )}
      {editing && (
        <Box className="w-full flex justify-center">
          <ColorPicker
            className="w-3/4"
            withPicker={false}
            swatches={colors}
            swatchesPerRow={7}
            {...form.getInputProps("color")}
            onChange={(e) => setColor(e)}
          />
        </Box>
      )}

      {editing && (
        <Box className="absolute top-2 right-2 flex justify-end items-center">
          <ActionIcon
            size="md"
            variant="transparent"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate();
            }}
          >
            <IoCheckmarkCircle className="text-xl" color="#2F9E44" />
          </ActionIcon>
          <ActionIcon
            size="md"
            variant="transparent"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <IoTrash className="text-xl" color="#FA5252" />
          </ActionIcon>
        </Box>
      )}
    </Box>
  );
};

export default Note;
