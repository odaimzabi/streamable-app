import { Socket } from "socket.io";
import {Request,Response} from 'express'

export interface Ctx{
    client:Socket
    req:Request
    res:Response
}