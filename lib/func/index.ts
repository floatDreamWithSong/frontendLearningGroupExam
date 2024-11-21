import { RunnerTaskResult } from "vitest";

export const printError = (str: string, e: RunnerTaskResult) => console.error(str, e.errors?.map(i => i.message))