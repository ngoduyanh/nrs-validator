import { deserializeBulk } from "https://raw.githubusercontent.com/ngoduyanh/nrs-lib-ts/v0.1.1/mod.ts";
import { ValidationContext } from "./validator/lib.ts";
import dahCheckCustomId from "./validator/rules/dah-check-custom-id.ts";
import dahEntryNoConsumed from "./validator/rules/dah-entry-no-consumed.ts";
import dahInvalidId from "./validator/rules/dah-invalid-id.ts";
import dahLonePads from "./validator/rules/dah-lone-pads.ts";
import dahNoBestGirl from "./validator/rules/dah-no-best-girl.ts";
import dahNoDroppedImpact from "./validator/rules/dah-no-dropped-impact.ts";
import dahNoProgress from "./validator/rules/dah-no-progress.ts";
import dahNoTitle from "./validator/rules/dah-no-title.ts";
import dahNullEntryReference from "./validator/rules/dah-null-entry-reference.ts";
import dahSumContainWeight from "./validator/rules/dah-sum-contain-weight.ts";
import dahVisualChecks from "./validator/rules/dah-visual-checks.ts";
import dahVisuallessEntry from "./validator/rules/dah-visualless-entry.ts";

const rules = [
  dahCheckCustomId,
  dahEntryNoConsumed,
  dahInvalidId,
  dahLonePads,
  dahNoBestGirl,
  dahNoDroppedImpact,
  dahNoProgress,
  dahNoTitle,
  dahNullEntryReference,
  dahSumContainWeight,
  dahVisualChecks,
  dahVisuallessEntry,
];

if (Deno.args.length < 1) {
  console.error("Usage: [deno run --allow-all] main.ts (path to bulk.json)");
  Deno.exit(1);
}

const path = Deno.args[0];
const [data] = deserializeBulk(Deno.readTextFileSync(path));

let exitCode = 0;
for (const rule of rules) {
  const context = new ValidationContext(rule, data);
  if (context.run()) {
    exitCode = 1;
  }
}

Deno.exit(exitCode);
