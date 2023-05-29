import { createNote } from "$app/firebase/notes";
import { useAppSelector } from "$hooks";
import { Box, TextInput, ActionIcon, DEFAULT_THEME } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Chance } from "chance";
import { IoAdd } from "react-icons/io5";

const colors = [
  ...Object.keys(DEFAULT_THEME.colors).map(
    (color) => DEFAULT_THEME.colors[color][6]
  ),
];

const CreateNote = () => {
  const user = useAppSelector((state) => state.user);
  const form = useForm({
    initialValues: {
      title: "",
    },
  });

  const onSubmit = async () => {
    await createNote({
      title: form.values.title,
      userUid: user.uid,
      color: colors[new Chance().integer({ min: 0, max: colors.length - 1 })],
    });

    form.reset();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col mb-5 gap-3"
    >
      <Box
        className="w-80 sm:w-96 rounded-xl flex gap-3 items-center"
        sx={(theme) => ({})}
      >
        <TextInput
          placeholder="Escribe algo"
          className="flex-1 h-full"
          variant="default"
          {...form.getInputProps("title")}
        />
        <ActionIcon variant="light" size="lg" color="blue" onClick={onSubmit}>
          <IoAdd className="text-xl" />
        </ActionIcon>
      </Box>
    </form>
  );
};

export default CreateNote;
