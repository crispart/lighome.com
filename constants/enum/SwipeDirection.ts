const SwipeDirection = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

type SwipeDirection = keyof typeof SwipeDirection;

export default SwipeDirection;
