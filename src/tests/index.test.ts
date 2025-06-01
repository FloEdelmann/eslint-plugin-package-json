import { ESLint, Linter } from "eslint";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import plugin from "../index.js";

describe("configs", () => {
	it("configs should work properly", async () => {
		const eslint = new ESLint({
			baseConfig: plugin.configs.recommended as Linter.Config,
			fix: true,
		});
		const code = await readFile(
			// @ts-expect-error - The 'import.meta' meta-property is not allowed in files which will build into CommonJS output.ts(1470)
			resolve(import.meta.filename, "../../../package.json"),
			"utf8",
		);
		const result = await eslint.lintText(code, {
			filePath: "package.json",
		});
		expect(
			result[0].messages.map((message) => ({
				message: message.message,
				ruleId: message.ruleId,
			})),
		).toEqual([]);
	});
});
