import React from 'react';
import s from './Popup.module.css'

export const Popup = () => {
    return (
        <div className={s.modal}>
            <div className={s.text}>
                <div>
                    <button>Избранное</button>
                    <button>Убрать из избранного</button>
                </div>
                <div>
                    <button>Выполнено</button>
                    <button>Вернуть в работу</button>
                </div>
                <div>
                    <button>Редактировать</button>
                    <button>Удалить</button>
                </div>
            </div>
        </div>
    );
};
