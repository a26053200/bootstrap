import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Form, Input, Button} from 'antd';
import AppConfig from "../../configs/AppConfig";
import './style.css';
import {sendAction} from "../../utils/Net";
import NormalTable from "../../components/Tables/NormalTable";
import AppData from "../../AppData";

const FormItem = Form.Item;


class SpecValueList extends Component {
    constructor(props)
    {
        console.log("SpecValueList constructor record.id:" + props.specId);
        super(props);
        this.state = {
            specId: props.specId,
            formData :
                {
                    listRqstData:
                        {
                            server : AppConfig.Get_Spec_Value_List.server,
                            action : AppConfig.Get_Spec_Value_List.action,
                            specId : props.specId
                        },
                    listCallback: this.OnGetSpecValueList,
                    modCallback: this.onModify,
                    delCallback: this.onDelete,
                }
        };
    }

    OnGetSpecValueList = (json) =>
    {
        let list =  json.data.beanList;
        return list;
    };

    handleSubmit = (e) =>
    {
        e.preventDefault();
        let _this = this;
        this.props.form.validateFields((err, values) =>
        {
            if (!err) {
                AppConfig.Add_Spec_Value.specId = this.state.specId;
                AppConfig.Add_Spec_Value.value = values.specValue;
                sendAction(AppConfig.Add_Spec_Value, function (json)
                {
                    //_this.getSpecList();
                })
            }
        });
    };

    onModify = (record,callback) =>
    {
        let _this = this;
    };

    onDelete = (record,callback) =>
    {
        let _this = this;
        //弹出确认框
        AppConfig.Del_Spec_Value.id = record.id;
        sendAction(AppConfig.Del_Spec_Value, function ()
        {
            callback();
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {formData} = this.state;
        const Columns =
            [
                {
                    title: 'id',
                    dataIndex: 'id',
                },
                {
                    title: '规格值',
                    dataIndex: 'value',
                },
                // {
                //     title: '添加时间',
                //     dataIndex: 'addTime',
                // }
            ];
        return (
            <div>
                <NormalTable
                    showHeader = {false}
                    columns={Columns}
                    formData={formData}
                />
                <Form layout='inline' onSubmit={this.handleSubmit}>
                    <FormItem label='规格值'>
                        {getFieldDecorator('specValue', {
                            rules: [{required: true, message: '规格值称不能为空!', whitespace: true}],
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
const SpecValueListForm = Form.create()(SpecValueList);

export default SpecValueListForm;