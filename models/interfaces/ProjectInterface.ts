import ProjectGridItemInterface from '~/models/interfaces/ProjectGridItemInterface';
import ProjectSphere from '~/constants/enum/ProjectSphere';

export default interface ProjectInterface {
  path: string;
  name: string;
  sphere: ProjectSphere;
  year: number;
  description: string;
  grid: Array<ProjectGridItemInterface>;
}
