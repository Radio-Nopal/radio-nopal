import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { urlDeImagen } from '../../util/sanityClient';
import 'react-alice-carousel/lib/alice-carousel.css';
import './ImageGallery.scss';

const handleDragStart = (e) => e.preventDefault();

export default function ImageGallery({ imagenesCabecera }) {
  const slides = imagenesCabecera.map(
    ({
      imagen, enlace, title, fontColor, fontSize, mixcloudUrl,
    }) => {
      console.log({ mixcloudUrl });
      const imageUrl = imagen?.asset
        ? urlDeImagen(imagen).width(1600).quality(75).auto('format')
          .url()
        : '';
      const style = {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${imageUrl})`,
      };

      const imageDiv = (
        <div
          className="item rounded-3xl"
          alt=""
          style={style}
          onDragStart={handleDragStart}
          role="presentation"
        >
          {title && (
            <div
              style={{
                backgroundColor: 'black',
                opacity: 0.5,
                fontSize,
                position: 'absolute',
                color: fontColor.hex || 'white',
                width: '100%',
                height: '100%',
                display: 'grid',
                placeContent: 'center',
              }}
            >
              {title}
            </div>
          )}
          {mixcloudUrl && (
            <div
              style={{
                width: '50%',
                position: 'absolute',
                bottom: '0px',
              }}
            >
              <iframe
                width="80%"
                height="60"
                title="Mixcloud Player"
                src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&light=0&feed=${mixcloudUrl}`}
                frameBorder="0"
                allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share;"
              />
            </div>
          )}
        </div>
      );
      const safeenlace = enlace
        && !enlace.startsWith('http://')
        && !enlace.startsWith('https://')
        ? `https://${enlace}`
        : enlace;

      return enlace ? (
        <a href={safeenlace} target="_blank" rel="noopener noreferrer">
          {imageDiv}
        </a>
      ) : (
        imageDiv
      );
    },
  );
  const multipleSlides = slides.length > 1;
  return (
    <AliceCarousel
      disableButtonsControls={!multipleSlides}
      disableDotsControls={!multipleSlides}
      mouseTracking={multipleSlides}
      items={slides}
      autoPlay={multipleSlides}
      infinite={multipleSlides}
      animationDuration={1000}
      autoPlayInterval={4000}
      autoPlayStrategy="none"
    />
  );
}
