import { ExceptionLogger } from "@capsule-cat/propel-forward";
import { Service } from "@capsule-cat/propel-server";

@Service("ExceptionLogger")
export class ExampleExceptionLogger implements ExceptionLogger {
    public notify(error: Error): void {
        console.error(error);
    }
}
