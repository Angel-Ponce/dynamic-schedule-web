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
import { TimeRangeInput } from "@mantine/dates";
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
    await updateCell(schedule, cell.rowUid, cell.uid, {
      time: clipboard.time
        ? ([
            clipboard.time[0] ? new Date(clipboard.time[0]) : null,
            clipboard.time[1] ? new Date(clipboard.time[1]) : null,
          ] as [Date | null, Date | null])
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
        cursor: cell.type == "course" ? "pointer" : "default",
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
        }}
      >
        {cell.title ||
          (cell.time &&
            cell.time[0] &&
            cell.time[1] &&
            `${new Date(cell.time?.[0])?.getHours()}:${new Date(
              cell.time?.[0]
            )?.getMinutes()} - ${new Date(
              cell.time?.[1]
            )?.getHours()}:${new Date(cell.time?.[1])?.getMinutes()}`)}
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
      time: cell.time
        ? ([
            cell.time[0] ? new Date(cell.time[0]) : null,
            cell.time[1] ? new Date(cell.time[1]) : null,
          ] as [Date | null, Date | null])
        : undefined,
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
      time: cell.time
        ? ([
            cell.time[0] ? new Date(cell.time[0]) : null,
            cell.time[1] ? new Date(cell.time[1]) : null,
          ] as [Date | null, Date | null])
        : undefined,
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

    await updateCell(schedule, cell.rowUid, cell.uid, {
      time: hourForm.values.time || null,
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
