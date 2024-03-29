import Section3 from "./groupview";
import GroupView from "./groupview2";
import Card from "./sectionCard";
export default function Section() {
  return (
    <section className="section-renderer bg-[#0f0f0f]">
      <div className="section-group-view w">
        <h1 className="text-6xl py-14 text-center">
          Keep playing what you love – uninterrupted
        </h1>
        <Section3
          title={"Unlimited ad-free videos"}
          description={
            "Immerse yourself in more of your favourite videos without waiting for ads. Find helpful how-to's, try new recipes or work out with your favourite creators – all without any interruptions."
          }
          backgroundImage={"./images/bgSection3.webp"}
        />
        <GroupView
          title={"Enjoy videos offline"}
          description={
            "Watch any time, anywhere – download videos and watch them whenever, wherever, without the need for mobile data or Wi-Fi."
          }
          backgroundImage={"./images/bgSection5.webp"}
        />
        <Section3
          title={"Background play"}
          description={
            "Keep watching – whether the screen's off or you're using other apps, you can continue playing your videos in the background with zero interruptions."
          }
          backgroundImage={"./images/bgSection4.webp"}
        />
        <Card />
      </div>
    </section>
  );
}
