import { content } from "./_about.js";

const contents = JSON.stringify(content);
export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(contents);
}

