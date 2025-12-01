import React, { useState, useMemo } from 'react';
import { Input, Grid, Card, Message, Typography, Slider, Button } from '@arco-design/web-react';
import { IconSearch, IconDownload } from '@arco-design/web-react/icon';
import * as Icons from '../icons';

const { Row, Col } = Grid;
const { Title, Text } = Typography;

const ArcoIconDemo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [iconSize, setIconSize] = useState(32);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // 获取所有图标
  const allIcons = useMemo(() => {
    return Object.entries(Icons)
      .filter(([name, Component]) => {
        // 只包含以 Icon 开头的组件，排除其他导出
        return name.startsWith('Icon') && typeof Component === 'function';
      })
      .map(([name, Component]) => ({
        name,
        Component,
        displayName: name.replace('Icon', '').toLowerCase(),
        category: getIconCategory(name),
      }));
  }, []);

  // 图标分类
  function getIconCategory(iconName: string): string {
    const name = iconName.toLowerCase();
    if (name.includes('file')) return '文件类';
    if (name.includes('llm')) return 'LLM';
    if (name.includes('no')) return '空类型图标';
    if (
      name.includes('add') ||
      name.includes('delete') ||
      name.includes('edit') ||
      name.includes('close')
    )
      return '编辑类图标';
    if (
      name.includes('home') ||
      name.includes('search') ||
      name.includes('settings') ||
      name.includes('star')
    )
      return '通用类图标';
    if (name.includes('check')) return '状态类图标';
    return '其他图标';
  }

  // 过滤图标
  const filteredIcons = useMemo(() => {
    if (!searchTerm) return allIcons;
    return allIcons.filter(
      (icon) =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.displayName.includes(searchTerm.toLowerCase()),
    );
  }, [allIcons, searchTerm]);

  // 按分类分组
  const groupedIcons = useMemo(() => {
    const groups: Record<string, typeof filteredIcons> = {};
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
    <div
      style={{
        padding: '24px',
        background: '#f7f8fa',
        minHeight: '100vh',
      }}
    >
      {/* 头部区域 */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        <Title
          heading={1}
          style={{
            fontSize: '32px',
            fontWeight: '600',
            margin: '0 0 8px 0',
            color: '#1d2129',
          }}
        >
          图标库
        </Title>
        <Text
          style={{
            fontSize: '14px',
            color: '#86909c',
            display: 'block',
            marginBottom: '24px',
          }}
        >
          精心设计的 SVG 图标集合，支持自定义颜色和大小
        </Text>

        {/* 统计信息 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginTop: '24px',
            marginBottom: '24px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#1d2129' }}>
              {allIcons.length}
            </div>
            <div style={{ fontSize: '12px', color: '#86909c' }}>图标总数</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#1d2129' }}>
              {filteredIcons.length}
            </div>
            <div style={{ fontSize: '12px', color: '#86909c' }}>当前显示</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#1d2129' }}>
              {filteredIcons.length === allIcons.length
                ? '100%'
                : Math.round((filteredIcons.length / allIcons.length) * 100) + '%'}
            </div>
            <div style={{ fontSize: '12px', color: '#86909c' }}>匹配图标</div>
          </div>
        </div>
      </div>

      {/* 控制面板 */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={24} align="center">
          <Col span={12}>
            <div style={{ marginBottom: '8px' }}>
              <Text style={{ fontSize: '14px', color: '#1d2129' }}>搜索图标名称或组件名...</Text>
            </div>
            <Input
              placeholder="搜索图标名称或组件名..."
              value={searchTerm}
              onChange={setSearchTerm}
              prefix={<IconSearch />}
              style={{ height: '40px' }}
              allowClear
            />
          </Col>
          <Col span={6}>
            <div style={{ marginBottom: '8px' }}>
              <Text style={{ fontSize: '14px', color: '#1d2129' }}>图标大小: {iconSize}px</Text>
            </div>
            <Slider
              value={iconSize}
              onChange={(val) => setIconSize(val as number)}
              min={16}
              max={64}
              step={4}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={6}>
            <Button
              type="primary"
              icon={<IconDownload />}
              onClick={handleCopyImport}
              style={{ width: '100%', height: '40px' }}
            >
              复制导入代码
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 图标展示区域 */}
      {Object.keys(groupedIcons).length === 0 ? (
        <Card>
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              color: '#86909c',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <div style={{ fontSize: '16px', marginBottom: '8px' }}>未找到匹配的图标</div>
            <div style={{ fontSize: '14px' }}>请尝试其他关键词</div>
          </div>
        </Card>
      ) : (
        Object.entries(groupedIcons).map(([category, icons]) => (
          <Card key={category} style={{ marginBottom: '24px' }}>
            <Title
              heading={3}
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1d2129',
                marginBottom: '16px',
                borderBottom: '1px solid #e5e6eb',
                paddingBottom: '8px',
              }}
            >
              {category}
            </Title>
            <Row gutter={[16, 16]}>
              {icons.map(({ name, Component, displayName }) => {
                const IconComponent = Component as React.ComponentType<any>;
                return (
                  <Col key={name} span={4}>
                    <div
                      style={{
                        height: '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        border: '1px solid #e5e6eb',
                        background: '#fff',
                        transition: 'all 0.2s ease',
                        padding: '16px 8px',
                      }}
                      onClick={() => handleCopyIconName(name)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#165dff';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(22, 93, 255, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e6eb';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div
                        style={{
                          marginBottom: '12px',
                          color: '#1d2129',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconComponent style={{ fontSize: iconSize }} />
                      </div>
                      <div
                        style={{
                          textAlign: 'center',
                          width: '100%',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#1d2129',
                            marginBottom: '4px',
                            wordBreak: 'break-word',
                          }}
                        >
                          {displayName}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: '#86909c',
                            fontFamily: 'Monaco, Consolas, monospace',
                            wordBreak: 'break-word',
                          }}
                        >
                          {name}
                        </div>
                      </div>
                      {copiedIcon === name && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: '#00b42a',
                            color: 'white',
                            borderRadius: '4px',
                            padding: '2px 6px',
                            fontSize: '10px',
                            fontWeight: '500',
                          }}
                        >
                          已复制
                        </div>
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Card>
        ))
      )}
    </div>
  );
};

export default ArcoIconDemo;
