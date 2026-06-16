const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const propertyDir = path.join(projectRoot, "empreendimentos");

const rootPages = ["index.html", "imoveis.html", "simulacao.html", "quemSomos.html"];
const propertyPages = fs.existsSync(propertyDir)
  ? fs.readdirSync(propertyDir).filter((file) => file.endsWith(".html"))
  : [];

function updateRootPage(content) {
  let next = content
    .replaceAll('href="css/style.css"', 'href="assets/css/style.css"')
    .replaceAll('src="js/script.js"', 'src="assets/js/script.js"')
    .replaceAll('src="imagens/', 'src="assets/images/')
    .replaceAll('data-src="imagens/', 'data-src="assets/images/')
    .replaceAll('href="imagens/', 'href="assets/images/')
    .replaceAll('src="videos/', 'src="assets/videos/')
    .replaceAll('href="videos/', 'href="assets/videos/');

  for (const page of propertyPages) {
    next = next.replaceAll(`href="${page}"`, `href="empreendimentos/${page}"`);
  }

  return next;
}

function updatePropertyPage(content) {
  return content
    .replaceAll('href="css/style.css"', 'href="../assets/css/style.css"')
    .replaceAll('src="js/script.js"', 'src="../assets/js/script.js"')
    .replaceAll('src="imagens/', 'src="../assets/images/')
    .replaceAll('data-src="imagens/', 'data-src="../assets/images/')
    .replaceAll('href="imagens/', 'href="../assets/images/')
    .replaceAll('src="videos/', 'src="../assets/videos/')
    .replaceAll('href="videos/', 'href="../assets/videos/')
    .replaceAll('href="index.html"', 'href="../index.html"')
    .replaceAll('href="imoveis.html"', 'href="../imoveis.html"')
    .replaceAll('href="simulacao.html"', 'href="../simulacao.html"')
    .replaceAll('href="quemSomos.html"', 'href="../quemSomos.html"');
}

for (const page of rootPages) {
  const pagePath = path.join(projectRoot, page);
  if (!fs.existsSync(pagePath)) continue;

  fs.writeFileSync(pagePath, updateRootPage(fs.readFileSync(pagePath, "utf8")));
}

for (const page of propertyPages) {
  const pagePath = path.join(propertyDir, page);
  fs.writeFileSync(pagePath, updatePropertyPage(fs.readFileSync(pagePath, "utf8")));
}

console.log(
  `Atualizados ${rootPages.length} HTMLs principais e ${propertyPages.length} HTMLs de empreendimentos.`
);
