import { spawnSync } from "child_process";
import { run } from "../utils/mermaid";

/**
 * Run the application without side-effects and generate a mermaid graph
 * of the services and their dependencies.
 *
 * @param cmd
 */
export async function graph(cmd: string, output: string) {
    // Run cmd with env-vars to disable side-effects
    const env = {
        ...process.env,
        DEBUG: "propel:graph",
        DRY_RUN: "true",
    };

    const cmdParts = cmd.split(" ");
    const cmdName = cmdParts[0] ?? "";
    const cmdArgs = cmdParts.slice(1);

    const { stdout, stderr } = spawnSync(cmdName, cmdArgs ?? [], { env });

    // Parse each line of the stdout
    const stdoutLines = stdout.toString().split("\n");
    const stderrLines = stderr.toString().split("\n");
    const lines = [...stdoutLines, ...stderrLines];

    const services: string[] = [];
    const dependencies: string[] = [];

    for (const line of lines) {
        if (line.includes("propel:graph") && line.includes("Registering")) {
            const parts = line.split(" ");
            const length = parts.length;
            if (length > 1) {
                services.push(parts[length - 1] ?? "");
            }
        } else if (
            line.includes("propel:graph") &&
            line.includes("Injecting")
        ) {
            const parts = line.split(" ");
            const from = parts[parts.length - 3];
            const to = parts[parts.length - 1];
            dependencies.push(`${from} --> ${to}`);
        }
    }

    // Generate the mermaid graph
    const graph = `
graph TD
\t${services.join("\n\t")}
\t${dependencies.join("\n\t")}
`;

    try {
        await run(graph, output);
    } catch (e) {
        console.error(e);
    }
}
