// This file is called `_overview.js` rather than `overview.js`, because
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
  return {
    "header": ovFrontMatter.attributes.header,
    "emoji": ovFrontMatter.attributes.emoji,
    "prod": ovFrontMatter.attributes.prod,
    "priority": ovFrontMatter.attributes.priority,
    "list": list
  }
}).filter((p) => p.prod).sort((a, b) => a.priority > b.priority ? 1 : -1);

let getIntro = () => {
  const introContent = fs.readFileSync(`${dirPath}/intro.md`, {
    encoding: "utf8",
  });
  const introFrontMatter = frontMatter(introContent);
  return {
    "image": introFrontMatter.attributes.image,
    "title": introFrontMatter.attributes.title,
    "emoji": introFrontMatter.attributes.emoji,
    "html": marked(introFrontMatter.body).replace(/^\t{3}/gm, ""),
  }

}
export const intro = getIntro();