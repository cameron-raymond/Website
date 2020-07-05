import overview from "./_overview.js";

const contents = JSON.stringify(overview);
export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(contents);
}
