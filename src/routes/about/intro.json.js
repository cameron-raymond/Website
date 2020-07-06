import { intro } from "./_about.js";

const contents = JSON.stringify(intro);
export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(contents);
}
