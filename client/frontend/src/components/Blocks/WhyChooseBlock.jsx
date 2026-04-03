import React from "react";
import "./Blocks.css";

const WhyChooseBlock = ({ data }) => {
  const { title, subtitle, items, settings } = data;

  return (
    <section
      className="why-choose-block"
      style={{
        backgroundColor: settings?.backgroundColor || "#ffffff",
        color: settings?.textColor || "#2a0f45",
      }}
    >
      <div className="container">
        {settings?.showTitle !== false && title && (
          <>
            <h1 className="text-center mt-5">{title}</h1>
            {subtitle && <p className="text-center subtitle">{subtitle}</p>}
          </>
        )}

        <div
          className={`row why-container ${
            settings?.layout === "grid" ? "grid-layout" : ""
          }`}
        >
          {items
            ?.filter((item) => item.isActive !== false)
            .map((item, index) => (
              <div
                className={`col-md-${12 / (settings?.columns || 3)} mb-4`}
                key={index}
              >
                {item.image && (
                  <img
                    src={
                      item.image.startsWith("data:")
                        ? item.image
                        : `data:image/jpeg;base64,${item.image}`
                    }
                    alt={item.title}
                    className="block-image"
                  />
                )}
                {item.icon && <i className={`${item.icon} block-icon`}></i>}
                <h2 className="mt-3">{item.title}</h2>
                <p>{item.description}</p>
                {item.buttonText && (
                  <a
                    href={item.link || "/contact"}
                    className="button-secondary"
                  >
                    {item.buttonText}
                  </a>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBlock;
