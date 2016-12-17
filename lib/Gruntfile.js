module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    jshint: {
      files: ['../javascripts/**/*.js'],
      options: {
        predef: [ "document", "console", "$", "firebase", "FbAPI", "app", "angular"],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      }
    },
     sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd:"../",
            src: [
              "index.html",
              "javascripts/**/*.js",
              "styles/**/*.css",
              "partials/**/*.html",
              "images/*.png",
              "lib/bower_components/bootstrap/dist/css/bootstrap.min.css",
              "lib/bower_components/alertifyjs/dist/css/alertify.css",
              "lib/bower_components/jquery/dist/jquery.min.js",
              "lib/bower_components/bootstrap/dist/js/bootstrap.min.js",
              "lib/bower_components/angular/angular.min.js",
              "lib/bower_components/angular-route/angular-route.min.js",
              "lib/bower_components/angular-smart-table/dist/smart-table.min.js",
              "lib/bower_components/angular-input-stars-directive/angular-input-stars.js",
              "lib/bower_components/alertifyjs/dist/js/alertify.js"
            ],
            dest: "../public/"
        }
        ]
      }
    }
  });

  grunt.registerTask('default', ['sass', 'jshint', 'watch']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('deploy', ['sass','copy']);
};