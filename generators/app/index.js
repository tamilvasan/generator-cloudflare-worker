'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const _ = require('lodash');
const shelljs = require('shelljs');

module.exports = Generator.extend({
  initializing: function() {
    const done = this.async();
    this.log(
      yosay(
        'Welcome to the minimal ' + chalk.red('Cloudflare Worker') + ' generator!'
      )
    );

    this.log(
      chalk.cyan(
        'I simply get down to business of generating, no questions asked!'
      ) +
        '\n' +
        chalk.yellow(
          'Libraries you ask? I use npm as task runner and jest for testing.'
        ) +
        '\n' +
        chalk.gray(
          'Can you change these? Of course, it\'s your code. I get out of the way after scaffolding.'
        )
    );

    this.composeWith(
      require.resolve('../classlib'),
      Object.assign({ arguments: ['Worker'] }, this.options)
    );
    done();
  },

  writing: {
    vsCodeFiles: function() {
      this.fs.copy(
        this.templatePath('_vscode/tasks.json'),
        this.destinationPath('.vscode/tasks.json')
      );
      this.fs.copy(
        this.templatePath('_vscode/settings.json'),
        this.destinationPath('.vscode/settings.json')
      );
      if (!(this.options.mocha)) {
        // copy launch.json only for default jest configuration
        this.fs.copy(
          this.templatePath('_vscode/launch.json'),
          this.destinationPath('.vscode/launch.json')
        );
      }
    },

    rootFiles: function() {
      const today = new Date();
      if (this.options.mocha) {
        // copy mocha files
        this.fs.copyTpl(
          this.templatePath('_package_mocha.json'),
          this.destinationPath('package.json'),
          { 
            appname: _.kebabCase(path.basename(process.cwd())),
            indexfile:_.kebabCase(this.options.className)
          }
        );
        this.fs.copy(
          this.templatePath('travis_mocha.yml'),
          this.destinationPath('.travis.yml')
        );
        
      } else {
        // copy files for default jest configuration
        this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'),
          { 
            appname: _.kebabCase(path.basename(process.cwd())),
            indexfile:_.kebabCase(this.options.className)
          }
        );
        this.fs.copy(
          this.templatePath('travis.yml'),
          this.destinationPath('.travis.yml')
        );
        
      }
      // copy files common for all configurations
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('config.json'),
        this.destinationPath('config.json')
      );
      /*console.log(this.options);
      this.fs.copyTpl(
        this.templatePath('worker-header.js'),
        this.destinationPath('./src/worker-header.js'),
        {  className: this.options.className }
      );*/
      this.fs.copy(
        this.templatePath('mock.ts'),
        this.destinationPath('mock.ts')
      );
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
      this.fs.copy(
        this.templatePath('_tsconfig.json'),
        this.destinationPath('tsconfig.json')
      );
      this.fs.copy(
        this.templatePath('_tslint.json'),
        this.destinationPath('tslint.json')
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('npmignore'),
        this.destinationPath('.npmignore')
      );
      this.fs.copyTpl(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE'),
        { year: today.getFullYear().toPrecision(4) }
      );
    }
  },

  install: {
    npmInstall: function() {
      const generator = this;
      if (shelljs.which('yarn')) {
        generator.yarnInstall();
      } else {
        generator.npmInstall(null, {
          skipInstall: this.options['skip-install']
        });
      }
    }
  }
});
