import { Component, Prop, State, Event, EventEmitter, Method } from '@stencil/core';

@Component({
  tag: 'async-placeholder',
  shadow: true,
  host: {
    slot: 'placeholder'
  }
})
export class AsyncPlaceholder {

  /**
   * A delay (in milliseconds) until the placeholder should be shown.
   * Defaults to `600`.
   *
   * @example
   * ```tsx
   * <async-content src="docs/hello-world.html">
   *  <async-placeholder ms={1000}>
   *    Loading...
   *  </async-placeholder>
   * </async-content>
   *
   * // Waits 1 second until displaying "Loading..."
   * ```
   *
   * @type {number}
   * @memberof AsyncPlaceholder
   */
  @Prop() ms: number = 600;

  /**
   * An HTML tag that should be rendered as a placeholder.
   *
   * @example
   * ```tsx
   * <async-content src="docs/hello-world.html">
   *  <async-placeholder component="my-spinner"/>
   * </async-content>
   *
   * // Renders <my-spinner /> after 600ms unless the content loads
   * ```
   *
   * @type {string}
   * @memberof AsyncPlaceholder
   */
  @Prop() component: string = null;
  /**
   * Optionally, allows you to pass props to the placeholder component.
   *
   * @example
   * ```tsx
   * <async-content src="docs/hello-world.html">
   *  <async-placeholder component="my-spinner" componentProps={{ color: 'primary' }}/>
   * </async-content>
   *
   * // Renders <my-spinner color="primary" /> after 600ms unless the content loads
   * ```
   *
   * @type {{ [key: string]: any }}
   * @memberof AsyncPlaceholder
   */
  @Prop() componentProps: { [key: string]: any } = {};


  @State() timeout = false;

  /**
   * Emitted once `this.ms` has passed and the placeholder should be displayed
   *
   * @type {EventEmitter<void>}
   * @memberof AsyncPlaceholder
   */
  @Event() hasPlaceholder: EventEmitter<void>;

  private timer = null;

  componentWillLoad() {
    this.startTimer();
  }

  componentWillUnload() {
    this.clearTimer();
  }

  private startTimer() {
    this.timer = setTimeout(() => {
      this.timeout = true;
      this.hasPlaceholder.emit();
    }, this.ms);
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  /**
   * Clears the internal timer that determines when to display the placeholder.
   * Called automatically as necessary by `<async-content/>`
   *
   * @type {{ [key: string]: any }}
   * @memberof AsyncPlaceholder
   */
  @Method() cancel() {
    this.clearTimer();
  }

  render() {
    if (this.component) {
      const ChildComponent = this.component;
      return <ChildComponent { ...this.componentProps } />;
    } else {
      return <slot />;
    }
  }
}
