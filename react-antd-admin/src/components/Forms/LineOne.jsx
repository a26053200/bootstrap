import React, {Component} from 'react'
import AppData from "../../AppData";
import $ from "jquery";
import AppConfig from "../../configs/AppConfig";
import {Form} from "antd/lib/index";

const FormItem = Form.Item;

class LineOne extends Component
{
    handleSubmit = (e) =>
    {
        let _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) =>
        {
            if (!err)
            {
                AppConfig.Add_Brand.name = values.brandName;
                $.post(AppConfig.hostUrl, JSON.stringify(AppConfig.Add_Brand),
                    function (result, status)
                    {
                        if (result)
                        {
                            let json = JSON.parse(result);
                            AppData.brandInfo = json.data.brand_info;
                            console.log("json.data:" + JSON.stringify(json));
                            _this.getBrandList();
                        } else
                        {
                            console.log("ajax rspd code:" + status);
                        }
                    });
            }
        });
    };

    render()
    {
        const {getFieldDecorator, getFieldsError} = this.props.form;
        return (
            <div>
                <Form layout='inline' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                    <FormItem label='品牌名称'>
                        {getFieldDecorator('brandName', {
                            rules: [{required: true, message: '品牌名称不能为空!', whitespace: true}],
                        })(
                            <Input/>//ref
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">Add</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default LineOne