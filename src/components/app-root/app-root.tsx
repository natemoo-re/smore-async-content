import { Component } from '@stencil/core';
import '@smore/async-content';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <example-basic></example-basic>
        </main>
      </div>
    );
  }
}
