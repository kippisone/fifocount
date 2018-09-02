FIFO count
==========

FIFO count is a module to get a **f**irst **i**n **f**irst **o**ut calculation of a list of trades.

## Usage

```js
import Fifo from 'fifocount'

const fifo = new Fifo()


// add trades
fifo.add({ "type": "in",  "amount": 12, "price": 120 })
fifo.add({ "type": "out", "amount": 3,  "price": 150 })
fifo.add({ "type": "out", "amount": 5,  "price": 180 })
fifo.add({ "type": "in",  "amount": 2,  "price": 190 })
fifo.add({ "type": "out", "amount": 6,  "price": 210 })

// calculate trades
const res = fifo.count()

// res === [
//   { inPrice: 120, outPrice: 150, amount: 3, profit: 90 },
//   { inPrice: 120, outPrice: 180, amount: 5, profit: 300 },
//   { inPrice: 190, outPrice: 210, amount: 6, profit: 400 }
// ]
```
