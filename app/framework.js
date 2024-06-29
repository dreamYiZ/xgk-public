"use client";
import classes from "./layout.module.sass";
import ControlView from "./cpnt/controlView.js"

function Framework({ children }) {


    return <div className={classes['framework']}>
        <div className={classes['page-content']}>
            {children}
        </div>
        <div className={classes['control-panel']}>
            <ControlView />
        </div>
    </div>
}

export default Framework;