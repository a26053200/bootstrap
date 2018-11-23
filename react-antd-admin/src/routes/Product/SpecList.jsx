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

const FormItem = Form.Item;

class SpecList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            visible:false,
            handleModify: null,
            formData:
                {
                    listAction:
                        {
                            server: AppConfig.Get_Spec_List.server,
                            action: AppConfig.Get_Spec_List.action
                        },
                    listCallback: this.OnGetSpecList,
                    modCallback: this.onShowModify,
                    delCallback: this.onDelete,
                }
        };
    }

    OnGetSpecList = (json) =>
    {
        let list = json.data.beanList;
        AppData.specList = list;
        return list;
    };

    onAddHandleSubmit = (json) =>
    {
        this.refs.specTable.getDataList();
    };

    onShowModify = (record, callback) =>
    {
        console.log("onShowModify")
        let _this = this;
        this.setState({ visible: true });
        this.state.handleModify = (name,number) =>
        {
            AppConfig.Mod_Spec.name = name;
            AppConfig.Mod_Spec.number = number;
            sendAction2Business(AppConfig.Mod_Spec, function ()
            {
                callback();
            })
        };
    };

    handleCancel = () => {};

    onDelete = (record, callback) =>
    {
        let _this = this;
        //弹出确认框
        AppConfig.Del_Spec.id = record.id
        sendAction2Business(AppConfig.Del_Spec, function ()
        {
            _this.refs.specTable.getDataList();
            callback();
        })
    };

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
        const {formData} = this.state;
        const paths = this.props.match.params.path.split(",");
        const Columns =
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
                <StringFieldForm
                    submitAction={AppConfig.Add_Spec}
                    submitCallback={this.onAddHandleSubmit}
                    fieldData={fieldData}
                />
                <NormalTable
                    ref="specTable"
                    pagination = "Bottom"
                    columns={Columns}
                    expandedRowRender={this.expandedRowRender}
                    formData={formData}
                />
                <ModalStringForm
                    visible={this.state.visible}
                    fieldData={fieldData}
                    onCancel={this.handleCancel}
                    onOk={this.state.handleModify}
                />
            </div>
        )
    }
}

const SpecListForm = Form.create()(SpecList);

export default SpecListForm;
