Here we have [smart-table](https://github.com/lorenzofox3/Smart-Table) grid over [angular-ui-scroll](https://github.com/angular-ui/ui-scroll).

==============

Prerequisites:
* install [Git](http://git-scm.com/)
* install [node.js (v0.10)](http://nodejs.org/) with npm (Node Package Manager)
* install [Grunt](https://github.com/gruntjs/grunt) package globally.  `npm install -g grunt-cli`
* install [Bower] (https://github.com/bower/bower) ` npm install -g bower `

To run:
* clone the repository `git clone https://github.com/dhilt/ui-scroll-grid.git`
* `cd ui-scroll-grid`
* install nodejs dependencies `npm install`
* remove directives depend on bower `grunt clean:bower`
* install bower dependencies `bower install`
* compile app client side `grunt build`
* run the app server `npm start`
* to open the app in the browser go to `http://localhost:1234/`

