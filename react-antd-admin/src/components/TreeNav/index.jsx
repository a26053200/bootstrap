import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd'

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_904938_wkbhgc96ax.js',
});

class TreeNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            selectedKeys: []
        }
    }

    onOpenChange = (openKeys) => {
        //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
        if (openKeys.length === 0 || openKeys.length === 1) {
            this.setState({
                openKeys
            })
            return
        }

        //最新展开的菜单
        const latestOpenKey = openKeys[openKeys.length - 1]
        //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
        //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
        //只适用于3级菜单
        if (latestOpenKey.includes(openKeys[0])) {
            this.setState({
                openKeys
            })
        } else {
            this.setState({
                openKeys: [latestOpenKey]
            })
        }
        //console.log("latestOpenKey:" + latestOpenKey);
    }
    // 渲染树枝节点
    renderMenuItem = ({key, icon, title, menuPath}) => {
        var pathStr = "";
        if (menuPath)
        {
            //console.log("menuPath:" + menuPath)
            for (var i = 0; i < menuPath.length; i++) {
                //console.log("menuPath:" + menuPath[i])
                pathStr += menuPath[i] + ","
            }
        }
        //console.log("pathStr:" + pathStr)
        return (
            <Menu.Item key={key}>
                <Link to={key + "/"+ pathStr}>
                    {icon && <IconFont type={icon}/>}
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        )
    }
    // 渲染叶子节点
    renderSubMenu = ({key, icon, title, subs}) => {
        return (
            <Menu.SubMenu key={key} title={<span>{icon && <IconFont type={icon}/>}<span>{title}</span></span>}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu.SubMenu>
        )
    }

    renderItem = (menus) => {
        //递归查询JSON树 父子节点
        this.setMenuPath(menus)
        return menus && menus.map(item => {
            return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
        })
    }

    // 递归设置菜单路径
    setMenuPath = (json, parent) => {
        for (var i = 0; i < json.length; i++) {
            var node = json[i];
            node.menuPath = []
            if (parent && parent.menuPath)
                node.menuPath = node.menuPath.concat(parent.menuPath)//父级菜单名
            node.menuPath.push(node.title)//当前菜单名
            //console.log("node:" + node.title)
            var pathStr = "";
            if (node.menuPath && Array.isArray(node.menuPath))
                for (var j = 0; j < node.menuPath.length; j++) {
                    //console.log("menuPath:" + node.menuPath[j])
                    pathStr += node.menuPath[j] + ","
                }
            if (node.subs && node.subs.length > 0)
                this.setMenuPath(node.subs, node);
        }
    }
    menuClick = key => {
        //this.setState({selectedKeys: [key]});
        //console.log(this.state);
        // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        //const { popoverHide } = this.props;
        //popoverHide && popoverHide();
    };

    render() {
        const {openKeys, selectedKeys} = this.state
        return (
            <div style={{height: '100vh', overflowY: 'auto'}}>
                <div style={styles.logo}></div>
                <Menu
                    onOpenChange={this.onOpenChange}
                    onClick={this.menuClick}
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    theme={this.props.theme ? this.props.theme : 'dark'}
                    mode='inline'>{this.renderItem(this.props.menus)}
                </Menu>
            </div>
        )
    }
}

const styles = {
    logo: {
        height: '32px',
        background: 'rgba(255, 255, 255, .2)',
        margin: '16px'
    },
}

export default TreeNav