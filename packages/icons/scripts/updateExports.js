const fs = require('fs');
const path = require('path');

function updateExports() {
  // Read the files in the dist directory
  const files = fs.readdirSync(path.resolve(__dirname, '../dist'));

  // Initialize the exports object with the default entry
  const exports = {
    '.': './dist/index.es.js',
  };

  // Create a Set to store the module names (to prevent duplicate entries)
  const moduleNames = new Set();

  // Loop through the files, collecting module names and filtering out non-JS files
  for (const file of files) {
    const ext = path.extname(file);
    if (ext === '.js') {
      const moduleName = path.basename(file, ext);
      // Separate the module name and the module format (es/cjs)
      const [name, format] = moduleName.split('.');
      // Add the module name to the Set
      moduleNames.add(name);
    }
  }

  // Loop through the unique module names, creating an entry for each one
  for (const name of moduleNames) {
    exports[`./${name}`] = {
      import: `./dist/${name}.es.js`,
      require: `./dist/${name}.cjs.js`,
    };
  }

  // Read the current package.json file
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const packageJson = require(packageJsonPath);

  // Update the exports field and write the package.json file back to disk
  packageJson.exports = exports;
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    'utf8'
  );
}

updateExports();
