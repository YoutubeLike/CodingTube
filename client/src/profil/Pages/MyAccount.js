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
    currentPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  const [formClickedMap, setFormClickedMap] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [goodMessage, setGoodMessage] = useState("");

  const handleFormSubmit = async (e, formKey) => {
    e.preventDefault();
    handleEditToggle(formKey);

    try {
      // Check if the form corresponding to formKey has been clicked once
      if (formClickedMap[formKey]) {
        // If yes, call the user update function
        await updateUser(formKey);
      } else {
        // If no, update the state to indicate that the form has been clicked once
        setFormClickedMap((prevState) => ({
          ...prevState,
          [formKey]: true,
        }));
      }

      // Reset state after successful submission
      if (formClickedMap[formKey]) {
        setFormClickedMap((prevState) => ({
          ...prevState,
          [formKey]: false,
        }));
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error and display appropriate error message to the user
      setErrorMessage(error.response.data.error);
    }
  };

  // Function to update user data
  const updateUser = async () => {
    setGoodMessage("");
    setErrorMessage("");

    if(profileData.username && profileData.username.length > 40){
      setErrorMessage("You cannot enter more than 40 characters for username");
      return; // Stop function when the input is higher than 40
    }
    if(profileData.mail && profileData.mail.length > 40){
      setErrorMessage("You cannot enter more than 40 characters for email");
      return; // Stop function when the input is higher than 40
    }
    if(profileData.first_name && profileData.first_name.length > 40){
      setErrorMessage("You cannot enter more than 40 characters for first name");
      return; // Stop function when the input is higher than 40
    }
    if(profileData.last_name && profileData.last_name.length > 40){
      setErrorMessage("You cannot enter more than 40 characters for last name");
      return; // Stop function when the input is higher than 40
    }
  

    if (!profileData.username.trim()) {
      setErrorMessage(
        "Please enter at least one character for the new username."
      );
      return; // Stop function execution if field is empty
    }

    if (profileData.username.includes("@")) {
      setErrorMessage("you cannot enter @ in your username");
      return; // Stop function execution if @ is in username
    }

    if (!profileData.mail.trim()) {
      setErrorMessage("Please enter at least on character for the new mail");
      return; // Stop program
    }

    const response = await axios.post(
      "http://localhost:5000/api/profil/userUpdate",
      {
        username: profileData.username,
        username: profileData.username,
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        mail: profileData.mail,
        birthdate: profileData.birthdate,
        country: profileData.country,
        gender: profileData.gender,
      },
      { withCredentials: true }
    );
    setGoodMessage("Information updated");
    console.log(response.data);
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/profil/check-session",
          {
            withCredentials: true,
          }
        );

        const loggedIn = response.data.loggedIn;

        // Update the profileData state with isLoggedIn
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          isLoggedIn: loggedIn,
        }));

        if (!loggedIn) {
          window.location.href = "/login";
        }
      } catch (error) {
        console.log("Erreur lors de la vérification du login:", error);
      }
    };
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profil/userData/`,
          { withCredentials: true }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Data retrieval error", error);
      }
    };

    fetchData();
    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

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

    setErrorMessage("");
    setGoodMessage("");

    // Check if password field is empty
    if (!newPassword.trim()) {
      setErrorMessage(
        "Please enter at least one character for the new password."
      );
      return; // Stop function execution if field is empty
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/profil/updatePswrd",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      );

      console.log(response.data); // Handle response as necessary

      // If request is successful, display success message
      setGoodMessage("Password updated successfully");
    } catch (error) {
      // If an error occurs, display appropriate error message
      setErrorMessage(error.response.data.error);

      console.error("Error updating password:", error);
    }

    // After handling the request, you can close the password editor
    handleEditToggle("password");
  };

  // State and functions for managing password fields
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [channelExists, setChannelExists] = useState(false);
  const [identifier, setIdentifier] = useState(null); // State to hold identifier_channel
  const [follower, setFollower] = useState(null);
  const [pseudo, sePseudo] = useState(null);
  // Assume isChannelAvailable is a state indicating whether the session has a channel
  useEffect(() => {
    const fetchChannelInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profil/getInfoChannel/`,
          { withCredentials: true }
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
              @{profileData.username} ·{follower} Followers·
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
          <div className="align-content: center">
            {isEditing.errorUpdate && (
              <p className="!mt-2 text-red-600">{isEditing.errorUpdate}</p>
            )}
            {isEditing.goodUpdate && (
              <p className="!mt-2 text-green-600">{isEditing.goodUpdate}</p>
            )}
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
                  <label for="country">
                    <span className="text-sm text-gray-500">
                      Choose a country :
                    </span>
                    {isEditing.country ? (
                      <select
                        name="pays"
                        value={profileData.country}
                        onChange={(e) => {
                          handleInputChange(e, "country");
                        }}
                      >
                        <option value="France" selected="selected">
                          France{" "}
                        </option>
                        <option value="Afghanistan">Afghanistan </option>
                        <option value="Afrique_Centrale">
                          Afrique_Centrale{" "}
                        </option>
                        <option value="Afrique_du_sud">Afrique_du_Sud </option>
                        <option value="Albanie">Albanie </option>
                        <option value="Algerie">Algerie </option>
                        <option value="Allemagne">Allemagne </option>
                        <option value="Andorre">Andorre </option>
                        <option value="Angola">Angola </option>
                        <option value="Anguilla">Anguilla </option>
                        <option value="Arabie_Saoudite">
                          Arabie_Saoudite{" "}
                        </option>
                        <option value="Argentine">Argentine </option>
                        <option value="Armenie">Armenie </option>
                        <option value="Australie">Australie </option>
                        <option value="Autriche">Autriche </option>
                        <option value="Azerbaidjan">Azerbaidjan </option>

                        <option value="Bahamas">Bahamas </option>
                        <option value="Bangladesh">Bangladesh </option>
                        <option value="Barbade">Barbade </option>
                        <option value="Bahrein">Bahrein </option>
                        <option value="Belgique">Belgique </option>
                        <option value="Belize">Belize </option>
                        <option value="Benin">Benin </option>
                        <option value="Bermudes">Bermudes </option>
                        <option value="Bielorussie">Bielorussie </option>
                        <option value="Bolivie">Bolivie </option>
                        <option value="Botswana">Botswana </option>
                        <option value="Bhoutan">Bhoutan </option>
                        <option value="Boznie_Herzegovine">
                          Boznie_Herzegovine{" "}
                        </option>
                        <option value="Bresil">Bresil </option>
                        <option value="Brunei">Brunei </option>
                        <option value="Bulgarie">Bulgarie </option>
                        <option value="Burkina_Faso">Burkina_Faso </option>
                        <option value="Burundi">Burundi </option>
                        <option value="Caiman">Caiman </option>
                        <option value="Cambodge">Cambodge </option>
                        <option value="Cameroun">Cameroun </option>
                        <option value="Canada">Canada </option>
                        <option value="Canaries">Canaries </option>
                        <option value="Cap_vert">Cap_Vert </option>
                        <option value="Chili">Chili </option>
                        <option value="Chine">Chine </option>
                        <option value="Chypre">Chypre </option>
                        <option value="Colombie">Colombie </option>
                        <option value="Comores">Colombie </option>
                        <option value="Congo">Congo </option>
                        <option value="Congo_democratique">
                          Congo_democratique{" "}
                        </option>
                        <option value="Cook">Cook </option>
                        <option value="Coree_du_Nord">Coree_du_Nord </option>
                        <option value="Coree_du_Sud">Coree_du_Sud </option>
                        <option value="Costa_Rica">Costa_Rica </option>
                        <option value="Cote_d_Ivoire">Côte_d_Ivoire </option>
                        <option value="Croatie">Croatie </option>
                        <option value="Cuba">Cuba </option>

                        <option value="Danemark">Danemark </option>
                        <option value="Djibouti">Djibouti </option>
                        <option value="Dominique">Dominique </option>

                        <option value="Egypte">Egypte </option>
                        <option value="Emirats_Arabes_Unis">
                          Emirats_Arabes_Unis{" "}
                        </option>
                        <option value="Equateur">Equateur </option>
                        <option value="Erythree">Erythree </option>
                        <option value="Espagne">Espagne </option>
                        <option value="Estonie">Estonie </option>
                        <option value="Etats_Unis">Etats_Unis </option>
                        <option value="Ethiopie">Ethiopie </option>

                        <option value="Falkland">Falkland </option>
                        <option value="Feroe">Feroe </option>
                        <option value="Fidji">Fidji </option>
                        <option value="Finlande">Finlande </option>
                        <option value="France">France </option>

                        <option value="Gabon">Gabon </option>
                        <option value="Gambie">Gambie </option>
                        <option value="Georgie">Georgie </option>
                        <option value="Ghana">Ghana </option>
                        <option value="Gibraltar">Gibraltar </option>
                        <option value="Grece">Grece </option>
                        <option value="Grenade">Grenade </option>
                        <option value="Groenland">Groenland </option>
                        <option value="Guadeloupe">Guadeloupe </option>
                        <option value="Guam">Guam </option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guernesey">Guernesey </option>
                        <option value="Guinee">Guinee </option>
                        <option value="Guinee_Bissau">Guinee_Bissau </option>
                        <option value="Guinee equatoriale">
                          Guinee_Equatoriale{" "}
                        </option>
                        <option value="Guyana">Guyana </option>
                        <option value="Guyane_Francaise ">
                          Guyane_Francaise{" "}
                        </option>

                        <option value="Haiti">Haiti </option>
                        <option value="Hawaii">Hawaii </option>
                        <option value="Honduras">Honduras </option>
                        <option value="Hong_Kong">Hong_Kong </option>
                        <option value="Hongrie">Hongrie </option>

                        <option value="Inde">Inde </option>
                        <option value="Indonesie">Indonesie </option>
                        <option value="Iran">Iran </option>
                        <option value="Iraq">Iraq </option>
                        <option value="Irlande">Irlande </option>
                        <option value="Islande">Islande </option>
                        <option value="Israel">Israel </option>
                        <option value="Italie">italie </option>

                        <option value="Jamaique">Jamaique </option>
                        <option value="Jan Mayen">Jan Mayen </option>
                        <option value="Japon">Japon </option>
                        <option value="Jersey">Jersey </option>
                        <option value="Jordanie">Jordanie </option>

                        <option value="Kazakhstan">Kazakhstan </option>
                        <option value="Kenya">Kenya </option>
                        <option value="Kirghizstan">Kirghizistan </option>
                        <option value="Kiribati">Kiribati </option>
                        <option value="Koweit">Koweit </option>

                        <option value="Laos">Laos </option>
                        <option value="Lesotho">Lesotho </option>
                        <option value="Lettonie">Lettonie </option>
                        <option value="Liban">Liban </option>
                        <option value="Liberia">Liberia </option>
                        <option value="Liechtenstein">Liechtenstein </option>
                        <option value="Lituanie">Lituanie </option>
                        <option value="Luxembourg">Luxembourg </option>
                        <option value="Lybie">Lybie </option>

                        <option value="Macao">Macao </option>
                        <option value="Macedoine">Macedoine </option>
                        <option value="Madagascar">Madagascar </option>
                        <option value="Madère">Madère </option>
                        <option value="Malaisie">Malaisie </option>
                        <option value="Malawi">Malawi </option>
                        <option value="Maldives">Maldives </option>
                        <option value="Mali">Mali </option>
                        <option value="Malte">Malte </option>
                        <option value="Man">Man </option>
                        <option value="Mariannes du Nord">
                          Mariannes du Nord{" "}
                        </option>
                        <option value="Maroc">Maroc </option>
                        <option value="Marshall">Marshall </option>
                        <option value="Martinique">Martinique </option>
                        <option value="Maurice">Maurice </option>
                        <option value="Mauritanie">Mauritanie </option>
                        <option value="Mayotte">Mayotte </option>
                        <option value="Mexique">Mexique </option>
                        <option value="Micronesie">Micronesie </option>
                        <option value="Midway">Midway </option>
                        <option value="Moldavie">Moldavie </option>
                        <option value="Monaco">Monaco </option>
                        <option value="Mongolie">Mongolie </option>
                        <option value="Montserrat">Montserrat </option>
                        <option value="Mozambique">Mozambique </option>

                        <option value="Namibie">Namibie </option>
                        <option value="Nauru">Nauru </option>
                        <option value="Nepal">Nepal </option>
                        <option value="Nicaragua">Nicaragua </option>
                        <option value="Niger">Niger </option>
                        <option value="Nigeria">Nigeria </option>
                        <option value="Niue">Niue </option>
                        <option value="Norfolk">Norfolk </option>
                        <option value="Norvege">Norvege </option>
                        <option value="Nouvelle_Caledonie">
                          Nouvelle_Caledonie{" "}
                        </option>
                        <option value="Nouvelle_Zelande">
                          Nouvelle_Zelande{" "}
                        </option>

                        <option value="Oman">Oman </option>
                        <option value="Ouganda">Ouganda </option>
                        <option value="Ouzbekistan">Ouzbekistan </option>

                        <option value="Pakistan">Pakistan </option>
                        <option value="Palau">Palau </option>
                        <option value="Palestine">Palestine </option>
                        <option value="Panama">Panama </option>
                        <option value="Papouasie_Nouvelle_Guinee">
                          Papouasie_Nouvelle_Guinee{" "}
                        </option>
                        <option value="Paraguay">Paraguay </option>
                        <option value="Pays_Bas">Pays_Bas </option>
                        <option value="Perou">Perou </option>
                        <option value="Philippines">Philippines </option>
                        <option value="Pologne">Pologne </option>
                        <option value="Polynesie">Polynesie </option>
                        <option value="Porto_Rico">Porto_Rico </option>
                        <option value="Portugal">Portugal </option>

                        <option value="Qatar">Qatar </option>

                        <option value="Republique_Dominicaine">
                          Republique_Dominicaine{" "}
                        </option>
                        <option value="Republique_Tcheque">
                          Republique_Tcheque{" "}
                        </option>
                        <option value="Reunion">Reunion </option>
                        <option value="Roumanie">Roumanie </option>
                        <option value="Royaume_Uni">Royaume_Uni </option>
                        <option value="Russie">Russie </option>
                        <option value="Rwanda">Rwanda </option>

                        <option value="Sahara Occidental">
                          Sahara Occidental{" "}
                        </option>
                        <option value="Sainte_Lucie">Sainte_Lucie </option>
                        <option value="Saint_Marin">Saint_Marin </option>
                        <option value="Salomon">Salomon </option>
                        <option value="Salvador">Salvador </option>
                        <option value="Samoa_Occidentales">
                          Samoa_Occidentales
                        </option>
                        <option value="Samoa_Americaine">
                          Samoa_Americaine{" "}
                        </option>
                        <option value="Sao_Tome_et_Principe">
                          Sao_Tome_et_Principe{" "}
                        </option>
                        <option value="Senegal">Senegal </option>
                        <option value="Seychelles">Seychelles </option>
                        <option value="Sierra Leone">Sierra Leone </option>
                        <option value="Singapour">Singapour </option>
                        <option value="Slovaquie">Slovaquie </option>
                        <option value="Slovenie">Slovenie</option>
                        <option value="Somalie">Somalie </option>
                        <option value="Soudan">Soudan </option>
                        <option value="Sri_Lanka">Sri_Lanka </option>
                        <option value="Suede">Suede </option>
                        <option value="Suisse">Suisse </option>
                        <option value="Surinam">Surinam </option>
                        <option value="Swaziland">Swaziland </option>
                        <option value="Syrie">Syrie </option>

                        <option value="Tadjikistan">Tadjikistan </option>
                        <option value="Taiwan">Taiwan </option>
                        <option value="Tonga">Tonga </option>
                        <option value="Tanzanie">Tanzanie </option>
                        <option value="Tchad">Tchad </option>
                        <option value="Thailande">Thailande </option>
                        <option value="Tibet">Tibet </option>
                        <option value="Timor_Oriental">Timor_Oriental </option>
                        <option value="Togo">Togo </option>
                        <option value="Trinite_et_Tobago">
                          Trinite_et_Tobago{" "}
                        </option>
                        <option value="Tristan da cunha">
                          Tristan de cuncha{" "}
                        </option>
                        <option value="Tunisie">Tunisie </option>
                        <option value="Turkmenistan">Turmenistan </option>
                        <option value="Turquie">Turquie </option>

                        <option value="Ukraine">Ukraine </option>
                        <option value="Uruguay">Uruguay </option>

                        <option value="Vanuatu">Vanuatu </option>
                        <option value="Vatican">Vatican </option>
                        <option value="Venezuela">Venezuela </option>
                        <option value="Vierges_Americaines">
                          Vierges_Americaines{" "}
                        </option>
                        <option value="Vierges_Britanniques">
                          Vierges_Britanniques{" "}
                        </option>
                        <option value="Vietnam">Vietnam </option>

                        <option value="Wake">Wake </option>
                        <option value="Wallis et Futuma">
                          Wallis et Futuma{" "}
                        </option>

                        <option value="Yemen">Yemen </option>
                        <option value="Yougoslavie">Yougoslavie </option>

                        <option value="Zambie">Zambie </option>
                        <option value="Zimbabwe">Zimbabwe </option>
                      </select>
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
              onSubmit={(e) => handleFormSubmit(e, "gender")}
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
                      <select name="gender"
                        value={profileData.gender}
                        onChange={(e) => {
                          handleInputChange(e, "gender");
                        }}
                      >
                        <option>Man</option>
                        <option>Woman</option>
                        <option>Others</option>
                      </select>
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
          <button
            onClick={async () => {
              console.log("looguto");
              try {
                window.location.href = "/login";
                const response = await axios.get(
                  "http://localhost:5000/api/profil/logout",
                  { withCredentials: true }
                );
                console.log("Logout successful");
              } catch (error) {
                console.error("An error occurred during logout: ", error);
              }
            }}
            className=""
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
