import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  getActiveHeroSlides,
  getActiveCampaigns,
} from "../../redux/actions/donationActions";
import { resetDonation } from "../../redux/slice/donationSlice";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./DonationPage.css";

const DonationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { heroSlides, campaigns, loading } = useSelector(
    (state) => state.donation
  );
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    dispatch(getActiveHeroSlides());
    dispatch(getActiveCampaigns());
    dispatch(resetDonation());
  }, [dispatch]);

  const handleDonateClick = (campaign) => {
    setSelectedCampaign(campaign);
    // For now, we'll show alert. Later we'll integrate payment
    alert(
      `You're about to donate to: ${campaign.title}\n\nPayment integration coming soon!`
    );
  };

  return (
    <>
      {/* Hero Slider Section */}
      <div className="donation-hero-section">
        {loading ? (
          <div className="donation-loading">Loading...</div>
        ) : heroSlides?.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="donation-hero-swiper"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide._id}>
                <div className="donation-hero-slide">
                  <div className="donation-hero-overlay"></div>
                  <img
                    src={`data:image/jpeg;base64,${slide.image}`}
                    alt={slide.title}
                    className="donation-hero-bg"
                  />
                  <div className="donation-hero-content">
                    <h1>{slide.title}</h1>
                    <p>{slide.subtitle}</p>
                    <button
                      className="button-tertiary"
                      onClick={() => {
                        const campaign = campaigns.find(
                          (c) => c._id === slide.campaignId?._id
                        );
                        if (campaign) handleDonateClick(campaign);
                      }}
                    >
                      {slide.buttonText || "Donate Now"}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="donation-hero-placeholder">
            <div className="donation-hero-content">
              <h1>Support Needy Patients</h1>
              <p>Your donation can save lives</p>
            </div>
          </div>
        )}
      </div>

      {/* Campaign Cards Section */}
      <div className="donation-campaigns-section">
        <div className="donation-main-container">
          <div className="donation-section-header">
            <h2>Choose How You Want to Help</h2>
            <p>Your generous contribution makes a difference</p>
          </div>

          {loading ? (
            <div className="donation-loading">Loading campaigns...</div>
          ) : campaigns?.length === 0 ? (
            <div className="donation-empty-state">
              <p>No donation campaigns available at the moment.</p>
            </div>
          ) : (
            <div className="donation-campaigns-grid">
              {campaigns.map((campaign) => (
                <div className="donation-campaign-card" key={campaign._id}>
                  <div className="donation-card-image">
                    <img
                      src={`data:image/jpeg;base64,${campaign.image}`}
                      alt={campaign.title}
                    />
                  </div>
                  <div className="donation-card-content">
                    <h3>{campaign.title}</h3>
                    <p>{campaign.description}</p>
                    <button
                      className="button-secondary"
                      onClick={() => handleDonateClick(campaign)}
                    >
                      {campaign.buttonText || "Donate Now"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DonationPage;
