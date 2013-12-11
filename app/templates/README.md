Built with [generator-fronty] (https://github.com/Oikio/generator-fronty).


Generator-Fronty
=========

Frontend boilerplate built on yeoman, bower and grunt.

It's something like Atomic Design and BEM principles I use in HTML\CSS part:

* Blocks can contain own elements and other blocks.
* Elements can contain elements of parent's block or other blocks.
* Block modificators can change own block elements and other child blocks.
* Styles depend on classes, not tags or ids.
* No cascades! (just if one block changes while entering another or modificator changes block\element and it's blocks\elements)
* No global modificators, just with blocks and elements, except parent modificators (see Option 2 in "Block to block modificators")
* For reusable styling use particles (atoms).
* Separate styles and scripts, use data-* attributes for logic and classes for styling. (But if DOM manipulation perfomance matters, you know what to do by yourself)

Naming:
``` SCSS
.block-name {};
.block-name__element-name {};
.block-name_modificator {};
.block-name__element-name_modificator {};
.block-name {
  &.modificator {}
};
.block-name__element-name {
  &.modificator {}
};
```
Block to block modificators:
``` SCSS
// Option 1.
// parent-block.scss
.parent-block {
  &.reverse-color {
    background:black;

    .child-block {
      background:white;
    }
    .child-block__element {
      color: black;
    }
  }
}
// child-block.scss
.child-block {}


// Option 2.
// parent-block.scss
.parent-block {
  &.reverse-color {
    background:black;
  }
}
// child-block.scss
.reverse-color {
  .child-block {
    background:white;
  }
  .child-block__element {
    color: black;
  }
}
```

Particles (atoms) concept:
``` SCSS
@mixin particle-name () {
    margin: 1em 0
};
%particle-name {};

.block-name {
@include %particle-name();
// or
@extend %particle-name;
}
```

Install:
``` bash
npm install -g generator-fronty
cd myProjectFolder
yo fronty
```

### Commands:
``` bash
grunt [build] # build project
grunt build:server # build and load server
grunt server # connect server with livereload for prototyping
grunt pre # fast build with no minification for debugging
grunt wPre # prebuild with watch
grunt wPre:server # prebuild with watch and server
grunt block:name # add block with html,sass files and add it to styles/_blocks.sass
grunt rBlock:name # remove block
grunt uBlocks # updates blocks.sass
grunt static:name # add static page
```

### Templates navigation:
* Ctrl+SHift+X
* 3 double taps with two fingers

### Dependencies:
* Node.js:
    * Grunt-cli
    * Bower
    * Yeoman

### TODO
* make pages constructor mustache->html with [mustache-render](http://projects.the5thwall.net/mustache-render/)
* make second UseminPrepare task with no minification (2.0 throws error, waiting for npm publish)
* add tests

## Release History
* 3.0.0 New HTML\CSS methodology, major updates and bug fixes.
* 2.3.0 Watch expanded with browser-sync.
* 2.2.0 Collector.html helps you construct static layout from mustache templates.
* 2.1.0 Compass and Ruby Sass changed to node-sass (it's really fast 5-10x)
* 2.0.0 Foundation 5 is here and set by default
* 1.2.0 .html files changed to .mustache, minor fixes in gruntfile
* 1.1.0 Static pages added, code refactoring done
* 1.0.0 Here is Fronty!