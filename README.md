# The Core

_The Core_ is a NodeJS server exposing a robust REST API allowing us to build clients on top of it.

## Architecture Benefits

Using _The Core_ we can consolidate logic on a server, offering us benefits threefold

1) Reduces code duplication
    - Imagine you decide to build an android application, a web application, an iOS application, and whatever other application you can think of. If they all do similar things, do you really want to rewrite the same code 'n' times?
2) Security
    - A lot of what your clients do shouldn't necessarily be exposed to our users. Some of it definitely shouldn't (authentication I'm looking at you). Keeping it secured behind a REST API just keeps security wrapped up a little bit safer
3) Separation of Concerns
    - We are used to seeing our REST API's mixed in with our web servers. It was the standard way of doing things for years. What if you have more than one web client though? What if you have 100 web clients? The example might be ridiculous, but it drives home an important point, why are we mixing these completely different operations? Let's keep API's and views separate!

## Why The Core?

Sure, this is a common design pattern, and I'm sure you could go build something yourself that would suit your needs perfectly fine! And to be perfectly honest, this is mostly a boilerplate for me to reuse. There is something I have noticed in my time with web development though. Half the battle is configuration, and making these tools (mostly Webpack and Typescript) work together, especially on the server side, isn't the simplest thing in the world. Plus this boilerplate comes with auth baked in, enjoy!

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

## Building

To build for production simply run:

`npm run build`

If you're building for development, instead run:

`npm run build:dev`

If you would prefer to just watch the changes and build them when they change (for development), you can run the following:

`npm run watch`

Note: `npm start` does run a file watcher already, so no build steps are required by you :)

## Testing

### Naming Conventions

Creating a new test file is easy! You can add your unit tests in `<ROOT>/test/unit` and integration tests in `<ROOT>/test/integration`. Just make sure your files end with `.test.ts` so they will be picked up in the webpack build.

### test

Testing is as easy as 1...2...3!

`npm test`

This will build for production and run all tests, integration and unit tests.

### test:core

If you want to skip the build step and just run all the tests, simply run:

`npm run test:core`

I typically keep the webpack watcher running in the background so your tests automatically build! (ie `npm run watch`) :octocat:

### test:unit & test:integration

To test just the unit tests or just the integration tests:

`npm run test:unit` or `npm run test:integration` respectively

Be aware that neither of these is performing a build before running

### Custom test filters

Each test has a series of descriptors before the actual test. I have added the `@slow` tag to the descriptors of tests that take a while to complete. This way if you want to only run the slow tests, you can do this with the following:

`npm run test:core -- --grep @slow`

Likewise, if you want to skip the slow tests, you can run the following:

`npm run test:core -- --grep @slow --invert`

Go ahead, try adding your own tags to your tests so you can filter them the same way!
