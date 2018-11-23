import React, {Component} from 'react'
import {Form, Input, Button} from 'antd';
import {sendAction2Business} from "../../utils/Net";

const FormItem = Form.Item;

class StringForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            showButton: props.showButton === null ? true : props.showButton,
            submitAction: props.submitAction,
            submitCallback: props.submitCallback,
        };
    }
    componentWillUnmount() {
        for (let i = 0; i < this.state.fieldData.length; i++)
        {
            let field = this.state.fieldData[i];
            let formItem = {}
            formItem[field.fieldName] = (field.defaultValue === undefined || field.defaultValue == null) ? "" : field.defaultValue;
            this.props.form.setFieldsValue(formItem);
        }
    }
    handleSubmit = (e) =>
    {
        e.preventDefault();
        let _this = this;
        this.props.form.validateFields((err, values) =>
        {
            if (!err)
            {
                for (let i = 0; i < this.state.fieldData.length; i++)
                {
                    let field = this.state.fieldData[i];
                    _this.state.submitAction[field.fieldName] = values[field.fieldName];
                }
                sendAction2Business(_this.state.submitAction, function (json)
                {
                    _this.state.submitCallback(json);
                    for (let i = 0; i < _this.state.fieldData.length; i++)
                    {
                        let field = _this.state.fieldData[i];
                        let formItem = {}
                        formItem[field.fieldName] = "";
                        _this.props.form.setFieldsValue(formItem);
                    }

                })
            }
        });
    };

    renderFormItem(fieldData)
    {
        const {getFieldDecorator} = this.props.form;
        const formItems = [];
        for (let i = 0; i < fieldData.length; i++)
        {
            let field = fieldData[i];
            var fieldLabel = field.fieldLabel;
            formItems.push(
                <FormItem key={'key_'+field.key} label={fieldLabel}>
                    {getFieldDecorator(field.fieldName, {
                        rules: [{required: true, message: field.errorMsg, whitespace: true}],
                    })(
                        <Input placeholder={field.placeholder}/>//ref
                    )}
                </FormItem>
            );
        }
        return formItems;
    };
    render()
    {
        const {layout,fieldData} = this.props;
        const {showButton} = this.state;
        return (
            <div>
                <Form layout={layout == null ? 'inline' : layout} style={{width: '100%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                    {this.renderFormItem(fieldData)}
                    {showButton ?
                        <FormItem>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </FormItem>
                        : ""
                    }
                </Form>
            </div>
        )
    }
}

const StringFieldFormExport = Form.create()(StringForm);

export default StringFieldFormExport