import { atom } from "jotai";

export interface NameData {
    id: string;
    name: string;
}

export const cashier1Atom = atom<NameData[]>([]);
export const cashier2Atom = atom<NameData[]>([]);
export const cashier3Atom = atom<NameData[]>([]);

