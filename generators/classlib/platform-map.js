'use strict';
var PlatformMap = (function () {
  function PlatformMap() {
    this.templatesMap = new Map();
    const self = this;
    const plats = [
      'jest',
      'mocha'
    ];
    plats.forEach(function (plat) {
      return self.templatesMap.set(plat, {
        folder: plat === 'jest' ? '__tests__' : 'test',
        templates: {
          spec: 'test/' + plat + '/blueprint-spec.ts',
          mock: 'test/mock.ts',
        },
      });
    });
  }
  PlatformMap.prototype.getTestPlatformInfo = function (plat) {
    return this.templatesMap.get(plat);
  };
  return PlatformMap;
}());
module.exports = PlatformMap;
