import { loadStripe } from "@stripe/stripe-js";

export default function BtnPriceFormule() {
  async function handleClick() {
    const body = {
      products: {
        items: [{ id: 1, quantity: 3 }],
      },
    };

    const stripe = await loadStripe(
      "pk_test_51OuE4UJis95gsMso7jUBhcYW3gvChETZUDg77xtHGrAGa8ChM8IYhzyjKPP6ofTrrasHgGHSls9JOASj2RECn7gC00vpnVS9hb"
    );
    await fetch(`http://localhost:5000/api/premium/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });

    // const session = await response.json();

    // const result = stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });

    // if (result.error) {
    //   console.log(result.error);
    // }
  }
  return (
    <button
      onClick={handleClick}
      className="btn-tryPremium px-5 py-3 rounded-full font-roboto font-medium text-lg bg-[#3EA6FF] hover:bg-[#65B8FF] "
    >
      Try 2 months for $25
    </button>
  );
}
