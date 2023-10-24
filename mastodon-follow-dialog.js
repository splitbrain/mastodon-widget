class MastodonFollowDialog extends HTMLElement {


    #root = null;
    #input = null;
    #list = null;
    #abortController = null;
    #dialog = null;

    constructor() {
        super();

        this.#root = this.attachShadow({mode: 'open'});
        this.#root.innerHTML = `
            <dialog xmlns="http://www.w3.org/1999/html">
                <main>
                    <h1>Follow <span></span></h1>
                    <p>
                        Enter the Mastodon instance your account is hosted at.
                    </p>
                    <form>
                        <input type="text" autofocus placeholder="Domain of your home server, e.g. mastodon.social" />
                        <button type="submit">Follow</button>
                    </form>
                    <ul>
                    </ul>
                    <p>
                        Don't have an account yet? Find a server at 
                        <a href="https://joinmastodon.org/servers" target="_blank">joinmastodon.org</a>
                    </p>
                </main>
            </dialog>
        `;
        this.#root.appendChild(this.getStyle());

        this.#dialog = this.#root.querySelector('dialog');
        this.#input = this.#root.querySelector('input');
        this.#list = this.#root.querySelector('ul');
        this.#input.addEventListener('input', this.updateSuggestions.bind(this));
        this.#input.addEventListener('keydown', this.handleKeypress.bind(this));
        this.#root.querySelector('form').addEventListener('submit', this.submit.bind(this));
        this.#root.querySelector('dialog').addEventListener('click', this.#dialog.close);
        this.#root.querySelector('dialog main').addEventListener('click', (event) => event.stopPropagation());
    }

    connectedCallback() {
        this.#root.querySelector('h1 span').textContent = this.getAttribute('account');
        this.#input.value = localStorage.getItem('mastodon-instance') || '';
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
            
            h1 {
                font-size: 1.25em;
            }
            
            a {
                color: var(--color-link);
                text-decoration: none;
            }
            
            dialog[open] {
                width: 100vw;
                max-width: 100vw;
                height: 100vh;
                max-height: 100vh;
                margin: 0;
                padding: 0;
                border: none;
                background-color: transparent;
                display: flex;
                justify-content: center;
                align-items: center;
                outline: none;
            }
            
            main {
                border: none;
                margin: 1em;
                padding: 1em;
                width: 30em;
                height: 35em;
                max-width: 90vw;
                max-height: 90vh;
                background-color: var(--color-background);
                color: var(--color-text);
                border-radius: 0.25em;
                box-shadow: 0.1em 0.1em 0.1em #000;
            }
            
            form {
                display: flex;
                flex-direction: row;
                height: 2em;
            }
            
            form input {
                flex-grow: 1;
                border: 1px solid var(--color-text);
            }
            
            form input:focus {
                outline: none;
                border: 1px solid var(--button-background);
            }
            
            
            form button {
                border: none;
                background-color: var(--button-background);
                color: #fff;
                cursor: pointer;
                font-weight: bold;
                border-radius: 0.25em;
            }
            
            button:hover {
                background-color: var(--button-hover);
            }
            
            ul {
                list-style: none;
                padding: 0;
                display: flex;
                flex-direction: column;
                gap: 0.5em;
            }


            ul li {
                padding: 0.25em;
                cursor: pointer;
            }
            
            ul li.selected {
                background-color: var(--button-background);
                color: var(--button-color);
            }

            ul li.selected:hover,
            ul li:hover {
                background-color: var(--button-hover);
                color: var(--button-color);
            }
            
        `;
        return style;
    }

    show() {
        this.#dialog.showModal();
    }

    submit() {
        const domain = this.#input.value;
        if(!domain) return;
        localStorage.setItem('mastodon-instance', domain);
        const account = this.getAttribute('account');
        // FIXME the correct way is to use webfinger to find the appropriate endpoint and to use a acct uri
        const url = `https://${domain}/authorize_interaction?uri=@${account}`;
        this.#dialog.close();
        window.open(url, '_blank');
    }

    handleKeypress(event) {
        switch (event.key) {
            case 'ArrowDown':
                this.markNext();
                event.preventDefault();
                break;
            case 'ArrowUp':
                this.markPrevious();
                event.preventDefault();
                break;
            case 'Escape':
                this.#dialog.close();
                event.preventDefault();
                break;
        }
    }

    markNext() {
        const current = this.#list.querySelector('li.selected');
        let next;
        if (current) {
            current.classList.remove('selected');
        }

        if (current && current.nextSibling) {
            next = current.nextSibling;
        } else {
            next = this.#list.querySelector('li');
        }
        next.classList.add('selected');
        this.#input.value = next.textContent;
    }

    markPrevious() {
        const current = this.#list.querySelector('li.selected');
        let previous;
        if (current) {
            current.classList.remove('selected');
        }

        if (current && current.previousSibling) {
            previous = current.previousSibling;
        } else {
            previous = this.#list.querySelector('li:last-child');
        }
        previous.classList.add('selected');
        this.#input.value = previous.textContent;
    }

    async updateSuggestions() {
        if (this.#abortController) {
            this.#abortController.abort();
        }
        this.#abortController = new AbortController();

        const apiurl = 'https://mastodon.social/api/v1/peers/search?q=';
        try {
            const result = await fetch(apiurl + this.#input.value, {signal: this.#abortController.signal});
            let json = await result.json();

            if (json === null) json = [];

            // api does not suggest itself
            if (this.#input.value.length && 'mastodon.social'.startsWith(this.#input.value)) {
                json.unshift('mastodon.social');
            }


            this.#list.innerHTML = '';
            json.forEach(function (instance) {
                const li = document.createElement('li');
                li.textContent = instance;
                this.#list.appendChild(li);
            }.bind(this));
        } catch (err) {
            console.log(err);
        }
    }
}

customElements.define('mastodon-follow-dialog', MastodonFollowDialog);
