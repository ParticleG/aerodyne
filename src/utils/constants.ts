const DRAWER_WIDTHS = {
  initial: 500,
  max: 700,
  min: 128,
  snap: 320,
};

const INTRANET_PATTERN = new RegExp(
  '^((localhost)|(127\\.0\\.0\\.1)|' + // localhost
    '(\\d|10)(\\.((2(5[0-5]|[0-4]\\d))|[0-1]?\\d{1,2})){3}|' + // Class A address
    '(172\\.)(1[6-9]|2\\d|3[01])(\\.((2(5[0-5]|[0-4]\\d))|[0-1]?\\d{1,2})){2}|' + // Class B address
    '(192\\.168)(\\.((2(5[0-5]|[0-4]\\d))|[0-1]?\\d{1,2})){2})$' // Class C address
);

const EXTRANET_PATTERN = new RegExp(
  '^((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))$' // OR IPv4 address
);

const PSEUDO_MESSAGES = [
  "I don't know how to spell a lot of things.",
  "He only had one drink but he's completely wasted.",
  'We stayed an extra night because we were having so much fun.',
  'The airplane went through such bad turbulence that everyone thought they were going to die.',
  'The computer is dying on me.',
  'The laptop became warm.',
  'He’s a chemistry whiz.',
  "If you don't tell me where he went, I am going to start crying.",
  'The view is breathtaking.',
  'I am about as tall as my father now.',
  'I trust you so much.',
  'I would like to make toast.',
  "I'm your lucky fellow then.",
  'He was in a bluegrass band with his father.',
  'He is my grandfather.',
  'They had to decide between buying diapers and buying ramen to feed themselves.',
  'How long did you think you could get away with this?',
  'Do you know what day it is?',
  'How dare you!',
  "I'm actually newly single.",
  'We will walk in the garden later.',
  'I’d like to talk about the benefits of having a pet pig.',
  "I'll talk you through every step of the aquatic soccer game.",
  'Judith Jarvis Thompson is the best philosopher of all time.',
  'According to the papers, there was a big fire in the town.',
  "I'm your lucky fellow then.",
  "My grandmother's death was a big shock.",
  "You don't need to leave so early.",
  'He is my classmate.',
  'People always have justifications for hurting others, but they are rarely good justifications.',
  'This is the biggest dog in the world.',
  "This is the biggest cat that I've ever seen.",
  'Chicago is one of the oldest cities in the Midwest.',
  'She always forgets her purse.',
  'The cat jumped over the fence.',
  "Mike's mother lived in a big city before she married.",
  'He stood no chance against her in a fight.',
  'Look at the blackboard!',
  'How long was she on the run before they caught her?',
  'She hated first dates.',
];

const PSEUDO_NAMES = ['Me', 'Monica', 'Jane', 'Davy', 'Audrey', 'Judy'];

export {
  DRAWER_WIDTHS,
  INTRANET_PATTERN,
  EXTRANET_PATTERN,
  PSEUDO_MESSAGES,
  PSEUDO_NAMES,
};
