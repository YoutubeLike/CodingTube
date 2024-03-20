import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShortRequest() {
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/short/short-request"
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);
}
