'use strict';
const _ = require('lodash');
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const PlatformMap = require('./platform-map');

module.exports = Generator.extend({
  initializing: function () {
    const done = this.async();

    this.argument('className', {
      type: String,
      required: true,
      desc: 'the name of the worker class'
    });
    this.argument('workerHeader', {
      type: String,
      required: true,
      desc: 'the name of the worker header'
    });

    this.templateContext = {
      className: this.options.className,
      fileName: _.kebabCase(this.options.className),
      workerHeader: this.options.workerHeader,
      whfileName: _.kebabCase(this.options.workerHeader),
      isWindows: process.platform === 'win32',
      mockFile:'mock.ts',
      gulpFile:'Gulpfile.js'
    };

    this.log(yosay(`Generating ${this.templateContext.className}`));

    this.testMap = new PlatformMap();

    done();
  },

  writing: {

    srcFiles: function () {
      this.fs.copyTpl(
        this.templatePath('src/blueprint.ts'),
        this.destinationPath('src/' + this.templateContext.fileName + '.ts'),
        this.templateContext
      );
      this.fs.copyTpl(
        this.templatePath('src/headerblueprint.js'),
        this.destinationPath('src/' + this.templateContext.whfileName + '.js'),
        this.templateContext
      );
      this.fs.copy(
        this.templatePath(this.templateContext.gulpFile),
        this.destinationPath(`${this.templateContext.gulpFile}`)
      );
    },

    testFiles: function () {
      if (this.options) {
        if (this.options.mocha || this.options.gulp) {
          this._writeTestTemplates('mocha');
        }  else {
          this._writeTestTemplates('jest');
        }
      } else {
        this._writeTestTemplates('jest');
      }
    },
  },

  _writeTestTemplates: function (testPlatform) {
    const testInfo = this.testMap.getTestPlatformInfo(testPlatform);
    this.fs.copyTpl(
      this.templatePath(testInfo.templates.spec),
      this.destinationPath(`${testInfo.folder}/${this.templateContext.fileName}-spec.ts`),
      this.templateContext);
    this.fs.copy(
      this.templatePath(testInfo.templates.mock),
      this.destinationPath(`${this.templateContext.mockFile}`)
    );
  },

  _appendTpl: function (from, to, context, tplSettings, options) {
    const template = _.template(this.fs.read(from), tplSettings);
    if (this.fs.exists(to)) {
      this.fs.append(to, template(context), options);
    }
    else {
      this.fs.write(to, template(context), options);
      this.log('Run the app generator first');
    }
  },

});
