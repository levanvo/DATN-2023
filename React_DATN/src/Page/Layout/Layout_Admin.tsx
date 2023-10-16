import React, { useState } from "react"
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  BgColorsOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Breadcrumb, Layout, Menu, theme } from "antd"
import { Outlet } from "react-router-dom"

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem("Products", "1", <PieChartOutlined />),
  getItem("Category", "2", <DesktopOutlined />),
  getItem("Color", "3", <BgColorsOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "4"),
    getItem("Bill", "5"),
    getItem("Alex", "6"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "7"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
]

const Layout_Admin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Layout_Admin
