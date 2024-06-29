import useGlobalStore from '../store/useGlobal';
import classes from "./controlView.module.sass";



function ControlView(config) {
    const { mode, hideWhenDisplaying} = useGlobalStore();

    console.log('mode', mode);
    return <div>

{hideWhenDisplaying &&<div className={classes.vinfo}>
    {`MODE:${mode}`}
            </div>}
    </div>
}

export default ControlView;
