const indexString = createHTML("SpicyFruit - API", "" +
  "<h1>SpicyFruit API</h1>" +
  "<p>More APIs lie behind this point please be wary.</p>");

const forbiddenString = createHTML("403 Forbidden", "" +
  "<h1>403 Forbidden</h1>" +
  "<br>" +
  "<p>You do not have the permission to access this API.</p>");

const privateIndexString = createHTML("SpicyFruit - API", "" +
  "<h1>SpicyFruit Private API</h1>" +
  "<p>You have access to the private APIs of SpicyFruit!</p>");

const publicIndexString = createHTML("SpicyFruit - API", "" +
  "<h1>SpicyFruit Public API</h1>" +
  "<p>You have access to the public APIs of SpicyFruit!</p>");

const internalErrorString = createHTML("500 Internal Error", "" +
  "<h1>500 Internal Server Error</h1>" +
  "<br>" +
  "<p>There was an error. Please try again later.</p>");


function createHTML(title, content) {
  return "" +
    "<html lang='en'>" +
    "<head>" +
    "<title>" + title + "</title>" +
    "</head>" +
    "<body>" + content +
    "<hr>" +
    "<p>Copyright © " + new Date().getFullYear() + " ORANGEBANANASPY, All rights reserved.</p>" +
    "</body>" +
    "</html>";
}

module.exports = Object.freeze({
  INDEX: indexString,
  FORBIDDEN: forbiddenString,
  PRIVATE_INDEX: privateIndexString,
  PUBLIC_INDEX: publicIndexString,
  INTERNAL_ERROR: internalErrorString
});
