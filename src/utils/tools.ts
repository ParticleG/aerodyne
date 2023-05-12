const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const trueThen = (condition: unknown, value: string | undefined) =>
  condition ? value : undefined;

const falseThen = (condition: unknown, value: string | undefined) =>
  condition ? undefined : value;

const getAvatarUrl = (
  id: number,
  size: 0 | 40 | 100 | 140 = 100,
  type: 'user' | 'group' = 'user'
) => {
  switch (type) {
    case 'user':
      return `https://q1.qlogo.cn/g?b=qq&s=${size}&nk=${id}`;
    case 'group':
      return `https://p.qlogo.cn/gh/${id}/${id}/${size}`;
  }
};

export { sleep, trueThen, falseThen, getAvatarUrl };
