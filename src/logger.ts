/**
 * Fatal
 * Error
 * Warn
 * Info
 * Debug
 * Trace
 * 
 * 
    FATAL – Identifies extremely serious error events that are likely to cause the program to abort. Typically, this leads to catastrophic failures.
    ERROR – Identifies error events that may still let the software run, but with restricted capabilities in the impacted routes.
    WARN – Describes events that are less destructive than errors. They usually do not result in any reduction of the program's functionality or its full failure. They are, however, red signs that must be investigated.
    INFO LEVEL – In the program behavior, it denotes the major event banners and informational messages.
    DEBUG – Denotes particular and detailed data, which is mostly used for debugging. These logs assist us in debugging the code.
    TRACE – To provide the greatest information on a specific event/context, it denotes the most low-level information, such as stack traces of code. These logs allow us to examine variable values as well as complete error stacks.
 */

export {}

// log.info
// log.error
// log.warn
// log.info
// log.debug
// log.trace

// structure of log line
// Single event, timestamp, hostname, service, project logger name,
// Additional: thread id, process id, session id, user id
// Environment: ID, deployment name, application version, high precision timestamp

// Filename and line number
// https://gist.github.com/alfasin/ddd5b559658751af35f765a7a690f777

// How about structured logs? using a json array and storing each log as a object
// [1]: Context id is used to look up the error on the web. Related to a monitor mapping
// that contains all the possible errors. Don't need it now and would add complexity
/**
 * {
 *  timestamp: '',
 *  level,
 *  message:
 *  filename:
 *  ~contextId~: <- this, it seems, is used mostly to return a specific type of error. see [1]
 *  [key:string]: any <- extra data thats added to the object if need be
 * }
 */

// Ok cool, so then the log file is in json format and saved to a log directory,
// realistically we only need to log every 1 time the program is run in prod.
// In dev however, maybe we should concat all the logs together or only keep the last 5
// from running.

// The other issue is that all of this is running in the web window and not the system.
// So rust logging is different from the nodejs logging. But since I haven't been working on rust rn...

// The structure will consist of a central logging class that collects everything
// The class will be initialized in each file where it is needed. ie:
// import {logger} from 'logger'
// const log = logger.init({..options}) <- this inits the files logger so the filename is tracked
// to get the filename, use __filename but its exclusive to nodejs
// Can use import.meta for browser but kinda only works for module files
// document.currentScript is used for non modules that are imported with the <script> tag

type LogLevels = "INFO" | "ERROR" | "WARN" | "DEBUG" | "FATAL" | "TRACE"

interface LogEntry {
  timestamp: string
  level: LogLevels
  message: string
  filename: string
  [key: string]: any
}

class Logger {
  private static _log: LogEntry[] = []
  private localLog: LogEntry[] = []

  public static init(options?: { file?: string }): Logger {
    return new Logger(options?.file, Logger._log)
  }

  private constructor(filename: string = "unknown", log: LogEntry[]) {
  }

  private pushLog() {}

  //#region Logging methods
  public info() {}
  public error() {}
  public warn() {}
  public debug() {}
  public fatal() {}
  public trace() {}
  //#endregion
}

const log1 = Logger.init({ file: __filename })
const log2 = Logger.init({ file: "logger.ts" })
const log3 = Logger.init()

// detecting browser type
let userAgent = navigator.userAgent
let browserName

if (userAgent.match(/chrome|chromium|crios/i)) {
  browserName = "chrome"
} else if (userAgent.match(/firefox|fxios/i)) {
  browserName = "firefox"
} else if (userAgent.match(/safari/i)) {
  browserName = "safari"
} else if (userAgent.match(/opr\//i)) {
  browserName = "opera"
} else if (userAgent.match(/edg/i)) {
  browserName = "edge"
} else {
  browserName = "No browser detection"
}

console.log(browserName)

// Meter - Calculates the frequency of events (ex: rate of visitors to your website)
// Timer - Measures the length of time it takes for a procedure to be completed (ex: your web server response time)
// Counter - Integer values are incremented and decremented (ex: number of signed-in users)
// Gauge - An arbitrary value to be measured (ex: CPU)

//! Keep metrics separate from logs

//? Log parser

// [<ISO 8601 Standard Time>] <Log Type> <filename> <Message> <JSON Object>

// TRACE: [<ISO 8601>] TRACE <filename> <Message> <JSON Object> <Stack Trace>
// FATAL: [<ISO 8601>] FATAL <filename> <Message> <JSON Object> <Stack Trace>
// ERROR: [<ISO 8601>] ERROR <filename> <Message> <JSON Object> <Stack Trace>
// WARN: [<ISO 8601>] WARN <filename> <Message> <JSON Object>
// DEBUG: [<ISO 8601>] DEBUG <filename> <Message> <JSON Object>
// INFO: [<ISO 8601>] INFO <filename> <Message> <JSON Object>

export class BaseError<T extends string> extends Error {
  name: T
  message: string
  cause: any

  constructor({
    name,
    message,
    cause,
  }: {
    name: T
    message: string
    cause?: any
  }) {
    super()
    this.name = name
    this.message = message
    this.cause = cause
  }
}

type ErrorName = "PROJECT_ERROR"

export class TeamError extends BaseError<ErrorName> {}
