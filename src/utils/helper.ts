export const getRandom = (value: number) => {
  return Math.floor(Math.random() * value);
}

export const randomIntFromRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomColors = (colors: string[]) => {
  return colors[Math.floor(Math.random() * colors.length)];
} 

export const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
  const xDistance = (x2 - x1);
  const yDistance = (y2 - y1);

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}