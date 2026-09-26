import fs from "fs";
import { join } from "path";

const contentDirectory = join(process.cwd(), "content");

export function getContent(name: string) {
  return fs.readFileSync(join(contentDirectory, `${name}.md`), "utf8");
}
