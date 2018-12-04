/*global before describe it*/
'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const PlatformMap = require('../generators/classlib/platform-map');

describe('node-typescript:classlib', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/classlib'))
      .withArguments(['CustomerInventoryItem'])
      .withOptions({
        skipInstall: true
      })
      .on('end', done);
  });

  it('creates classlib files', function () {
    assert.file([
      'src/customer-inventory-item.ts',
      '__tests__/customer-inventory-item-spec.ts'
    ]);
  });

  describe('platform-map', function () {
    let platmap;
    describe('returns template info', function () {

      before(function () {
        platmap = new PlatformMap();
      });
      it('jest', function () {
        const actual = platmap.getTestPlatformInfo('jest');
        assert.equal(actual.folder, '__tests__');
        assert.equal(actual.templates.spec, 'test/jest/blueprint-spec.ts');
      });
      it('mocha', function () {
        const actual = platmap.getTestPlatformInfo('mocha');
        assert.equal(actual.folder, 'test');
        assert.equal(actual.templates.spec, 'test/mocha/blueprint-spec.ts');
      });
    });
  });

});
