# Mastodon Widgets

This is a collection of Mastodon widgets for use on websites to add share and follow buttons and to display a user's profile and timeline.

🌟 If you like it, please star the repo and share it on Mastodon.

## Usage

Here's the basic usage: Add the `script` tag to your `<head>` and then use any of the available components in your HTML.

```html
<html lang="en">
  <head>
    <script type="module" src="https://unpkg.com/mastodon-widget"></script>
  </head>
  <body>
    <mastodon-widget account="splitbrain@octodon.social" limit="5"></mastodon-widget>

    <mastodon-share text="What a cool idea!"><button>Share this!</button></mastodon-share>
  </body>
</html>
```

The script will lazy load only the components you actually use.

## Components

You can see a demo of the available components at https://splitbrain.github.io/mastodon-widget/ and read more about them in their respective readme files:

- [mastodon-widget](src/components/mastodon-widget/readme.md) The main widget showing a profile with a follow button and optionally timeline
- [mastodon-follow](src/components/mastodon-follow/readme.md) Make any HTML a follow button
- [mastodon-share](src/components/mastodon-share/readme.md) Make any HTML a share button
- [mastodon-timeline](src/components/mastodon-timeline/readme.md) Show the timeline of a user
- [mastodon-instancepicker](src/components/mastodon-instancepicker/readme.md) The instance picker dialog used in the components above

## Development

The widgets are web components built with the [StencilJS](https://stenciljs.com/) compiler.

Setup dependencies:

```bash
npm install
```

Start a development server:

```bash
npm run start
```

Build the components and update the readme files for production:

```bash
npm run build
```

Prettify the code:

```bash
npm run pretty
```

## NPM Package

The project is published to npm as `mastodon-widget`. See the [npm page](https://www.npmjs.com/package/mastodon-widget) for more info.

For building a new release, run:

```bash
npm version patch
git push
git push --tags
```

Replace `patch` with `minor` or `major` as needed. This will update the pakage version, create a git tag and push it to the repo. There a github action will build the package and publish it to npm.

## Help

Please help with the open issues.

This is my first project using stenciljs and typescript, so I'm sure there is a lot of room for improvement. Pull requests are welcome.
