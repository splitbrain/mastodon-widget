# mastodon-share

<!-- Auto Generated Below -->

## Overview

A wrapper around any HTML which will share a page on the selected instance.

## Properties

| Property  | Attribute | Description                                              | Type     | Default     |
| --------- | --------- | -------------------------------------------------------- | -------- | ----------- |
| `account` | `account` | unused                                                   | `string` | `undefined` |
| `text`    | `text`    | The text to share. Defaults to the current page's title. | `string` | `undefined` |
| `url`     | `url`     | The URL to share. Defaults to the current page.          | `string` | `undefined` |

## Dependencies

### Depends on

- [mastodon-instancepicker](../mastodon-instancepicker)

### Graph

```mermaid
graph TD;
  mastodon-share --> mastodon-instancepicker
  style mastodon-share fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
