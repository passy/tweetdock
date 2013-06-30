// Generated on 2013-06-30 using generator-flight 0.2.0
'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};


module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    dir: {
      app: 'app',
      dist: 'dist'
    },
    watch: {
      styles: {
        files: ['<%= dir.app %>/css/{,*/}*.css'],
        tasks: ['autoprefixer']
      },
      livereload: {
        files: [
          '.tmp/{,*/}*.html',
          '.tmp/css/{,*/}*.css',
          '{.tmp,<%= dir.app %>}/js/{,*/}*.js',
          '<%= dir.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= dir.dist %>/*',
            '!<%= dir.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= dir.app %>/js/{,*/}*.js',
        '!<%= dir.app %>/js/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dir.app %>/css',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      }
    },
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,

          almond: true,
          replaceRequireScript: [{
            files: ['<%= dir.dist %>/index.html'],
            module: 'js/main'
          }],
          modules: [{ name: 'js/main' }],
          baseUrl: '<%= dir.app %>',
          dir: '<%= dir.dist %>',
          mainConfigFile: '<%= dir.app %>/js/main.js',
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dir.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= dir.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dir.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= dir.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= dir.dist %>/css/main.css': [
            '.tmp/css/{,*/}*.css',
            '<%= dir.app %>/css/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= dir.app %>',
          src: '{,*/}*.html',
          dest: '<%= dir.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dir.app %>',
          dest: '<%= dir.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'css/fonts/*'
          ]
        }]
      }
    },
    concurrent: {
      dist: [
        'autoprefixer',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    bower: {
      all: {
        rjsConfig: '<%= dir.app %>/js/main.js'
      }
    },
    uglify: {
      dist: {
        expand: true,
        dot: true,
        cwd: '<%= dir.dist %>/js',
        dest: '<%= dir.dist %>/js',
        src: '{,*/}*.js'
      },
      bowerComponents: {
        expand: true,
        dot: true,
        cwd: '<%= dir.app %>/bower_components/',
        dest: '<%= dir.dist %>/bower_components/',
        src: [
          'es5-shim/es5-shim.js',
          'es5-shim/es5-sham.js',
          'jquery/jquery.js'
        ]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'autoprefixer',
      'livereload-start',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'autoprefixer',
    'requirejs',
    'cssmin',
    'uglify',
    'copy'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);
};
