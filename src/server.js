const fetch = require("node-fetch");
var fs = require("fs");
var readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("enter crypto symbol \n", async function (name) {
  const answer = await fetchPrice(name);
  console.log(answer);
  rl.close();
});

const fetchPrice = (name) => {
  return fetch(`https://api.bitfinex.com/v1/pubticker/${name}usd`)
    .then((res) => res.json())
    .then((body) => {
      if (body.last_price) {
        fileWrite(name, body.last_price);
        return body.last_price;
      } else {
        return "no crypto pair was found ";
      }
    })
    .catch((e) => {
      return console.log(e);
    });
};

const fileWrite = (name, price) => {
  fs.appendFile("crypto.txt", `${name}:${price} USD \n`, function (err) {
    if (err) throw err;
  });
};
