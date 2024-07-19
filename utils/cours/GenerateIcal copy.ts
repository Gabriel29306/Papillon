import ics, { DateTime } from "ics";
import pawnote from "pawnote";
import { useAppContext } from "../AppContext";

function init() {
  const appContext = useAppContext();
  if (!appContext.dataProvider) return null;
  if (!appContext.dataProvider.pronoteInstance) return null;

  const instance = appContext.dataProvider.pronoteInstance;
  const firstDate = instance.firstDate;
  const lastDate = instance.lastDate;

  const courses = instance.getTimetableOverviewForInterval(firstDate, lastDate);
  const homework = instance.getHomeworkForInterval(firstDate, lastDate);

}

type x = {
  name: string,
  keyDates: {
    firstDate: Date,
    lastDate: Date
  }
};
