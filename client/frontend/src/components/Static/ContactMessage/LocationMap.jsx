import React from "react";

const LocationMap = () => {
  return (
    <>
      <div className="location-map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2357.933417159859!2d72.82980440000003!3d33.6895342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa365a25046e9%3A0x500a7b4c83e49018!2sAlfalah%20General%20Hospital!5e0!3m2!1sen!2s!4v1768461748638!5m2!1sen!2s"
          width={"100%"}
          height={400}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
};

export default LocationMap;
