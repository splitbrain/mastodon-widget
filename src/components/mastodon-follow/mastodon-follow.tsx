import { Component, h, Host, Prop } from '@stencil/core';

/**
 * A wrapper around any HTML which will capture clicks and execute a follow action instead.
 */
@Component({
  tag: 'mastodon-follow',
  styleUrl: 'mastodon-follow.css',
  shadow: true,
})
export class MastodonFollow {
  root: HTMLElement;

  /** The account to follow in the form `user@example.com` */
  @Prop() account: string;

  render() {
    return (
      <Host ref={el => (this.root = el)} onClick={this.followAction.bind(this)}>
        <slot></slot>
      </Host>
    );
  }

  async followAction() {
    let dialog = this.root.querySelector('mastodon-instancepicker');
    if (!dialog) {
      dialog = document.createElement('mastodon-instancepicker');
      //dialog.account = this.account;
      this.root.appendChild(dialog);
    }
    try {
      const instance = await dialog.pickInstance();
      // FIXME the correct way is to use webfinger to find the appropriate endpoint and to use a acct uri
      const url = `https://${instance}/authorize_interaction?uri=@${this.account}`;
      window.open(url, '_blank');
    } catch (err) {
      // no instance picked
    }
    this.root.removeChild(dialog);
  }
}
