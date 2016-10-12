-*- coding: utf-8, tab-width: 2 -*-

usnam
=====
Concise stack traces for node.js:
[pretty-error](https://github.com/AriaMinaei/pretty-error) **plus**:
  * compact theme
    * still with paths
  * auto-start
  * some default path aliases
  * auto-require [clarify][npm-clarify]:
    strips nodejs's internal module loader files from stack trace.


The package name is derrived from "Ausnahme", german for *exception*,
dialectally contracted to the limits of what I could recognize.


Example error display
---------------------
![out of memory](https://github.com/mk-pmb/node-usnam-pmb/raw/master/doc/example-error.png)


Todo
----
  * Extend my terminal's font with 📦 (U+1f4e6 Package) and
    📂 (U+1f4c2 Open File Folder).
  * Alias prefixes: use 📦 for packages and 📂 for current directory.


License
-------
ISC



  [npm-clarify]: https://www.npmjs.com/package/clarify
