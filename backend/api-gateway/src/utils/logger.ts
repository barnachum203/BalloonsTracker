import pino  from "pino";
import PinoPretty from "pino-pretty";
export const log = pino(PinoPretty({
    colorize: true,
    timestampKey: 'time', // --timestampKey

  }))