import { useDispatch } from "react-redux";
import type { AppDispatch } from "$stores";

const useAppDispatch: () => AppDispatch = useDispatch;

export { useAppDispatch };
