import { Component, Host, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'mastodon-widget',
  styleUrl: 'mastodon-widget.css',
  shadow: true,
})
export class MastodonWidget {
  root: HTMLDivElement;

  @Prop() account: string;
  @Prop() limit: number = 10;

  @State() userdata = {
    avatar: '',
    display_name: '',
    acct: '',
    url: '',
    note: '',
    statuses_count: 0,
    following_count: 0,
    followers_count: 0,
  };

  render() {
    return (
      <Host>
        <div class="root" ref={el => (this.root = el)}>
          <main>
            <img src={this.userdata.avatar} class="avatar" alt="Avatar" />
            <div class="info">
              <div class="name">{this.userdata.display_name}</div>
              <a href={this.userdata.url} class="acct" target="_blank">
                {this.userdata.acct}
              </a>
              <div class="bio" innerHTML={this.userdata.note}></div>
            </div>
          </main>
          <div class="meta">
            <div class="statuses">
              <span>Posts</span>
              <strong>{this.userdata.statuses_count}</strong>
            </div>
            <div class="following">
              <span>Follows</span>
              <strong>{this.userdata.following_count}</strong>
            </div>
            <div class="followers">
              <span>Followers</span>
              <strong>{this.userdata.followers_count}</strong>
            </div>
            <div class="button">
              <button onClick={this.followAction.bind(this)}>Follow</button>
            </div>
          </div>
        </div>
        {this.limit ? <mastodon-timeline account={this.account} limit={this.limit}></mastodon-timeline> : ''}
      </Host>
    );
  }

  async connectedCallback() {
    this.userdata = await this.getUserInfo();
  }

  async getUserInfo() {
    const apiurl = 'https://mastodon.social/api/v1/accounts/lookup?acct=';
    const response = await fetch(apiurl + this.account);
    return await response.json();
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
  }
}
