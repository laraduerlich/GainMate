import {endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameDay, parseISO } from "date-fns";
import {CalendarEvent} from "../types/Event.tsx";

type CalendarProps = {
    year: number;
    month: number;      // 1 = Jan, 12 = Dec
    events: CalendarEvent[];
}

export default function Calendar({year, month, events}: CalendarProps) {

    // 1) Compute range
    const firstOfMonth = new Date(year, month - 1, 1);
    const lastOfMonth = endOfMonth(firstOfMonth);

    const startDate = startOfWeek(firstOfMonth, { weekStartsOn: 1 }); // Monday start
    const endDate = endOfWeek(lastOfMonth, { weekStartsOn: 1 });

    const days: Date[] = [];
    let curr = startDate;
    while (curr <= endDate) {
        days.push(curr);
        curr = addDays(curr, 1);
    }

    return (
        <>
            <div className="max-w-md mx-auto">
                {/* Weekday headers */}
                <div className="grid grid-cols-7 text-center text-xs font-medium text-zinc-500 mb-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                        <div key={d}>{d}</div>
                    ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                    {days.map((day) => {
                        const inMonth = day.getMonth() === firstOfMonth.getMonth();
                        const event = events.find((e) =>
                            isSameDay(parseISO(e.date), day)
                        );

                        return (
                            <div
                                key={day.toISOString()}
                                className='flex flex-col items-center p-2 rounded ${inMonth ? "bg-zinc-700 hover:bg-zinc-600" : "bg-transparent"}'
                            >
                            <span className={inMonth ? "text-white" : "text-zinc-500"}>
                            {format(day, "d")}
                            </span>
                                {event && (
                                    <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center shadow-sm">
                                        <img
                                            src={event.iconUrl}
                                            alt=""
                                            className="w-4 h-4"                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}
