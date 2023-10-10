import { FETCH_USER } from "./user.types";

export const fetchUser = (data: string) => ({ type: FETCH_USER, data });