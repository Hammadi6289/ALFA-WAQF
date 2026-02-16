import React, { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import { photos } from "./GalleryData";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/rows.css";

const GalleryPage = () => {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <h1 className="text-center m-5 ">Photo Gallery</h1>
      <RowsPhotoAlbum
        onClick={({ index: current }) => setIndex(current)}
        photos={photos}
        targetRowHeight={150}
      />
      <div className="lightbox mt-4">
        <Lightbox
          index={index}
          slides={photos}
          open={index >= 0}
          close={() => setIndex(-1)}
        />
      </div>
    </>
  );
};

export default GalleryPage;
