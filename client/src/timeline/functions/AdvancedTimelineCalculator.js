// Page that calculates advanced timeline scores

import React, { useEffect, useState } from "react";
import axios from "axios";

var connected = false;

// Function that checks whether 'you have subscribed to a channel using its ID
function isChannelSubscribed(id_channel, subscriptionList) {
  if (subscriptionList.includes(id_channel)) {
    return true;
  }
  return false;
}

// Function that retrieves all the most viewed categories
function GetMostViewedCategories() {
  var categoriesViewed = [];

  // Get the viewed categories list of the SQL Request by the URL
  var [viewedCategoriesInfos, setViewedCategorieInfos] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/timeline/viewed-categories-list-request`, { WithCredentials: true}
        );
        setViewedCategorieInfos(response.data);
        connected = true;
      } catch (error) {
        console.error("Error fetching viewed categories list:", error);
      }
    };
    fetch();
  }, []);

  // Count all the categories viewed
  var counter = {};
  for (var i = 0; i < viewedCategoriesInfos.length; i++) {
    if (!(viewedCategoriesInfos[i]["category"] in counter)) {
      counter[viewedCategoriesInfos[i]["category"]] = 1;
    } else {
      counter[viewedCategoriesInfos[i]["category"]] += 1;
    }
  }

  var arrayViewedCategories = [];
  for (const [key, value] of Object.entries(counter)) {
    arrayViewedCategories.push([key, value]);
  }
  arrayViewedCategories.sort((b, a) => a[1] - b[1]);
  return arrayViewedCategories;
}

// Function witchs adds scores to videos for the advanced timeline
export function SetScores(videosInfos) {
  // Get the subscribe list of the SQL Request by the URL
  var [subscribeListInfos, setSubscribeListInfos] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/timeline/subscribe-list-request"
          , { WithCredentials: true}
        );
        setSubscribeListInfos(response.data);
      } catch (error) {
        console.error("Error fetching subscribe list:", error);
      }
    };
    fetch();
  }, []);



  // Put all the channels_id subscribed in a list
  var subscribeList = [];
  for (var i = 0; i < subscribeListInfos.length; i++) {
    subscribeList.push(subscribeListInfos[i]["channel_id"]);
  }

  var mostViewedCategories = GetMostViewedCategories();

  console.log("id",subscribeListInfos[0]);
  
  for (var i = 0; i < videosInfos.length; i++) {
    videosInfos[i]["score"] = 0;

    // Adds score with views
    videosInfos[i]["score"] += videosInfos[i]["number_view"] / 100;

    // Adds score with likes
    videosInfos[i]["score"] += (videosInfos[i]["nb_like"] / 10) * 3;

    // Removes score with likes
    videosInfos[i]["score"] += videosInfos[i]["nb_dislike"] / 10;

    // If the video is on subscribed channel adds score
    if (
      isChannelSubscribed(videosInfos[i]["channel_id"], subscribeList) == true
    ) {
      videosInfos[i]["score"] += 10;
    }

    // If you're not loged-in
    if (connected === true) {

      if (mostViewedCategories.length >= 1) {
        // If the video is on the 1st most viewed category
        if (videosInfos[i]["category"] == mostViewedCategories[0][0]) {
          videosInfos[i]["score"] += 15;
        }
      }
      if (mostViewedCategories.length >= 2) {
        // If the video is on the 2nd most viewed category
        if (videosInfos[i]["category"] == mostViewedCategories[1][0]) {
          videosInfos[i]["score"] += 10;
        }
      }
      if (mostViewedCategories.length >= 3) {
        // If the video is on the 3rd most viewed category
        if (videosInfos[i]["category"] == mostViewedCategories[2][0]) {
          videosInfos[i]["score"] += 5;
        }
      }
  
      // If the video is yours
      if (subscribeListInfos[i] != undefined) {
        if (videosInfos[i]["channel_id"] === subscribeListInfos[i]["userId"]) {
          videosInfos[i]["score"] -= 100;
          console.log("-100 pour ",videosInfos[i]["title"])
        }
      }

    }

   

  }

  return videosInfos;
}
