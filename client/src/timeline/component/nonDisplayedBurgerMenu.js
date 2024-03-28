import { Link } from "react-router-dom";

export default function NonDisplayedBurgerMenu() {
  return (
    <div className="text-black bg-white w-20 h-screen  flex-col items-center text-xs space-y-8 pt-12 hidden md:flex">
      <div>
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75"
            ></path>
          </svg>
          <button>Home</button>
        </Link>
      </div>
      <div>
        <Link to="/shorts">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25Z"
            ></path>
            <path
              fill="currentColor"
              d="M6 10.559V5.442a.25.25 0 0 1 .379-.215l4.264 2.559a.25.25 0 0 1 0 .428l-4.264 2.559A.25.25 0 0 1 6 10.559"
            ></path>
          </svg>
          <button>Shorts</button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Link
          className="flex flex-col items-center justify-center"
          to="/feed/subscriptions/grid"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 22q-.825 0-1.412-.587T2 20V10q0-.825.588-1.412T4 8h16q.825 0 1.413.588T22 10v10q0 .825-.587 1.413T20 22zm0-2h16V10H4zm6-1l6-4l-6-4zM4 7V5h16v2zm3-3V2h10v2zM4 20V10z"
            ></path>
          </svg>
          <button>Subscriptions</button>
        </Link>
      </div>
      <div>
        <Link className="flex flex-col items-center justify-center" to="/you">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M17.525 10.625q.35-.225.35-.625t-.35-.625L12.65 6.25q-.375-.25-.763-.038t-.387.663v6.25q0 .45.388.663t.762-.038zM8 18q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm0-2h12V4H8zm-4 6q-.825 0-1.412-.587T2 20V7q0-.425.288-.712T3 6q.425 0 .713.288T4 7v13h13q.425 0 .713.288T18 21q0 .425-.288.713T17 22zM8 4v12z"
            ></path>
          </svg>
          <button>You</button>
        </Link>
      </div>
    </div>
  );
}
