const IconName = {
  ADD: 'ADD',
  CLOSE_CIRCLE: 'CLOSE_CIRCLE',
  CLOSE_SQUARE: 'CLOSE_SQUARE',
  INSTAGRAM: 'INSTAGRAM',
  MENU: 'MENU',
  SEND_2: 'SEND_2',
} as const;

type IconName = keyof typeof IconName;

export default IconName;
