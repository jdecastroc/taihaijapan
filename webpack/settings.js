const path = require('path');
const fs = require('fs');
const packageJson = require('../package.json');

const rootDir = fs.realpathSync(process.cwd());

function absPath(relPath) {
  return path.resolve(rootDir, relPath);
}

const options = {
  filename: `js/[name]-${packageJson.version}.min.js`,
  cssName: `${packageJson.name}-${packageJson.version}.min.css`,
};

const paths = {
  src: absPath('frontend/js'),
  srcHtml: absPath('frontend/public'),
  public: absPath('backend/public'),
  build: absPath('backend/public'),
  buildJs: 'js', // js route
  buildHtml: '',  // relative to js route
  buildCss: 'css', // relative to js route
  buildInfo: absPath('buildInfo'),
  test: absPath('test'),
  style: absPath('frontend/styles'),
  imgs: absPath('frontend/img'),
  htmlTemplate: absPath('frontend/html/index.html'),
  mainStyle: absPath('frontend/styles/index.scss'),
  publicPath: '/',
};

const entries = {
  // css: paths.mainStyle,
  index: path.join(paths.src, 'index.js'),
  gallery: path.join(paths.src, 'gallery.js'),
};

module.exports = {
  options,
  paths,
  entries,
};
