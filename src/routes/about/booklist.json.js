import { booklist } from "./_about.js";

const booklists = JSON.stringify(booklist);
export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(booklists);
}

