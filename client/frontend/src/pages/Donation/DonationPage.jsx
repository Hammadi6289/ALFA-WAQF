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
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

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

  const handleSelectAmount = (campaign, amount) => {
    setSelectedCampaign(campaign);
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  // Handle custom amount change
  const handleCustomAmountChange = (campaign, value) => {
    const numericAmount = Number(value);
    setCustomAmount(value);
    if (numericAmount && numericAmount > 0) {
      setSelectedCampaign(campaign);
      setSelectedAmount(numericAmount);
    } else if (!value) {
      setSelectedCampaign(null);
      setSelectedAmount(null);
    }
  };

  // Proceed to checkout
  const handleProceedToCheckout = () => {
    if (!selectedCampaign || !selectedAmount) {
      alert("Please select a donation amount first");
      return;
    }

    const donationData = {
      campaignId: selectedCampaign._id,
      campaignTitle: selectedCampaign.title,
      amount: selectedAmount,
    };
    localStorage.setItem("pendingDonation", JSON.stringify(donationData));
    navigate("/donation/checkout");
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
                      className="button-secondary"
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
              <h1>Support Vital Patient Care</h1>
              <p>
                Your contribution provides life-saving care to those who need it
                most.
              </p>
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

                    {/* Price Options */}
                    <div className="donation-price-options">
                      <div className="price-buttons-row">
                        {campaign.priceOptions?.map((price, idx) => (
                          <button
                            key={idx}
                            className={`price-btn ${
                              selectedCampaign?._id === campaign._id &&
                              selectedAmount === price
                                ? "active"
                                : ""
                            }`}
                            onClick={() => handleSelectAmount(campaign, price)}
                          >
                            PKR {price.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      <div className="custom-amount-wrapper">
                        <input
                          type="number"
                          className="custom-amount-input"
                          placeholder="Other amount (PKR)"
                          min="50"
                          step="50"
                          value={
                            selectedCampaign?._id === campaign._id
                              ? customAmount
                              : ""
                          }
                          onChange={(e) =>
                            handleCustomAmountChange(campaign, e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {/* Donate Now Button - Fixed at bottom or below cards */}
                    <div className="donation-proceed-section">
                      <button
                        className="donation-proceed-btn button-secondary"
                        onClick={handleProceedToCheckout}
                        disabled={!selectedCampaign || !selectedAmount}
                      >
                        Donate Now - PKR{" "}
                        {selectedAmount?.toLocaleString() || "0"}
                      </button>
                      {!selectedCampaign || !selectedAmount ? (
                        <p className="donation-proceed-hint">
                          Please select a donation amount above
                        </p>
                      ) : (
                        <p className="donation-proceed-campaign">
                          Supporting: <strong>{selectedCampaign?.title}</strong>
                        </p>
                      )}
                    </div>
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
