const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
require("dotenv").config();

const premium = async (req, res) => {
  // const name = req.params.user;
  // res.send(name);
  const storeItems = new Map([
    [1, { priceInCents: 1999, name: "Youtube Premium" }],
  ]);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      custom_text: {
        // shipping_address: {
        //   message:
        //     "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
        // },
        submit: {
          message: "We'll email you instructions on how to get started.",
        },
      },
      line_items: req.body.products.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "EUR",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: 1,
        };
      }),
      success_url: `${process.env.SERVER_URL}/`,
      cancel_url: `${process.env.SERVER_URL}/premium`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  // res.json({ id: session.id });
  // res.send({ url: session.url });
};

module.exports = {
  premium,
};
