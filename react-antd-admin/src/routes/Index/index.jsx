import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Icon} from 'antd';
import './style.css';
import TreeNav from "../../components/TreeNav/index";
import MainContent from "../../components/MainContent/index";
import AppConfig from '../../configs/AppConfig'
import AppData from '../../AppData'

const {Header, Sider, Content} = Layout;

const menus = [
    {
        title: '首页',
        icon: 'icon-homepage',
        key: '/home',
    },
    {
        title: '店铺设置',
        icon: 'icon-homepage',
        key: '/home/shop',
        subs: [
            {
                key: '/home/shop/base',
                title: '基本设置',
                icon: 'icon-other'
            },
            {
                key: '/home/shop/imageCdn',
                title: '图床设置',
                icon: 'icon-add'
            },
            {
                key: '/home/shop/home_setting_mp',
                title: '首页设置(小程序)',
                icon: 'icon-add'
            },
            {
                key: '/home/shop/home_setting_app',
                title: '首页设置(App)',
                icon: 'icon-add'
            },
            {
                key: '/home/shop/payoff',
                title: '支付设置',
                icon: 'icon-add'
            }
        ]
    },
    {
        title: '订单管理',
        icon: 'icon-order',
        key: '/home/order',
        subs: [
            {
                key: '/home/order/explorer',
                title: '查询订单',
                icon: 'icon-order'
            },
            {
                key: '/home/order/explorer/order_status_0',
                title: '待付款',
                icon: 'icon-order'
            },
            {
                key: '/home/order/explorer/order_status_1',
                title: '待发货',
                icon: 'icon-order'
            },
            {
                key: '/home/order/explorer/order_status_2',
                title: '已发货',
                icon: 'icon-order'
            },
            {
                key: '/home/order/explorer/order_status_3',
                title: '退款中',
                icon: 'icon-order'
            },
            {
                key: '/home/order/explorer/order_status_4',
                title: '交易成功',
                icon: 'icon-order'
            },
            {
                key: '/home/order/explorer/order_status_5',
                title: '交易关闭',
                icon: 'icon-order'
            },
            {
                key: '/home/order/explorer/order_status_6',
                title: '未完成',
                icon: 'icon-order'
            }
        ]
    },
    {
        title: '商品管理',
        icon: 'icon-marketing_fill',
        key: '/home/product',
        subs: [
            {
                key: '/home/product/explorer',
                title: '查询商品',
                icon: 'icon-other'
            },
            {
                key: '/home/product/detail',
                title: '添加商品',
                icon: 'icon-add'
            },
        ]
    },
    {
        title: '属性管理',
        icon: 'icon-marketing_fill',
        key: '/home/attribute',
        subs: [
            {
                key: '/home/attribute/CategoryList',
                title: '添加品类',
                icon: 'icon-other'
            },
            {
                key: '/home/attribute/BrandList',
                title: '添加品牌',
                icon: 'icon-other'
            },
            {
                key: '/home/attribute/SpecList',
                title: '添加规格',
                icon: 'icon-add'
            },
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
        const {sellerInfo} = AppData;
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <TreeNav menus={menus}/>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div style={{lineHeight: '64px', float: 'right'}}>
                            <ul className='header-ul'>
                                <li onClick={() => this.setState({count: 0})}>
                                    <span>{sellerInfo.profile_wx_nickname}</span>
                                </li>
                                <li>
                                    <img src={sellerInfo.profile_wx_avatar_url} alt=""/>
                                </li>
                            </ul>
                        </div>
                    </Header>
                    <Content>
                        <MainContent/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Index;