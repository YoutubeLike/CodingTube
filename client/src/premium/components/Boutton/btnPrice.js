export default function BtnPriceFormule() {
  function handleClick() {
    fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: 1, quantity: 3 }],
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        console.log(url);
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
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
