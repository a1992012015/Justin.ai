import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { EditOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
import { CollapseType } from 'antd/es/layout/Sider';
import { SelectInfo } from 'rc-menu/lib/interface';
import React from 'react';

import styles from './app.module.css';
import Home from './features/home/home';
import OpenAiImage from './features/open-ai-image/open-ai-image';
import OpenAiCompletions from './features/open-ai-completions/open-ai-completions';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  function onSelect(info: SelectInfo) {
    navigate(info.key);
  }

  function onCollapse(collapsed: boolean, type: CollapseType) {
    console.log(collapsed, type);
  }

  const menuProps: MenuProps = {
    theme: 'dark',
    mode: 'inline',
    items: RouterMenu(),
    onSelect: onSelect,
    defaultSelectedKeys: [location.pathname]
  };

  return (
    <Layout className={styles['app-container']}>
      <Layout.Sider collapsedWidth="0" onCollapse={onCollapse}>
        <div className={styles.logo} />
        <Menu {...menuProps} />
      </Layout.Sider>

      <Layout.Content className={styles['container-content']} style={{ background: colorBgContainer }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-image" element={<OpenAiImage />} />
          <Route path="/ai-completions" element={<OpenAiCompletions />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout.Content>
    </Layout>
  );
}

function RouterMenu() {
  const menuItems = [
    { name: 'Home', link: '/', icon: UserOutlined },
    { name: 'OpenAi images', link: '/ai-image', icon: VideoCameraOutlined },
    { name: 'OpenAi Creat Edit', link: '/ai-completions', icon: EditOutlined }
  ];
  return menuItems.map((path) => ({
    key: path.link,
    icon: React.createElement(path.icon),
    label: path.name
  }));
}
