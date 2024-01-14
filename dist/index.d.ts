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
export declare function getEvents(query: EventorEventQuery, options?: QueryOptions): Promise<EventorEvent[]>;
