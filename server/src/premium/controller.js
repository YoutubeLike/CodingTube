const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
require("dotenv").config();

const premium = async (req, res) => {
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
      // type de payments subscription or payments
      mode: "subscription",
      line_items:
        // id de l'api
        req.body.products.items.map((item) => {
          const storeItem = storeItems.get(item.id);
          return {
            price: storeItem.priceInCents,
            quantity: 1,
          };
        }),

      // redirection page for success and cancel
      success_url: `${process.env.SERVER_URL}/`,
      cancel_url: `${process.env.SERVER_URL}/premium`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  premium,
};
