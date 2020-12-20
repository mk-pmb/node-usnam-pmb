/* -*- coding: UTF-8, tab-width: 2 -*- */
/*jslint indent: 2, maxlen: 80, continue: true, unparam: true, node: true */
'use strict';

require('clarify');


var primaryNodeModulesDir, chr = String.fromCharCode,
  PrettyError = require('pretty-error'), pe = new PrettyError(),
  pathLib = require('path'), dirN = pathLib.dirname;


pe.aliasParentDirs = function (path, alias, ups) {
  var upped = 0, prevPath = '', upAlias = '';
  ups = (ups === undefined ? 3 : Number(ups));
  if (ups < 0) { ups = 0; }
  for (upped; upped <= ups; upped += 1) {
    upAlias = alias.replace(/\^/g, (upped ? '«' + String(upped) : ''));
    pe.alias(path + '/', upAlias);
    prevPath = path;
    path = pathLib.dirname(path);
    if (path === prevPath) { return; }
  }
};


pe.aliasModuleDir = function almd(modName) {
  var modDir = '';
  if ('function' === typeof modName.forEach) { return modName.forEach(almd); }
  try {
    modDir = dirN(require.resolve(modName));
  } catch (lookupErr) {
    return;
  }
  pe.alias(modDir + '/', 'mod:' + modName + ':');
};


pe.popularModules = [
  'async',
  'bluebird',
  'eslint',
  'grunt',
  'jslint',
  'lodash',
  'pretty-error',
  'q',
];

pe.aliasModuleDir(pe.popularModules);


pe.primaryNodeModulesDir = (function guessPrimaryNodeModulesDir(candidates) {
  // Try and find a node modules directory above ours.
  var shortest = dirN(dirN(module.filename));
  candidates.map(function (candi) {
    try {
      candi = dirN(dirN(require.resolve(candi + '/package.json')));
    } catch (lookupErr) {
      return;
    }
    if (candi.length < shortest.length) { shortest = candi; }
  });
  return shortest;
}(pe.popularModules));


pe.aliasParentDirs(pe.primaryNodeModulesDir, 'mod:', 0);
if ('string' === typeof ((require.main || false).filename)) {
  pe.aliasParentDirs(dirN(require.main.filename), 'main:', 0);
}
pe.aliasParentDirs(process.cwd(), 'cwd:', 0);

pe.appendStyleShortened = function (st) {
  var rekeyed = {};
  Object.keys(st).map(function (key) {
    var val = st[key];
    key = key.replace(/(^|,\s*)\*/, '$1>trace>item'
      ).replace(/(^|,\s*)/g, '$1pretty-error').replace(/>/g, ' > ');
    rekeyed[key] = val;
  });
  pe.appendStyle(rekeyed);
};


pe.appendStyleShortened({
  '': { display: 'block', marginLeft: 0, },
  '>header>title>kind, >header>colon': {
    background: 'none',
    color: 'bright-red',
  },
  '>header>title>kind': { margin: 0, padding: 0, },
  '>trace': { marginTop: 0, marginLeft: 1, },
  '*': {
    display: 'block',
    marginLeft: 2,
    marginBottom: 0,
    bullet: '"<grey>→</grey>"'
  },
  '*>header': { display: 'inline' },
  '*>footer': { display: 'inline' },
  '*>header>pointer>file': { color: 'bright-blue' },
  '*>header>pointer>colon': { color: 'cyan' },
  '*>header>pointer>line': { color: 'bright-cyan' },
  '*>header>what': { color: 'bright-white' },
  '*>footer>addr': { display: 'inline', color: 'grey', paddingLeft: 1, },
  '*>footer>extra': { display: 'inline', color: 'yellow', },
});


pe.maybeStart = function maybeStart() {
  if (process.env.USNAM_COLORIZE) { return pe.start(); }
  if (!process.stderr.isTTY) { return; }
  pe.start();
};


pe.maybeStart();
module.exports = pe;
