/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

require('usnam-pmb');

function a() { throw new RangeError('Oh noez!'); }
function b() { return a(); }
function c() { return b(); }
c();
