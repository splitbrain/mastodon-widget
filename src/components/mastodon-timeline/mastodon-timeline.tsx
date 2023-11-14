import { Component, h, Host, Prop, State } from '@stencil/core';

/**
 * A widget to display the timeline of a Mastodon account
 *
 * This makes use of the RSS feed of the account.
 */
@Component({
  tag: 'mastodon-timeline',
  styleUrl: 'mastodon-timeline.css',
  shadow: true,
})
export class MastodonTimeline {
  @State() items: Array<any> = [];

  /** The account for which the timeline should be shown in the form `user@example.com` */
  @Prop() account: string;
  /** The number of toots to display */
  @Prop() limit: number = 10;

  render() {
    return <Host>{this.getTimeline()}</Host>;
  }

  async connectedCallback() {
    this.items = await this.getFeedItems();
  }

  makeTimelineItem(item) {
    const div = document.createElement('div');
    div.innerHTML = item.html;
    div.querySelectorAll('a').forEach(a => {
      a.setAttribute('target', '_blank');
    });

    return (
      <div class="status">
        <div innerHTML={div.innerHTML}></div>
        <a href={item.url} target="_blank" class="dt">
          {item.date.toLocaleString()}
        </a>
      </div>
    );
  }

  getTimeline() {
    return this.items.map(this.makeTimelineItem);
  }

  async getFeedItems() {
    const [user, host] = this.account.split('@', 2);
    const url = `https://${host}/@${user}.rss`;
    const response = await fetch(url);

    const xml = await response.text();
    const parser = new DOMParser();

    const feed = parser.parseFromString(xml, 'application/xml');
    return Array.from(feed.querySelectorAll('item')).slice(0, this.limit).map(this.makeItem);
  }

  makeItem(item) {
    return {
      url: item.querySelector('link').textContent,
      date: new Date(item.querySelector('pubDate').textContent),
      html: item.querySelector('description').textContent,
    };
  }
}
