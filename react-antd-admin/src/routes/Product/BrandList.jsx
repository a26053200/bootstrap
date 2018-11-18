import React, {Component} from 'react'
import {Form, Input, Table, Button, Divider,Tag} from 'antd';
import 'antd/dist/antd.css';
import MyBreadcrumb from "../../components/MyBreadcrumb/index";
import $ from "jquery";
import AppConfig from "../../configs/AppConfig";
import AppData from '../../AppData'
import BrandTableColumns from './ProductConfig'

const FormItem = Form.Item;

class BrandList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brandList : [
                {
                    brand_id:"sss",
                    brand_name:"ddd"
                }
            ],
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
        $.post(AppConfig.hostUrl, JSON.stringify(AppConfig.Product_Brand_List),
            function (result, status) {
                if (result) {
                    let json = JSON.parse(result);
                    //保存玩家信息
                    AppData.brandList = json.data.brand_list;
                    _this.setState({
                        brandList : json.data.brand_list
                    })
                    console.log("json.data:" + JSON.stringify(json));
                } else {
                    console.log("get Brand List fail:" + status);
                }
            });
    };

    handleSubmit = (e) => {
        let _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                AppConfig.Product_Add_Brand.name = values.brandName;
                $.post(AppConfig.hostUrl, JSON.stringify(AppConfig.Product_Add_Brand),
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
                <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
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
                <Table rowKey="brand_id" columns={BrandTableColumns} dataSource={brandList} />
            </div>
        )
    }
}
const BrandListForm = Form.create()(BrandList);

export default BrandListForm;