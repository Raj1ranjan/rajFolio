// render-ejs.js
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

// Paths
const viewsDir = path.join(__dirname, "views");
const outputDir = path.join(__dirname, "dist");

// Example pages to convert (add more if needed)
const pages = ["index", "about", "contact"];

// Make output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Render and save each page
pages.forEach((page) => {
  const filePath = path.join(viewsDir, `${page}.ejs`);
  const outputPath = path.join(outputDir, `${page}.html`);

  const html = ejs.render(fs.readFileSync(filePath, "utf-8"), {
    // pass any template variables here if needed
  });

  fs.writeFileSync(outputPath, html);
  console.log(`Rendered: ${page}.ejs → ${page}.html`);
});
