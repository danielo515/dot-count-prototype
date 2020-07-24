const path = require("path");
const { writeFile: _writeFile, readFile: _readFile } = require("fs");
const { promisify } = require("util");
const writeFile = promisify(_writeFile);
const readFile = promisify(_readFile);
const configPath = path.join(__dirname, "../itemcounter/config.xml");

const version = require("../package.json").version;
async function main() {
  const appConfig = await readFile(configPath, "utf8");
  const updatedContent = appConfig.replace(
    /version="(\d+\.?){3}"/,
    `version="${version}"`
  );
  await writeFile(configPath, updatedContent, "utf8");
  console.log("wrote", version, "to", configPath);
}

main().catch(console.error);
