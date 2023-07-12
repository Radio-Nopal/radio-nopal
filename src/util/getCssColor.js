const getCssColor = (colorString = null) => {
  const colorObject = JSON.parse(colorString);
  if (!colorObject) {
    return null;
  }
  return colorObject.css !== 'rgba(255,255,255,1)' ? colorObject.css : null;
};

export default getCssColor;
