import React from 'react';

export interface DotStatusProps {
  status?: keyof typeof StatusConfigMap;
  text?: string;
  color?: string;
  showText?: boolean;
  className?: string;
}

enum ColorEnum {
  primarySix = 'rgb(var(--primary-6))',
  successSix = 'rgb(var(--success-6))',
  dangerSix = 'rgb(var(--danger-6))',
  textFour = 'var(--color-text-6)',
  warningSix = 'rgb(var(--warning-6))',
}

// 状态配置 TODO 换成接口字段
export const StatusConfigMap = {
  Pending: { text: '排队中', color: ColorEnum.primarySix },
  Running: { text: '构建中', color: ColorEnum.primarySix },
  Succeeded: { text: '构建成功', color: ColorEnum.successSix },
  Failed: { text: '构建失败', color: ColorEnum.dangerSix },
  Terminating: { text: '终止中', color: ColorEnum.warningSix },
  Terminated: { text: '已终止', color: ColorEnum.textFour },

  Healthy: { text: '正常', color: ColorEnum.successSix },
  Unhealthy: { text: '异常', color: ColorEnum.dangerSix },
  Unknown: { text: '未知', color: ColorEnum.textFour },

  Uploading: { text: '上传中', color: ColorEnum.primarySix },
  Error: { text: '上传失败', color: ColorEnum.dangerSix },
  Done: { text: '上传成功', color: ColorEnum.successSix },

  Init: { text: '启动中', color: ColorEnum.primarySix },
  PartialSucceeded: { text: '运行失败', color: ColorEnum.dangerSix },

  Creating: { text: '创建中', color: ColorEnum.primarySix },
  Deploying: { text: '上线中', color: ColorEnum.primarySix },
  Undeploying: { text: '下线中', color: ColorEnum.textFour },
  Undeploy: { text: '已下线', color: ColorEnum.textFour },

  ImportFinished: { text: '导入成功', color: ColorEnum.successSix },
  ImportFailed: { text: '导入失败', color: ColorEnum.dangerSix },
  Importing: { text: '导入中', color: ColorEnum.primarySix },
  Published: { text: '已发布', color: ColorEnum.successSix },
};

const DotStatus: React.FC<DotStatusProps> = ({
  status,
  text,
  color,
  showText = true,
  className,
}: DotStatusProps) => {
  // 尺寸配置
  const sizeConfig = {
    dotSize: '8px',
    fontSize: '14px',
  };

  const currentStatus =
    status && StatusConfigMap[status]
      ? StatusConfigMap[status]
      : {
          text: text ?? '未知',
          color: color ?? ColorEnum.textFour,
        };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: '22px',
  };

  const dotStyle: React.CSSProperties = {
    width: sizeConfig.dotSize,
    height: sizeConfig.dotSize,
    backgroundColor: currentStatus.color,
    borderRadius: '50%',
    marginRight: '8px',
    flexShrink: 0,
  };

  const textStyle: React.CSSProperties = {
    fontSize: sizeConfig.fontSize,
    color: 'var(--color-text-1)',
    fontWeight: '400',
    margin: 0,
  };

  return (
    <div style={containerStyle} className={`aa-dot-status ${className ?? ''}`}>
      <div style={dotStyle} />
      {showText && <span style={textStyle}>{currentStatus.text}</span>}
    </div>
  );
};

export default DotStatus;
