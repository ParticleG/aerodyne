const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const trueThen = (condition: unknown, value: string | undefined) =>
  condition ? value : undefined;

const falseThen = (condition: unknown, value: string | undefined) =>
  condition ? undefined : value;

export { sleep, trueThen, falseThen };
