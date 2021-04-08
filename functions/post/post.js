var utils = require('./utils');
const marked = require("marked");

// Every new line in markdown is considered a new paragraph, this prevents img tags from being wrapped <p> tags
// which is helpful for resizing the first img, centering captions, etc.
marked.Renderer.prototype.paragraph = (text) => {
    if (text.startsWith("<img")) {
      return text + "\n";
    }
    return "<p>" + text + "</p>";
  };

exports.handler = async function (event, context) {
    let body = event.queryStringParameters;
    const { link } = body;
    const postMD = await utils.loadMediumPostTwo(link)
    const postHTML = marked(postMD).replace(/^\t{3}/gm, "")

    return {
        statusCode: 200,
        body: JSON.stringify({ "html": postHTML })
    };
}