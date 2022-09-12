import { useSelector, type TypedUseSelectorHook } from "react-redux";
import { RootState } from "$stores";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
