import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import type { Schedule } from "$types";
import {
  collection,
  query,
  type CollectionReference,
} from "firebase/firestore";
import { db } from "$app/firebase/config";
import { useAppDispatch, useAppSelector } from "$hooks";
import { resetSchedules, setSchedules } from "$slices/schedulesSlice";

const useSchedules = (): [boolean] => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const scheduleCollectionRef = collection(
    db,
    `users/${user.uid || "id"}/schedules`
  ) as CollectionReference<Schedule>;

  const scheduleQuery = query(scheduleCollectionRef);

  const [schedules, loading, error] = useCollectionData(scheduleQuery);

  useEffect(() => {
    if (schedules && schedules.length > 0 && !error) {
      dispatch(setSchedules(schedules));
      return;
    }

    dispatch(resetSchedules());
  }, [schedules, dispatch, error]);

  return [loading];
};

export { useSchedules };
