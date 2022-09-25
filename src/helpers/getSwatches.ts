import { DEFAULT_THEME } from "@mantine/core";

const getSwatches = () => {
  return [
    ...DEFAULT_THEME.colors.dark,
    ...DEFAULT_THEME.colors.gray,
    ...DEFAULT_THEME.colors.red,
    ...DEFAULT_THEME.colors.pink,
    ...DEFAULT_THEME.colors.grape,
    ...DEFAULT_THEME.colors.violet,
    ...DEFAULT_THEME.colors.indigo,
    ...DEFAULT_THEME.colors.blue,
    ...DEFAULT_THEME.colors.cyan,
    ...DEFAULT_THEME.colors.teal,
    ...DEFAULT_THEME.colors.green,
    ...DEFAULT_THEME.colors.lime,
    ...DEFAULT_THEME.colors.yellow,
    ...DEFAULT_THEME.colors.orange,
  ];
};

export { getSwatches };
