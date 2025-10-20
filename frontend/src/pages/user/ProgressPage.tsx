import {Workout} from "../../types/Workout.tsx";
import {useEffect, useState} from "react";
import Calendar from "../../components/Calendar.tsx";
import {CalendarEvent} from "../../types/Event.tsx";

type ProgressPageProps = {
    workouts: Workout[]
    getAllWorkouts: () => void
}

export default function ProgressPage({workouts, getAllWorkouts}: ProgressPageProps) {

    // Get current date
    const date = new Date();

    const [month, setMonth] = useState<number>(date.getMonth() + 1)

    const events: CalendarEvent[] = (workouts ?? []).flatMap((workout: Workout) => {
        // if workout.dateList is null/undefined, use empty array
        const dates: string[] = workout.dateList ?? [];
        return dates.map((date: string) => ({
            date,
            iconUrl: `/icon/workout/${workout.icon}.png`,
        }))
    })

    // fetch all workouts
    useEffect(() => {
        getAllWorkouts()
    }, []);

    return (
        <>
            <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                Progress
            </h2>
            <div className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6">
                {/*Input field for month*/}
                <div className="px-6 pb-4">
                    <form>
                        <select
                            id={"month"}
                            name={"month"}
                            value={month}
                            onChange={(event) => setMonth(parseInt(event.target.value, 10))}
                            className="w-30 px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value={1}>January</option>
                            <option value={2}>February</option>
                            <option value={3}>March</option>
                            <option value={4}>April</option>
                            <option value={5}>Mai</option>
                            <option value={6}>June</option>
                            <option value={7}>July</option>
                            <option value={8}>August</option>
                            <option value={9}>September</option>
                            <option value={10}>October</option>
                            <option value={11}>November</option>
                            <option value={12}>December</option>
                        </select>
                    </form>
                </div>
                <div>
                    <Calendar year={2025} month={month} events={events} />
                </div>
                {/* Summary */}
                <div className="text-center">
                    <p className="text-sm text-zinc-300">
                        Total workouts completed: <span className="font-semibold text-white">{events.length}</span>
                    </p>
                </div>
            </div>

        </>
    )
}
