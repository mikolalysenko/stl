var stl = require('../stl');
var assert = require('assert');
var fs = require('fs');

function compareAscii(a, b) {
  var regex = /([0-9]*[\.0-9]*E[\-\+]+[0-9]+)/gi;

  var am = a.match(regex);
  var bm = b.match(regex);

  assert.equal(am.length, bm.length);
  for (var i=0; i<am.length; i++) {
    assert.ok(parseFloat(am[i]) === parseFloat(bm[i]));
  }
}

var binarySTL = fs.readFileSync(__dirname + '/binary/ship.stl');
var basicAsciiSTL = fs.readFileSync(__dirname + '/ascii/tri.stl').toString();
var asciiSTL = fs.readFileSync(__dirname + '/ascii/teapot.stl').toString();

// ASCII
var array = stl.toObject(asciiSTL);
var string = stl.fromObject(array);
compareAscii(string, asciiSTL);

// BINARY
var binaryArray = stl.toObject(binarySTL);
var binary = stl.fromObject(binaryArray, true);
assert.ok(binarySTL.length === binary.length);
assert.deepEqual(binary, binarySTL);

// Convert from binary to ascii back to binary
var out = stl.fromObject(
  stl.toObject(
    stl.fromObject(
      stl.toObject(
        binarySTL
      )
    )
  )
  // binary
, true);

assert.deepEqual(binary, binarySTL)
