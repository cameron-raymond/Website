// This file is called `_overview.js` rather than `overview.js`, because
// we don't want to create an `/blog/overview` route — the leading
// underscore tells Sapper not to do that.
const fs = require("fs");
const frontMatter = require("front-matter");

const dirPath = `./content/about-overview`;
const overview = fs.readdirSync(dirPath).map((ovFilename) => {
  const ovContent = fs.readFileSync(dirPath + `/${ovFilename}`, {
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
}).filter((p) => p.prod).sort((a,b) => a.priority > b.priority ? 1 : -1);

export default overview;
