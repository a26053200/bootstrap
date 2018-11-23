import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Form, Input, Button} from 'antd';
import AppConfig from "../../configs/AppConfig";
import './style.css';
import {sendAction2Business} from "../../utils/Net";
import NormalTable from "../../components/Tables/NormalTable";
import StringFieldForm from "../../components/Forms/StringForm";


class SpecValueList extends Component {
    constructor(props)
    {
        console.log("SpecValueList constructor record.id:" + props.specId);
        super(props);
        this.state = {
            specId: props.specId,
            formData :
                {
                    listAction:
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

    onAddHandleSubmit = (e) =>
    {
        this.refs.specValueTable.getDataList();
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
        sendAction2Business(AppConfig.Del_Spec_Value, function ()
        {
            callback();
        })
    };

    render() {
        const {formData,specId} = this.state;
        const Columns =
            [
                {
                    title: 'id',
                    dataIndex: 'id',
                },
                {
                    title: '规格值',
                    dataIndex: 'value',
                }
            ];
        const fieldData =
            [
                {
                    key: 1,
                    fieldName: "value",
                    fieldLabel: "规格值",
                    errorMsg: "规格值不能为空!",
                    placeholder: "请输入规格值"
                }
            ];
        return (
            <div>
                <NormalTable
                    ref = "specValueTable"
                    bordered = {true}
                    showHeader = {false}
                    columns={Columns}
                    formData={formData}
                />
                <StringFieldForm
                    submitAction={
                        {
                            action:AppConfig.Add_Spec_Value.action,
                            specId:specId,
                        }
                    }
                    submitCallback={this.onAddHandleSubmit}
                    fieldData={fieldData}
                />
            </div>
        )
    }
}
const SpecValueListForm = Form.create()(SpecValueList);

export default SpecValueListForm;
