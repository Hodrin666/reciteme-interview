## Getting Started

First, install dependencies:

```bash
npm
# or
yarn
```

Secondly, run the program

```bash
npm run dev
# or
yarn dev

## Future extensibility and build

In order to follow this approach the first thing used was hooks, in this app two hooks are used:

One that gets the window size for responsiveness and the other gets allCapsules from the spaceX Api, this one also supports pagination.

In addition I also used components. In this project I used a component called table, this receives a hook, with and from there manages the style. This implementation could be improved to support different numbers of columns and their respective sizes.

To conclude, responsive css approaches were used to create the style of pages for example css grid.
