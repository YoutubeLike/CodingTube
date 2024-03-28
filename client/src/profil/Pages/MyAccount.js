import axios from "axios";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  // State for managing edit mode for each field in profile
  const [isEditing, setIsEditing] = useState({
    username: false,
    name: false,
    mail: false,
    birthdate: false,
    country: false,
    gender: false,
    password: false,
    errorUpdate: null,
    goodUpdate: null,
  });

  // State for storing profile data
  const [profileData, setProfileData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    mail: "",
    birthdate: "",
    country: "",
    gender: "",
    password: "",
  });

  const [formClickedMap, setFormClickedMap] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [goodMessage, setGoodMessage] = useState("");

  const handleFormSubmit = async (e, formKey) => {
    e.preventDefault();
    handleEditToggle(formKey);

    setErrorMessage("");
    setGoodMessage("");

    try {
      // Vérifiez si le formulaire correspondant à la clé formKey a été cliqué une fois
      if (formClickedMap[formKey]) {
        // Si oui, appelez la fonction de mise à jour de l'utilisateur
        await updateUser(formKey);
      } else {
        // Si non, mettez à jour l'état pour indiquer que le formulaire a été cliqué une fois
        setFormClickedMap((prevState) => ({
          ...prevState,
          [formKey]: true,
        }));
      }

      // Réinitialisez l'état après une soumission réussie
      if (formClickedMap[formKey]) {
        setFormClickedMap((prevState) => ({
          ...prevState,
          [formKey]: false,
        }));
        setGoodMessage("Information updated");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Gérez l'erreur et affichez le message d'erreur approprié à l'utilisateur
      setErrorMessage(error.response.data.error);
    }
  };

  // Function to update user data
  const updateUser = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/profil/userUpdate",
      {
        username: profileData.username,
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        mail: profileData.mail,
        birthdate: profileData.birthdate,
        country: profileData.country,
        gender: profileData.gender,
      }
    );
    console.log(response.data);
  };

  // Function to update password
  const updatePassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/profil/updatePswrd",
        {
          id: profileData.id,
          password: newPassword,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating password:", error);
      console.log("Couldn't connect to the backend");
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profil/userData/1`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Data retrieval error", error);
      }
    };

    fetchUserData();
  }, []);

  // Toggle edit mode for a field
  const handleEditToggle = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Handle input change for profile fields
  const handleInputChange = (e, field) => {
    setProfileData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // State for managing active tab
  const [toggleState, setToggleState] = useState(1);

  // Toggle between tabs
  const toggleTab = (index) => {
    setToggleState(index);
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    handleEditToggle("password");

    try {
      console.log("ici");
      console.log(e);
      const response = await axios.get(
        `http://localhost:5000/api/profil/userData/1`
      );
      const userData = response.data;
      const fetchedPassword = userData["password"];
    } catch (error) {
      setErrorMessage("Current password is incorrect!");

      console.error("Error fetching data", error);
    }
  };

  // State and functions for managing password fields
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/profil/logout"
      );
      window.location.href = "/login"; // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [channelExists, setChannelExists] = useState(false);
  const [identifier, setIdentifier] = useState(null); // State to hold identifier_channel
  const [follower, setFollower] = useState(null);
  const [pseudo, sePseudo] = useState(null);
  // Assume isChannelAvailable is a state indicating whether the session has a channel
  useEffect(() => {
    const fetchChannelInfo = async () => {
      try {
        const userId = 1;
        const response = await axios.get(
          `http://localhost:5000/api/profil/getInfoChannel/${userId}`
          //, {  withCredentials: true,}
        );
        const channelInfo = response.data;

        console.log("Session ID:", response.headers["set-cookie"]);

        // Check if identifier_channel is null
        if (channelInfo && channelInfo.identifier_channel === null) {
          setChannelExists(false); // No channel exists
        } else {
          setChannelExists(true); // Channel exists
          setIdentifier(channelInfo.identifier_channel);
          setFollower(channelInfo.nb_follower);
          sePseudo(channelInfo.pseudo);
        }
      } catch (error) {
        console.error("Error fetching channel info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannelInfo();
  }, []);

  const handleClick = () => {
    if (channelExists) {
      window.location.href = "/channel?identifier=/${identifier}";
    } else {
      window.location.href = "/new-channel";
    }
  };

  return (
    <div className="pl-0">
      {/* banner */}

      <div className=" md:pl-10 from-lime-300 justify-center to-green-500 shadow-inner rounded-t-md bg-[url('https://preview.redd.it/high-resolution-old-youtube-banner-v0-vjppkzbfg4ob1.png?auto=webp&s=3093b41bacf1bff614c3269df1163a6ba9e13342')] bg-no-repeat h-auto  mt-4 w-full md:w-auto md:mx-20">
        <div className="py-10 flex flex-col md:flex-row  md: items-center">
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

          <div className=" border-8 border-opacity-25 border-white drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] w-52 h-full rounded-full ">
            <img
              src="https://t4.ftcdn.net/jpg/01/17/00/39/360_F_117003938_TrPAYiOgFFLnIwKsjUjtqoe4W2RDzytI.jpg"
              className="h-auto w-full rounded-full"
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

          <div className="w-60 rounded-lg p-5 bg-opacity-25 bg-white drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)]">
            <p className=" text-center text-2xl font-bold">{pseudo}</p>
            <p className=" text-sm font-semibold text-center text-gray-400">
              @{profileData.first_name}
              {profileData.last_name} ·{follower} Followers·
            </p>

            <div className="mt-10 relative inline-flex group">
              <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-red-600 via-[#c12099] to-red-600 rounded-full blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <button
                onClick={handleClick}
                className="relative inline-flex items-center text-nowrap justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-red-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                {isLoading
                  ? "Loading..."
                  : channelExists
                  ? "Go to Channel"
                  : "Create a Channel"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* information part */}

      <div className="w-full md:w-auto md:mx-20">
        <div className="p-1  w-auto drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] rounded-b-md bg-white">
          <div className="flex space-x-4 border-b-2 border-gray-300 sticky z-50 mx-5 bg-white top-0">
            <div
              className={
                toggleState === 1
                  ? "border-b-4 border-red-500"
                  : "border-b-4 border-white"
              }
              onClick={() => toggleTab(1)}
            >
              <h1 className="mt-5  text-2xl font-bold cursor-pointer">
                Information
              </h1>
            </div>
            <div
              className={
                toggleState === 2
                  ? "border-b-4 border-red-500"
                  : "border-b-4 border-white"
              }
              onClick={() => toggleTab(2)}
            >
              <h1 className="mt-5  text-2xl font-bold cursor-pointer">
                Password
              </h1>
            </div>
          </div>
          <div className={toggleState === 1 ? "visible" : "hidden"}>
            {/*username*/}
            <p className="text-green-600 ml-5">{goodMessage}</p>
            <p className="text-red-600 ml-5">{errorMessage}</p>
            <form
              className=" mt-5 flex items-center"
              onSubmit={(e) => handleFormSubmit(e, "username")}
            >
              <div className="flex items-center">
                <p className="text-xl text-center font-semibold ml-5 text-nowrap">
                  {" "}
                  Username{" "}
                </p>
                <div className="m-5 transform h-5 bg-red-600 w-5 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
                  <button
                    className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-5 h-5 rounded-md  flex justify-center items-center"
                    type="submit"
                  >
                    {isEditing.username ? (
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
              </div>
              <div className="flex mx-5 flex-col md:flex-row">
                <label>
                  <span className="text-sm text-gray-500">Username</span>:
                  {isEditing.username ? (
                    <input
                      type="text"
                      className="ml-2 mr-5 px-3 py-2 border rounded-md focus:outline-none focus:border-red-600"
                      value={profileData.username}
                      onChange={(e) => {
                        handleInputChange(e, "username");
                      }}
                    />
                  ) : (
                    <b className=" ml-2 mr-5">{profileData.username} </b>
                  )}
                </label>
              </div>

              <hr className="mt-4 mb-8 mx-5" />
            </form>
            {/* name */}

            <form
              className=" mt-5 flex items-center"
              onSubmit={(e) => handleFormSubmit(e, "fullName")}
            >
              <div className="flex items-center">
                <p className="text-xl text-center font-semibold ml-5 text-nowrap">
                  {" "}
                  Full Name
                </p>
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
              </div>
              <div className="flex mx-5 flex-col md:flex-row">
                <div className=" my-5 flex items-center">
                  <label>
                    <span class="text-sm text-gray-500">First Name</span>:{""}
                    {isEditing.fullName ? (
                      <input
                        type="text"
                        className="ml-2 mr-5 px-3 py-2 border rounded-md focus:outline-none focus:border-red-600"
                        value={profileData.first_name}
                        onChange={(e) => {
                          handleInputChange(e, "first_name");
                        }}
                      />
                    ) : (
                      <b className=" ml-2 mr-5">{profileData.first_name} </b>
                    )}
                  </label>
                </div>
                <div className=" my-5 flex items-center">
                  <label>
                    <span class="text-sm text-gray-500">Last Name</span>:{""}
                    {isEditing.fullName ? (
                      <input
                        type="text"
                        className="ml-2 mr-5 px-3 py-2 border rounded-md focus:outline-none focus:border-red-600"
                        value={profileData.last_name}
                        onChange={(e) => {
                          handleInputChange(e, "last_name");
                        }}
                      />
                    ) : (
                      <b className=" ml-2 mr-5">{profileData.last_name} </b>
                    )}
                  </label>
                </div>
              </div>
              <hr className="mt-4 mb-8 mx-5" />
            </form>

            {/* mail */}

            <form
              className=" mt-5 flex flex-col md:flex-row justify-start"
              onSubmit={(e) => handleFormSubmit(e, "mail")}
            >
              <div className="flex items-center">
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
              </div>
              <div className=" mx-5 flex flex-col md:flex-row ">
                <div className=" my-5 flex items-center">
                  <label>
                    <span className="text-sm text-gray-500">Mail</span>:
                    {isEditing.mail ? (
                      <input
                        type="email"
                        className="ml-2 mr-5 px-3 py-2 border rounded-md focus:outline-none focus:border-red-600"
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
              </div>
              <hr className="mt-4 mb-8 mx-5" />
            </form>

            {/* birthdate */}

            <form
              className=" mt-5 flex flex-col md:flex-row justify-start"
              onSubmit={(e) => handleFormSubmit(e, "birthdate")}
            >
              <div className="flex items-center">
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
              </div>
              <div className=" mx-5 flex flex-col md:flex-row">
                <label>
                  <span className="text-sm text-gray-500">Birthdate</span>:
                  {isEditing.birthdate ? (
                    <input
                      type="date"
                      className="ml-2 mr-5 px-3 py-2 border rounded-md focus:outline-none focus:border-red-600"
                      value={profileData.birthdate}
                      onChange={(e) => {
                        handleInputChange(e, "birthdate");
                      }}
                    />
                  ) : (
                    <b className=" ml-2 mr-5">
                      {formatDateForDisplay(profileData.birthdate)}{" "}
                    </b>
                  )}
                </label>
              </div>
              <hr className="mt-4 mb-8 mx-5" />
            </form>

            {/* country */}

            <form
              className=" mt-5 flex flex-col md:flex-row justify-start"
              onSubmit={(e) => handleFormSubmit(e, "country")}
            >
              <div className="flex items-center">
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
              </div>
              <div className=" mx-5 flex flex-col md:flex-row">
                <div className=" mx-5 flex items-center">
                  <label>
                    <span className="text-sm text-gray-500">Country</span>:
                    {isEditing.country ? (
                      <input
                        type="text"
                        className="ml-2 mr-5 px-3 py-2 border rounded-md focus:outline-none focus:border-red-600"
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
              </div>
              <hr className="mt-4 mb-8 mx-5" />
            </form>

            {/* gender */}

            <form
              className=" mt-5 flex items-center"
              onSubmit={(e) => handleFormSubmit(e, "username")}
            >
              <div className="flex items-center">
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
              </div>
              <div className=" mx-5 flex-col flex-col md:flex-row">
                <div className=" my-5 flex items-center">
                  <label>
                    <span className="text-sm text-gray-500">Gender</span>:
                    {isEditing.gender ? (
                      <input
                        type="text"
                        className="ml-2 mr-5 px-3 py-2 border rounded-md focus:outline-none focus:border-red-600"
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
              </div>
              <hr className="mt-4 mb-8 mx-5 md: hidden" />
            </form>
          </div>

          {/* password content */}
          <div className={toggleState === 2 ? "visible" : "hidden"}>
            <div className="flex items-center">
              <p className="text-xl font-semibold ml-5 mb-0">Change Password</p>

              <div className="m-5 transform h-5 bg-red-600 w-5 rounded-md transition duration-500 hover:scale-125 hover:bg-red-600 flex justify-center items-center">
                <button
                  className="drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-10 h-8 rounded-md  flex justify-center items-center"
                  onClick={(e) => {
                    setGoodMessage("");
                    setErrorMessage("");
                    e.preventDefault();
                    handleEditToggle("password");
                  }}
                >
                  {/* Your icon */}
                  {isEditing.password ? (
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
                </button>
              </div>
            </div>
            <p className="text-red-600 ml-5">{errorMessage}</p>
            <p className="text-green-600 ml-5">{goodMessage}</p>
            <form
              className="mt-5 flex flex-col"
              onSubmit={(e) => {
                handlePasswordChange(e);
                handleEditToggle("password");
              }}
            >
              {/* Existing password input */}
              <div className="mx-5 flex flex-col mb-3">
                <label className="text-sm text-gray-500 mb-1">
                  Current Password
                </label>
                {isEditing.password ? (
                  <input
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:border-red-600"
                  />
                ) : (
                  <b className="ml-2">******</b>
                )}
              </div>

              {/* New password input */}
              <div className="mx-5 flex flex-col mb-3">
                <label className="text-sm text-gray-500 mb-1">
                  New Password
                </label>
                {isEditing.password ? (
                  <input
                    pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
                    title="Password must be at least 8 characters long and contain at least one number and one special character"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:border-red-600"
                  />
                ) : (
                  <b className="ml-2">******</b>
                )}
              </div>

              {/* Confirm new password input */}
              <div className="mx-5 flex flex-col mb-3">
                <label className="text-sm text-gray-500 mb-1">
                  Confirm New Password
                </label>
                {isEditing.password ? (
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:border-red-600"
                  />
                ) : (
                  <b className="ml-2">******</b>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className={
                  isEditing.password
                    ? "mx-5 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    : "hidden"
                }
              >
                Save Changes
              </button>
            </form>

            {/* Show/Hide password button */}

            <button
              className={
                isEditing.password
                  ? "drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] bg-white w-10 h-10 rounded-md mx-5 flex justify-center items-center"
                  : "hidden"
              }
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
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
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
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
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto md:mx-20 p-4  w-auto drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] rounded-b-md bg-white">
        <div className="relative inline-flex group">
          <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-gray-600 via-[#737373] to-gray-600 rounded-md blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <button
            onClick={handleLogout}
            className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-600 font-pj rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            title="ARE U SURE ABOUT THAT"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
