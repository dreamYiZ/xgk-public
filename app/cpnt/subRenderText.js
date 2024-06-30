function SubRenderText(sub) {
  const style = {
    fontSize: `${sub.fontSize}px`,
    fontWeight: sub.fontWeight,
    color: sub.color,
  };

  return <div style={style}>
    {sub.content}
  </div>
}

export default SubRenderText;
