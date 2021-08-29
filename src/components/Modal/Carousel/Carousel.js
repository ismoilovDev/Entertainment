import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../../config/config';
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();



const Carousel = ({media_type, id}) => {

  const [cre, setCre] = useState();

  const items = cre?.map((e) => (
    <div className="carouselItem">
      <img
        className="carouselItem_img"
        src={e.profile_path ? `${img_300}/${e.profile_path}` : noPicture}
        alt={e?.name}
        onDragStart={handleDragStart}
      />
      <b className="carouselItem_text">{e?.name}</b>

    </div>
  ))

  const resposive = {
    0: {
      items: 3
    },
    512: {
      items: 5
    },
    1024: {
      items: 7
    },
  }

  const fetchItems = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

    setCre(data.cast)
  }

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line 
  }, [])

  return (
    <AliceCarousel 
      items={items}
      responsive={resposive}
      mouseTracking 
      autoPlay
      infinite
      disableDotsControls
      disableButtonsControls
    />
  );
}

export default Carousel;