import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Form, Input, Table, Button, Popconfirm, Divider} from 'antd';
import MyBreadcrumb from "../../components/MyBreadcrumb/index";
import AppConfig from "../../configs/AppConfig";
import AppData from "../../AppData";
import SpecValueList from '../../routes/Product/SpecValueList';
import {sendAction} from '../../utils/Net';

const FormItem = Form.Item;

class SpecList extends Component
{


    constructor(props)
    {
        super(props);
        this.state = {
            specList: [],
        };
    }

    componentDidMount()
    {
        let _this = this;
        _this.getSpecList();
    }

    //获取品牌列表
    getSpecList = () =>
    {
        let _this = this;
        sendAction(AppConfig.Get_Spec_List, function (json)
        {
            AppData.specList = json.data.spec_list;
            _this.setState({
                specList: json.data.spec_list
            })
        })
    };

    handleSubmit = (e) =>
    {

        e.preventDefault();
        this.props.form.validateFields((err, values) =>
        {
            AppConfig.Add_Spec.name = values.specName;
            sendAction(AppConfig.Add_Spec, function (json)
            {
                _this.getSpecList();
            })
        });
    };

    onModifyName = (record) =>
    {
        let _this = this;
        AppConfig.Mod_Spec.name = record.name;
        sendAction(AppConfig.Mod_Spec, function (json)
        {
            _this.getSpecList();
        })
    };

    onModifyNumber = (record) =>
    {
        let _this = this;
        AppConfig.Mod_Spec.name = record.name;
        sendAction(AppConfig.Mod_Spec, function (json)
        {
            _this.getSpecList();
        })
    };

    onDelete = (record) =>
    {
        let _this = this;
        AppConfig.Del_Spec.id = record.id;
        sendAction(AppConfig.Del_Spec, function (json)
        {
            _this.getSpecList();
        })
    };

    render()
    {
        const {getFieldDecorator} = this.props.form;
        const {specList} = this.state;
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
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (record) =>
                        <span>
                            <a href="javascript:;" name="modify" onClick={() => this.onModify(record)}>修改</a>
                            <Divider type="vertical"/>
                            <a href="javascript:;" name="delete" onClick={() => this.onDelete(record)}>删除</a>
                        </span>
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
                <Table
                    columns={Columns}
                    expandedRowRender={record => <SpecValueList specId={record.id} style={{margin: 0}}/>}
                    dataSource={specList}
                    size='small'
                />
            </div>
        )
    }
}

const SpecListForm = Form.create()(SpecList);

export default SpecListForm;