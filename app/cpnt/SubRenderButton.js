import * as React from 'react';
import useBeFactory from "../hooks/useBeFactory";

export default function ({ box, sub }) {

  const { onClickHandler } = useBeFactory({ sub });


  const buttonStyle = {
    backgroundImage: `url(${sub.backgroundImage})`,
    backgroundPosition: `center center`,
    backgroundSize: `cover`,

    backgroundColor: sub.backgroundColor,

    borderRadius: sub.borderRadius,
    borderWidth: sub.borderWidth,
    borderStyle: sub.borderStyle,
    borderColor: sub.borderColor,
    fontSize: sub.fontSize,
    fontWeight: sub.fontWeight,
    textAlign: sub.textAlign,
    letterSpacing: sub.letterSpacing,
    textIndent: sub.textIndent,
    color: sub.color,
    width: sub.width || "100%",
    height: sub.height || "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <button style={buttonStyle}
      onClick={onClickHandler}
    >
      {sub.buttonText}
    </button>
  );
}
