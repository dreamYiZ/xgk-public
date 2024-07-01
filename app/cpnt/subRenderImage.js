function SubRenderImage(sub) {
  return (
    <div>
      <img src={sub.url} alt="sub.url" onDragStart={event => event.preventDefault()} />
    </div>
  );
}

export default SubRenderImage;
