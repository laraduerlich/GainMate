
export type AppUser = {
    id?: string
    username: string
    password: string
    name: string
    exerciseIdList?: string[]
    workoutIdList?: string[]
}

export type AppUserDTO = {
    username: string
    password?: string
    name: string
    exerciseIdList?: string[]
    workoutIdList?: string[]
}
