const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const viewsDir = path.join(__dirname, "views");
const outputDir = path.join(__dirname, "dist");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

try {
  const files = fs.readdirSync(viewsDir);

  files.forEach((file) => {
    if (file.endsWith(".ejs")) {
      const inputPath = path.join(viewsDir, file);
      const outputPath = path.join(outputDir, file.replace(".ejs", ".html"));

      ejs.renderFile(inputPath, {}, (err, str) => {
        if (err) {
          console.error(`❌ Error rendering ${file}:`, err);
          process.exit(1); // Important: exits so Netlify sees build failed
        } else {
          fs.writeFileSync(outputPath, str);
          console.log(`✅ Rendered ${file} → ${outputPath}`);
        }
      });
    }
  });
} catch (err) {
  console.error("❌ Build failed:", err);
  process.exit(2);
}
