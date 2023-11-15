# mastodon-widget

This is the main component to display a Mastodon account's info and timeline. It features a prominent follow button.

Clicking the follow button will open the [instancepicker](../mastodon-instancepicker/readme.md) component and then redirect to the selected instance with the follow dialog open. The timeline is displayed via the [mastodon-timeline](../mastodon-timeline/readme.md) component.

```html
<mastodon-widget account="splitbrain@octodon.social"></mastodon-widget>
```

<!-- Auto Generated Below -->

## Overview

A widget to display a Mastodon account and its timeline.

## Properties

| Property  | Attribute | Description                                                    | Type     | Default     |
| --------- | --------- | -------------------------------------------------------------- | -------- | ----------- |
| `account` | `account` | The account to display in the form `user@example.com`          | `string` | `undefined` |
| `limit`   | `limit`   | The number of toots to display. `0` for disabling the timeline | `number` | `10`        |

## CSS Custom Properties

| Name                  | Description                                    |
| --------------------- | ---------------------------------------------- |
| `--button-background` | background color of the follow button          |
| `--button-color`      | text color of the follow button                |
| `--button-hover`      | background color of the follow button on hover |
| `--color-background`  | background color of the widget                 |
| `--color-link`        | link color                                     |
| `--color-text`        | text color used in the widget                  |

## Dependencies

### Depends on

- [mastodon-follow](../mastodon-follow)
- [mastodon-timeline](../mastodon-timeline)

### Graph

```mermaid
graph TD;
  mastodon-widget --> mastodon-follow
  mastodon-widget --> mastodon-timeline
  mastodon-follow --> mastodon-instancepicker
  style mastodon-widget fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
