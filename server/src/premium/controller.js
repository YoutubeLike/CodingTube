const stripe = require("stripe")(
  "sk_test_51OuE4UJis95gsMso4SX5WfWiAOuQ1Uhf38cEGOQjKXNHlQyayDUc8u9gmYqZhsNdWfeDyXKq2TTSpHjPRe6rL54p00hjEthPmf"
);
const express = require("express");
const app = express();

app.use(express.static("."));

app.post("/create-intent", async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });
  res.json({ client_secret: intent.client_secret });
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
const premium = (req, res) => {
  const name = req.params.user;
  res.send(name);
  // mariadb.pool.query("SELECT * FROM user").then((value) => {
  //   res.send(value[0]["username"]);
  // });
};

module.exports = {
  premium,
};
