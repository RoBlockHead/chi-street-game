import { type Writable, writable } from 'svelte/store';

export const streetsGuessed: Writable<string[]> = writable([]);
export const guessedLength: Writable<number> = writable(0);

