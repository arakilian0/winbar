const fs = require('fs'),
      del = require('del'),
      gulp = require('gulp'),
      child = require('child_process')

let _default,
    _build,
    _copy,
    _rename,
    _clean,
    _test,
    _zip
    
_default = (cb) => {
    console.log('gulp is available...')
    cb()
}

_build = (cb) => {
    child.exec('electron-packager . Winbar --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/Icon.ico --prune=true --out=dist --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Winbar\"', function(err) { if(err) { console.log(err); return } })
    cb()
}

_copy = (cb) => {
    gulp.src('assets/*.**').pipe(gulp.dest('dist/Winbar-win32-ia32/assets'))
    cb()
}

_rename = (cb) => {
    fs.rename('dist/Winbar-win32-ia32', 'dist/Winbar', function (err) {
        if (err) console.log(err)
    })
    cb()
}

_clean = (cb) => {
    if (fs.existsSync('dist/Winbar')) { del('dist/Winbar', { force:true }) }  
    if (fs.existsSync('dist/Winbar.zip')) { del('dist/Winbar.zip', { force:true }) }  
    cb()
}

_test = (cb) => {
    child.exec('cd dist/Winbar && Winbar.exe', function(err) { if(err) { console.log(err); return } })
    cb()
}

_zip = (cb) => {
    let zip = require('bestzip')

    zip({
        source: 'dist/Winbar/*',
        destination: './dist/Winbar.zip'
    }).then(function() {
        console.log('Package Zipped...')
    }).catch(function(err) {
        console.error(err.stack)
        process.exit(1)
    })

    cb()
}

exports.default = _default
exports.build = _build
exports.copy = _copy
exports.rename = _rename
exports.clean = _clean
exports.test = _test
exports.zip = _zip
