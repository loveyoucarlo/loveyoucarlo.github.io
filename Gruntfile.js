module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: [
                    'node_modules/angular-loading-bar/build/loading-bar.min.js','js/controllers.js'
                ],
                dest: 'bin/grunt-combined.js'
            }
        },
        uglify: {
            js: {
                files: {
                    'bin/grunt-combined.js': ['<%= concat.js.dest %>']
                }
            }
        },
        watch: {
      files: ['js/*'],
      tasks: ['concat', 'uglify']
    }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat:js', 'uglify:js']);
};