import ProjectImageInterface from '~/models/interfaces/ProjectImageInterface';
import ProjectSphere from '~/constants/enum/ProjectSphere';

export default interface ProjectInterface {
  path: string;
  name: string;
  sphere: ProjectSphere;
  year: number;
  description: string;
  images: Array<ProjectImageInterface>;
}
