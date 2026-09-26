const { execSync } = require("child_process");

function getLastUpdated() {
  try {
    return execSync("git log -1 --format=%cI").toString().trim();
  } catch {
    return new Date().toISOString();
  }
}

module.exports = {
  env: {
    LAST_UPDATED: getLastUpdated(),
  },
  // GitHub Pages serves static files only
  output: "export",
  images: {
    unoptimized: true,
  },
};
