import React, {Component}from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute/index'

const Home          = LoadableComponent(()=>import('../../routes/Home/index'))  //参数一定要是函数，否则不会懒加载，只会代码拆分
const CategoryList     = LoadableComponent(()=>import('../../routes/Product/CategoryList'))
const BrandList     = LoadableComponent(()=>import('../../routes/Product/BrandList'))
const SpecList     = LoadableComponent(()=>import('../../routes/Product/SpecList'))
class MainContent extends Component {
    render() {
        return (
            <div style={{padding: 16, position: 'relative'}}>
                <Switch>
                    <PrivateRoute  exact path='/home/:path'                         component={Home}/>
                    <PrivateRoute  exact path='/home/attribute/CategoryList/:path'  component={CategoryList}/>
                    <PrivateRoute  exact path='/home/attribute/BrandList/:path'     component={BrandList}/>
                    <PrivateRoute  exact path='/home/attribute/SpecList/:path'      component={SpecList}/>
                </Switch>
            </div>
        )
    }
}
export default MainContent