'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var FrontyGenerator = module.exports = function FrontsterGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(FrontyGenerator, yeoman.generators.Base);

FrontyGenerator.prototype.askFor = function askFor() {
  var cb = this.async(), prompts;

  // have Yeoman greet the user.
  console.log(this.yeoman);

  prompts = [
    {
      name: 'projecName',
      message: 'What is the name of your project?',
      default: 'Project'
    }
    //TODO make Foundation optional
//    {
//      type: 'checkbox',
//      name: 'stuff',
//      message: 'What stuff do you need?',
//      choices: []
//    }
  ];

  this.prompt(prompts, function (props) {
//    var _self = this;
    this.projectName = props.projecName;
//    this.stuff = {};
//    props.stuff.forEach(function (el) {
//      _self.stuff[el] = true;
//    });

    cb();
  }.bind(this));
};

FrontyGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/bower');
  this.mkdir('app/fonts');
  this.mkdir('app/images');
  this.mkdir('app/images/fish');
  this.mkdir('app/templates');

  this.directory('app/blocks', 'app/blocks');
  this.directory('app/scripts', 'app/scripts');
  this.directory('app/styles', 'app/styles');
  this.directory('app/templates', 'app/templates');

  this.copy('_bowerrc', '.bowerrc');
  this.copy('app/favicon.ico', 'app/favicon.ico');

  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('app/index.html', 'app/index.html');
};

FrontyGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('.jshintrc', '.jshintrc');
  this.copy('_gitignore', '.gitignore');
  this.copy('../../README.md', 'README.md');
};