**Design system - build and deploy HOWTO**

To deploy a package to the npm you need to be logged in to an npm in your console. To confirm that you are logged in, you can use `npm whoami`. If you are not, use `npm login` and follow the instructions.

To deploy you just have to do 'npm run deploy'. It will execute several commands you can run separately if you wish, namely:

- 'check' - fire up linter and unit tests that are provided per package
- 'prettier' - format the code across the packages
- 'predeploy' - clean up old dist files and build new ones.
- and finally deploy files to npm.

When deploying to npm you will have to decide how to version your changes. Currently we are on the verge of deploying first mayor version of DS and because of that we use following convention `1.0.0-alpha.xx` where `xx` is the revision of current build. After release we will follow SemVer.

Example:

1 Choose "Custom Prerelease"  
<img width="456" alt="lerna1" src="https://user-images.githubusercontent.com/7773964/182622782-a09b3cce-58a2-4d92-9eef-7dbf56ee3a44.png">  
2 Accept suggested version  
<img width="574" alt="lerna2" src="https://user-images.githubusercontent.com/7773964/182622849-779ae83b-1943-44fd-b2de-6619700c8540.png">  
3 Confirm  
<img width="680" alt="lerna3" src="https://user-images.githubusercontent.com/7773964/182622918-ee484e9e-8237-422a-8252-05f02a0332b1.png">

**Keep in mind that package won't be versioned if it is not changed, and changed package will catch up with other packages in versioning.** For example current version of package `react-components` is `1.0.0-alpha.17` but `icons` lag behind a bit and are at `1.0.0-alpha.15` because no changes has been made since two deploys. If you make some changes in `react-components` and in `icons` both packages will get `1.0.0-alpha.18` version.

On github add release with correct version and change log.

- Tag is added automatically by lerna, remember to target `v1` branch.
- Title can be set to 'What's Changed'.
- In the change log mention packages changed and link the pull requests that are part of a release. Please follow the style used for previous releases (including author, PR, issue, and title info).

Example of correctly filled release note:  
<img width="894" alt="correct_release" src="https://user-images.githubusercontent.com/7773964/182624431-232d6cea-9d0c-4455-afd9-365c88a1ab57.png">
