import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ContainerOutlined,
  IdcardOutlined,
  TeamOutlined,
  ReadOutlined,
  EyeOutlined,
  PlusOutlined
  
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
    const navigate = useNavigate();

    function handleMenuClick ({ key }) {
        switch (key) {
            case '1':
                navigate('/matakuliah/add');
                break;
            case '2':
                navigate('/matakuliah/view');
                break;
            case '3':
                navigate('/mahasiswa/add');
                break;
            case '4':
                navigate('/mahasiswa/view');
                break;
            case '5':
                navigate('/dosen/add');
                break;
            case '6':
                navigate('/dosen/view');
                break;
        }
    }
    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
    const items = [
        getItem('Mata Kuliah', 'sub1', <ReadOutlined />, [
          getItem('Add Mata Kuliah', '1',<PlusOutlined />),
          getItem('View Mata Kuliah', '2' , <EyeOutlined />),
        ]),
        getItem('Mahasiswa', 'sub2', <TeamOutlined />, [
          getItem('Add Mahasiswa', '3', <PlusOutlined />),
          getItem('View Mahasiswa',  '4' , <EyeOutlined />),
        ]),
        getItem('Dosen', 'sub3', <IdcardOutlined />, [
          getItem('Add Dosen', '5' ,<PlusOutlined />),
          getItem('View Dosen', '6', <EyeOutlined />),
        ]),
        getItem('Jadwal', 'sub4', <ContainerOutlined />, [
          getItem('Add Jadwal', '8' ,<PlusOutlined />),
          getItem('View Jadwal', '9' , <EyeOutlined />),
        ]),
      ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
        mode="inline"
        color='#fff'
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        style={{height: '100vh'}}
        onClick={({ key }) => handleMenuClick({ key })}
      />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#1B9AD7",
            color: "#fff",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: '#fff',
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <span>Dashboard</span>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;