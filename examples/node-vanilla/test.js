// Node.js should resolve this to the root of the repo. Since the path returns a
// directory, node will look for the `main` property in `package.json`, which
// should point to the `main` build.
var typedeck = require('typedeck');

// now we can use the library
var assert = require('assert');

assert(true);
