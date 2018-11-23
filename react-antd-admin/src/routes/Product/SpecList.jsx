import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Form, Input, Table, Button, Popconfirm, Divider} from 'antd';
import MyBreadcrumb from "../../components/MyBreadcrumb/index";
import AppConfig from "../../configs/AppConfig";
import AppData from "../../AppData";
import SpecValueList from '../../routes/Product/SpecValueList';
import {sendAction} from '../../utils/Net';
import NormalTable from "../../components/Tables/NormalTable";

const FormItem = Form.Item;

class SpecList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            formData:
                {
                    listAction:
                    {
                        server : AppConfig.Get_Spec_List.server,
                        action : AppConfig.Get_Spec_List.action
                    },
                    listCallback: this.OnGetSpecList,
                    modCallback: this.onModify,
                    delCallback: this.onDelete,
                }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    OnGetSpecList = (json) =>
    {
        let list = json.data.beanList;
        AppData.specList = list;
        return list;
    };

    handleSubmit = (e) =>
    {
        e.preventDefault();
        let _this = this;
        this.props.form.validateFields((err, values) =>
        {
            if (!err)
            {
                AppConfig.Add_Spec.name = values.specName;
                AppConfig.Add_Spec.number = values.specNumber;
                sendAction(AppConfig.Add_Spec, function (json)
                {
                    _this.refs.specTable.getDataList();
                    //_this.refs.input_add.val('')
                    //_this.refs.input_number.val('')
                    //_this.getSpecList();
                })
            }
        });
    };

    onModify = (record, callback) =>
    {
        let _this = this;
    };

    onDelete = (record, callback) =>
    {
        let _this = this;
        //弹出确认框
        AppConfig.Del_Spec.id = record.id
        sendAction(AppConfig.Del_Spec, function ()
        {
            _this.refs.specTable.getDataList();
            callback();
        })
    };

    //详情表格
    expandedRowRender = (record, index, indent, expanded) =>
    {
        let specId = record.id;
        if(expanded)
        {
            return (
                <SpecValueList specId={specId} style={{margin: 0}}/>
            );
        }

    };

    render()
    {
        const {getFieldDecorator} = this.props.form;
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
        return (
            <div>
                <MyBreadcrumb paths={paths}/>
                <Form layout='inline' style={{width: '100%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                    <FormItem label='规格名称'>
                        {getFieldDecorator('specName', {
                            rules: [{required: true, message: '规格名称不能为空!', whitespace: true}],
                        })(
                            <Input/>//ref
                        )}
                    </FormItem>
                    <FormItem label='规格型号'>
                        {getFieldDecorator('specNumber', {
                            rules: [{required: true, message: '规格型号不能为空!', whitespace: true}],
                        })(
                            <Input/>//ref
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">Add</Button>
                    </FormItem>
                </Form>
                <NormalTable
                    ref="specTable"
                    columns={Columns}
                    expandedRowRender={this.expandedRowRender}
                    formData={formData}
                />
            </div>
        )
    }
}

const SpecListForm = Form.create()(SpecList);

export default SpecListForm;
