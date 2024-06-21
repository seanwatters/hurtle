# Hurtle 🐢

Zero dependency, channel-like API for JavaScript and TypeScript
(basically just a slightly more ergonomic wrapper around `EventTarget`).

## Usage

A simple, almost useless example.

```javascript
import { Channel } from "hurtle";

const { rx, tx } = new Channel();

let state = 0;

const rx_cleanup = rx.recv((msg) => {
    state += msg;
});

for (let i = 0; i < 10; i += 1) {
    tx.send(1);
}

console.log(state); // expect 10

rx_cleanup();
```

## Motivation

Can be used to more cleanly organize DOM manipulation actions spawned
in response to user and network events.

```javascript
// main.js
import { Channel } from "hurtle";

const { tx, rx } = new Channel();
export { tx, rx };

// req.js handle network response
import { tx } from "./main.js";
tx.send({ text: res.someJunk });

// a.js DOM manipulation
import { rx } from "./main.js";
rx.recv((event) => {
    elementA.textContent = event.text;
});

// b.js DOM manipulation
import { rx } from "./main.js";
rx.recv((event) => {
    elementB.textContent = event.text;
});
```

## Deno Usage

```javascript
import { Channel } from "npm:hurtle@1.0.0/dist/cjs/index.js";
```