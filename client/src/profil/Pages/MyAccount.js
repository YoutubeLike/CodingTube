import React from "react";
import { useState } from "react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("Shreck");
  const [lastName, setLastName] = useState("Ogre");
  const [email, setEmail] = useState();
  const [birthday, setBirthday] = useState();
  const [localisation, setLocation] = useState();
  const [gender, setGender] = useState();
  return (
    <div>
      {/* banner */}
      <div className="bg-gradient-to-r from-lime-300 to-green-500 shadow-inner rounded-md">
        <div className="flex justify-end">
          {/* the button that alow us to change the banner and the */}
          <div className="m-5 transform h-10 bg-red-600 w-10 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
            <button className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-10 h-10 rounded-md  flex justify-center items-center">
              {" "}
              {/* icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-9 h-9"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className=" py-10 flex space-x-10">
          {/* profile picture */}
          <div className=" ml-10 border-8 border-opacity-25 border-white drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)]  w-52 h-52 rounded-full ">
            <img
              src="https://ih1.redbubble.net/image.519366270.8886/raf,360x360,075,t,fafafa:ca443f4786.jpg"
              class=" h-48 w-52 rounded-full"
              alt="..."
            />
            <button class="absolute h-10 w-10 rounded-md bg-white  bottom-0 right-0 flex justify-center align-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-10 h-"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </button>
          </div>

          {/* pseudo and the buttons to create a channel  */}
          <div className=" rounded-lg p-5 bg-opacity-25 bg-white drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] ">
            <p className=" text-center text-2xl font-bold">CodingTube</p>
            <p className=" text-sm font-semibold text-center text-gray-400">
              @{firstName}
              {lastName} ·0·
            </p>
            <div class=" mt-10 relative inline-flex  group">
              <div class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-red-600 via-[#c12099] to-red-600 rounded-full blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <a
                href="#"
                title="Get channel now"
                class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-red-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Create a channel
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* information part */}
      <div className=" mx-20">
        <div className="p-1 m-5 w-auto drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] rounded-md bg-white">
          <h1 className="mt-5 ml-5 text-2xl font-bold">Information</h1>

          <hr className="mt-4 mb-5 mx-5" />
          {/* name */}
          <form
            className=" mt-5 flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditing(!isEditing);
            }}
          >
            <p className="text-xl font-semibold ml-5"> Full Name</p>
            <div className="m-5 transform h-5 bg-red-600 w-5 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
              <button
                className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-5 h-5 rounded-md  flex justify-center items-center"
                type="submit"
              >
                {isEditing ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                )}
                {/* icon */}
              </button>
            </div>
          </form>

          <div className="flex mx-5">
            <div className=" my-5 flex items-center">
              <lable>
                <span class="text-sm text-gray-500">First Name</span>:{""}
                {isEditing ? (
                  <input
                    className=" ml-2 mr-5"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                ) : (
                  <b className=" ml-2 mr-5">{firstName} </b>
                )}
              </lable>
            </div>
            <div className=" my-5 flex items-center">
              <lable>
                <span class="text-sm text-gray-500">Last Name</span>:{""}
                {isEditing ? (
                  <input
                    className=" ml-2 mr-5"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                ) : (
                  <b className=" ml-2 mr-5">{lastName} </b>
                )}
              </lable>
            </div>
          </div>
          <hr className="mt-4 mb-8 mx-5" />

          {/* email */}
          <div className=" mt-5 flex items-center">
            <p className="text-xl font-semibold ml-5">Email Adresse</p>
            <div className="m-5 transform h-5 bg-red-600 w-5 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
              <button className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-5 h-5 rounded-md  flex justify-center items-center">
                {" "}
                {/* icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className=" m-5">MaThIlDe_G8@gmail.com</p>
          <hr className="mt-4 mb-8 mx-5" />

          {/* birthday */}
          <div className=" mt-5 flex items-center">
            <p className="text-xl font-semibold ml-5">Birthday</p>
            <div className="m-5 transform h-5 bg-red-600 w-5 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
              <button className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-5 h-5 rounded-md  flex justify-center items-center">
                {" "}
                {/* icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="m-5">24/12/2001</p>
          <hr className="mt-4 mb-8 mx-5" />

          {/* localisation */}
          <div className=" mt-5 flex items-center">
            <p className="text-xl font-semibold ml-5">Localisation</p>
            <div className="m-5 transform h-5 bg-red-600 w-5 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
              <button className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-5 h-5 rounded-md  flex justify-center items-center">
                {" "}
                {/* icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="m-5">Mantes-la-Ville(78)</p>
          <hr className="mt-4 mb-8 mx-5" />

          {/* gender */}
          <div className=" mt-5 flex items-center">
            <p className="text-xl font-semibold ml-5">Gender</p>
            <div className="m-5 transform h-5 bg-red-600 w-5 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
              <button className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-5 h-5 rounded-md  flex justify-center items-center">
                {" "}
                {/* icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p className="m-5">ị̵̧̧͙̯̮̙̼͎̦̝͎̫̜̹͎̤̰͍̜̮̫͊͊̎̀͋͗́̓̒͛͂̑̓͂̄̎̒͋̌̅̕̚̕͘͘͜͠͝͝͠'̷̶̡̡̧̡̨̛̛̛̭͖̳̯̯̝̝͉͔͙̙̜̹̰̥͍̭̖͈̯̬͋̌̇̔͐̆̓̀̐̅̔̊́͗͗̉̓͊̒̉͑́͂̐̿̈́̾̿̽͛́̚̕͘͜͜͠͠͝ͅͅt̸̡̺͖̟̤̞̄̚r̶͉̳̦͉̻̗͎̜͙͚̥̝͓̪͎̐͌̔̇̍̈́͑͛́̌̈́̾̀̀͛̔̇̎͘͘̚͝͝͝ỏ̷̡̦̗͎̼̯͇̦̰̰̣̮̬̓͋͌͒̈́̆̃̈́̆̄̓̂̊͗̄̇͋͌͆̈́̂̅̏͘͜͝͝͠ĺ̵̢̧̘̺̺̤̪̣̠̯̗̣̹͈̰͔͕̝̀͗́̓̕͜͝ļ̴̞̭̥̜̤̪̜̖̺̭̻͍̼̟̻̠͚̪̓͒̀̂͛̒̈́̒̆͂̚̕͜͝͝ͅm̸̢̡̢̡͓̻̭̣͉͔͓̜̳͓̦̬͓̬̱̰̬̬̖̆͆̐̏̋̃̆̃̾̾̉͋́̌̓̈́̐͒͒͆̒̆͐̈́͂͘͜͝ ̴̡̛̠̦̥̤͍̹͇̭̳̳̩̘̟̺̪̳̳̘̮̌̒̒̓́̈́̆͐̔̇̊̀͋̈̐͝ǎ̶̢̡̢͙̜̦̹̪̘̪͈͍͉͔͈̖͖͕̫̟̭̣̤̰̏̒͋ͅͅͅ </p>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
