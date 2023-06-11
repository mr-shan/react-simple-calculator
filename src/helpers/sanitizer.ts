export interface IOperator {
  type: string,
  value: string,
  label: string
}

const ALLOWED_CHARACTERS = {
  "0": { type: 'number', value: '0', label: '0' },
  "1": { type: 'number', value: '1', label: '1' },
  "2": { type: 'number', value: '2', label: '2' },
  "3": { type: 'number', value: '3', label: '3' },
  "4": { type: 'number', value: '4', label: '4' },
  "5": { type: 'number', value: '5', label: '5' },
  "6": { type: 'number', value: '6', label: '6' },
  "7": { type: 'number', value: '7', label: '7' },
  "8": { type: 'number', value: '8', label: '8' },
  "9": { type: 'number', value: '9', label: '9' },
  ".": { type: 'dot', value: '.', label: '.' },
  "+": { type: 'operator', value: '+', label: '+' },
  "-": { type: 'operator', value: '-', label: '-' },
  "*": { type: 'operator', value: '*', label: '&#xd7;' },
  "/": { type: 'operator', value: '/', label: '&#xf7;' },
  "(": { type: 'bracketOpen', value: '(', label: '(' },
  ")": { type: 'bracketClose', value: ')', label: ')' },
  "%": { type: 'operator', value: '/100*', label: '&#x25;' }
};

export const sanitize = (char: string):IOperator | null => {
  const allowedChar = ALLOWED_CHARACTERS[char];
  return allowedChar || null;
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