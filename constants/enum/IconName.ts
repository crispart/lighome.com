const IconName = {
  ARROW_LEFT: 'ARROW_LEFT',
  ARROW_RIGHT: 'ARROW_RIGHT',
  CROSS: 'CROSS',
  HEART_OUTLINE: 'HEART_OUTLINE',
  HEART_FILLED: 'HEART_FILLED',
  INSTAGRAM: 'INSTAGRAM',
  MAIL: 'MAIL',
  MENU: 'MENU',
  SPIN: 'SPIN',
  TELEGRAM: 'TELEGRAM',
} as const;

type IconName = keyof typeof IconName;

export default IconName;
