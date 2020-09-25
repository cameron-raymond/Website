// This file is called `_about.js` rather than `about.js`, because
// we don't want to create an `/blog/overview` route — the leading
// underscore tells Sapper not to do that.
const fs = require("fs");
const frontMatter = require("front-matter");

const marked = require("marked");

const dirPath = `./content/about`;
export const overview = fs.readdirSync(`${dirPath}/overview`).map((ovFilename) => {
  const ovContent = fs.readFileSync(`${dirPath}/overview/${ovFilename}`, {
    encoding: "utf8",
  });
  const ovFrontMatter = frontMatter(ovContent);
  const list = ovFrontMatter.attributes.urls.map((url, i) => {
    const title = ovFrontMatter.attributes.titles[i];
    return `<a aria-label="${title}" href="${url}">${title}</a>`
  });
  let ov = ovFrontMatter.attributes
  ov.list = list
  return ov
}).filter((p) => p.prod).sort((a, b) => a.priority > b.priority ? 1 : -1);

const introContent = fs.readFileSync(`${dirPath}/intro.md`, {
  encoding: "utf8",
});
const introFrontMatter = frontMatter(introContent);
let i = introFrontMatter.attributes;
i.html =  marked(introFrontMatter.body).replace(/^\t{3}/gm, "");
export const intro = i;

const pubsContent = fs.readFileSync(`${dirPath}/bottom-content.md`, {
    encoding: "utf8",
  });
const pubsFrontMatter = frontMatter(pubsContent);
let p = pubsFrontMatter.attributes;
p.html =  marked(pubsFrontMatter.body).replace(/^\t{3}/gm, "");
export const pubs = p;