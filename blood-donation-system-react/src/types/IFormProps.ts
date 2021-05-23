import { BaseSyntheticEvent, SyntheticEvent } from "react";

export interface IFormProps<Tentity> {
    values: Tentity;

    handleChange: (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => void;
}