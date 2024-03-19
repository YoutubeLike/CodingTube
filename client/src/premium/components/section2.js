import FormuleCard from './card/formuleCard.js';

export default function Section2() {
  return (
    <section className="section-renderer bg-[#0f0f0f] py-10">
      <div className="section-group-view ">
        <div className="w-full flex justify-center">
          <h1 className="heading text-6xl text-center  py-20 w-1/2">
            Pick a membership that fits you
          </h1>
        </div>

        <div className="group-card flex items-center flex-col md:flex-row md:justify-center">
          <FormuleCard
            nameFormule={'Individual'}
            priceFormule={'$13.99/month'}
            descriptionFormule={
              'Free trial for eligible new members only. Restrictions apply. '
            }
          />
          <FormuleCard
            nameFormule={'Family'}
            priceFormule={'$22.99/month'}
            descriptionFormule={
              'Add up to 5 family members (ages 13+) in your household. Free trial for eligible new members only. Restrictions apply. '
            }
          />
          <FormuleCard
            nameFormule={'Student'}
            priceFormule={'$7.99/month'}
            descriptionFormule={
              'Eligible students only. Annual verification required. Free trial for eligible new members only. Restrictions apply. '
            }
          />
        </div>
      </div>
    </section>
  );
}
