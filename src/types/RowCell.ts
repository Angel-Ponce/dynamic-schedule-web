interface RowCell {
  uid: string;
  title: string | null;
  bgColor: string | null;
  textColor: string | null;
  href: string | null;
  time: [Date | null, Date | null] | null;
  order: number;
  professor: string | null;
  rowUid: string;
  fontFamily: string | null;
  type: "hour" | "header" | "course";
}

export type { RowCell };
