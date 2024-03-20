import React, { useEffect, useState } from "react";

export default function You() {
  useEffect(() => {
    document.title = "You - CodingTube";
  }, []);
    return (
      <div>
        <h1 className="text-3xl font-bold underline">Here is the "you" page</h1>
      </div>
    );
  }
  