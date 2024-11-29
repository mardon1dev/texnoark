import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  TagsOutlined,
  ShopOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider } = Layout;

const Main: React.FC = () => {
  const navigate = useNavigate();
  const navbarlist = [
    {
      key: "1",
      icon: <BarChartOutlined />,
      label: "Dashboard",
      path: "/",
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Products",
      path: "/products",
    },
    {
      key: "3",
      icon: <TagsOutlined />,
      label: "Categories",
      path: "/categories",
    },
    {
      key: "4",
      icon: <ShopOutlined />,
      label: "Brands",
      path: "/brands",
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState(1);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function handleLogOut() {
    localStorage.removeItem("access_token");
    window.location.reload();
  }

  const handlePath = (id: number) => {
    const path = navbarlist.find((item) => Number(item.key) === id);
    if (path) {
      navigate(path.path);
    }
  };

  return (
    <Layout className="w-full min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="w-full flex items-center justify-center my-[40px] text-white text-[25px] cursor-pointer"
        onClick={()=>{
          navigate("/")
        }}>
          {collapsed ? "T" : "Texnoark"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(e) => {
            handlePath(Number(e.key));
          }}
          items={navbarlist}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 10,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button
            type="text"
            className="flex items-center"
            onClick={handleLogOut}
          >
            <LogoutOutlined />
            <span>Log out</span>
          </Button>
        </Header>
        <div className="w-full h-full p-5">
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default Main;
