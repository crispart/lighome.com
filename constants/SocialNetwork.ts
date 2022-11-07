import SocialInterface from '@/models/interfaces/SocialInterface';
import IconName from '@/constants/enum/IconName';

const SocialNetwork: Array<SocialInterface> = [
  {
    url: 'https://instagram.com/ligreen_jade',
    icon: IconName.INSTAGRAM,
  },
  {
    url: 'https://t.me/green_jade',
    icon: IconName.TELEGRAM,
  },
];

export default SocialNetwork;
