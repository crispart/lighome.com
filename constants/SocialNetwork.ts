import SocialInterface from '@/models/interfaces/SocialInterface';
import IconName from '@/constants/enum/IconName';

const SocialNetwork: Array<SocialInterface> = [
  {
    url: 'https://instagram.com',
    icon: IconName.INSTAGRAM,
  },
  {
    url: 'https://telegram.org',
    icon: IconName.SEND_2,
  },
];

export default SocialNetwork;
