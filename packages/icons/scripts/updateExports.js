const fs = require('fs');
const path = require('path');

function updateExports() {
  const files = fs.readdirSync(path.resolve(__dirname, '../dist'));
  const exports = {};
  const moduleNames = new Set();

  for (const file of files) {
    const ext = path.extname(file);
    if (ext === '.js' || ext === '.d.ts') {
      const moduleName = path.basename(file, ext);
      const [name, format] = moduleName.split('.');
      moduleNames.add(name);
    }
  }

  exports['.'] = {
    import: './dist/index.es.js',
    require: './dist/index.cjs.js',
    types: './dist/index.d.ts',
  };

  for (const name of moduleNames) {
    exports[`./${name}`] = {
      import: `./dist/${name}.es.js`,
      require: `./dist/${name}.cjs.js`,
      types: `./dist/${name}.d.ts`,
    };
  }

  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const packageJson = require(packageJsonPath);

  packageJson.exports = exports;
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    'utf8'
  );
}

updateExports();
