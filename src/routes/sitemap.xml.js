// sitemap.xml.js
import fetch from "node-fetch";
import posts from "./blog/_posts.js";

function getPath(title, slug) {
  if (!slug) return "/";

  const formatted_title = title
    .replace(/(\s|\?|\,|\&|\/)+/g, "-")
    .toLowerCase();
  return "/blog/" + formatted_title + "-" + slug;
}

const render = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://cameronraymond.me</loc>
    </url>
    <url>
        <loc>https://cameronraymond.me/about</loc>
    </url>
    ${posts
      .filter((post) => post.slug)
      .map(function (post) {
        return `<url>
                 <loc>${
                   "https://cameronraymond.me" + getPath(post.title, post.slug)
                 }</loc>
            </url>`;
      })
      .join("")}
    </urlset>
`;

export async function get(req, res) {
  // The important thing for you to know about this is that
  // this get request returns a list of stringified json objects.
  res.setHeader("Content-Type", "application/xml");
  const xml = render(posts);
  res.end(xml);
}
