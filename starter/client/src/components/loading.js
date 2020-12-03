import React from "react";

export default function LoadingPage({ string }) {
  return (
    <div className="swipe-con ">
      <h3 className="swipe-info__head" style={{ margin: "0 auto" }}>
        {string}
      </h3>
    </div>
  );
}
