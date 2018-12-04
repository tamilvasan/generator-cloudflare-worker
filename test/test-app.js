/*global before describe it*/
'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('node-typescript:app with mocha', function () {
  before(function (done) {
    helpers
      .run(path.join(__dirname, '../generators/app'))
      .withOptions({
        skipInstall: true,
        mocha: true
      })
      .on('end', done);
  });

  it('creates project files', function () {
    assert.file([
      '.vscode/tasks.json',
      '.vscode/settings.json',
      'src/worker.ts',
      'src/worker-header.js',
      'test/worker-spec.ts',
      'mock.ts',
      'gulpfile.js',
      'package.json',
      'tsconfig.json',
      'tslint.json',
      '.travis.yml',
      '.editorconfig',
      '.gitignore',
      '.npmignore',
      'LICENSE',
      'README.md'
    ]);
  });
});


describe('node-typescript:app with jest - default configuration', function () {
  before(function (done) {
    helpers
      .run(path.join(__dirname, '../generators/app'))
      .withOptions({
        skipInstall: true
      })
      .on('end', done);
  });

  it('creates project files', function () {
    assert.file([
      '.vscode/tasks.json',
      '.vscode/settings.json',
      '.vscode/launch.json',
      'src/worker.ts',
      'src/worker-header.js',
      '__tests__/worker-spec.ts',
      'mock.ts',
      'gulpfile.js',
      'package.json',
      'tsconfig.json',
      'tslint.json',
      '.travis.yml',
      '.editorconfig',
      '.gitignore',
      '.npmignore',
      'LICENSE',
      'README.md'
    ]);
  });
});
