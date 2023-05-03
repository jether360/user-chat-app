import { ReactNode } from "react";

export interface IModal {
    show: boolean,
    body: ReactNode,
    width: number
}