import { pubs } from "./_about.js";

const contents = JSON.stringify(pubs);
export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(contents);
}
