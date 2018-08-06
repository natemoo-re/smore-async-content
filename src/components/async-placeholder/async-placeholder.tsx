import { Component, Prop, State, Event, EventEmitter, Method } from '@stencil/core';

@Component({
  tag: 'async-placeholder',
  shadow: true,
  host: {
    slot: 'placeholder'
  }
})
export class AsyncPlaceholder {

  @Prop() ms: number = 600;
  @Prop() component: string = null;
  @Prop() componentProps: { [key: string]: any } = {};


  @State() timeout = false;
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
      console.log('Placeholder Timer End')
      this.timeout = true;
      this.hasPlaceholder.emit();
    }, this.ms);
  }

  private clearTimer() {
    if (this.timer) {
      console.log('Placeholder clear timer');
      clearTimeout(this.timer);
    }
  }

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
