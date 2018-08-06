import { Component, Prop, State, Watch, Listen, Element } from '@stencil/core';

@Component({
  tag: 'async-content',
  styleUrl: 'async-content.css',
  shadow: true
})
export class AsyncContent {

  @Element() element: HTMLElement;
  private placeholderElement: HTMLAsyncPlaceholderElement;
  private errorElement: HTMLAsyncErrorElement;

  /**
   * The path to the HTML content to be fetched
   *
   * @type {string}
   * @memberof AsyncContent
   */
  @Prop() src: string = '';

  @State() hasError: boolean = false;
  @State() hasPlaceholder: boolean = false;
  @State() content: string | boolean = false;

  componentWillLoad() {
    this.fetchNewContent();
  }

  componentDidLoad() {
    this.placeholderElement = this.element.querySelector('async-placeholder');
    this.errorElement = this.element.querySelector('async-error');
  }

  @Watch('src')
  fetchNewContent() {
    let src = this.src;
    src = src.trim();
    if (src.endsWith('html')) {
      fetch(this.src)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            const error = new Error(response.statusText);
            error.name = `${response.status}`;
            throw error;
          }
        })
        .then(response => response.text())
        .then(response => {
          this.content = response;
          if (this.placeholderElement) {
            this.placeholderElement.cancel();
          }
          if (this.errorElement) {
            this.errorElement.cancel();
          }
        })
        .catch((err) => {
          this.hasError = true;
          if (this.errorElement) {
            this.errorElement.setStatus(err.name, err.message);
          }
        });
    } else {
      this.hasError = true;
      if (this.errorElement) {
        this.errorElement.setStatus(415, 'Refusing to fetch non-HTML content');
      }
    }
  }

  @Listen('hasPlaceholder')
  handleHasPlaceholder() {
    this.hasPlaceholder = true;
  }

  @Listen('hasError')
  handleHasError() {
    if (!this.content) {
      this.hasError = true;
    }
  }

  hostData() {
    return {
      class: {
        'is-loading': this.hasPlaceholder && !this.content && !this.hasError,
        'has-loaded': !!this.content,
        'has-error': this.hasError && !this.content
      }
    }
  }

  render() {
    if (!this.content) {
      if (this.hasError) {
        return <slot name="error" />
      } else if (this.hasPlaceholder) {
        return <slot name="placeholder" />
      } else {
        return null;
      }
    } else {
      return <div innerHTML={this.content as string} />
    }
  }
}
