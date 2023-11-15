import { Component, h, Host, Method, Prop } from '@stencil/core';

/**
 * A dialog widget to let a user pick their Mastodon instance.
 */
@Component({
  tag: 'mastodon-instancepicker',
  styleUrl: 'mastodon-instancepicker.css',
  shadow: true,
})
export class MastodonInstancepicker {
  dialog: HTMLDialogElement;
  input: HTMLInputElement;
  list: HTMLUListElement;
  abortController: AbortController;
  instance: { resolve: (value: PromiseLike<string> | string) => void; reject: (reason?: any) => void };

  /** currently unused */
  @Prop() account: string;

  render() {
    return (
      <Host>
        <dialog ref={el => (this.dialog = el)} onClick={this.close.bind(this)}>
          <main onClick={event => event.stopPropagation()}>
            <h1>Pick your Instance</h1>
            <p>Enter the Mastodon instance your account is hosted at.</p>
            <form onSubmit={this.submit.bind(this)}>
              <input
                type="text"
                autofocus
                placeholder="Domain of your home server, e.g. mastodon.social"
                ref={el => (this.input = el)}
                onInput={this.updateSuggestions.bind(this)}
                onKeyDown={this.handleKeypress.bind(this)}
              />
              <button type="submit">Pick</button>
            </form>
            <ul ref={el => (this.list = el)} onClick={this.markClicked.bind(this)}></ul>
            <p>
              Don't have a Mastodon account yet? Find a server at{' '}
              <a href="https://joinmastodon.org/servers" target="_blank">
                joinmastodon.org
              </a>
            </p>
          </main>
        </dialog>
      </Host>
    );
  }

  /**
   * Open the dialog and let the user pick an instance.
   */
  @Method()
  async pickInstance() {
    this.dialog.showModal();
    return new Promise<string>((resolve, reject) => {
      this.instance = { resolve, reject };
    });
  }

  /**
   * Close the dialog without picking an instance.
   */
  @Method()
  async close(event: MouseEvent) {
    if (event && event.target !== this.dialog) return;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.dialog.close();
    this.instance.reject();
  }

  submit(event) {
    event.preventDefault();
    const domain = this.input.value;
    if (!domain) return;
    localStorage.setItem('mastodon-instance', domain);
    this.instance.resolve(domain);
    this.dialog.close();
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
        this.dialog.close();
        event.preventDefault();
        break;
    }
  }

  markClicked(event) {
    if (event.target.tagName !== 'LI') return;
    event.stopPropagation();

    const current = this.list.querySelector('li.selected');
    if (current) {
      current.classList.remove('selected');
    }

    event.target.classList.add('selected');
    this.input.value = event.target.textContent;
    this.input.form.dispatchEvent(new Event('submit'));
  }

  markNext() {
    const current = this.list.querySelector('li.selected');
    let next;
    if (current) {
      current.classList.remove('selected');
    }

    if (current && current.nextSibling) {
      next = current.nextSibling;
    } else {
      next = this.list.querySelector('li');
    }
    next.classList.add('selected');
    this.input.value = next.textContent;
  }

  markPrevious() {
    const current = this.list.querySelector('li.selected');
    let previous;
    if (current) {
      current.classList.remove('selected');
    }

    if (current && current.previousSibling) {
      previous = current.previousSibling;
    } else {
      previous = this.list.querySelector('li:last-child');
    }
    previous.classList.add('selected');
    this.input.value = previous.textContent;
  }

  async updateSuggestions() {
    if (this.abortController) {
      this.abortController.abort();
    }
    this.abortController = new AbortController();

    const apiurl = 'https://mastodon.social/api/v1/peers/search?q=';
    try {
      const result = await fetch(apiurl + this.input.value, { signal: this.abortController.signal });
      let json = await result.json();

      if (json === null) json = [];

      // api does not suggest itself
      if (this.input.value.length && 'mastodon.social'.startsWith(this.input.value.toLowerCase())) {
        json.unshift('mastodon.social');
      }

      this.list.innerHTML = '';
      json.forEach(
        function (instance) {
          const li = document.createElement('li');
          li.textContent = instance;
          this.list.appendChild(li);
        }.bind(this),
      );
    } catch (err) {
      console.log(err);
    }
  }
}
