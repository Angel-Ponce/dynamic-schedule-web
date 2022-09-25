import { getSwatches } from "$helpers";
import { useAppSelector } from "$hooks";
import { emptyClipboard } from "$slices/clipboard";
import { type RowCell as RowCellType } from "$types";
import {
  ActionIcon,
  Box,
  Text,
  useMantineColorScheme,
  Group,
  Modal,
  Stack,
  TextInput,
  ColorInput,
  SimpleGrid,
  Button,
  Input,
} from "@mantine/core";
import { TimeRangeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  IoPencil,
  IoCopyOutline,
  IoNewspaperOutline,
  IoTimeOutline,
} from "react-icons/io5";

const RowCell: React.FC<{
  cell: RowCellType;
}> = ({ cell }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const clipboard = useAppSelector((state) => state.clipboard);
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      className="group"
      sx={(theme) => ({
        position: "relative",
        width: "100%",
        minHeight: "40px",
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
    >
      {cell.type != "header" && (
        <Group
          sx={{ position: "absolute", top: 0, right: 0 }}
          spacing={1}
          className="hidden group-hover:flex"
        >
          <ActionIcon
            variant="light"
            size="xs"
            color="yellow"
            onClick={() => setModalOpen(true)}
          >
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
        size={cell.type != "header" ? "sm" : "sm"}
        align="center"
        weight={cell.type != "course" ? 600 : 400}
        sx={{
          color:
            cell.textColor && cell.type == "course"
              ? cell.textColor
              : undefined,
          whiteSpace: "nowrap",
          overflow: "hidden",
          fontFamily: cell.fontFamily || undefined,
        }}
      >
        {cell.title ||
          `${cell.time?.[0]?.getHours()}:${cell.time?.[0]?.getMinutes()} - ${cell.time?.[1]?.getHours()}:${cell.time?.[1]?.getMinutes()}`}
      </Text>
      {cell.type != "header" && (
        <EditModal open={modalOpen} setOpen={setModalOpen} cell={cell} />
      )}
    </Box>
  );
};

const EditModal: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cell: RowCellType;
}> = ({ open, setOpen, cell }) => {
  const hourForm = useForm({
    initialValues: {
      time: cell.time || undefined,
    },
  });

  const courseForm = useForm({
    initialValues: {
      title: cell.title || undefined,
      proffessor: cell.professor || undefined,
      href: cell.href || undefined,
      bgColor: cell.bgColor || undefined,
      textColor: cell.textColor || undefined,
    },
  });

  return (
    <Modal
      zIndex={300}
      opened={open}
      onClose={() => setOpen(false)}
      title="Editar"
      overlayBlur={4}
      overlayOpacity={0.5}
      centered
    >
      <Stack>
        {cell.type == "hour" && (
          <TimeRangeInput
            label="Hora"
            clearable
            icon={<IoTimeOutline />}
            {...hourForm.getInputProps("time")}
          />
        )}

        {cell.type == "course" && (
          <>
            <SimpleGrid cols={2}>
              <TextInput
                label="Título"
                {...courseForm.getInputProps("title")}
              />
              <TextInput
                label="Catedrático"
                {...courseForm.getInputProps("proffessor")}
              />
            </SimpleGrid>
            <TextInput label="Link" {...courseForm.getInputProps("href")} />
            <SimpleGrid cols={2}>
              <ColorInput
                label="Color de fondo"
                withPicker={false}
                swatches={getSwatches()}
                {...courseForm.getInputProps("bgColor")}
              />
              <ColorInput
                label="Color de letra"
                withPicker={false}
                swatches={getSwatches()}
                {...courseForm.getInputProps("textColor")}
              />
            </SimpleGrid>
          </>
        )}
        <Group position="right" className="z-50">
          <Button color="blue">Guardar</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default RowCell;
