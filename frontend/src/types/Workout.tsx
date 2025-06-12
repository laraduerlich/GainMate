
export type Workout = {
    id: string,
    name: string,
    icon: "LEGS" | "ARMS" | "BACK" | "SHOULDERS" | "CHEST",
    exerciseIdList: string[]
    dateList?: string[]
}

export type WorkoutDTO = {
    name: string,
    icon: "LEGS" | "ARMS" | "BACK" | "SHOULDERS" | "CHEST",
    exerciseIdList: string[],
    dateList?: string[]
}