**Design system - build and deploy HOWTO**

To deploy package to the npm you need to be logged in. To confirm that you are logged in use you can use 'npm whoami'. If you are not use npm login and follow instructions.

After that run:

- 'npm run check' - this fires up linter and unit tests that are provided per package
- 'npm run prettier' - to format code across the packages
- 'npm run predeploy' - cleans up old dist files and builds new ones
- 'npm run deploy' - deploys files to npm - accept suggested versioning. **Package won't be versioned if not changed, and if changed package will catchup with other packages in versioning.**

On github add release with correct version and change log.
