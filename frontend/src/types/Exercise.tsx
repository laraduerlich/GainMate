import {Progress} from "./Progress.tsx";

export type Exercise = {
    id: string
    name: string
    note: string
    progressList: Progress[]
}
