interface RowCell {
  uid: string;
  title: string | null;
  bgColor: string | null;
  textColor: string | null;
  href: string | null;
  time: [number | null, number | null] | null;
  order: number;
  professor: string | null;
  rowUid: string;
  type: "hour" | "header" | "course";
}

export type { RowCell };
