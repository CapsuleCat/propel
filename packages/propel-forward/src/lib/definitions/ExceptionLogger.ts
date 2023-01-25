export interface ExceptionLogger {
    notify(error: Error): void;
}
