import { type Writable, writable } from 'svelte/store';

export const streetsGuessed: Writable<{
        name: string,
        // direction: "N" | "S" | "E" | "W",
    }[]> = writable([]);
export const guessedLength: Writable<number> = writable(0);

