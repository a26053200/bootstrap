import React, {Component} from 'react'
import {Button, Modal, Form, Input, Radio} from 'antd';
import StringFieldForm from "./StringForm";

class ModalStringForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
            {
                visible : props.visible,
                fieldData:props.fieldData,
                onOk:props.onOk,
                onCancel:props.onCancel
            }
    }

    handleOk()
    {
        let params = [];
        for (let i = 0; i < this.state.fieldData.length; i++)
            params.push(this.refs.stringForm.getFieldValue(this.state.fieldData[i].fieldName));
        this.state.onOk(...params);
    };
    handleCancel()
    {
        this.setState ({
            visible : false
        })
        this.state.onCancel();
    };
    render()
    {
        const {title,fieldData, handleCancel} = this.props;
        const {visible} = this.state;
        return (
            <div>
                <Modal
                    visible={visible}
                    title={title}
                    okText="提交"
                    cancelText="取消"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                >
                    <StringFieldForm
                        ref = "stringForm"
                        showButton = {false}
                        fieldData={fieldData}
                    />
                </Modal>
            </div>
        )
    }
}

export default ModalStringForm