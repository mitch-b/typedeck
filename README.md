# <img src='http://svgshare.com/i/38a.svg' height='20px' alt='TypeDeck' /> TypeDeck
_`typedeck`_

A [TypeScript](https://www.typescriptlang.org/) library for playing cards. 

## All package scripts

You can run the `info` script for information on each script intended to be individually run.

```
yarn run info

  info:
    Display information about the scripts
  build:
    (Trash and re)build the library
  lint:
    Lint all typescript source files
  unit:
    Build the library and run unit tests
  test:
    Lint, build, and test the library
  watch:
    Watch source files, rebuild library on changes, rerun relevant tests
  cov:
    Run tests, generate the HTML coverage report, and open it in a browser
  docs:
    Generate HTML API documentation and open it in a browser
  docs:publish:
    Generate HTML API documentation and push it to GitHub Pages
  docs:json:
    Generate API documentation in typedoc JSON format
  release:
    Bump package.json version, update CHANGELOG.md, tag a release
  reset:
    Delete all untracked files and reset the repo to the last commit
  publish:
    Reset, build, test, publish docs, and prepare release (a one-step publish process)
```

## Credits

* Card images by Ben Davis from the Noun Project
* This library package is built from work by Jason Dreyzehner's [typescript-starter](https://github.com/bitjson/typescript-starter) project. This was the building block for docs, code coverage, and testing (among others). 