# async-error



<!-- Auto Generated Below -->


## Properties

#### errorRender

(args: { status?: number, message?: string }) => JSX.Element

An optional function that should render when `<async-content>` encounters an error.
The function is passed an object with `{ status, message }` in case you'd like either of those to be rendered.


#### ms

number

A delay (in milliseconds) until the `<async-content>` fetch should be assumed to have timed out.
Defaults to `10000`.


## Attributes

#### error-render



An optional function that should render when `<async-content>` encounters an error.
The function is passed an object with `{ status, message }` in case you'd like either of those to be rendered.


#### ms

number

A delay (in milliseconds) until the `<async-content>` fetch should be assumed to have timed out.
Defaults to `10000`.


## Events

#### hasError

Emitted once `this.ms` has passed and the `<async-content>` fetch should be assumed to have timed out


## Methods

#### cancel()

Clears the internal timer that determines when `<async-content />` should timeout.
Called automatically as necessary by `<async-content />`


#### setStatus()

Sets the Error status and message as passed to `errorRender`
Called automatically by `<async-content />`



----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
