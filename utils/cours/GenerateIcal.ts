import ics, { DateTime } from "ics";
import {
  StudentHomework,
  TimetableActivity,
  TimetableClass,
  TimetableDetention,
  TimetableLesson,
} from "pawnote";
import { useAppContext } from "../AppContext";

const appContext = useAppContext();

export async function GenerateIcal(): Promise<string | undefined> {
  const createdAt = new Date();
  if (appContext.dataProvider?.service === "pronote") {
    const instance = appContext.dataProvider.pronoteInstance;
    if (!instance) return "";
    const timetableOverview = await instance.getTimetableOverviewForInterval(
      instance.firstDate,
      instance.lastDate
    );
    const classes = timetableOverview.parse({
      withSuperposedCanceledClasses: false,
      withCanceledClasses: true,
      withPlannedClasses: true,
    });

    const homeworks = await instance.getHomeworkForInterval(
      instance.firstDate,
      instance.lastDate
    );
    const courses: { [key: string]: Event } = {};

    classes.forEach((classe: TimetableClass) => {
      if (classe instanceof TimetableLesson) {
        if (classe.canceled || classe.exempted) {
          const status = "CANCELLED";
        } else {
          const status = "CONFIRMED";
        }

        let description = "";
        if (classe.status) {
          description += classe.status + "\n";
        }
        description += "Matière : " + classe.subject?.name + "\n";
        description +=
          "Professeur" +
          (classe.teacherNames.length > 1 ? "s" : "") +
          " : " +
          classe.teacherNames.join(", ");

        if (classe.personalNames) {
          description +=
            "Personnel" +
            (classe.personalNames.length > 1 ? "s" : "") +
            " : " +
            classe.personalNames.join(", ");
        }
        description +=
          "Salle" +
          (classe.classrooms.length > 1 ? "s" : "") +
          " : " +
          classe.classrooms.join(", ");

        courses[classe.startDate.getTime()] = {
          ...getTitle(classe),
          ...getTime(classe),
          location: classe.classrooms.join(", "),
          description,
          homeworks: [],
        };
      } else if (classe instanceof TimetableActivity) {
        courses[classe.startDate.getTime()] = {
          ...getTitle(classe),
          ...getTime(classe),
          location: "",
          homeworks: [],
        };
      }
    });
    homeworks.forEach((homework: StudentHomework) => {
      let homeworkContent = `${homework.description}`;
      if (homework.attachments) {
        homework.attachments.forEach(attachement => {
          homeworkContent += `\n${attachement.name}`;
        });
      }
      if (!(homework.deadline.getTime() in Object.keys(courses))) {
        courses[homework.deadline.getTime()] = {
          ...getTitle(homework),
          ...getTime(homework),
          location: "",
          homeworks: [],
        };
      } else {
        courses[homework.deadline.getTime()].homeworks.push(homeworkContent);
      }
    });

    const result: ics.EventAttributes[] = [];
    Object.entries(courses).forEach(([id, event], _index) => {
      let description = event.description ?? "";

      if (event.homeworks.length) {
        description += "\nDevoirs:\n";
        event.homeworks.forEach(homework => {
          description += homework + "\n";
        });
      }

      const uid =
        "Cours-" +
        id +
        event.location.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-"); // Only keep letters, numbers and replace spaces by "-"

      result.push({
        title: event.title,
        start: event.start,
        end: event.end,
        description,
        uid,
        productId: "Papillon V6",
        calName: "Cours de " + instance.studentName,
      });
    });

    const { error, value } = ics.createEvents(result);
    return value;
  } else {
    return undefined;
  }
}

function getTitle(input: TimetableClass | StudentHomework): { title: string } {
  let title = "";
  if (input instanceof TimetableLesson) {
    if (input.status) {
      title = input.status + " ";
    }

    title += input.subject?.name ?? "Matière inconnue";

    const teachers: { name: string }[] = [];
    input.teacherNames.forEach(name => teachers.push({ name: name }));
    input.personalNames.forEach(name => teachers.push({ name: name }));
    title += " - " + teachers.join(", ");
  } else if (input instanceof TimetableActivity) {
    title = input.title;
    title += " - " + input.attendants.join(", ");
  } else if (input instanceof TimetableActivity) {
    title = input.title + " - " + input.attendants.join(", ");
  } else if (input instanceof TimetableDetention) {
    title = "Retenue" + input.title ? ": " : "" + input.title;
  } else if (input instanceof StudentHomework) {
    input.difficulty;
    title = `Devoir: ${input.subject.name}`;
  }
  return { title };
}

function getTime(input: TimetableClass | StudentHomework) {
  let startDate: Date;
  let endDate: Date;
  if (input instanceof StudentHomework) {
    startDate = input.deadline;
    startDate.setTime(startDate.getTime() - 30 * 60000); // Remove 30 minutes
    endDate = input.deadline;
  } else {
    startDate = input.startDate;
    endDate = input.endDate;
  }

  const start = [
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
    startDate.getHours(),
    startDate.getMinutes(),
  ] as DateTime;
  const end = [
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
    endDate.getHours(),
    endDate.getMinutes(),
  ] as DateTime;
  return { start, end };
}

type Event = {
  title: string;
  location: string;
  start: DateTime;
  end: DateTime;
  description?: string;
  homeworks: string[];
};
