import classes from "./box.module.sass";

function Box({ width, height, position, opacity, children, groupid }) {
    const boxStyle = {
        width: width,
        height: height,
        position: position,
        opacity: opacity,
        groupid: groupid,
    };

    return <div style={boxStyle} className={classes.box}>{children}</div>;
}

export default Box;
