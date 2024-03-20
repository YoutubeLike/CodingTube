import axios from "axios";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState({
    name: false,
    mail: false,
    birthdate: false,
    country: false,
    gender: false,
  });

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    mail: "",
    birthdate: "",
    country: "",
    gender: "",
  });

  const updateUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/profil/updateUser/1", {
        updatedUserData: {
          id: profileData.id,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          birthday: profileData.birthday,
          location: profileData.location,
          gender: profileData.gender
        }
      });
      console.log(response.data.message);
      console.log("modification réalisé")
    } catch (error) {
      console.error("Error updating user:", error);
      console.log("erreur à la connexion avec le back")
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profil/userData/1`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (e, field) => {
    setProfileData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

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
              @{profileData.first_name} {profileData.last_name} ·0·
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
              handleEditToggle("fullName");
              updateUser();
            }}
          >
            <p className="text-xl font-semibold ml-5"> Full Name</p>

            <div className="m-5 transform h-5 bg-red-600 w-5 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
              <button
                className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-5 h-5 rounded-md  flex justify-center items-center"
                type="submit"
              >
                {isEditing.fullName ? (
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

            <div className="flex mx-5">
              <div className=" my-5 flex items-center">
                <lable>
                  <span class="text-sm text-gray-500">First Name</span>:{""}
                  {isEditing.fullName ? (
                    <input
                      type="text"
                      className=" ml-2 mr-5"
                      value={profileData.first_name}
                      onChange={(e) => {
                        handleInputChange(e, "first_name");
                      }}
                    />
                  ) : (
                    <b className=" ml-2 mr-5">{profileData.first_name} </b>
                  )}
                </lable>
              </div>
              <div className=" my-5 flex items-center">
                <lable>
                  <span class="text-sm text-gray-500">Last Name</span>:{""}
                  {isEditing.fullName ? (
                    <input
                      type="text"
                      className=" ml-2 mr-5"
                      value={profileData.last_name}
                      onChange={(e) => {
                        handleInputChange(e, "last_name");
                      }}
                    />
                  ) : (
                    <b className=" ml-2 mr-5">{profileData.last_name} </b>
                  )}
                </lable>
              </div>
            </div>
            <hr className="mt-4 mb-8 mx-5" />
          </form>

          {/* mail */}

          <form
            className=" mt-5 flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleEditToggle("mail");
            }}
          >
            <p className="text-xl font-semibold ml-5">Mail Address</p>

            <div className="m-5 transform h-5 bg-red-600 w-5 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
              <button
                className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-5 h-5 rounded-md  flex justify-center items-center"
                type="submit"
              >
                {isEditing.mail ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                )}
                {/* icon */}
              </button>
            </div>

            <div className=" mx-5 flex items-center">
              <label>
                <span className="text-sm text-gray-500">Mail</span>:
                {isEditing.mail ? (
                  <input
                    type="email"
                    className=" ml-2 mr-5"
                    value={profileData.mail}
                    onChange={(e) => {
                      handleInputChange(e, "mail");
                    }}
                  />
                ) : (
                  <b className=" ml-2 mr-5">{profileData.mail} </b>
                )}
              </label>
            </div>
            <hr className="mt-4 mb-8 mx-5" />
          </form>

          {/* birthdate */}

          <form
            className=" mt-5 flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleEditToggle("birthdate");
            }}
          >
            <p className="text-xl font-semibold ml-5">Birthdate</p>

            <div className="m-5 transform h-5 bg-red-600 w-5 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
              <button className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-5 h-5 rounded-md  flex justify-center items-center">
                {isEditing.birthdate ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                )}
                {/* icon */}
              </button>
            </div>

            <div className=" mx-5 flex items-center">
              <label>
                <span className="text-sm text-gray-500">Birthdate</span>:
                {isEditing.birthdate ? (
                  <input
                    type="date"
                    className=" ml-2 mr-5"
                    value={profileData.birthdate}
                    onChange={(e) => {
                      handleInputChange(e, "birthdate");
                    }}
                  />
                ) : (
                  <b className=" ml-2 mr-5">{profileData.birthdate} </b>
                )}
              </label>
            </div>
            <hr className="mt-4 mb-8 mx-5" />
          </form>

          {/* country */}

          <form
            className=" mt-5 flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleEditToggle("country");
            }}
          >
            <p className="text-xl font-semibold ml-5">Country</p>

            <div className="m-5 transform h-5 bg-red-600 w-5 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
              <button className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-5 h-5 rounded-md  flex justify-center items-center">
                {isEditing.country ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                )}
                {/* icon */}
              </button>
            </div>

            <div className=" mx-5 flex items-center">
              <label>
                <span className="text-sm text-gray-500">Country</span>:
                {isEditing.country ? (
                  <input
                    type="text"
                    className=" ml-2 mr-5"
                    value={profileData.country}
                    onChange={(e) => {
                      handleInputChange(e, "country");
                    }}
                  />
                ) : (
                  <b className=" ml-2 mr-5">{profileData.country} </b>
                )}
              </label>
            </div>
            <hr className="mt-4 mb-8 mx-5" />
          </form>

          {/* gender */}

          <form
            className=" mt-5 flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleEditToggle("gender");
            }}
          >
            <p className="text-xl font-semibold ml-5">Gender</p>

            <div className="m-5 transform h-5 bg-red-600 w-5 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
              <button className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-5 h-5 rounded-md  flex justify-center items-center">
                {isEditing.gender ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                )}
                {/* icon */}
              </button>
            </div>

            <div className=" mx-5 flex-col items-center">
              <label>
                <span className="text-sm text-gray-500">Gender</span>:
                {isEditing.gender ? (
                  <input
                    type="text"
                    className=" ml-2 mr-5"
                    value={profileData.gender}
                    onChange={(e) => {
                      handleInputChange(e, "gender");
                    }}
                  />
                ) : (
                  <b className=" ml-2 mr-5">{profileData.gender} </b>
                )}
              </label>
            </div>

            <hr className="mt-4 mb-8 mx-5" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
