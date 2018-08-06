import { Component } from '@stencil/core';


@Component({
    tag: 'example-basic'
})
export class ExampleBasic {

    render() {
        return (
          <div>
            <async-content src="www/docs/hello-world.html">
              <async-placeholder>
                <pre> Loading... </pre>
              </async-placeholder>
              <async-error>
                <pre> Something went wrong. </pre>
              </async-error>
            </async-content>
          </div>
        );
    }
}
