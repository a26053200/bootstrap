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
            specList: [],
            formData :
                {
                    listRqstData: AppConfig.Get_Spec_List,
                    listCallback: this.OnGetSpecList,
                    modCallback: this.onModify,
                    delCallback: this.onDelete,
                }
        };
    }

    OnGetSpecList = (json) =>
    {
        let list =  json.data.beanList;
        AppData.specList = list;
        return list;
    };

    handleSubmit = (e) =>
    {
        e.preventDefault();
        this.props.form.validateFields((err, values) =>
        {
            AppConfig.Add_Spec.name = values.specName;
            sendAction(AppConfig.Add_Spec, function (json)
            {
                //_this.getSpecList();
            })
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
        AppConfig.Del_Spec.id = record.id
        sendAction(AppConfig.Del_Spec, function ()
        {
            callback();
        })
    };
    render()
    {
        const {getFieldDecorator} = this.props.form;
        const {specList,formData} = this.state;
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

                    <FormItem>
                        <Button type="primary" htmlType="submit">Add</Button>
                    </FormItem>
                </Form>
                <NormalTable
                    columns={Columns}
                    //expandedRowRender={record => <SpecValueList specId={record.id} style={{margin: 0}}/>}
                    formData = {formData}
                />
            </div>
        )
    }
}

const SpecListForm = Form.create()(SpecList);

export default SpecListForm;