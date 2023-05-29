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
import { IoCheckmark, IoRemove } from "react-icons/io5";

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
  const form = useForm({
    initialValues: {
      title: note?.title || "",
      content: note?.content || "",
      color: note?.color || "",
      important: note?.important || false,
    },
  });
  const theme = useMantineTheme();

  const onUpdate = async () => {
    console.log(form.values);
    setEditing(false);
  };

  const onRemove = async () => {
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
        backgroundColor: theme.fn.rgba(
          note?.color || theme.colors.gray[6],
          0.3
        ),
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
          />
        </Box>
      )}

      {editing && (
        <Box className="w-full flex justify-end items-center gap-3 mt-5">
          <ActionIcon
            size="lg"
            color="green"
            variant="light"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate();
            }}
          >
            <IoCheckmark className="text-xl" />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="red"
            variant="light"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <IoRemove className="text-xl" />
          </ActionIcon>
        </Box>
      )}
    </Box>
  );
};

export default Note;
