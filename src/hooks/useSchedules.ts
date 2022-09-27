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
import { resetSchedule, setSchedule } from "$slices/scheduleSlice";

const useSchedules = (): [Schedule, boolean] => {
  const user = useAppSelector((state) => state.user);
  const schedule = useAppSelector((state) => state.schedule);
  const dispatch = useAppDispatch();

  const scheduleCollectionRef = collection(
    db,
    `users/${user.uid}/schedules`
  ) as CollectionReference<Schedule>;

  const scheduleQuery = query(scheduleCollectionRef);

  const [schedules, loading, error] = useCollectionData(scheduleQuery);

  useEffect(() => {
    if (schedules && schedules.length > 0 && !error) {
      dispatch(setSchedule(schedules[0]));
      return;
    }

    dispatch(resetSchedule());
  }, [schedules, dispatch, error]);

  return [schedule, loading];
};

export { useSchedules };
