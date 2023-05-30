import { updateCell } from "$app/firebase/schedule";
import { useAppDispatch, useAppSelector } from "$hooks";
import { emptyClipboard, setClipboard } from "$slices/clipboardSlice";
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
  Checkbox,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  const schedule = useAppSelector((state) => state.schedule);
  const dispatch = useAppDispatch();

  const handleCopyCell = () => {
    dispatch(setClipboard(cell));
  };

  const handlePasteCell = async () => {
    await updateCell(schedule, cell.uid, {
      prevTitle: cell.title,
      time: clipboard.time
        ? [clipboard.time[0] || null, clipboard.time[1] || null]
        : null,
      title: clipboard.title || null,
      professor: clipboard.professor || null,
      href: clipboard.href || null,
      bgColor: clipboard.bgColor || null,
      textColor: clipboard.textColor || null,
      isRecursive: false,
    });
  };

  return (
    <Box
      onDoubleClick={() => {
        if (window && cell.type == "course") {
          window.open(cell.href || "", "_blank");
        }
      }}
      className="group"
      sx={(theme) => ({
        position: "relative",
        userSelect: "none",
        width: "100%",
        minHeight: "40px",
        border: `${schedule.showGrid ? "2px" : "0px"} solid`,
        borderColor:
          colorScheme == "light" ? theme.colors.gray[1] : theme.colors.gray[9],
        backgroundColor:
          cell.type != "course"
            ? colorScheme == "light"
              ? theme.colors.gray[0]
              : theme.colors.gray[8]
            : cell.bgColor || "transparent",
        transitionDuration: "0.15s",
        cursor: cell.type == "course" ? "pointer" : "default",
        "&:hover": {
          border: `${schedule.showGrid ? "2px" : "0px"} solid`,
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
              <ActionIcon
                variant="light"
                size="xs"
                color="blue"
                onClick={handleCopyCell}
              >
                <IoCopyOutline />
              </ActionIcon>
              {!emptyClipboard(clipboard) && (
                <ActionIcon
                  variant="light"
                  size="xs"
                  color="cyan"
                  onClick={handlePasteCell}
                >
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
          fontFamily:
            schedule.fontFamily == "deafult" ? undefined : schedule.fontFamily,
        }}
      >
        {cell.title ||
          (cell.time &&
            cell.time[0] &&
            cell.time[1] &&
            `${cell.time[0]} - ${cell.time[1]}`)}
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
  const schedule = useAppSelector((state) => state.schedule);
  const [loading, setLoading] = useState(false);
  const [isRecursive, setIsRecursive] = useState(true);

  const hourForm = useForm({
    initialValues: {
      from: cell.time ? cell.time[0] || "" : "",
      to: cell.time ? cell.time[1] || "" : "",
    },
  });

  const courseForm = useForm({
    initialValues: {
      title: cell.title || "",
      proffessor: cell.professor || "",
      href: cell.href || "",
      bgColor: cell.bgColor || "",
      textColor: cell.textColor || "",
    },
  });

  useEffect(() => {
    hourForm.setValues({
      from: cell.time ? cell.time[0] || "" : "",
      to: cell.time ? cell.time[1] || "" : "",
    });

    courseForm.setValues({
      title: cell.title || "",
      proffessor: cell.professor || "",
      href: cell.href || "",
      bgColor: cell.bgColor || "",
      textColor: cell.textColor || "",
    });
  }, [cell]);

  const handleUpdate = async () => {
    setLoading(true);

    await updateCell(schedule, cell.uid, {
      prevTitle: cell.title,
      time:
        hourForm.values.from && hourForm.values.to
          ? [hourForm.values.from, hourForm.values.to]
          : null,
      title: courseForm.values.title,
      professor: courseForm.values.proffessor,
      href: courseForm.values.href,
      bgColor: courseForm.values.bgColor,
      textColor: courseForm.values.textColor,
      isRecursive: cell.type == "hour" ? false : isRecursive,
    });

    setOpen(false);
    setLoading(false);
  };

  return (
    <Modal
      zIndex={400}
      opened={open}
      onClose={() => setOpen(false)}
      title="Editar"
      overlayProps={{ blur: 4, opacity: 0.5 }}
      centered
    >
      <Stack>
        {cell.type == "hour" && (
          <Group>
            <TimeInput
              label="Desde"
              icon={<IoTimeOutline />}
              {...hourForm.getInputProps("from")}
              className="flex-1"
            />
            <TimeInput
              label="Hasta"
              icon={<IoTimeOutline />}
              {...hourForm.getInputProps("to")}
              className="flex-1"
            />
          </Group>
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
            <TextInput
              label="Link"
              {...courseForm.getInputProps("href")}
              description="Tu link debe siempre tener 'https://' o 'http://' al principio"
            />
            <SimpleGrid cols={2}>
              <ColorInput
                label="Color de fondo"
                {...courseForm.getInputProps("bgColor")}
                dropdownZIndex={401}
              />
              <ColorInput
                label="Color de letra"
                {...courseForm.getInputProps("textColor")}
                dropdownZIndex={401}
              />
            </SimpleGrid>
            <Checkbox
              label="Aplicar para todas las celdas de este curso"
              checked={isRecursive}
              onChange={(e) => setIsRecursive(e.currentTarget.checked)}
            />
          </>
        )}
        <Group position="right" className="z-50">
          <Button color="blue" onClick={handleUpdate} loading={loading}>
            Guardar
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default RowCell;
