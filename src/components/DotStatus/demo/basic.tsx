import React from 'react';
import DotStatus, { StatusConfigMap } from '../index';
import { Divider, Space } from '@arco-design/web-react';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <DotStatus status="Pending" />
        <DotStatus status="Running" />
        <DotStatus status="Succeeded" />
        <DotStatus status="Failed" />
        <DotStatus status="Terminating" />
        <DotStatus status="Terminated" />
      </Space>
      <Divider />
      <Space>
        <DotStatus status="Healthy" />
        <DotStatus status="Unhealthy" />
        <DotStatus status="Unknown" />
      </Space>
      <Divider />
      <Space>
        <DotStatus status="Uploading" />
        <DotStatus status="Error" />
        <DotStatus status="Done" />
      </Space>
      <Divider />
      <Space>
        <DotStatus status="Init" />
        <DotStatus status="PartialSucceeded" />
      </Space>
      <Divider />
      <Space>
        <DotStatus status="Creating" />
        <DotStatus status="Deploying" />
        <DotStatus status="Undeploying" />
        <DotStatus status="Undeploy" />
      </Space>
      <Divider />
      <Space>
        <DotStatus status="ImportFinished" />
        <DotStatus status="ImportFailed" />
        <DotStatus status="Importing" />
        <DotStatus status="Published" />
      </Space>
    </div>
  );
};

export default BasicDemo;
