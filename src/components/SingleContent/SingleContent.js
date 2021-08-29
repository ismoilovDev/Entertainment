import { Badge } from '@material-ui/core';
import React from 'react';
import {img_300, unavailable} from '../../config/config';
import ModalContent from '../Modal/ModalContent';
import './SingleContent.css'


const SingleContent = ({id, media_type, date, title, poster, vote_average}) => {
    return (
        <ModalContent media_type={media_type} id={id}>
            <Badge badgeContent={vote_average} color={vote_average <= 6.1 ? "primary" : "secondary"} />
            <img className="poster" src={ poster ? `${img_300}/${poster}` : unavailable} alt={title}/>
            <b className="title">{title}</b>
            <div  className="subTitle">
                <span>{media_type !== "tv" ? "Movie" : "TV Series"}</span>
                <span>{date}</span>
            </div>
        </ModalContent>
    )
}

export default SingleContent
