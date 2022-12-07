const TargetTab = {
  SELF: 'SELF',
  BLANK: 'BLANK',
} as const;

type TargetTab = keyof typeof TargetTab;

export default TargetTab;
