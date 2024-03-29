export default function BtnPriceFormule({ formuleIDbtn, description }) {
  const handleClick = async (formuleID) => {
    const body = {
      products: {
        items: [{ id: formuleID, quantity: 1 }],
      },
    };
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
  };
  return (
    <button
      onClick={() => handleClick(formuleIDbtn)}
      className="btn-tryPremium px-5 py-3 rounded-full font-roboto font-bold text-lg bg-[#3EA6FF] hover:bg-[#65B8FF] "
    >
      {description}
    </button>
  );
}
