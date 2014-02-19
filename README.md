[Generator-fronty] (https://github.com/Oikio/generator-fronty). 4.2.0
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
* Separate styles and scripts, use data-* attributes and IDs for logic and classes for styling. (But if DOM manipulation perfomance matters, you know what to do by yourself)

#### Naming:
``` SCSS
.block-name {};
.block-name__element-name {};
.block-name_modificator {};
.block-name__element-name_modificator {};
.block-name {
  &._modificator {}
};
.block-name__element-name {
  &._modificator {}
};
```

#### Block to block modificators:
``` SCSS
// Option 1.
// parent-block.scss
.parent-block {
  &._reverse-color {
    background: black;

    .child-block {
      background: white;
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
  &._reverse-color {
    background:black;
  }
}
// child-block.scss
._reverse-color {
  .child-block {
    background:white;
  }
  .child-block__element {
    color: black;
  }
}
```

#### Particles (atoms) concept:
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

### Install:
``` bash
npm install -g generator-fronty
cd myProjectFolder
yo fronty
grunt server
grunt build
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
grunt render # renders all .mustache templates to .html files and creates render folder with sources for client
```

### Templates navigation:
* Ctrl+SHift+X
* 3 double taps with two fingers

### Dependencies:
* Node.js:
    * Grunt-cli
    * Bower
    * Yeoman

### Files and folders explanation
```
app/ - source folder
dist/ - production folder
index.html - source index file
production.html - production index file
other .html in root - templates from "grunt render" command

bower - vendor files installed from bower
scripts/dev/ - files for development purposes only
templates/render/ - rendered templates from "grunt render" command
```

### TODO
* make better logs
* make second UseminPrepare task with no minification (2.0.2 throws error, waiting for npm publish)
* update jpgegtran-bin and imagmein (still get error on minification)
* add tests with Karma for generator
* add tests with Karma for projects

## Release History
* 4.2.0 render tasks creates new folder render
* 4.1.0 grunt render task and production.html added, collector.html deprecated.
* 4.0.0 Static pages deprecated, all dependencies updates.
* 3.0.0 New HTML\CSS methodology, major updates and bug fixes.
* 2.3.0 Watch expanded with browser-sync.
* 2.2.0 Collector.html helps you construct static layout from mustache templates.
* 2.1.0 Compass and Ruby Sass changed to node-sass (it's really fast 5-10x).
* 2.0.0 Foundation 5 is here and set by default.