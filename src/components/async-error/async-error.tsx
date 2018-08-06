import { Component, Prop, State, Event, EventEmitter, Method } from '@stencil/core';

@Component({
  tag: 'async-error',
  shadow: true,
  host: {
    slot: 'error'
  }
})
export class AsyncError {

  /**
   * A delay (in milliseconds) until the `<async-content>` fetch should be assumed to have timed out.
   * Defaults to `10000`.
   *
   * @type {number}
   * @memberof AsyncError
   */
  @Prop() ms: number = 10000;
  /**
   * An optional function that should render when `<async-content>` encounters an error.
   * The function is passed an object with `{ status, message }` in case you'd like either of those to be rendered.
   *
   * @example
   * ```jsx
   * <async-content src="path/that/doesnt/exits.html">
   *  <async-error errorRender={({ status, message }) => {
   *    return <pre class="error"> { status } - { message }</pre>
   *  }} />
   * </async-content>
   * ```
   *
   * @memberof AsyncError
   */
  @Prop() errorRender: (args: { status?: number, message?: string }) => JSX.Element = null;

  @State() timeout = false;
  @State() status: number;
  @State() message: string;

  /**
   * Emitted once `this.ms` has passed and the `<async-content>` fetch should be assumed to have timed out
   *
   * @type {EventEmitter<void>}
   * @memberof AsyncPlaceholder
   */
  @Event() hasError: EventEmitter<void>;

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
      this.status = 408;
      this.message = 'The server took too long to respond';
      this.hasError.emit();
    }, this.ms);
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  /**
   * Sets the Error status and message as passed to `errorRender`
   * Called automatically by `<async-content />`
   *
   * @type {{ [key: string]: any }}
   * @memberof AsyncPlaceholder
   */
  @Method() setStatus(status: number, message?: string) {
    this.status = status;
    this.message = message || '';
  }

  /**
   * Clears the internal timer that determines when `<async-content />` should timeout.
   * Called automatically as necessary by `<async-content />`
   *
   * @type {{ [key: string]: any }}
   * @memberof AsyncPlaceholder
   */
  @Method() cancel() {
    this.clearTimer();
  }

  render() {
    if (this.errorRender) {
      return this.errorRender({ status: this.status, message: this.message })
    } else {
      return <slot />;
    }
  }
}
