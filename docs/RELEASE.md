# Release process of `design-system`

## Overview

The release process follows the git-flow branching model and consists of three phases:
1. **Start Release** - Create a release branch and bump package versions
2. **Finish Release** - Merge to `main` (production) and create a GitHub release
3. **Publish Release** - Publish packages to `npm` registry

## Branch Structure

This workflow uses git-flow conventions:
- `main` - Production-ready code (stable releases)
- `release/<DATE>` - Release branch named by date (e.g., `release/2024-01-15`) for preparing a new production release
- Feature branches should be merged to `main` via PRs

## Step 1: Start Release (Version Bumping)

To deploy a package to the `npm` you need to be logged in as a `LiveChat` organization member. To confirm that you are logged in, you can use `npm whoami`. If you are not, use `npm login` and follow the instructions.

### 1.1 Create release branch

Create a new release branch from the latest `main` branch with a date-based name:

```bash
git checkout main
git pull origin main
git checkout -b release-2024-01-15
```

Replace `2024-01-15` with your current date in `YYYY-MM-DD` format. 

### 1.2 Prepare release (bump versions)

Run the prepare-release script to bump package versions:

```bash
npm run prepare-release
```

This command will:
- Run `check` - execute linter and unit tests
- Run `prettier` - format the code across packages
- Run `build` - build the packages
- Run `lerna version --conventional-commits --no-changelog --no-push --no-git-tag-version` - create new package versions based on conventional commits


### 1.3 Commit and push version changes

After Lerna determines the version, commit and push the version changes:

```bash
git add .
git commit -m "chore(release): bump version to v<VERSION>"
git push origin release-<DATE>
```

Replace `<VERSION>` with the actual version proposed by Lerna (you'll see it in the commit) and `<DATE>` with your date-based branch name.

### 1.4 Create Pull Request

Open a PR from your `release-<DATE>` branch to `main`:

- **PR Title**: `chore(release): release v<VERSION>` (e.g., `chore(release): release v1.2.3`)
- **PR Description**: Reference the actual version determined by Lerna and summarize the changes

### 1.5 Get approvals and merge

Get approvals and merge the PR to `main`. After merge, proceed to Step 2.

## Step 2: Finish Release (Publish to npm)

After the release PR has been merged to `main`:

### 2.1 Pull latest main and fetch tags

```bash
git checkout main
git pull origin main
```

### 2.2 Create and push git tag

Since we use `--no-git-tag-version` flag in the release process, you need to manually create and push the git tag. You can do this either via command line or when drafting a GitHub release in Step 2.4.

**Option 1: Create tag via command line:**

```bash
git tag v<VERSION>
git push origin v<VERSION>
```

Replace `<VERSION>` with the actual version that was bumped during Step 1 (e.g., `v1.2.3`). You can find the version in the lerna.json file or check the latest commit message.

**Option 2: Create tag when drafting GitHub release**

Alternatively, you can skip this step and create the tag directly when drafting the GitHub release in Step 2.4 by specifying "Create a new tag" when you create the release.

### 2.3 Publish packages to npm

Publish the packages to npm registry:

```bash
npm run deploy
```

This runs `lerna publish from-package`, which:
- Reads versions from `package.json` files
- Publishes packages with bumped versions to npm

### 2.4 Create GitHub Release

On GitHub, add the release with the correct version and changelog:

- If you created the tag in Step 2.2, select the existing tag (e.g., `v1.2.3`)
- If you skipped Step 2.2, create a new tag when drafting the release by specifying "Create a new tag: v<VERSION>" and select `main` as the target branch
- Use the version as the release name (e.g., `v1.2.3`)
- Title: "What's Changed" or "Release v<VERSION>"
- In the changelog, include:
  - Packages changed
  - Pull request links
  - Issue references
  - Author information
  - Follow the style used in previous releases


## Important Notes

### Branch naming

Release branches are named with the current date (e.g., `release/2024-01-15`) in `YYYY-MM-DD` format since the actual version is determined later by Lerna based on conventional commits.

### Package versioning behavior

Keep in mind that a package won't be versioned if it has not changed. In the future a changed package will catch up with other packages in versioning. For example, assuming that version of package `react-components` is `1.1.3` but `icons` lag behind a bit and are at `1.1.0` because no changes has been made since two deploys. If you make some changes in `react-components` and in `icons` both packages will get `1.1.4` version.

If you want to force versioning of a package you can use `--force-publish` flag when running the prepare-release script. This will force Lerna to always version all packages, regardless of if they have changed since the previous release.

