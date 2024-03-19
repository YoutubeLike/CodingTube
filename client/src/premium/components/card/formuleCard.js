import BtnPrice from "../Boutton/btnPrice.js";

export default function FormuleCard({
  nameFormule,
  priceFormule,
  descriptionFormule,
}) {
  return (
    <div className="formule-card  bg-[#212121] w-96	h-90 mx-4 rounded-3xl m-3">
      <div className="center p-6 divide-y divide-[#AAAAAA]">
        <h2 className="text-2xl pb-4 pl-4">{nameFormule}</h2>
        <div className="formule-month">
          <div className="formule-input-checkbox"></div>
          <div className="formule-information py-4">
            <p className="month font-medium text-[#AAAAAA] text-xs ">Monthly</p>
            <h2 className="price text-xl">{priceFormule}</h2>
            <p className="offers">Get 1 month free</p>
            <p className="description text-[#AAAAAA] text-xs">
              {descriptionFormule}
            </p>
          </div>
        </div>

        <BtnPrice />
      </div>
    </div>
  );
}
