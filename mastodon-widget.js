class MastodonWidget extends HTMLElement {
    #root = null;

    constructor() {
        super();

        this.#root = this.attachShadow({mode: 'open'});
        this.#root.innerHTML = `
            <div class="root">
                <main>
                    <img src="" class="avatar" alt="Avatar"/>
                    <div class="info">
                        <div class="name"></div>
                        <a class="acct"></a>
                        <p class="bio"></p>
                    </div>
                </main>
                <div class="meta">
                    <div class="statuses">
                        <span>Posts</span>
                        <strong></strong>
                    </div>
                    <div class="following">
                        <span>Follows</span>
                        <strong></strong>
                    </div>
                    <div class="followers">
                        <span>Followers</span>
                        <strong></strong>
                    </div>
                    <div class="button">
                        <button>Follow</button>
                    </div>
                </div>
            </div>
        `;
        this.#root.appendChild(this.getStyle());
        this.#root.querySelector('button').addEventListener('click', this.openFollowDialog.bind(this));
    }

    async connectedCallback() {
        const userInfo = await this.getUserInfo();

        // strip HTML from bio text
        const bio = document.createElement('div');
        bio.innerHTML = userInfo.note;
        const bioText = bio.textContent;

        this.#root.querySelector('.avatar').src = userInfo.avatar;
        this.#root.querySelector('.name').textContent = userInfo.display_name;
        this.#root.querySelector('.acct').textContent = userInfo.acct;
        this.#root.querySelector('.acct').href = userInfo.url;
        this.#root.querySelector('.bio').textContent = bioText;
        this.#root.querySelector('.followers strong').textContent = userInfo.followers_count;
        this.#root.querySelector('.following strong').textContent = userInfo.following_count;
        this.#root.querySelector('.statuses strong').textContent = userInfo.statuses_count;
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
            
            .root {
                background-color: var(--color-background);
                color: var(--color-text);
                margin-top: 1em;
                margin-bottom: 1em;
                padding: 1em;
            }

            main {
                display: flex;
                flex-direction: row;
                gap: 1em;
            }

            main .avatar {
                background-color: #eff3f5;
                border: 2px solid #fff;
                border-radius: 0.25em;
                width: 5em;
                height: 5em;
            }

            main .info .name {
                font-size: 1.5em;
            }

            main a {
                color: var(--color-link);
                text-decoration: none;
            }
            
            main a:hover {
                text-decoration: underline;
            }

            .meta {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                text-align: center;
                gap: 1em;
                margin-top: 0.5em;
            }
            
            .meta > div {
                height: 2em;
                flex: 1;
                display: flex;
                flex-direction: column;
            }
                    
            .meta > div > span {
                font-size: 0.8em;
                text-transform: uppercase;
            }

            .meta button {
                height: 100%;
                border: none;
                background-color: var(--button-background);
                color: #fff;
                cursor: pointer;
                font-weight: bold;
                border-radius: 0.25em;
            }
            
            .meta button:hover {
                background-color: var(--button-hover);
            }
        `;
        return style;
    }

    openFollowDialog() {
        let dialog = this.#root.querySelector('mastodon-follow-dialog');
        if(!dialog) {
            dialog = document.createElement('mastodon-follow-dialog');
            dialog.setAttribute('account', this.getAttribute('account'));
            this.#root.appendChild(dialog);
        }
        dialog.show();
    }

    async getUserInfo() {
        const apiurl = 'https://mastodon.social/api/v1/accounts/lookup?acct=';
        const response = await fetch(apiurl + this.getAttribute('account'));
        return await response.json();
    }

}

customElements.define('mastodon-widget', MastodonWidget);
