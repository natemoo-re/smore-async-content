import { Component, Prop, State, Event, EventEmitter, Method } from '@stencil/core';

@Component({
  tag: 'async-error',
  shadow: true,
  host: {
    slot: 'error'
  }
})
export class AsyncError {

  @Prop() ms: number = 10000;
  @Prop() errorRender: (args: {status?: number, message?: string}) => JSX.Element = null;
  @State() timeout = false;
  @State() status: number;
  @State() message: string;
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
      console.log('Error Timer end')
      this.timeout = true;
      this.status = 408;
      this.message = 'The server took too long to respond';
      this.hasError.emit();
    }, this.ms);
  }

  private clearTimer() {
    if (this.timer) {
      console.log('Error clear timer');
      clearTimeout(this.timer);
    }
  }

  @Method() setStatus(status: number, message?: string) {
    this.status = status;
    this.message = message || '';
  }

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
