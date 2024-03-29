import Cards from "./card/card.js";

export default function Section1() {
  return (
    <section className="section-renderer h-fit bg-[#0f0f0f]">
      <div className="section-group-view px-10">
        <div className="group-card flex items-center flex-col md:flex-row md:justify-center ">
          <Cards
            descriptionText={
              "Ad-free so you can immerse in your favorite videos without interruption"
            }
            descriptionImage={""}
            image={"./images/bgCard1.webp"}
          />
          <Cards
            descriptionText={
              "Download videos to watch later when you’re offline or on the go"
            }
            descriptionImage={""}
            image={"./images/bgCard2.webp"}
          />
          <Cards
            descriptionText={
              "Background play so you can watch while using other apps or with your screen locked"
            }
            descriptionImage={""}
            image={"./images/bgCard3.webp"}
          />
          <Cards
            descriptionText={
              "Stream all the music you want to hear, ad-free on the YouTube Music app"
            }
            descriptionImage={""}
            image={"./images/bgCard4.webp"}
          />
        </div>
      </div>
    </section>
  );
}
