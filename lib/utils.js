/* eslint-disable no-console */
require('colors');

const prefix = '[happy-mock-webpack-plugin]';
function assert(expect, actual) {
  const message = `${prefix}:ERR: root field must be ${expect}, but got: 【${actual}】instead`;
  console.log(message.red);
  throw new Error(message);
}

function error(e) {
  let message = e || '';
  if (e instanceof Error) {
    message = e.message;
  }
  console.log(message.red);
}

function warn(message) {
  console.log(`${prefix}:WARN: ${message}`.yellow);
}

function getRequestPath(parent, child) {
  if (parent.includes(child)) {
    return parent.replace(child, '');
  }
  // fallback to child full path
  warn(`path ${child} is not part of ${parent}, will serve ${child} as a fallback, please 
    ensure the file you want to serve is under ${parent} dir`);
  return child;
}

function getFileContent(filePath) {
  // delete nodejs' require cache
  // otherwise the latest update of file would take no effect unless you restart the app
  delete require.cache[require.resolve(filePath)];
  // eslint-disable-next-line
  const response = require(filePath);
  return response;
}

module.exports = {
  warn,
  assert,
  error,
  getRequestPath,
  getFileContent,
};
