## Contributing

Design System is maintained by LiveChat Design System team.

Any external contribution is welcome and DS team will help in the process of development or [reporting problems or ideas](https://github.com/livechat/design-system/issues/new/choose). Design system is a [proposed solution](https://developers.livechat.com/docs/monetization/app-review-process#design-system) for authors building application targeting [LiveChat Marketplace](https://www.livechat.com/marketplace/), therefore, we're open for any feedback from 3rd party developers.

### Rules of contribution

1. In order to start working on changes, you must first create an issue on our [board](https://github.com/orgs/livechat/projects/7/views/1?filterQuery=),
   using one of the templates depending on if this is a feature request or bug report [here](https://github.com/livechat/design-system/issues/new/choose). If an
   issue turns out to be related to another which is already on the board, the DS team will take care of the appropriate connections. In addition to the description,
   the ticket should also contain an appropriate label, the contributor should be entered as an assignee, and should be added to the project (LiveChat Design System).
2. In order to start work, first update branch `main`, and then create a new branch from this branch in which future changes will be placed. We adopted the
   nomenclature for the branch `feature/[task_id]`.
3. If changes require it, appropriate unit tests should also be included, and an additional case should be attached to the Storybook documentation (in the `.stories.tsx` file).
4. After the work is completed, create a pull request directed to branch `main`.
    1. **Conventional PR Naming**: Ensure your pull request title follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) naming pattern `type(scope): description`. This is crucial as, post squash merging, Git will use the PR name as the commit message.
       <br/>To mark changes as a **breaking change**, include a `!` after the type and scope, followed by a colon and a space, like so: `type(scope)!: description`.
       <br/>For now we will use the following types:
        - `feat` - for new features
        - `fix` - for bug fixes
        - `docs` - for documentation changes
    2. **Review**: In pull request, you should call `livechat/design-system` in the reviewers field.
    3. **Template**: The merge template contains a checklist of things that need to be completed to meet the requirements, it will make the work easier for everyone.
5. You will probably notice in your pull request under "Some checks haven't completed yet" Chromatic pending checks approval. Chromatic is a tool that we use
   for visual regression testing. The check in this tool is required for general approval of changes and it's covered by design system team.
6. After the work is completed and the reviewers accept it, the responsibility for the rest of the changes is on the design system team side, which will perform
   the merge and release the changes in the future. Design system team deals with determining the status of the task on the board side, they close it with an
   appropriate comment.
