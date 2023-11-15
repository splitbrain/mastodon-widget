import { Component, h, Host, Prop } from '@stencil/core';

/**
 * A wrapper around any HTML which will share a page on the selected instance.
 */
@Component({
  tag: 'mastodon-share',
  styleUrl: 'mastodon-share.css',
  shadow: true,
})
export class MastodonShare {
  root: HTMLElement;

  /** unused  */
  @Prop() account: string;
  /** The URL to share. Defaults to the current page. */
  @Prop() url: string;
  /** The text to share. Defaults to the current page's title. */
  @Prop() text: string;

  render() {
    return (
      <Host ref={el => (this.root = el)} onClick={this.shareAction.bind(this)}>
        <slot></slot>
      </Host>
    );
  }

  async shareAction() {
    let dialog = this.root.querySelector('mastodon-instancepicker');
    if (!dialog) {
      dialog = document.createElement('mastodon-instancepicker');
      //dialog.account = this.account;
      this.root.appendChild(dialog);
    }
    try {
      const instance = await dialog.pickInstance();

      const shareUrl = this.url || window.location.href;
      const shareText = this.text || document.title;
      const url = `https://${instance}/share?text=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
      window.open(url, '_blank');
    } catch (err) {
      // no instance picked
    }
    this.root.removeChild(dialog);
  }
}
