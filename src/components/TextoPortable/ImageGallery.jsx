import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { urlDeImagen } from '../../util/sanityClient';
import 'react-alice-carousel/lib/alice-carousel.css';
import './ImageGallery.scss';

const handleDragStart = (e) => e.preventDefault();

export default function ImageGallery({ imagenesCabecera }) {
  const slides = imagenesCabecera.map(({ imagen, enlace }) => {
    const imageUrl = imagen?.asset
      ? urlDeImagen(imagen)
        .width(1600)
        .quality(75)
        .auto('format')
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
      />
    );
    const safeEnlace = enlace && !enlace.startsWith('http://') && !enlace.startsWith('https://')
      ? `https://${enlace}`
      : enlace;

    return enlace ? (
      <a href={safeEnlace} target="_blank" rel="noopener noreferrer">
        {imageDiv}
      </a>
    ) : (
      imageDiv
    );
  });
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
