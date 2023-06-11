const ALLOWED_CHARACTERS = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  ".": ".",
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
  "(": "(",
  ")": ")",
  "%": "/100*",
};

export const sanitize = char => {
  const sanitizedChar = ALLOWED_CHARACTERS[char];
  return sanitizedChar || sanitizedChar === 0 ? sanitizedChar : '';
}

export const sanitizeString = str => {
  let sanitizedstr = '';
  for(let char of str) {
    const sanitizedChar = ALLOWED_CHARACTERS[char];
    if (sanitizedChar || sanitizedChar === 0)
      sanitizedstr += sanitizedChar
  }
  return sanitizedstr
}