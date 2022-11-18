const ProjectSphere = {
  LOGOTYPE: 'LOGOTYPE',
  IDENTITY: 'IDENTITY',
  PRINT: 'PRINT',
  COLLAGE: 'COLLAGE',
  PACKAGING: 'PACKAGING',
} as const;

type ProjectSphere = keyof typeof ProjectSphere;

export default ProjectSphere;
