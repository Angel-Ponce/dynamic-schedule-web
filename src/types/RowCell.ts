interface RowCell {
  uid: string;
  title: string;
  bgColor: string;
  textColor: string;
  order: number;
  href: string;
  professor: string;
  rowUid: string;
  type: "hour" | "header" | "course";
}

export type { RowCell };
