# mastodon-timeline

This component shows the most recent post of the given account. The number of shown posts can be configured.

```html
<mastodon-timeline account="splitbrain@octodon.social" limit="5"></mastodon-timeline>
```

The component fetches content via the RSS feed of the account. The maximum number of posts is limited to the number of posts in the feed, which is usually 20.

<!-- Auto Generated Below -->

## Overview

A widget to display the timeline of a Mastodon account

This makes use of the RSS feed of the account.

## Properties

| Property  | Attribute | Description                                                                       | Type     | Default     |
| --------- | --------- | --------------------------------------------------------------------------------- | -------- | ----------- |
| `account` | `account` | The account for which the timeline should be shown in the form `user@example.com` | `string` | `undefined` |
| `limit`   | `limit`   | The number of toots to display                                                    | `number` | `10`        |

## CSS Custom Properties

| Name                 | Description                   |
| -------------------- | ----------------------------- |
| `--color-background` | background color of the toots |
| `--color-link`       | link color                    |
| `--color-text`       | text color used in the toots  |

## Dependencies

### Used by

- [mastodon-widget](../mastodon-widget)

### Graph

```mermaid
graph TD;
  mastodon-widget --> mastodon-timeline
  style mastodon-timeline fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
