var gulp = require('gulp')
var fs = require('fs')
var path = require('path')
var merge = require('merge-stream')
var order = require('gulp-order')
var browserSync = require('browser-sync').create()
var pump = require('pump')
var sass = require('gulp-sass')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var concat = require('gulp-concat')
var clean = require('gulp-clean')

const rootPath = 'app'
const htmlPath = 'src/content'
const scriptsPath = 'src/scripts'
const stylesPath = 'src/styles'
const snippetsPath = 'src/snippets'
const dstPath = rootPath + '/resources'
const modulePath = 'node_modules'

// copy third party libraries from /node_modules into /resources/vendor
gulp.task('vendor', function() {
	const vendorPath = dstPath + '/vendor'
  // Bootstrap
	gulp.src([
		modulePath + '/bootstrap/dist/css/bootstrap.min.css',
		modulePath + '/bootstrap/dist/js/bootstrap.bundle.min.js',
	])
	.pipe(gulp.dest(vendorPath))

  // jQuery
  gulp.src([
    modulePath + '/jquery/dist/jquery.min.js'
  ])
  .pipe(gulp.dest(vendorPath))
})

gulp.task('custom', ['bundle-html', 'build-css', 'build-js'])

gulp.task('build', ['vendor', 'custom'])

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory()
      })
}

gulp.task('bundle-html', function(cb) {
	var folders = getFolders(htmlPath)

	var header = gulp.src(snippetsPath + '/header.html')
	var footer = gulp.src(snippetsPath + '/footer.html')
	var promises = folders.map(function(folder) {
		return new Promise((resolve, reject) => {
			var content = gulp.src(path.join(htmlPath, folder, '/**/*.html')).pipe(concat('content.html'))

			pump([
				merge(header, content, footer),
				order([
					'header.html',
					'content.html',
					'footer.html'
				]),
				concat(folder + '.html'),
				gulp.dest(rootPath)
			], () => {
				resolve()
			})
		})
	})
	Promise
		.all(promises)
		.then(()=> {
			cb()
		})
})

gulp.task('build-css', function(cb) {
	pump([
		gulp.src([
			stylesPath + '/**/*.scss',
			'!' + stylesPath + '/sass/**/_*.scss',
		]),
		sass().on('error', sass.logError),
		postcss([
    	autoprefixer()
		]),
		concat('styles.css'),
		gulp.dest(dstPath)
	], cb)
})

function buildJs(cb) {
	pump([
		gulp.src(scriptsPath + '/**/*.js'),
		concat('scripts.js'),
		gulp.dest(dstPath)
	], cb)
}
gulp.task('build-js', buildJs)

function clear(cb) {
	pump([
		gulp.src([
			rootPath + '/*.html',
			dstPath + '/**/*'
		], { read: false }),
		clean()
	], cb)
}
gulp.task('clear', clear)

// gulp.task('dist', function() {

// })

// configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: rootPath
    }
  })
})

// dev task
gulp.task('watch', ['custom', 'browserSync'], function() {
	// watch files for re-build
	gulp.watch(htmlPath + '/**/*.html', ['bundle-html'])
  gulp.watch(stylesPath + '/**/*.scss', ['build-css'])
  gulp.watch(scriptsPath + '/**/*.js', ['build-js'])
  // watch built files for reload
  gulp.watch(rootPath + '/*.html', browserSync.reload)
  gulp.watch(dstPath + '/*.css', browserSync.reload)
  gulp.watch(dstPath + '/*.js', browserSync.reload)
})