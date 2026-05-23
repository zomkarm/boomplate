#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_DIR = path.join(__dirname, "..", "templates");

// ─── ASCII Banner ─────────────────────────────────────────────────────────────
const banner = `
${chalk.cyan("╔══════════════════════════════════════════╗")}
${chalk.cyan("║")}  ${chalk.bold.white("⚡ BOOMPLATE")} ${chalk.gray("— instant scaffold, zero fluff")}  ${chalk.cyan("║")}
${chalk.cyan("╚══════════════════════════════════════════╝")}
`;

// ─── Template Registry ────────────────────────────────────────────────────────
const TEMPLATES = {
  "html5": {
    label: "HTML5 Bare",
    desc: "index.html + style.css + script.js — pure browser practice",
    group: "Frontend",
    install: false,
  },
  "css-sass": {
    label: "HTML5 + SASS",
    desc: "Vite-powered HTML with SASS, hot reload included",
    group: "Frontend",
    install: true,
  },
  "vanilla-js": {
    label: "Vanilla JS (Vite)",
    desc: "Vite + plain JS — module support, HMR, no framework overhead",
    group: "Frontend",
    install: true,
  },
  "react": {
    label: "React (Vite)",
    desc: "React 18 + Vite — fast dev server, JSX ready",
    group: "Frontend",
    install: true,
  },
  "react-ts": {
    label: "React + TypeScript (Vite)",
    desc: "React 18 + TypeScript + Vite — typed components from day one",
    group: "Frontend",
    install: true,
  },
  "express": {
    label: "Express API",
    desc: "Express server + nodemon + dotenv + basic route structure",
    group: "Backend",
    install: true,
  },
  "express-mongo": {
    label: "Express + MongoDB",
    desc: "Express + Mongoose + dotenv + sample model/route",
    group: "Backend",
    install: true,
  },
  "nextjs": {
    label: "Next.js (App Router)",
    desc: "Next.js 14, App Router, Tailwind CSS pre-configured",
    group: "Fullstack",
    install: true,
  },
  "mern": {
    label: "MERN Stack",
    desc: "MongoDB + Express + React + Node — monorepo with client/ & server/",
    group: "Fullstack",
    install: true,
  },
  "node-cli": {
    label: "Node.js CLI Tool",
    desc: "Commander + chalk — ready to build your own CLI",
    group: "Node",
    install: true,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function groupedChoices() {
  const groups = {};
  for (const [key, val] of Object.entries(TEMPLATES)) {
    if (!groups[val.group]) groups[val.group] = [];
    groups[val.group].push({
      name: `${chalk.bold(val.label.padEnd(28))} ${chalk.gray(val.desc)}`,
      value: key,
      short: val.label,
    });
  }

  const choices = [];
  for (const [group, items] of Object.entries(groups)) {
    choices.push(new inquirer.Separator(chalk.yellow(`\n  ── ${group} ──`)));
    choices.push(...items);
  }
  return choices;
}

function runCommand(cmd, cwd) {
  execSync(cmd, { cwd, stdio: "inherit" });
}

// ─── Scaffold Logic ───────────────────────────────────────────────────────────
async function scaffold(templateKey, targetDir) {
  const templateSrc = path.join(TEMPLATES_DIR, templateKey);
  await fs.copy(templateSrc, targetDir);

  // Rename gitignore (npm strips .gitignore on publish)
  const gi = path.join(targetDir, "_gitignore");
  if (await fs.pathExists(gi)) {
    await fs.rename(gi, path.join(targetDir, ".gitignore"));
  }

  // Rename env example
  const envEx = path.join(targetDir, "_env");
  if (await fs.pathExists(envEx)) {
    await fs.rename(envEx, path.join(targetDir, ".env"));
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(banner);

  const args = process.argv.slice(2);

  // Quick mode: boomplate <template> <folder>
  if (args.length >= 2 && TEMPLATES[args[0]]) {
    await runScaffold(args[0], args[1]);
    return;
  }

  // List mode: boomplate list
  if (args[0] === "list") {
    console.log(chalk.bold("\n  Available templates:\n"));
    for (const [key, val] of Object.entries(TEMPLATES)) {
      console.log(
        `  ${chalk.cyan(key.padEnd(18))} ${chalk.white(val.label.padEnd(26))} ${chalk.gray(val.desc)}`
      );
    }
    console.log(
      chalk.gray("\n  Usage: boomplate <template> <folder-name>\n")
    );
    return;
  }

  // Interactive mode
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: chalk.bold("Pick a template:"),
      choices: groupedChoices(),
      pageSize: 20,
    },
    {
      type: "input",
      name: "folder",
      message: chalk.bold("Project folder name:"),
      default: (ans) => ans.template + "-project",
      validate: (v) => v.trim().length > 0 || "Need a folder name",
    },
    {
      type: "confirm",
      name: "install",
      message: chalk.bold("Run npm install now?"),
      default: true,
      when: (ans) => TEMPLATES[ans.template]?.install,
    },
  ]);

  await runScaffold(answers.template, answers.folder, answers.install);
}

async function runScaffold(templateKey, folder, install) {
  const targetDir = path.resolve(process.cwd(), folder);
  const tmpl = TEMPLATES[templateKey];

  if (!tmpl) {
    console.error(chalk.red(`\n  ✖ Unknown template "${templateKey}". Run: boomplate list\n`));
    process.exit(1);
  }

  if (await fs.pathExists(targetDir)) {
    console.error(chalk.red(`\n  ✖ Folder "${folder}" already exists.\n`));
    process.exit(1);
  }

  console.log();
  const spinner = ora({
    text: `Scaffolding ${chalk.cyan(tmpl.label)} into ${chalk.white(folder)}`,
    color: "cyan",
  }).start();

  try {
    await scaffold(templateKey, targetDir);
    spinner.succeed(chalk.green(`Scaffolded ${tmpl.label}`));
  } catch (err) {
    spinner.fail("Scaffold failed: " + err.message);
    process.exit(1);
  }

  // Handle MERN sub-installs
  if (templateKey === "mern") {
    if (install !== false) {
      const s2 = ora({ text: "Installing server deps…", color: "cyan" }).start();
      try {
        runCommand("npm install", path.join(targetDir, "server"));
        s2.succeed("Server deps installed");
      } catch { s2.fail("Server install failed"); }

      const s3 = ora({ text: "Installing client deps…", color: "cyan" }).start();
      try {
        runCommand("npm install", path.join(targetDir, "client"));
        s3.succeed("Client deps installed");
      } catch { s3.fail("Client install failed"); }
    }
  } else if (tmpl.install && install !== false) {
    const s2 = ora({ text: "Running npm install…", color: "cyan" }).start();
    try {
      runCommand("npm install", targetDir);
      s2.succeed("npm install done");
    } catch { s2.fail("npm install failed — run it manually"); }
  }

  // Post-scaffold message
  console.log();
  console.log(chalk.bold.green("  ✔ Ready!"));
  console.log();
  console.log(chalk.white(`  cd ${folder}`));

  const starts = {
    "html5": "  open index.html  (or use Live Server in VSCode)",
    "css-sass": "  npm run dev",
    "vanilla-js": "  npm run dev",
    "react": "  npm run dev",
    "react-ts": "  npm run dev",
    "express": "  npm run dev",
    "express-mongo": "  # edit .env → add MONGO_URI\n  npm run dev",
    "nextjs": "  npm run dev",
    "mern": "  # two terminals:\n  cd server && npm run dev\n  cd client && npm run dev",
    "node-cli": "  npm link  (then run your CLI globally)",
  };

  console.log(chalk.cyan(starts[templateKey] ?? "  npm start"));
  console.log();
}

main().catch((e) => {
  console.error(chalk.red("\n  Error: " + e.message));
  process.exit(1);
});
