'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var FrontsterGenerator = module.exports = function FrontsterGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(FrontsterGenerator, yeoman.generators.Base);

FrontsterGenerator.prototype.askFor = function askFor() {
  var cb = this.async(), prompts;

  // have Yeoman greet the user.
  console.log(this.yeoman);

  prompts = [
    {
      name: 'projecName',
      message: 'What is the name of your project?',
      default: 'Project'
    },
    {
      type: 'checkbox',
      name: 'stuff',
      message: 'What stuff do you need?',
      choices: [
        {
          name: 'Foundation 4',
          value: 'foundation',
          checked: true
        },
        {
          name: 'Backend will be on CMS Concrete5',
          value: 'concrete',
          checked: false
        },
        {
          name: 'Fixed website',
          value: 'fixed',
          checked: false
        }
      ]
    }
  ];

  this.prompt(prompts, function (props) {
    var _self = this;
    this.projectName = props.projecName;
    this.stuff = {};
    props.stuff.forEach(function (el) {
      _self.stuff[el] = true;
    });
    console.log(this.stuff);

    cb();
  }.bind(this));
};

FrontsterGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/bower_components');
  this.mkdir('app/fonts');
  this.mkdir('app/images');
  this.mkdir('app/images/fish');
  this.mkdir('app/styles/types');
  this.mkdir('app/styles/decorators');
  this.mkdir('app/templates');

  this.directory('app/blocks', 'app/blocks');
  this.directory('app/scripts', 'app/scripts');
  this.directory('app/styles', 'app/styles');
  this.directory('app/templates', 'app/templates');

  this.copy('_bowerrc', '.bowerrc');
  this.copy('app/favicon.ico', 'app/favicon.ico');

  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.template('_compass.rb', 'compass.rb');
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('app/index.html', 'app/index.html');
};

FrontsterGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('_jshintrc', '.jshintrc');
  this.copy('_gitignore', '.gitignore');
  this.copy('README.md', '.README.md');
};