import React from "react";
import css from "./AbandonedSales.module.scss";
import {ResizableBox} from "react-resizable";

function AbandonedSales() {
    return (
        <React.Fragment>

            <ResizableBox className={css.item} width={350} height={155}
                          minConstraints={[350, 155]} maxConstraints={[1300, 700]}>
                <div>
                    <div className={css.item_header}>
                        <p className={css.item_title}>Abandoned Sales</p>
                        <button className={css.item_close}>Close</button>
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
            </ResizableBox>


            <ResizableBox className={css.item} width={350} height={155}
                    minConstraints={[350, 155]} maxConstraints={[900, 300]}>
                <div>
                    <div className={css.item_header}>
                        <p className={css.item_title}>Closed Sales</p>
                        <button className={css.item_close}>Close</button>
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
            </ResizableBox>

        </React.Fragment>
    );
}

export default AbandonedSales;
