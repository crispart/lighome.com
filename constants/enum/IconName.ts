const IconName = {
  INSTAGRAM: 'INSTAGRAM',
  TELEGRAM: 'TELEGRAM',
} as const;

type IconName = keyof typeof IconName;

export default IconName;
