import React from "react";
import css from "./AbandonedSales.module.scss";

function AbandonedSales() {
    return (
        <div className={css.item}>
            <div className={css.item_header}>
                <p className={css.item_title}>Abandoned Sales</p>
                <a className={css.item_close} href="#">Close</a>
            </div>
            <div className={css.item_body}>
                <div className={css.graphic}>
                    <div className={css.graphic_element}>
                        <p className={css.element_title}>
                            Browsed without purchase
                        </p>
                        <div className={css.element_block__wrapper}>
                            <div className={css.element_block} style={{width: 10}}></div>
                            <p className={css.element_value}>5%</p>
                        </div>
                    </div>
                    <div className={css.graphic_element}>
                        <p className={css.element_title}>
                            Confirmation not given
                        </p>
                        <div className={css.element_block__wrapper}>
                            <div className={css.element_block} style={{width: 27}}></div>
                            <p className={css.element_value}>17%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AbandonedSales;
