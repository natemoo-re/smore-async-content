# async-placeholder



<!-- Auto Generated Below -->


## Properties

#### component

string

An HTML tag that should be rendered as a placeholder.


#### componentProps

{ [key: string]: any }

Optionally, allows you to pass props to the placeholder component.


#### ms

number

A delay (in milliseconds) until the placeholder should be shown.
Defaults to `600`.


## Attributes

#### component

string

An HTML tag that should be rendered as a placeholder.


#### component-props



Optionally, allows you to pass props to the placeholder component.


#### ms

number

A delay (in milliseconds) until the placeholder should be shown.
Defaults to `600`.


## Events

#### hasPlaceholder

Emitted once `this.ms` has passed and the placeholder should be displayed


## Methods

#### cancel()

Clears the internal timer that determines when to display the placeholder.
Called automatically as necessary by `<async-content/>`



----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
