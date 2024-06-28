import React, { useState } from "react";
import { MDBContainer, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import "./BestPractices.css";

const BestPractices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // You can handle search logic here
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleLikeClick = () => {
    document.querySelectorAll(".fa-gratipay").forEach((icon) => {
      icon.style.color = "#E74C3C";
    });
  };

  // Constant data for cards

  const cardData = [
    {
      heading: "Sustainable Transport Initiatives in Indian Cities",
      abstract:
        "Indian cities are implementing sustainable transport initiatives to reduce carbon emissions and mitigate climate change.  These efforts aim to promote eco-friendly modes of transportation, reduce traffic congestion, and improve air quality.",
      keywords: ["Sustainable Transport", "Indian Cities", "Climate Change"],
      documentLink: "http://pdf.wri.org/sustainable_urban_transport_india.pdf",
      imageLink:
        "https://static.wixstatic.com/media/94a484_87bb49b847ad4e2a86e43e88919ff6be~mv2.jpg/v1/fill/w_701,h_373,al_c,q_80,enc_auto/94a484_87bb49b847ad4e2a86e43e88919ff6be~mv2.jpg",
    },
    {
      heading: "Renewable Energy Integration in Urban Infrastructure",
      abstract:
        "Integrating renewable energy sources into urban infrastructure is a key strategy for reducing greenhouse gas emissions and combating climate change. Indian cities are increasingly adopting solar energy systems  thereby   promoting sustainability.",
      keywords: ["Renewable Energy", "Urban Infrastructure", "Solar Power"],
      documentLink: "https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2016/IRENA_Renewable_Energy_in_Cities_2016.pdf?rev=57732a726d8047fe87da57b4511697d7",
      imageLink:
        "https://www.speccorporation.com/wp-content/uploads/2020/12/AdobeStock_172956774-scaled.jpeg",
    },
    {
      heading: "Community-Based Climate Resilience Initiatives",
      abstract:
        "Community-based climate resilience initiatives play a vital role in addressing the impacts of climate change in vulnerable areas. In India, these initiatives involve community engagement, capacity building, and the adoption of nature-based solutions.",
      keywords: ["Climate Change", "Resilience", "Community Engagement"],
      documentLink: "https://www.iwmi.cgiar.org/Publications/Other/PDF/locally_led_climate_action_for_sustainable_community_resilience.pdf",
      imageLink:
        "https://stateofgreen.com/en/wp-content/uploads/2020/10/4_IMG_8524_edit_2-scaled.jpg",
    },
  ];

  const viewDocument = (documentLink) => {
    window.open(documentLink, "_blank");
  };

  return (
    <div className="bestPractices">
      <MDBContainer>
        <section className="m-4">
          <h2 className="mb-4">Best Practices</h2>
          <p>
            Welcome to our Best Practices hub, where academia meets excellence.
            Here, we invite you to explore and contribute to the ever-evolving
            landscape of scholarly rigor. Together, let's uphold the highest
            standards of integrity and innovation as we navigate the realms of
            research and discovery.
          </p>
          <hr />
          <p>
            Step into this vibrant community where expertise converges with
            aspiration. Join us in fostering collaboration, driving meaningful
            progress, and shaping the future of academia. Welcome to a space
            dedicated to advancing knowledge, empowering researchers, and
            igniting the spirit of inquiry.
          </p>
        </section>
        <div className="container_academic">
          <div className="controls m-4 ">
            
              <form onSubmit={handleSearchSubmit} className="search_form">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search here"
                  className="search_input"
                />
                <MDBBtn>
                  <MDBIcon fas icon="search" />
                  Search
                </MDBBtn>
              </form>
              <div className="sort_by">
                <label htmlFor="filter" className="filter_label">
                  Sort By:
                </label>
                <select
                  id="filter"
                  className="filter-dropdown"
                  value={selectedFilter}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="Year">Year</option>
                  <option value="Author Name">Author Name</option>
                  <option value="Keywords">Keywords</option>
                  <option value="specialization">Sector</option>
                  <option value="cities">Cities</option>
                </select>
              </div>
           
          </div>
        </div>
        {/* Cards Container */}
        <div className="cardsContainerBestPractices">
          {cardData.map((card, index) => (
            <div key={index} className="cardcontainerBestPractices">
              <div className="photoBestPractices">
                {/* Image */}
                <img src={card.imageLink} alt={card.heading} />
              </div>
              <div className="contentBestPractices">
                {/* Heading */}

                <p className="txt4">{card.heading}</p>
                {/* Abstract */}
                <label htmlFor="abstract">Abstract</label>
                <p className="txt5">{card.abstract}</p>
                {/* Keywords */}
                <label htmlFor="keywords">Keywords</label>
                <p className="txt2">{card.keywords.join(", ")}</p>
                {/* Read More Button */}
                <a
                  className="waves-effect waves-light btn"
                  onClick={() => viewDocument(card.documentLink)}
                >
                  View Document
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* End of Cards Container */}
      </MDBContainer>
    </div>
  );
};

export default BestPractices;
