import {ReactElement} from "react";

export enum StatusEnum {
    idle = "idle",
    pending ="pending",
    fulfilled = "fulfilled",
    rejected = "rejected"
}

export type ReactElementSignature ={
    [key : string] : ReactElement
}
