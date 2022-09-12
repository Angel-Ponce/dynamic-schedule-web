import { useState, useEffect } from "react";
import { ColorScheme } from "@mantine/core";

const useUserTheme = (): [ColorScheme, { (): void }] => {
  const [userTheme, setUserTheme] = useState<ColorScheme>("light");

  useEffect(() => {
    const userThemeLocal = localStorage.getItem(
      "userTheme"
    ) as ColorScheme | null;

    const exists = userThemeLocal != null;

    if (!exists) {
      setUserTheme("light");
      localStorage.setItem("userTheme", "light");
    } else {
      setUserTheme(userThemeLocal);
    }
  });

  const toggleUserTheme = () => {
    setUserTheme((userTheme) => {
      const newUserTheme = userTheme == "dark" ? "light" : "dark";
      localStorage.setItem("userTheme", newUserTheme);
      return newUserTheme;
    });
  };

  return [userTheme, toggleUserTheme];
};

export { useUserTheme };
