#!/usr/bin/env node
/**
 * Replicates "lerna publish from-package" using npm publish.
 * Only publishes packages whose current version is not yet on the registry.
 * Uses npm's pack/publish (no Lerna tar dependency), so tar can stay at latest.
 *
 * Vs Lerna from-package (libs/commands/publish/src/index.ts):
 *   Same: unpublished detection, skip private, prepack/pack/postpack via npm publish,
 *         workspace/file deps resolved by npm when packing.
 *   We skip: confirmation prompt, git working-tree check, verifyAccess, temp licenses,
 *            root lifecycles, copyAssets/custom publish dir, --include-private.
 *
 * Usage:
 *   node scripts/deploy.js              Publish packages not yet on registry
 *   node scripts/deploy.js --dry-run    Same but npm publish --dry-run (no upload)
 *   node scripts/deploy.js --preview    Show exactly what files would be packed (no publish)
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const dryRun = process.argv.includes('--dry-run');
const preview = process.argv.includes('--preview');

const rootDir = path.resolve(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages');

function getWorkspacePackages() {
  const entries = fs.readdirSync(packagesDir, { withFileTypes: true });
  const byName = new Map();
  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const pkgPath = path.join(packagesDir, ent.name, 'package.json');
    if (!fs.existsSync(pkgPath)) continue;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (pkg.private) continue;
    if (!pkg.name || !pkg.version) continue;
    byName.set(pkg.name, {
      name: pkg.name,
      version: pkg.version,
      dir: path.join(packagesDir, ent.name),
    });
  }
  return topologicalSort(Array.from(byName.values()), byName);
}

function getAllDeps(pkgPath) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const deps = {
    ...pkg.dependencies,
    ...pkg.peerDependencies,
    ...pkg.optionalDependencies,
  };
  return Object.keys(deps || {});
}

function topologicalSort(packages, byName) {
  const sorted = [];
  const visited = new Set();
  const visiting = new Set();

  function visit(name) {
    if (visited.has(name)) return;
    if (visiting.has(name)) return;
    visiting.add(name);
    const info = byName.get(name);
    if (info) {
      const pkgPath = path.join(info.dir, 'package.json');
      if (fs.existsSync(pkgPath)) {
        for (const d of getAllDeps(pkgPath)) {
          if (byName.has(d)) visit(d);
        }
      }
      sorted.push(info);
    }
    visiting.delete(name);
    visited.add(name);
  }

  for (const p of packages) visit(p.name);
  return sorted;
}

function isVersionPublished(name, version) {
  try {
    execFileSync('npm', ['view', `${name}@${version}`, 'version'], {
      stdio: 'pipe',
      encoding: 'utf8',
    });
    return true;
  } catch {
    return false;
  }
}

function previewPackage(pkg) {
  console.log('\n' + '='.repeat(60));
  console.log(`${pkg.name}@${pkg.version}`);
  console.log('='.repeat(60));
  try {
    execFileSync('npm', ['pack', '--dry-run'], {
      cwd: pkg.dir,
      stdio: 'inherit',
    });
  } catch (err) {
    console.error(`Failed to preview ${pkg.name}:`, err.message);
  }
}

function main() {
  const packages = getWorkspacePackages();
  if (packages.length === 0) {
    console.log('No publishable packages found.');
    return;
  }

  if (preview) {
    console.log('Preview: files that would be packed for each package\n');
    for (const pkg of packages) {
      previewPackage(pkg);
    }
    console.log('\nDone. No packages were published.');
    return;
  }

  let published = 0;
  for (const pkg of packages) {
    if (isVersionPublished(pkg.name, pkg.version)) {
      console.log(`Skip ${pkg.name}@${pkg.version} (already published)`);
      continue;
    }
    console.log(`Publishing ${pkg.name}@${pkg.version}${dryRun ? ' (dry-run)' : ''}...`);
    execFileSync('npm', ['publish', ...(dryRun ? ['--dry-run'] : [])], {
      cwd: pkg.dir,
      stdio: 'inherit',
    });
    published++;
  }

  console.log(published ? `Published ${published} package(s).` : 'Nothing new to publish.');
}

main();
