import IconName from '@/constants/enum/IconName';
import TargetTab from '~/constants/enum/TargetTab';

export default interface SocialInterface {
  url: string;
  icon: IconName;
  target: TargetTab;
}
