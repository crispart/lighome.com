import ProjectImageInterface from '~/models/interfaces/ProjectImageInterface';

export default interface ProjectInterface {
  path: string;
  name: string;
  sphere: string;
  description: string;
  images: Array<ProjectImageInterface>;
}
