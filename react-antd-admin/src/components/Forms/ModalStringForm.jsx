import React, {Component} from 'react'
import {Button, Modal, Form, Input, Radio} from 'antd';

const FormItem = Form.Item;

class ModalStringForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
            {
                fieldData: props.fieldData,
                onOk: props.onOk,
                onCancel: props.onCancel,
                submitAction: props.submitAction,
                submitCallback: props.submitCallback,
            }
    }
    componentDidMount () {
        this.props.form.setFieldsValue(this.props.defaultField);
    };

    handleOk = () =>
    {
        let _this = this;
        this.props.form.validateFields((err, values) =>
        {
            if (!err)
            {
                let params = [];
                for (let i = 0; i < values.length; i++)
                    params.push(values[i]);
                _this.state.onOk(values);
            }
        });
    };

    handleCancel = () =>
    {
        this.state.onCancel();
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
                <FormItem key={'key_' + field.key} label={fieldLabel}>
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
        const {title, layout, visible} = this.props;
        const {fieldData} = this.state;
        return (
            <div>
                <Modal
                    visible={visible}
                    destroyOnClose={true}
                    title={title}
                    okText="提交"
                    cancelText="取消"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                >
                    <Form layout={layout == null ? 'inline' : layout} style={{width: '100%', margin: '0 auto'}}>
                        {this.renderFormItem(fieldData)}
                    </Form>
                </Modal>
            </div>
        )
    }
}

const ModalStringFormExport = Form.create()(ModalStringForm);

export default ModalStringFormExport
