import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Form, Input, Table, Button, Popconfirm, Divider} from 'antd';
import MyBreadcrumb from "../../components/MyBreadcrumb/index";
import AppConfig from "../../configs/AppConfig";
import AppData from "../../AppData";
import SpecValueList from '../../routes/Product/SpecValueList';
import {sendAction2Business} from '../../utils/Net';
import NormalTable from "../../components/Tables/NormalTable";
import StringFieldForm from "../../components/Forms/StringForm";
import ModalStringForm from "../../components/Forms/ModalStringForm";
import AttributeTable from "../../components/Tables/AttributeTable";

class SpecList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            visible: false,
            defaultField: [],
            handleModify: null,
            formData:
                {
                    listAction:
                        {
                            action: AppConfig.Get_Spec_List
                        },
                    listCallback: this.OnGetSpecList,
                    modCallback: this.onShowModify,
                    delCallback: this.onDelete,
                }
        };
    }

    //详情表格
    expandedRowRender = (record, index, indent, expanded) =>
    {
        let specId = record.id;
        if (expanded)
        {
            return (
                <SpecValueList specId={specId} style={{margin: 0}}/>
            );
        }

    };

    render()
    {
        const {formData, visible, defaultField} = this.state;
        const paths = this.props.match.params.path.split(",");
        const columns =
            [
                {
                    title: 'id',
                    dataIndex: 'id',
                },
                {
                    title: '规格',
                    dataIndex: 'name',
                },
                {
                    title: '规格编号',
                    dataIndex: 'number',
                },
                {
                    title: '添加时间',
                    dataIndex: 'addTime',
                }
            ];
        const fieldData =
            [
                {
                    key: 1,
                    fieldName: "name",
                    fieldLabel: "规格名称",
                    errorMsg: "规格名称不能为空!",
                    placeholder: "请输入规格名称"
                },
                {
                    key: 2,
                    fieldName: "number",
                    fieldLabel: "规格型号",
                    errorMsg: "规格名称不能为空!",
                    placeholder: "请输入规格型号"
                }
            ];
        return (
            <div>
                <MyBreadcrumb paths={paths}/>
                <AttributeTable
                    columns={columns}
                    fieldData={fieldData}
                    addAction={AppConfig.Add_Spec}
                    delAction={AppConfig.Del_Spec}
                    listAction={{action: AppConfig.Get_Spec_List}}
                    getDefaultField={(record) =>
                    {
                        return {
                            name: record.name,
                            number: record.number
                        }
                    }}
                    onFieldsModify={(record, fields, callback) =>
                    {
                        if (fields.name !== record.number && fields.number !== record.number)
                        {
                            console.log("handleModify", fields.name);
                            sendAction2Business(AppConfig.Mod_Spec,
                                {id: record.id, name: fields.name, number: fields.number},
                                function ()
                                {
                                    callback();
                                })
                        }
                    }}
                    expandedRowRender={this.expandedRowRender}
                />
            </div>
        )
    }
}

export default SpecList;
