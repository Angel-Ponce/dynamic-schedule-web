interface RowCell {
  uid: string;
  title: string;
  bgColor: string | null;
  textColor: string | null;
  order: number;
  href: string | null;
  professor: string;
  rowUid: string;
  type: "hour" | "header" | "course";
}

export type { RowCell };
