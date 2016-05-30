'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var argv = require('yargs').argv;
var fs = require('fs');

module.exports = function(options) {
    var options = {
        rootPath: 'src/app/components/',
        src: 'src/'
    };

    var suffixes = {
        controller: '.controller.js',
        service: '.service.js',
        directive: '.directive.js',
        filter: '.filter.js',
        router: '.router.js',
        scss: '.scss',
        html: '.html'
    };

    var scssTemplate = 
        '.__NG_NAME__-wrap {\n\n' +

        '}';

    var htmlTemplate = 
        '<div class="__NG_NAME__-wrap row-container" ng-init="init()">\n\n' +

        '</div>';

    var controllerTemplate = 
        '\'use strict\'\;\n\n' + 

        'angular.module(\'app\').controller(\'__NG_NAME__Ctrl\',\n' + 
        '\tfunction($scope, __NG_NAME__Service) {\n\n' + 
            '\t\t$scope.init = function(){\n\n' + 

            '\t\t};\n' + 
        '\t});';

    var serviceTemplate = 
        '\'use strict\'\;\n\n' + 

        'angular.module(\'app\').factory(\'__NG_NAME__Service\',\n' + 
        '\tfunction(HttpService) {\n\n' + 

        '\t\treturn {\n\n' +

        '\t\t}\n' +
        '\t});';

    var directiveTemplate = 
        '\'use strict\'\;\n\n' + 

        'angular.module(\'app\')\n' + 
        '\t.directive(\'__NG_NAME__Directive\', function() {\n' + 
            '\t\treturn {\n' + 
            '\t\t\trestrict: \'A\',\n' + 
            '\t\t\tlink: function(scope, iElement, iAttrs){\n\n' + 

            '\t\t\t}\n' +
            '\t\t}\n' +
        '\t});';

    var filterTemplate = 
        '\'use strict\'\;\n\n' + 
        'angular.module(\'app\').filter(\'__NG_NAME__Filter\', function(){\n' +
        '\treturn function(value){\n\n' + 

        '\t}\n' +
        '});';


    var routerTemplate = 
        '\'use strict\'\;\n\n' + 

        'angular.module(\'app\').config(\n' +
            '\tfunction($stateProvider, $urlRouterProvider) {\n\n' +

            '\t\t$stateProvider\n' +
            '\t\t.state("__NG_NAME_L__", {\n' +
                '\t\t\turl: "/__NG_NAME_L__",\n' +
                '\t\t\tcontroller: \'__NG_NAME__Ctrl\',\n' +
                '\t\t\ttemplateUrl: \'__NG_HTML__\'\n' +
            '\t\t});\n' +
            '\t});';
    
    var helpTemplate = 
        '* module generator\n'+
        '* gulp module\n' + 
        '* options: \n' +
        '*     -d, --dest <YOUR_MODULE_NAME>, required\n' +
        '*     -r, --router create addtional router.js, optional\n' +
        '*     -i, --insert insert file to existing module, optional\n' +
        '*     -h, --help\n';

    var string_src = function(filename, string) {
        var src = require('stream').Readable({ objectMode: true })
        src._read = function () {
            this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }));
            this.push(null);
        }
        return src;
    };

    var sanitize = function(string){
        return  string
                .replace(/\/+/g, '/')       // replace consecutive slashes with a single slash
                .replace(/\/+$/, '')      // remove trailing slashes
                .replace(/^\/+/, '');
    };

    var extractName = function(dest){
        var arr = dest.split('/');
        return arr[arr.length-1];
    };

    var generate = function(suffix, template) {
        var dest = sanitize(argv.d || argv.dest),
            insert = argv.i || argv.insert,
            moduleName = extractName(dest),
            path = options.rootPath + dest + '/' + moduleName + suffix,
            ngName = moduleName;

        if(insert){
            fs.exists(path, function(exists){
                if(exists) {
                    console.log('skip existing ' + path);
                }else {
                    gen();
                }
            });
        }else {
            gen();
        }

        function gen(){
            if(/\.js$/.test(suffix)){
                if(suffix == suffixes.directive || suffix == suffixes.filter){
                    //do nothing
                }else {
                    ngName = moduleName.charAt(0).toUpperCase() + moduleName.substring(1);
                }
            } 
            var content = template.replace(/__NG_NAME__/g, ngName);
            if(suffix === suffixes.router) {
                content = content.replace(/__NG_NAME_L__/g, moduleName)
                                .replace(/__NG_HTML__/, path.substring(options.src.length).replace(suffixes.router, suffixes.html));
            }
            return string_src(path, content)
                    .pipe(gulp.dest('.'));
        };
        
    };

    gulp.task('module', function () {
        var help = argv.h || argv.help,
            dest = argv.d || argv.dest,
            router = argv.r || argv.router,
            insert = argv.i || argv.insert;

        if(help){
            console.log(helpTemplate);
            return;
        }

        if(dest == undefined || dest == true){
            console.error('error: \n\t -d <YOUR_MODULE_NAME> is required.');
            return;
        }else {
            dest = sanitize(dest);
        };

        var moduleName = extractName(dest),
            path = options.rootPath + dest;
            
        if(insert){
            run();
        }else {
            fs.exists(path, function(exists){
                if(exists) {
                    console.error('error: ' + path + '\n\tmodule [' + moduleName + '] exists!');
                }else {
                    run();
                }
            });
        }

        function run(){
            gulp.run('m.scss', 'm.html', 'm.controller', 'm.directive', 'm.service', 'm.filter');
            if(router){
                gulp.run('m.router');
            }
            //console.log('\n---------------------\nmodule [' + moduleName + '] generated.\n' + path + '\n---------------------\n');
        };
    });

    gulp.task('m.scss', function(){
        generate(suffixes.scss, scssTemplate);
    });

    gulp.task('m.html', function(){
        generate(suffixes.html, htmlTemplate);;
    });

    gulp.task('m.controller', function(){
        generate(suffixes.controller, controllerTemplate);;
    });

    gulp.task('m.directive', function(){
        generate(suffixes.directive, directiveTemplate);;
    });

    gulp.task('m.service', function(){
        generate(suffixes.service, serviceTemplate);;
    });

    gulp.task('m.filter', function(){
        generate(suffixes.filter, filterTemplate);;
    });

    gulp.task('m.router', function(){
        generate(suffixes.router, routerTemplate);
    });

}
