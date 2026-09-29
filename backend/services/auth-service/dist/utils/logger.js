"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = {
    info: (msg) => console.log(JSON.stringify({ level: 'info', timestamp: new Date(), ...msg })),
    error: (msg) => console.error(JSON.stringify({ level: 'error', timestamp: new Date(), ...msg })),
    warn: (msg) => console.warn(JSON.stringify({ level: 'warn', timestamp: new Date(), ...msg })),
};
