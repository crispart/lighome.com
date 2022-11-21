import ProjectGridItemType from '~/constants/enum/ProjectGridItemType';

export default interface ProjectGridItemInterface {
  name: string;
  type: ProjectGridItemType;
  description: string;
  size: 4 | 6 | 12;
  hasMask?: boolean;
}
