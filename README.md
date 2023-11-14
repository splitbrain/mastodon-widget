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

<mastodon-widget account="splitbrain@octodon.social" limit="5"></mastodon-widget>
  
</html>
```

More info about the individual components can be found in their respective readme files:

* [mastodon-widget](src/components/mastodon-widget/readme.md) The main widget as shown above
* [mastodon-timeline](src/components/mastodon-timeline/readme.md) The timeline component
* [mastodon-instancepicker](src/components/mastodon-instancepicker/readme.md) The instance picker dialog

## Development

The widgets are web components built with the [StencilJS](https://stenciljs.com/) compiler. I'm using `yarn` for development.

Setup dependencies:

```bash
yarn
```

Start a development server:

```bash
yarn start
```

Build the components and update the readme files for production:

```bash
yarn build
```

Prettify the code:

```bash
yarn pretty
```

## NPM

The project is published to npm as `mastodon-widget`. See the [npm page](https://www.npmjs.com/package/mastodon-widget) for more info.

## Help

Please help with the open issues.

This is my first project using stenciljs and typescript, so I'm sure there is a lot of room for improvement. Pull requests are welcome.


