#!/usr/bin/env node

import { Command } from "commander";
import { graph } from "./commands/graph";

const program = new Command();

program.name("propel-cli").description("CLI for Propel");

program
    .command("graph")
    .description(
        "Generate a mermaid graph of the services and their dependencies"
    )
    .argument("<cmd>", "Command to run")
    .argument("<ouput>", "Output file, example graph.svg")
    .action(graph);

program.parse(process.argv);
