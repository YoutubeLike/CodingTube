export default function Card() {
  return (
    <div className="section-group-view flex justify-center py-20 rounded-3xl">
      <div className="group-card flex w-10/12 bg-slate-600	rounded-3xl	">
        <div className="card-description w-6/12  ">
          <div className="card-background-image w-full h-full bg-[url('./assets/img/bgCardSection.jpeg')] bg-no-repeat bg-top p-5 rounded-l-3xl flex flex-col justify-center px-5">
            <h1 className="text-4xl text-left pb-10 ">
              An app made just for music
            </h1>
            <p>
              With YouTube Premium, you get uninterrupted access to stream all
              that you want on the YouTube Music app. Listen to the world's
              largest music catalogue with over 100 million songs, ad free –
              enjoy personalised mixes, playlists to fit every mood,
              chart-toppers from around the world and more, all without ads.
            </p>
          </div>
        </div>
        <div className="card-image w-6/12">
          <img
            className="rounded-r-3xl"
            src="./images/bgCardSection.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
