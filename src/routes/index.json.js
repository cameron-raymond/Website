import posts from "./blog/_posts.js";

let prettyDate = (date) => {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  return `${mo}. ${ye}`;
};

const contents = JSON.stringify(
  posts.filter(p => p.prod).map((post) => {
      return {
        title: post.title,
        slug: post.slug,
        emoji: post.emoji,
        tags: post.tags,
        link: post.link,
        blurb: post.blurb,
        timestamp: post.date,
        date: prettyDate(post.date),
      };
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
);

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(contents);
}
