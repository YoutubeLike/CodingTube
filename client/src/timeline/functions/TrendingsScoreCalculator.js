// Page that calculates trendings score

import React, { useEffect, useState } from "react";
import axios from "axios";

import CheckSession from "../../session"
//const { isLoggedIn, userId } = CheckSession();

var userId = 1;


// Function witchs adds scores to videos for the advanced timeline
export function SetScoresTrendings(videosInfos) {

  for (var i = 0; i < videosInfos.length; i++) {
    videosInfos[i]["score"] = 0;

    // Adds score with views
    videosInfos[i]["score"] += videosInfos[i]["number_view"] / 100;

    // Adds score with likes
    videosInfos[i]["score"] += (videosInfos[i]["nb_like"] / 10) * 3;

    // Removes score with likes
    videosInfos[i]["score"] += videosInfos[i]["nb_dislike"] / 10;


  }

  return videosInfos;
}
