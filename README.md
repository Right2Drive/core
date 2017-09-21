# The Core

_The Core_ is a NodeJS server exposing a robust REST API allowing us to build clients on top of it.

## Architecture Benefits

Using _The Core_ we can consolidate logic on a server, offering us benefits threefold

1) Reduces code duplication
    - Imagine you decide to build an android application, a web application, an iOS application, and whatever other application you can think of. If they all do similar things, do you really want to rewrite the same code n times?
2) Security
    - A lot of what your clients do shouldn't necessarily be exposed to our users. Some of it definitely shouldn't (authentication I'm looking at you). Keeping it secured behind a REST API just keeps security wrapped up a little bit safer
3)

## Why The Core?

Sure, this is a common design pattern, and I'm sure you could go build something yourself that would suit your needs perfectly fine! And to be perfectly honest, this is mostly a boilerplate for me to reuse. There is something I have noticed in my time with web development though. Half the battle is configuration, and making these tools (mostly Webpack and Typescript) work together, especially on the server side, isn't the simplest thing in the world.

## Why Webpack?

Usually we see webpack used on the front-end. And for good reason too, a lot of it's features are tailor made to make your client side application perform better. Not all of them though. Some of the plugins (ex: WebpackDefinePlugin) and loaders (ex: tslint-loader) have just as much place on the server side as the client.

# Development

Let's get you all setup and ready to go with _The Core_!

## Getting Started

First you are going to need to get the code!

`git clone https://github.com/Right2Drive/core && cd core`

Personally I don't like adopting someone elses git history, so let's avoid keeping that around!

`rm -r .git`

And of course we have to initialize a new git repo now

`git init`

## Dependencies

Well of course you need Node! You can get this [here](https://nodejs.org/en/)!

You're also going to need to install the npm packages, this can be done with the command:

`npm install`

And then to get started it's simply an npm script:

`npm start`
