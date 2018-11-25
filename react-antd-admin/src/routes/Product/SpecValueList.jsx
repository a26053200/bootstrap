import React, {Component} from 'react'
import 'antd/dist/antd.css';
import AppConfig from "../../configs/AppConfig";
import {sendAction2Business} from "../../utils/Net";
import AttributeTable from "../../components/Tables/AttributeTable";

class SpecValueList extends Component
{
    constructor(props)
    {
        console.log("SpecValueList constructor record.id:" + props.specId);
        super(props);
        this.state = {
            specId: props.specId
        };
    }

    render()
    {
        const {formData, visible, specId, defaultField} = this.state;
        const columns =
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
                <AttributeTable
                    showHeader={false}
                    columns={columns}
                    fieldData={fieldData}
                    addAction={{action: AppConfig.Add_Spec_Value, specId: specId}}
                    delAction={{action: AppConfig.Del_Spec_Value, specId: specId}}
                    listAction={{action: AppConfig.Get_Spec_Value_List, specId: specId}}
                    getDefaultField={(record) =>
                    {
                        return {
                            value: record.value
                        }
                    }}
                    onFieldsModify={(record, fields, callback) =>
                    {
                        if (fields.value !== record.value)
                        {
                            console.log("handleModify", fields.value);
                            sendAction2Business(AppConfig.Mod_Spec_Value,
                                {id: record.id, specId: specId, value: fields.value},
                                function ()
                                {
                                    callback();
                                })
                        }
                    }}
                />
            </div>
        )
    }
}

export default SpecValueList;
