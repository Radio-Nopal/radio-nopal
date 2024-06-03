import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { urlDeImagen } from '../../util/sanityClient';
import 'react-alice-carousel/lib/alice-carousel.css';
import './ImageGallery.scss';

const handleDragStart = (e) => e.preventDefault();

export default function ImageGallery({ value }) {
  const { images } = value;
  console.log({ images });
  const slides = images.map((image) => {
    console.log({ image });
    return (
      <div
        className="item rounded-3xl"
        alt=""
        style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: image.asset ? `url(${urlDeImagen(image)?.url()})` : '' }}
        onDragStart={handleDragStart}
        role="presentation"
      />
    );
  });

  return (
    <AliceCarousel
      disableButtonsControls
      mouseTracking
      items={slides}
      autoPlay
      infinite
      animationDuration="1000"
      autoPlayInterval="4000"
      autoPlayStrategy="none"
    />
  );
}

/*

import React from 'react';
import Slider from 'react-slick';
import { urlDeImagen } from '../../util/sanityClient';

export default function ImageGallery({ value }) {
  console.log({ value });
  const { images } = value;
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // eslint-disable-next-line react/no-unstable-nested-components
    appendDots: (dots) => <ul>{dots}</ul>,
  };

  const slides = images.map((image) => (
    <img
      key={image._key}
      src={image.asset ? urlDeImagen(image)?.url() : ''}
      width={800}
      height={400}
      alt={image.alt}
      className="h-[400px] object-cover"
    />
  ));
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Slider {...settings}>
      {slides}
    </Slider>
  );
}
/*

/*

import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { urlDeImagen } from '../../util/sanityClient';

export default function ImageGallery({ value }) {
  console.log({ value });
  const [index, setIndex] = useState(0);

  const { images } = value;
  const image = images[index];

  function handlePrevious(e) {
    e.stopPropagation();
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  function handleNext(e) {
    e.stopPropagation();
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <div className="my-5">
      <img
        key={image._key}
        src={image.asset ? urlDeImagen(image)?.url() : ''}
        width={800}
        height={400}
        alt={image.alt}
        className="h-[400px] object-cover"
      />
      <div className="w-full mt-4 flex items-center justify-between gap-3">
        <div className="text-center">
          {image.alt}
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={(e) => handlePrevious(e)}
            className="p-3 bg-zinc-900 transition border border-zinc-900 hover:border-zinc-800"
          >
            <FiChevronLeft />
          </button>
          <button
            type="button"
            onClick={(e) => handleNext(e)}
            className="p-3 bg-zinc-900 transition border border-zinc-900 hover:border-zinc-800"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

*/
