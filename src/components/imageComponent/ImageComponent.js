import React from 'react';
import paper from '../../image/paper.png'
import pencils from '../../image/pencils.png'
import mug from '../../image/mug.png'
import stechBook from '../../image/stechBook.png'
import scissors from '../../image/scissors.png'
import orange from '../../image/orange.png'
import s from './ImageComponent.module.css'
export const ImageComponent = () => {
    return (
        <>
            <img className={s.paper} src={paper} alt=""/>
            <img src={pencils} className={s.pencils} alt=""/>
            <img src={mug} className={s.mug} alt=""/>
            <img src={stechBook} className={s.stechBook} alt=""/>
            <img src={scissors} className={s.scissors} alt=""/>
            <img src={orange} className={s.orange} alt=""/>
        </>
    );
};
