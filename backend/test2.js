const dns = require("dns");

dns.resolve4("cluster0.zinjipd.mongodb.net", (err, addresses) => {
  console.log("ERR:", err);
  console.log("ADDRESSES:", addresses);
});