export const saveProjectDetails = (projects) => {
    return {
      type: 'SAVE_PROJECT_DETAILS',
      payload: projects,
    };
  };