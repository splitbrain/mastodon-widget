# Mastodon Widgets

This is a collection of Mastodon widgets for use on websites.

## Usage

Here's the basic usage. It will display some info about my Mastodon account and show the latest 5 toots.

When a user clicks the follow button, a dialog will ask for their instance (including autocompletion) and then redirect to the follow page of that instance.

```html
<html>
  <head>
    <script src="https://unpkg.com/mastodon-widget"></script>
  </head>
  <body>
    <mastodon-widget account="splitbrain@octodon.social" limit="5"></mastodon-widget>
  </body>
</html>
```

More info about the individual components can be found in their respective readme files:

- [mastodon-widget](src/components/mastodon-widget/readme.md) The main widget as shown above
- [mastodon-timeline](src/components/mastodon-timeline/readme.md) The timeline component
- [mastodon-instancepicker](src/components/mastodon-instancepicker/readme.md) The instance picker dialog

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
git push --tags
```

Replace `patch` with `minor` or `major` as needed. This will update the pakage version, create a git tag and push it to the repo. There a github action will build the package and publish it to npm.

## Help

Please help with the open issues.

This is my first project using stenciljs and typescript, so I'm sure there is a lot of room for improvement. Pull requests are welcome.
