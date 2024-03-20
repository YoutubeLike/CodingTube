export default function NonDisplayedBurgerMenu() { 
    return( 
      <div className="fixed text-black bg-white w-20 h-screen flex flex-col items-center justify-center text-xs space-y-8">
        <div className="absolute inset-y-0 left-20 w-1 bg-black transition-transform duration-300"></div>
        <div className="relative top-[-150px]">
            <a href="/">
            <img className="relative left-[-1px]"src="homeytb1.png"></img>
            <button className="relative left-[10px]">
            Home
            </button>
            </a>
        </div>
        <div className="relative top-[-150px]">
            <a href="/shorts">
            <img className="relative left-[-3px]" src="shorts1.png"></img>
            <button className="relative left-[9px]">
            Shorts
            </button>
            </a>
        </div>
        <div className="relative top-[-150px]">
            <a href="/feed/subscriptions/grid">
            <img className="relative left-[12px]" src="subscriptions1.png"></img>
            <button>
            Subscriptions
            </button>
            </a>
        </div>
        <div className="relative top-[-150px]">
            <a href="/you">
            <img className="relative left-[3px]" src="you1.png"></img>
            <button className="relative left-[18px]">
            You
            </button>
            </a>
        </div>
      </div>
);
}