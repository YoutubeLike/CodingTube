import BtnPrice from "./Boutton/btnPrice.js";

export default function HeroBanner() {
  return (
    <>
      <div className="header-nav bg-black w-full h-7"></div>
      <section className="section-hero-banner bg-black ">
        <div className="section-hero-banner-background flex justify-center w-full h-svh bg-[url('./assets/img/bgYt.png')] bg-no-repeat bg-auto bg-center">
          <div className="section-hero-banner-title h-screen w-4/5		">
            <div className="hero-banner-logo w-full h-64 pt-36 ">
              <div className="logo w-70 h-12 bg-[url('./assets/img/logoYtPremium.png')] bg-contain	bg-no-repeat bg-center	"></div>
            </div>
            <div className="hero-banner-heading">
              <h1 className="heading md:text-6xl text-4xl text-white text-center">
                YouTube and YouTube Music ad-free, offline, and in the
                background
              </h1>
            </div>
            <div className="hero-banner-subheading">
              <div className="subheading-view">
                <p className="subheading-text text-center pt-10  font-normal text-white">
                  YouTube and YouTube Music ad-free, offline, and in the
                  background
                </p>
                <p className="subheading-text text-center pt-3 font-normal text-white ">
                  1-month free trial • Then $13.99 month • Cancel anytime
                </p>
              </div>
            </div>
            <div className="hero-banner-btnPremium pt-10 w-full flex justify-center">
              <BtnPrice formuleIDbtn={2} description={"Try 1 month for 0$"} />
            </div>
            <div className="hero-banner-more-information pt-10">
              <div className="premium-formule-premium">
                <p className="formule-premium-subtitle text-center text-white ">
                  Or save money with an annual, family or student plan 
                </p>
              </div>
              <div className="premium-restrictions pt-10">
                <p className="restriction-title text-center text-xs text-[#AAAAAA]">
                  You'll be reminded 7 days before your trial ends. Recurring
                  billing. Free trial for eligible new members only. 
                  <br></br>
                  <a
                    href="https://github.com/PetitBidule/learnverse"
                    className="restriction-link text-sky-500 "
                  >
                    Restrictions apply. 
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
