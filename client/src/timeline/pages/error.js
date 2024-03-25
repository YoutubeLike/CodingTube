//  PAGE DISPLAYING THE WHRONG URL (404)

export default function Error() {
  return (
    <>
      {/* TITLES */}
      <div className="h-screen flex flex-col items-center justify-center bg-red-900">
        <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 text-white pl-2 pr-2 rounded-lg">
          ERROR 404
        </h1>
        <h4 className="text-center text-white mb-5">Wrong page.</h4>
        <img className="w-[200px] h-[337px] object-cover" src="https://pa1.aminoapps.com/6902/56f90a1e70bf55a3ce7af7c0c397c68fb2609157r1-480-270_hq.gif"></img>
      </div>
    </>
  );
}
