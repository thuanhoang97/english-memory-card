import React, { useState, useEffect } from 'react';
import Loading from './Loading';

type Props = {
  imagesURL: string[];
  onFinished: () => void;
};

const ImagesLoading: React.FC<Props> = ({ imagesURL, onFinished }) => {
  const [numImagesLoaded, setNumImagesLoaded] = useState<number>(0);
  const handleImageLoaded = () => setNumImagesLoaded((num) => num + 1);

  useEffect(() => {
    let timeoutId: number = -1;
    if (imagesURL.length && numImagesLoaded === imagesURL.length) {
      timeoutId = window.setTimeout(() => onFinished(), 500);
    }
    return () => clearTimeout(timeoutId);
  }, [numImagesLoaded, imagesURL, onFinished]);

  const loadingPercent = Math.floor((numImagesLoaded / imagesURL.length) * 100);

  return (
    <div className="images-loading">
      <Loading percent={loadingPercent} />
      <div className="fake-images">
        {imagesURL.map((url, idx) => (
          <img
            key={idx}
            src={url}
            onLoad={handleImageLoaded}
            alt=""
            style={{ display: 'none' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagesLoading;
