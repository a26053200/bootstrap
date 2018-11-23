import React, {Component} from 'react'
import {Form, Input, Table, Button, Divider,Tag} from 'antd';
import 'antd/dist/antd.css';
import MyBreadcrumb from "../../components/MyBreadcrumb/index";
import $ from "jquery";
import AppConfig from "../../configs/AppConfig";
import AppData from '../../AppData'
import {BrandTableColumns} from './ProductConfig'
import {sendAction2Business} from "../../utils/Net";

const FormItem = Form.Item;

class BrandList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brandList : [],
        };
    }

    componentDidMount () {
        let _this = this;
        _this.getBrandList();
    }

    //获取品牌列表
    getBrandList = () => {
        console.log("getBrandList..");
        let _this = this;
        sendAction2Business(AppConfig.Get_Brand_List, function (json)
        {
            AppData.brandList = json.data.brand_list;
            _this.setState({
                brandList : json.data.brand_list
            })
        });
    };

    handleSubmit = (e) => {
        let _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                AppConfig.Add_Brand.name = values.brandName;
                $.post(AppConfig.hostUrl, JSON.stringify(AppConfig.Add_Brand),
                    function (result, status) {
                        if (result) {
                            let json = JSON.parse(result);
                            AppData.brandInfo = json.data.brand_info;
                            console.log("json.data:" + JSON.stringify(json));
                            _this.getBrandList();
                        } else {
                            console.log("ajax rspd code:" + status);
                        }
                    });
            }
        });
    };

    render() {
        const {getFieldDecorator, getFieldsError} = this.props.form;
        const {brandList} = this.state;
        //const {BrandTableColumns} = BrandTableColumns;
        const paths = this.props.match.params.path.split(",")
        return (
            <div>
                <MyBreadcrumb paths={paths} />
                <Form layout='inline' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                    <FormItem  label='品牌名称'>
                        {getFieldDecorator('brandName', {
                            rules: [{required: true, message: '品牌名称不能为空!', whitespace: true}],
                        })(
                            <Input/>//ref
                        )}
                    </FormItem>
                    <FormItem >
                        <Button type="primary" htmlType="submit">Add</Button>
                    </FormItem>
                </Form>
                <Table rowKey="id" columns={BrandTableColumns} dataSource={brandList} />
            </div>
        )
    }
}
const BrandListForm = Form.create()(BrandList);

export default BrandListForm;