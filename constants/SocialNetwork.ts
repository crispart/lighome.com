import SocialInterface from '@/models/interfaces/SocialInterface';
import IconName from '@/constants/enum/IconName';
import TargetTab from '~/constants/enum/TargetTab';

const SocialNetwork: Array<SocialInterface> = [
  {
    url: 'https://instagram.com/ligreen_jade',
    icon: IconName.INSTAGRAM,
    target: TargetTab.BLANK,
  },
  {
    url: 'https://t.me/green_jade',
    icon: IconName.TELEGRAM,
    target: TargetTab.BLANK,
  },
  {
    url: 'mailto:ligreenjade@gmail.com',
    icon: IconName.MAIL,
    target: TargetTab.SELF,
  },
];

export default SocialNetwork;
