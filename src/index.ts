import { parseStringPromise } from "xml2js";
import queryString from "query-string";

export type EventorEventDate = {
  date: string;
  clock: string;
};

export type EventorEventCenterPosition = {
  x: string;
  y: string;
  unit: string;
};

export type EventorEventRace = {
  eventraceid: string;
  eventid: string;
  name: string;
  racedate: EventorEventDate;
  eventcenterposition: EventorEventCenterPosition;
};

export type EventorEvent = {
  eventid: string;
  name: string;
  eventclassificationid: string;
  disciplineid: string;
  startdate: EventorEventDate;
  finishdate: EventorEventDate;
  eventrace: EventorEventRace;
};

export type EventorEventQuery = {
  fromDate: string;
  toDate: string;
  includeAttributes?: boolean;
  includeEntryBreaks?: boolean;
};

export type QueryOptions = {
  apiHost?: string;
  apiKey?: string;
};

export async function getEvents(
  query: EventorEventQuery,
  options?: QueryOptions
): Promise<EventorEvent[]> {
  const res = await fetch(
    queryString.stringifyUrl({
      url: `${options?.apiHost || "https://eventor.orientering.se"}/api/events`,
      query,
    }),
    { headers: { ApiKey: options?.apiKey || process.env.EVENTOR_API_KEY } }
  );

  const xml = await res.text();

  const data = await parseStringPromise(xml, {
    normalize: true,
    normalizeTags: true,
    explicitArray: false,
    mergeAttrs: true,
  });

  return data?.eventlist?.event;
}
