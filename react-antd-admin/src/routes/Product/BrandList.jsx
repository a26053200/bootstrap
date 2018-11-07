import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MyBreadcrumb from "../../components/MyBreadcrumb/index";

const FormItem = Form.Item;

class BrandList extends Component {

    render() {
        const {getFieldDecorator} = this.props.form;
        const paths = this.props.match.params.path.split(",")
        return (
            <div>
                <MyBreadcrumb paths={paths} />
                <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                    <FormItem  label='品牌名称'>
                        {getFieldDecorator('nickname', {
                            rules: [{required: true, message: '品牌名称不能为空!', whitespace: true}],
                        })(
                            <Input/>//ref
                        )}
                    </FormItem>
                    <FormItem >
                        <Button type="primary" htmlType="submit">Add</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const BrandListForm = Form.create()(BrandList);

export default BrandListForm;