import { execFileSync } from "child_process";
import { resolve } from "path";
import { describe, expect, it } from "vitest";

const cli = resolve(__dirname, "../dist/index.js");

function run(args: string[]): { stdout: string; exitCode: number } {
  try {
    const stdout = execFileSync("node", [cli, ...args], {
      encoding: "utf-8",
    });
    return { stdout: stdout.trim(), exitCode: 0 };
  } catch (err: unknown) {
    const e = err as { stdout: string; status: number };
    return { stdout: (e.stdout ?? "").trim(), exitCode: e.status };
  }
}

describe("audio-transcriber CLI", () => {
  it("prints help with --help", () => {
    const { stdout, exitCode } = run(["--help"]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("Usage:");
    expect(stdout).toContain("audio-transcriber");
  });

  it("prints version with --version", () => {
    const { stdout, exitCode } = run(["--version"]);
    expect(exitCode).toBe(0);
    expect(stdout).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("exits with error when no arguments provided", () => {
    const { stdout, exitCode } = run([]);
    expect(exitCode).toBe(1);
    expect(stdout).toContain("no input file specified");
  });
});
