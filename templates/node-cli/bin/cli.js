#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";

const program = new Command();

program
  .name("my-cli")
  .description("My custom CLI tool")
  .version("1.0.0");

// ── Command: greet ──────────────────────────────
program
  .command("greet <name>")
  .description("Greet someone")
  .option("-l, --loud", "uppercase the greeting")
  .action((name, opts) => {
    let msg = `Hello, ${name}!`;
    if (opts.loud) msg = msg.toUpperCase();
    console.log(chalk.cyan(msg));
  });

// ── Command: run (with spinner example) ─────────
program
  .command("run")
  .description("Simulate a long-running task with a spinner")
  .option("-t, --time <ms>", "duration in ms", "2000")
  .action(async (opts) => {
    const spinner = ora("Working…").start();
    await new Promise((r) => setTimeout(r, Number(opts.time)));
    spinner.succeed(chalk.green("Done!"));
  });

program.parse();
