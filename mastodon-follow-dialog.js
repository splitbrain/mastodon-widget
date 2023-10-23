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
            <dialog>
                <div>
                    <form>
                        <input type="text" autofocus placeholder="Domain of your home server, e.g. mastodon.social" />
                        <button type="submit">Follow</button>
                    </form>
                </div>
                <ul>
                
                </ul>
            </dialog>
        `;
        this.#root.appendChild(this.getStyle());

        this.#dialog = this.#root.querySelector('dialog');
        this.#input = this.#root.querySelector('input');
        this.#list = this.#root.querySelector('ul');
        this.#input.addEventListener('input', this.updateSuggestions.bind(this));
        this.#input.addEventListener('keydown', this.handleKeypress.bind(this));
        this.#root.querySelector('form').addEventListener('submit', this.submit.bind(this));
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
            
            dialog {
                border: none;
                width: 30em;
                height: 30em;
                max-width: 90vw;
                max-height: 90vh;
                background-color: var(--color-background);
                color: var(--color-text);
                
            }
            
            button {
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
        const account = this.getAttribute('account');
        const url = `https://${domain}/@${account}`;
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
