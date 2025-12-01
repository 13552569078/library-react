import { useEffect, useState } from 'react';
import { useUserId } from '../../store';
import { getLocalProjectId } from '../../utils';
export default function useProjectId() {
  const userId = useUserId();

  const [projectId, setProjectId] = useState<string>();
  const [orgId, setOrgId] = useState<string>();

  useEffect(() => {
    const { projectId: localProjectId, orgId: localOrgId } = getLocalProjectId(userId!);
    setProjectId(localProjectId);
    setOrgId(localOrgId);
  }, [userId]);

  const switchProject = (value: string[]) => {
    console.log('Wujie ProjectId', value);
    setProjectId(value[1]);
    setOrgId(value[0]);
  };

  useEffect(() => {
    (window as any).$wujie?.bus.$on('switchProject', switchProject);

    return () => {
      (window as any).$wujie?.bus.$off('switchProject', switchProject);
    };
  }, []);

  return { projectId, orgId };
}
