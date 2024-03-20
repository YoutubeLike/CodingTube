import React, { useEffect, useState } from "react";

export default function Trends() {
  useEffect(() => {
    document.title = "Trends - CodingTube";
  }, []);
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">
          Here is the trending page
        </h1>
      </div>
    </>
  );
}
