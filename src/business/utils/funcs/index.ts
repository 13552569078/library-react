import { ProjectIdKey } from '../constants';

export const isRequestSuccess = ({ statusCode }: { statusCode: number }) => {
  return statusCode === 0;
};

export function getLocalProjectId(userId: string) {
  const defaultValue = {
    projectId: undefined,
    orgId: undefined,
  };

  if (!userId) {
    return defaultValue;
  }

  try {
    const strValue = localStorage.getItem(ProjectIdKey + userId);
    if (!strValue) {
      return defaultValue;
    }

    const arrayValue = JSON.parse(strValue);

    if (Array.isArray(arrayValue) && arrayValue.length > 0) {
      return {
        projectId: arrayValue[1],
        orgId: arrayValue[0],
      };
    }

    return defaultValue;
  } catch (error) {
    console.error('Failed to parse project ID:', error);
    return defaultValue;
  }
}
