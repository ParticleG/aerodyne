export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const trueThen = (condition: unknown, value: string | undefined) =>
  condition ? value : undefined;

export const falseThen = (condition: unknown, value: string | undefined) =>
  condition ? undefined : value;
