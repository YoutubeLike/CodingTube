//  PAGE DISPLAYING THE TRENDINGS TIMELINE

import React, { useEffect, useState } from "react";

export default function Trends() {

  /* Page title (displayed on tab) */
  useEffect(() => {
    document.title = "Trends - CodingTube";
  }, []);
  return (
    <>
      {/* TITLES */}
      <div>
        <h1 className="text-3xl font-bold underline">
          Here is the trending page
        </h1>
      </div>
    </>
  );
}
