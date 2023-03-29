import { eachDayOfInterval, getYear, getMonth, addHours, getHours, getMinutes, isValid, getTime, format, parse, toDate, getDay, startOfDay, endOfDay, subDays, getISODay, addDays, startOfMonth, endOfMonth, subMonths, startOfWeek, addWeeks, isBefore, isEqual, differenceInDays, isAfter} from 'date-fns';
// date-fns is re-exported from this file

export const N_TIME_STAMP: string = 'HH:mm:ss';
export const N_INVOICE_DATE_FORMAT: string = 'EEEE dd/MM';
export const N_MENU_DATE_STR_FORMAT: string = 'EEE dd LLL yyyy';  // EEE dd LLL yyyy
export const N_CLIENT_FOOD_CHECK_DATE_TIME_STR_FORMAT: string = 'EEE dd LLL yyyy HH:mm:ss';  // EEE dd LLL yyyy
export const N_SHORT_DAY: string = 'EEE';
export const N_SHORT_DAY_WITH_DAY: string = 'EEE dd';
export const N_DATE_FORMAT: string = 'ddMMyyyy';
export const N_CYCLE_LABEL_FORMAT: string = 'MMM yyyy';
export const N_DATE_TIME_STAMP_FORMAT: string = 'dd-MM-yyyy HH:mm:ss';
export const N_DATE_TIME_STORAGE_KEY_FORMAT: string = 'ddMMyyyyHHmmss';
export const N_DATE_STAMP_FORMAT: string = 'dd-MM-yyyy';
export const N_DAY_DATE_STAMP_FORMAT: string = 'EEEE dd-MM-yyyy';
export const N_SHORT_DAY_DATE_STAMP_FORMAT: string = 'EEE dd-MM-yyyy';
export const N_DATE_STAMP_WEEK_COMMENCING_FORMAT: string = 'dd/MM/yyyy';
export const N_SINGLE_DATE_PICKER_FORMAT: string = 'EEE dd LLL';
export const N_DATE_DAY_MONTH_YEAR_FORMAT: string = 'EEE dd LLL yyyy';
export const N_LONG_DAY_MONTH_DATE_STAMP_FORMAT: string = 'EEE do LLL yyyy';
export const N_MONTH_DATE_STAMP_FORMAT: string = 'do LLL yyyy';
export const N_INVOICE_ORDER_DATE: string = `MMMM yyyy`;
export const N_SIGNATURE_REPORT_DATE: string = `MMM-yyyy`;
export const N_LOG_DATE: string = `yyyy-MM-dd HH:mm:ss`;

export const ISO_WEEK_DAY_MONDAY: number = 1;
export const ISO_WEEK_DAY_FRIDAY: number = 5;

export const weekends: number[] = [0, 6];
export const noMondays: number[] = [0, 2, 3, 4, 5, 6];
export const noMondaysOrFridays: number[] = [0, 2, 3, 4, 6];

export interface IOrderDateMap {
    [key: string]: boolean;
}

export const getTodaysDate = (): Date => {
    return new Date();
};

export const parseFormat = (dateTime: string, format: string): Date => {
    return parse(dateTime, format, new Date());
};

export const getStartOfDay = (date: Date): Date => {
    return startOfDay(date);
};

export const dateAsNumberN = (date: Date): number => {
    const dateOnly: number = getTime(date);
    return dateOnly;
};

export const startOfDateAsNumberN = (date: Date): number => {
    const dateOnly: number = getTime(startOfDay(date));
    return dateOnly;
};

export const endOfDateAsNumberN = (date: Date): number => {
    const dateOnly: number = getTime(endOfDay(date));
    return dateOnly;
};

export const getRangeOfWorkingWeekDatesAsNumbers = (startDate: number | Date, endDate: number | Date): ReadonlyArray<number> => {
    const start = toDate(startDate);
    const end = toDate(endDate);
    const dates = eachDayOfInterval({start, end});

    const result: Array<number> = [];
    dates.forEach((d) => {
        const day = getISODay(d);
        if (day <= ISO_WEEK_DAY_FRIDAY && day >= ISO_WEEK_DAY_MONDAY) {
            result.push(startOfDateAsNumberN(d));
        }
    });

    return result;
};

export const getOrderKeyForDate = (date: number | Date): string => {
    const key: string = format(toDate(date), N_DATE_FORMAT);
    return key;
};

export const getCurrentDay = (): Date => {
    return startOfDay(new Date());
};

export const getStartOfDateValueOf = (date: Readonly<Date> | Date | string | undefined): number => {
    if (date && date instanceof Date) {
        return getTime(startOfDay(date));
    }
    return 0;
};

export const getEndOfDateValueOf = (date: Readonly<Date> | Date | string | undefined): number => {
    if (date && date instanceof Date) {
        return getTime(endOfDay(date));
    }
    return 0;
};

export const getValueOfDateOrZero = (date: Readonly<Date> | Date | string | undefined): number => {
    if (date && date instanceof Date) {
        return getTime(date);
    }
    return 0;
};

export const getDateOrUndefinedfromDate = (from: Readonly<Date> | Date | null): Readonly<Date> | Date | undefined => {
    if (from !== null && from !== undefined) {
        return from;
    }
    return undefined;
};

export const formatDate = (date: Date, dateTimeFormat: string, locale: string): string => {
    try {
        if (date) {
            const result: string = format(date, dateTimeFormat);
            return result;
        }
    }
    catch (error) {
        console.error(`formatDate with ${date} ${dateTimeFormat} ${error}`);
    }

    return dateTimeFormat;
};

export const parseDate = (date: string, dateTimeFormat: string, locale: string): undefined | Date => {
    try {
        const result = parseFormat(date, dateTimeFormat);
        if (isValid(result)) {
            return result;
        }
    }
    catch (error) {
        console.error(`parseDate with ${date} ${dateTimeFormat} ${error}`);
    }

    return undefined;
};

export const getNextWeekDay = (date: Date, day: number): Date => {
    let nextDate: Date = nextWeekDayN(date);
    let weekDay: number = getISODay(nextDate);
    while (weekDay !== day) {
        nextDate = nextWeekDayN(nextDate);
        weekDay = getISODay(nextDate);
    }

    return nextDate;
};

export const dateStringAsNumber = (date: string): number => {
    const dateOnly: number = getTime(parseFormat(date, N_DATE_FORMAT));
    return dateOnly;
}

export const getDateNumberAsEightCharString = (date: number): string => {
    const str: string = date.toString();
    const strLen = str.length;
    const result = strLen === 8 ? str : str.padStart(8, '0');
    return result;
};


export const previousWeekDayN = (date: Date): Date => {
    let nextDate: Date = subDays(date, 1);
    let weekDay: number = getISODay(nextDate);
    while (weekDay > ISO_WEEK_DAY_FRIDAY) {
        nextDate = subDays(nextDate, 1);
        weekDay = getISODay(nextDate);
    }
    return getStartOfDay(nextDate);
};

export const nextWeekDayN = (date: Date): Date => {
    let nextDate: Date = addDays(date, 1);
    let weekDay: number = getISODay(nextDate);
    while (weekDay > ISO_WEEK_DAY_FRIDAY) {
        nextDate = addDays(nextDate, 1);
        weekDay = getISODay(nextDate);
    }
    return getStartOfDay(nextDate);
};

export const firstWeekDayN = (date: Date = new Date()): Date => {
    let nextDate: Date = toDate(date);
    let weekDay: number = getISODay(nextDate);
    while (weekDay > ISO_WEEK_DAY_FRIDAY) {
        nextDate = addDays(nextDate, 1);
        weekDay = getISODay(nextDate);
    }
    return getStartOfDay(nextDate);
};

export interface IStartEndDates {
    start: Date;
    end: Date;
}

export const getStartEndDatesOfCurrentWeekN = (startAt: Date = new Date()): IStartEndDates => {
    let temp: Date = new Date(startAt);
    let weekDay: number = getISODay(temp);
    if (weekDay > ISO_WEEK_DAY_FRIDAY) {
        temp = nextWeekDayN(temp);
    }
    weekDay = getISODay(temp);
    const adjustForMonday: number = ISO_WEEK_DAY_MONDAY - weekDay;

    const start: Date = addDays(temp, adjustForMonday);
    const end: Date = addDays(endOfDay(start), 4);

    return {
        start,
        end
    };
};

export const getStartEndDatesOfNextWeekN = (): IStartEndDates => {
    let temp: Date = nextWeekDayN(new Date());
    let weekDay: number = getISODay(temp);
    while (weekDay !== ISO_WEEK_DAY_MONDAY) {
        temp = nextWeekDayN(temp);
        weekDay = getISODay(temp);
    }
    const start: Date = temp;
    const end: Date = addDays(endOfDay(temp), 4);
    return {
        start,
        end
    };
};

export const getStartEndDatesOfLastMonthN = (): IStartEndDates => {
    let temp: Date = new Date();
    const start: Date = getStartOfDay(startOfMonth(subMonths(temp, 1)));
    const end: Date = endOfMonth(subMonths(temp, 1));

    return {
        start,
        end
    };
};

export const getStartEndDatesOfThisMonthN = (): IStartEndDates => {
    let temp: Date = new Date();
    const start: Date = getStartOfDay(startOfMonth(temp));
    const end: Date = endOfMonth(temp);

    return {
        start,
        end
    };
};

export const getNextOrderDateN = (): Date => {
    return nextWeekDayN(new Date());
};


export const getThisMondayN = (): Date => {
    return startOfWeek(new Date(), {weekStartsOn: 1});
};

export const getMondayOrNextIfWeekendN = (): Date => {
    const today = getStartOfDay(new Date());
    let weekDay: number = getISODay(today);
        
    if (weekDay > ISO_WEEK_DAY_FRIDAY) {
        return addWeeks(startOfWeek(today, {weekStartsOn: 1}), 1);
    }
    return startOfWeek(today, {weekStartsOn: 1});
};

export const getNextMondayN = (): Date => {
    return addWeeks(getThisMondayN(), 1);
};

export const isSameOrBefore = (a: Date, b: Date): boolean => {
    return isBefore(a, b) || isEqual(a, b);
};

export const isSameOrAfter = (a: Date, b: Date): boolean => {
    return isAfter(a, b) || isEqual(a, b);
};

export const getDaysBetweenDatesN = (from: Date, to: Date, excludeDaysOfWeek: number[]): number => {
    let tmp: Date = new Date(from);
    let excludeDays: number = 0;
    while (isSameOrBefore(tmp, to)) {
        tmp = addDays(tmp, 1);
        let day: number = getDay(tmp);
        if (excludeDaysOfWeek.indexOf(day) > -1) {
            excludeDays++;
        }
    }
    const days: number = differenceInDays(to, from) - excludeDays;
    return days;
};

export const getIsoDaysBetweenDatesN = (from: Date, to: Date, excludeIsoDaysOfWeek: number[]): number => {
    let tmp: Date = new Date(from);
    let excludeDays: number = 0;
    while (isSameOrBefore(tmp, to)) {
        tmp = addDays(tmp, 1);
        let day: number = getISODay(tmp);
        if (excludeIsoDaysOfWeek.indexOf(day) > -1) {
            excludeDays++;
        }
    }
    const days: number = differenceInDays(to, from) - excludeDays;
    return days;
};


export { eachDayOfInterval, getYear, getMonth, addHours, getHours, getMinutes, isValid, getTime, format, parse, toDate, getDay, startOfDay, endOfDay, subDays, getISODay, addDays, startOfMonth, endOfMonth, subMonths, startOfWeek, addWeeks, isBefore, isEqual, differenceInDays, isAfter};