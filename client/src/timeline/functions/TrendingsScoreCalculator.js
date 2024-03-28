// Page that calculates trendings score

import React, { useEffect, useState } from "react";
import axios from "axios";

// Function witchs adds scores to videos for the advanced timeline
export function SetScoresTrendings(videosInfos) {
  for (var i = 0; i < videosInfos.length; i++) {
    videosInfos[i]["score"] = 0;

    // Removes score if the video is old than 2 days
    const uploadDate = new Date(videosInfos[i]["upload_date_time"]);
    const currentDate = new Date();
    const elapsedMilliseconds = currentDate - uploadDate;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    if (elapsedDays > 2) {
      videosInfos[i]["score"] -= 1000;
    }

    // Adds score with views
    videosInfos[i]["score"] += videosInfos[i]["number_view"] / 100;

    // Adds score with likes
    videosInfos[i]["score"] += (videosInfos[i]["nb_like"] / 10) * 3;

    // Removes score with likes
    videosInfos[i]["score"] += videosInfos[i]["nb_dislike"] / 10;

    console.log("score:", videosInfos[i]["score"]);
  }

  return videosInfos;
}
