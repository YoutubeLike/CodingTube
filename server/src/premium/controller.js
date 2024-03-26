const stripe = require("stripe")(
  "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"
);
require("dotenv").config();

const premium = async (req, res) => {
  // id de l'api
  const storeItems = new Map([
    [
      1,
      {
        priceInCents: "price_1Owk3fJis95gsMso6DC57HOy",
        name: "abonnement-etudiant",
      },
    ],
    [
      2,
      {
        priceInCents: "price_1Owi9cJis95gsMsoAKlf5jRv",
        name: "particulier",
      },
    ],
    [
      3,
      {
        priceInCents: "price_1Owk33Jis95gsMso2ArtOfyS",
        name: "abonnement-familial",
      },
    ],
  ]);
  try {
    const session = await stripe.checkout.sessions.create({
      // type de payments subscription ou payments
      mode: "subscription",
      line_items: req.body.products.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price: storeItem.priceInCents,
          quantity: 1,
        };
      }),

      // redirection page for success and cancel
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/premium`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  premium,
};
