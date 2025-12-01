import React, { useState, useMemo } from 'react';
import { Input, Grid, Card, Message, Typography, Button, Divider } from '@arco-design/web-react';
import { IconSearch, IconDownload, IconCopy } from '@arco-design/web-react/icon';
// import {
//   IconAdd,
//   IconArrowDown,
//   IconArrowLeft,
//   IconArrowRight,
//   IconArrowUp,
//   IconCheck,
//   IconClose,
//   IconDelete,
//   IconEdit,
//   IconHome,
//   IconSearch as IconSearchLocal,
//   IconSettings,
//   IconStar
// } from 'ai-arco-material';
import styles from './index.module.less';

const { Row, Col } = Grid;
const { Title, Text, Paragraph } = Typography;

// 图标数据
const iconData = [
  // { name: 'IconAdd', Component: IconAdd, displayName: 'add', category: '编辑类图标' },
  // { name: 'IconArrowDown', Component: IconArrowDown, displayName: 'arrow-down', category: '方向指示类图标' },
  // { name: 'IconArrowLeft', Component: IconArrowLeft, displayName: 'arrow-left', category: '方向指示类图标' },
  // { name: 'IconArrowRight', Component: IconArrowRight, displayName: 'arrow-right', category: '方向指示类图标' },
  // { name: 'IconArrowUp', Component: IconArrowUp, displayName: 'arrow-up', category: '方向指示类图标' },
  // { name: 'IconCheck', Component: IconCheck, displayName: 'check', category: '状态类图标' },
  // { name: 'IconClose', Component: IconClose, displayName: 'close', category: '编辑类图标' },
  // { name: 'IconDelete', Component: IconDelete, displayName: 'delete', category: '编辑类图标' },
  // { name: 'IconEdit', Component: IconEdit, displayName: 'edit', category: '编辑类图标' },
  // { name: 'IconHome', Component: IconHome, displayName: 'home', category: '通用类图标' },
  // { name: 'IconSearch', Component: IconSearchLocal, displayName: 'search', category: '通用类图标' },
  // { name: 'IconSettings', Component: IconSettings, displayName: 'settings', category: '通用类图标' },
  // { name: 'IconStar', Component: IconStar, displayName: 'star', category: '通用类图标' },
];

const IconShowcase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // 过滤图标
  const filteredIcons = useMemo(() => {
    if (!searchTerm) return iconData;
    return iconData.filter(
      (icon) =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.displayName.includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  // 按分类分组
  const groupedIcons = useMemo(() => {
    const groups: Record<string, typeof iconData> = {};
    filteredIcons.forEach((icon) => {
      if (!groups[icon.category]) {
        groups[icon.category] = [];
      }
      groups[icon.category].push(icon);
    });
    return groups;
  }, [filteredIcons]);

  // 复制图标名称
  const handleCopyIconName = async (iconName: string) => {
    try {
      await navigator.clipboard.writeText(iconName);
      setCopiedIcon(iconName);
      Message.success(`已复制: ${iconName}`);
      setTimeout(() => setCopiedIcon(null), 2000);
    } catch (err) {
      Message.error('复制失败');
    }
  };

  // 复制导入代码
  const handleCopyImport = async () => {
    const importCode = `import { ${filteredIcons
      .map((icon) => icon.name)
      .join(', ')} } from 'ai-arco-material';`;
    try {
      await navigator.clipboard.writeText(importCode);
      Message.success('已复制导入代码');
    } catch (err) {
      Message.error('复制失败');
    }
  };

  return (
    <div className={styles.iconShowcase}>
      {/* 头部统计信息 */}
      <div className={styles.header}>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{iconData.length}</div>
            <div className={styles.statLabel}>图标总数</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{filteredIcons.length}</div>
            <div className={styles.statLabel}>当前显示</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>
              {filteredIcons.length === iconData.length
                ? '100%'
                : Math.round((filteredIcons.length / iconData.length) * 100) + '%'}
            </div>
            <div className={styles.statLabel}>匹配图标</div>
          </div>
        </div>
      </div>

      {/* 控制面板 */}
      <Card className={styles.controlPanel}>
        <Row gutter={24} align="center">
          <Col span={18}>
            <div className={styles.searchLabel}>
              <Text>搜索图标名称或组件名...</Text>
            </div>
            <Input
              placeholder="搜索图标名称或组件名..."
              value={searchTerm}
              onChange={setSearchTerm}
              prefix={<IconSearch />}
              className={styles.searchInput}
              allowClear
            />
          </Col>
          <Col span={6}>
            <Button
              type="primary"
              icon={<IconDownload />}
              onClick={handleCopyImport}
              className={styles.copyButton}
            >
              复制导入代码
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 图标展示区域 */}
      {Object.keys(groupedIcons).length === 0 ? (
        <Card>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <div className={styles.emptyText}>未找到匹配的图标</div>
            <div className={styles.emptySubtext}>请尝试其他关键词</div>
          </div>
        </Card>
      ) : (
        Object.entries(groupedIcons).map(([category, icons]) => (
          <Card key={category} className={styles.categoryCard}>
            <Title heading={3} className={styles.categoryTitle}>
              {category}
            </Title>
            <Row gutter={[16, 16]}>
              {icons.map(({ name, Component, displayName }) => (
                <Col key={name} span={4}>
                  <div className={styles.iconCard} onClick={() => handleCopyIconName(name)}>
                    <div className={styles.iconDisplay}>
                      <Component style={{ fontSize: 32 }} />
                    </div>
                    <div className={styles.iconInfo}>
                      <div className={styles.iconName}>{displayName}</div>
                      <div className={styles.iconComponent}>{name}</div>
                    </div>
                    {copiedIcon === name && <div className={styles.copiedIndicator}>已复制</div>}
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        ))
      )}
    </div>
  );
};

export default IconShowcase;
