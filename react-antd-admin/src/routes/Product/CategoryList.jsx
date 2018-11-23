import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Form, Input, Table, Button} from 'antd';
import MyBreadcrumb from "../../components/MyBreadcrumb/index";
import AppConfig from "../../configs/AppConfig";
import $ from "jquery";
import AppData from "../../AppData";
import {CategoryTableColumns} from './ProductConfig'
import {sendAction2Business} from '../../utils/Net';

const FormItem = Form.Item;

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList : [],
        };
    }

    componentDidMount () {
        let _this = this;
        _this.getCategoryList();
    }

    //获取品类列表
    getCategoryList = () => {
        console.log("getCategoryList..");
        let _this = this;
        sendAction2Business(AppConfig.Get_Category_List, function (json)
        {
            AppData.categoryList = json.data.category_list;
            _this.setState({
                categoryList : json.data.category_list
            })
        });
    };

    handleSubmit = (e) => {
        let _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                AppConfig.Add_Category.name = values.categoryName;
                $.post(AppConfig.hostUrl, JSON.stringify(AppConfig.Add_Category),
                    function (result, status) {
                        if (result) {
                            let json = JSON.parse(result);
                            console.log("json.data:" + JSON.stringify(json));
                            _this.getCategoryList();
                        } else {
                            console.log("ajax rspd code:" + status);
                        }
                    });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {categoryList} = this.state;
        const paths = this.props.match.params.path.split(",")
        return (
            <div>
                <MyBreadcrumb paths={paths} />
                <Form layout='inline' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                    <FormItem  label='分类名称'>
                        {getFieldDecorator('categoryName', {
                            rules: [{required: true, message: '分类名称不能为空!', whitespace: true}],
                        })(
                            <Input/>//ref
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">Add</Button>
                    </FormItem>
                </Form>
                <Table rowKey="id" columns={CategoryTableColumns} dataSource={categoryList} />
            </div>
        )
    }
}
const CategoryListForm = Form.create()(CategoryList);

export default CategoryListForm;
