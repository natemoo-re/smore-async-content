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
    console.log(this.placeholderElement, this.errorElement);
  }

  @Watch('src')
  fetchNewContent() {
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
