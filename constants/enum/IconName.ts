const IconName = {
  ARROW_LEFT: 'ARROW_LEFT',
  ARROW_RIGHT: 'ARROW_RIGHT',
  CROSS: 'CROSS',
  HEART_OUTLINE: 'HEART_OUTLINE',
  HEART_FILLED: 'HEART_FILLED',
  INSTAGRAM: 'INSTAGRAM',
  MENU: 'MENU',
  TELEGRAM: 'TELEGRAM',
} as const;

type IconName = keyof typeof IconName;

export default IconName;
