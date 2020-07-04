// sitemap.xml.js
import posts from "./blog/_posts.js";

const render = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://cameronraymond.me</loc>
    </url>
    <url>
        <loc>https://cameronraymond.me/about/</loc>
    </url>
    <url>
        <loc>https://cameronraymond.me/blog/</loc>
    </url>
    ${posts
      .filter((post) => post.slug && post.prod)
      .map((post) => {
        return `<url>
                 <loc>${
                   `https://cameronraymond.me/blog/${post.slug}/`
                 }</loc>
            </url>`;
      })
      .join("")}
    </urlset>
`;

export async function get(req, res) {
  // The important thing for you to know about this is that
  // this get request returns a list of stringified json objects.
  res.writeHead(200, {
    "Content-Type": "application/xml",
  });
  res.end(render(posts));
}
