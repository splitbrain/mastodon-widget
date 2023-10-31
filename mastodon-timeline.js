class MastodonTimeline extends HTMLElement {
    #root = null;

    constructor() {
        super();

        this.#root = this.attachShadow({mode: 'open'});
        this.#root.innerHTML = `
            <div class="root">
            </div>
        `;
        this.#root.appendChild(this.getStyle());

    }

    async connectedCallback() {
        const items = await this.getFeedItems();
        console.log(items);
    }

    getStyle() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                --color-background: #ccd7e0;
                --color-text: #282c37;
                --color-link: #6364ff;
                --button-background: #6364ff;
                --button-hover: #4c4cff;
                --button-color: #fff;
            }
        
            * {
                box-sizing: border-box;
                font-family: sans-serif;
            }
        `;
        return style;
    }

    openFollowDialog() {
        let dialog = this.#root.querySelector('mastodon-follow-dialog');
        if (!dialog) {
            dialog = document.createElement('mastodon-follow-dialog');
            dialog.setAttribute('account', this.getAttribute('account'));
            this.#root.appendChild(dialog);
        }
        dialog.show();
    }

    async getFeedItems() {
        const url = 'https://octodon.social/@splitbrain.rss';
        const response = await fetch(url);

        const xml = await response.text();
        const parser = new DOMParser();

        const feed = parser.parseFromString(xml, 'application/xml');
        return Array.from(feed.querySelectorAll('item')).map(this.makeItem);
    }

    makeItem(item) {
        return {
            url: item.querySelector('link').textContent,
            date: new Date(item.querySelector('pubDate').textContent),
            html: item.querySelector('description').textContent,
        }
    }

}

customElements.define('mastodon-timeline', MastodonTimeline);
