/*Importamos funciones */
const { src, dest, watch, parallel} = require("gulp");
// CSS
const sass = require("gulp-sass") (require('sass')); 
const plumber = require("gulp-plumber");
//Imagenes
const imagemin= require('gulp-imagemin');
const webp = require('gulp-webp');
const cache = require('gulp-cache');
const avif = require('gulp-avif');

//Exports
exports.css = css;
exports.dev = parallel(imagenes, versionWebp, versionAvif,javascript, dev);
exports.javascript = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;

function css(done){
    
    src('src/scss/**/*.scss') // Identifica el archivo SASS
    .pipe( plumber())
    .pipe(sass()) // Compila SASS
    .pipe(dest('build/css'));//Almacena en el disco duro
    done(); /* Callback que avisa a gulp cuando llegamosal finla*/
}
function javascript(done){
    src('src/js/**/*.js')
    .pipe(dest('build/js'));
    done();
}
function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}
function versionWebp(done){


    const opciones= {
        quality: 50
    };
    src('src/img/**/*.{png,jpg,txt}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'));
    done();
}
function versionAvif(done){


    const opciones= {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'));
    done();
}
function imagenes(done){
    const opciones={
        optimizationLevel: 3
    };
    src('src/img/**/*.{png,jpg,txt}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'));
    done();
}
