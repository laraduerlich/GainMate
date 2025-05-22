
export type Workout = {
    id: string,
    name: string,
    exerciseIdList: string[]
    dateList?: string[]
}

export type WorkoutDTO = {
    name: string,
    exerciseIdList: string[],
    dateList?: string[]
}
