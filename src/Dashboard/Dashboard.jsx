import "./Dashboard.css";
import React, { useState } from "react";
import NavBar from "../Components/Shared/NavBar/NavBar";
import Carousel from "../Components/Shared/Carousel/Carousel";

const Dashboard = ({ user }) => {
  if (!user) {
    user = localStorage.getItem("user");
    console.log("in dashboard" + user);
    // TODO(team): add API call to fetch the permissions and routes for the current user
  }

  const imageUrls = [
    "https://thecityfix.com/wp-content/uploads/2023/05/feature.jpeg",
    "https://www.brinknews.com/wp-content/uploads/2019/02/editedGettyImages-634083922.jpg",
    "https://i0.wp.com/www.xamnation.com/wp-content/uploads/2018/11/urban-infra.jpg?fit=3072%2C2048&ssl=1",
    "https://mldlprodstorage.blob.core.windows.net/live/2019/01/how-building-indias.jpg",
  ];

  return (
    <div className="container">
      <Carousel imageUrls={imageUrls} />
    </div>
  );
};

export default Dashboard;
