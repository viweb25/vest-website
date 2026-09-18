export const logger = {
  info: (msg: any) => console.log(JSON.stringify({ level: 'info', timestamp: new Date(), ...msg })),
  error: (msg: any) => console.error(JSON.stringify({ level: 'error', timestamp: new Date(), ...msg })),
  warn: (msg: any) => console.warn(JSON.stringify({ level: 'warn', timestamp: new Date(), ...msg })),
};
