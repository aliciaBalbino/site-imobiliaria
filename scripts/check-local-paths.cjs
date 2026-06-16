const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const htmlFiles = [
  ...fs.readdirSync(projectRoot)
    .filter((file) => file.endsWith(".html"))
    .map((file) => path.join(projectRoot, file)),
  ...fs.readdirSync(path.join(projectRoot, "empreendimentos"))
    .filter((file) => file.endsWith(".html"))
    .map((file) => path.join(projectRoot, "empreendimentos", file)),
];

const localReferencePattern = /\b(?:href|src|data-src)="([^"]+)"/g;
const ignoredPrefixes = ["http://", "https://", "mailto:", "tel:", "#", "data:"];
const missing = [];

for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, "utf8");
  let match;

  while ((match = localReferencePattern.exec(content))) {
    const reference = match[1];
    if (ignoredPrefixes.some((prefix) => reference.startsWith(prefix))) continue;

    const cleanReference = reference.split("#")[0].split("?")[0];
    if (!cleanReference) continue;

    const resolvedPath = path.resolve(path.dirname(htmlFile), cleanReference);
    if (!fs.existsSync(resolvedPath)) {
      missing.push(`${path.relative(projectRoot, htmlFile)} -> ${reference}`);
    }
  }
}

if (missing.length) {
  console.error("Referencias locais nao encontradas:");
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`OK: ${htmlFiles.length} HTMLs verificados sem referencias locais quebradas.`);
