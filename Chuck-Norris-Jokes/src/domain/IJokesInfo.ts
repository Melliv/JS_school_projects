import { IJoke } from "../domain/IJoke";

export interface IJokesInfo {
    category: string,
    jokes: IJoke[],
} 