import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import './style.css';
import TreeNav from "../../components/TreeNav/index";
import MainContent from "../../components/MainContent/index";

const { Header, Sider, Content } = Layout;

const menus =[
    {
        title: 'Home',
        icon: 'home',
        key: '/home',
    },
    {
        title: '卖家',
        icon: 'edit',
        key: '/home/entry',
        subs: [
            {
                key: '/home/entry/form',
                title: '表单',
                icon: '',
                subs: [
                    {key: '/home/entry/form/basic-form', title: '基础表单', icon: ''},
                    {key: '/home/entry/form/step-form', title: '分步表单', icon: ''}
                ]
            },
            {key: '/home/entry/upload', title: '上传', icon: ''},
        ]
    }
]

class Index extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
                    <TreeNav menus={menus}/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content>
                        <MainContent />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Index;