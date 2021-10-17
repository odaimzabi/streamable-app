import { getRepository } from "typeorm";
import { Session } from "./session.entity";

export const repo=getRepository(Session)