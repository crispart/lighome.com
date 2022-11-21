const ProjectGridItemType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
} as const;

type ProjectGridItemType = keyof typeof ProjectGridItemType;

export default ProjectGridItemType;
