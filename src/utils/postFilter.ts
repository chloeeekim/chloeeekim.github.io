import { SITE } from "@/config";
import type { ContentEntry } from "./contentEntry";
import { isDraftVisible } from "./draftVisibility";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const postFilter = ({ data }: ContentEntry) => {
  if (!isDraftVisible({ data })) return false;

  const postTimezone = "timezone" in data ? data.timezone : undefined;
  const pubDatetime = dayjs(data.pubDatetime).tz(postTimezone || SITE.timezone);

  const isPublishTimePassed =
    dayjs().tz(SITE.timezone).valueOf() >
    pubDatetime.valueOf() - SITE.scheduledPostMargin;
  return import.meta.env.DEV || isPublishTimePassed;
};

export default postFilter;
