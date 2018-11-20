import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Form, Input, Table, Button,Divider} from 'antd';
import AppConfig from "../../configs/AppConfig";
import $ from "jquery";
import AppData from "../../AppData";
import {SpecValueTableColumns} from './ProductConfig'
import './style.css';
const FormItem = Form.Item;

class SpecValueList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specId : props.specId,
            specValueList : [],
        };
    }

    componentDidMount () {
        let _this = this;
        _this.getSpecValueList();
    }

    //获取品牌列表
    getSpecValueList = () => {
        console.log("getSpecValueList..");
        let _this = this;
        AppConfig.Get_Spec_Value_List.id = this.state.specId;
        $.post(AppConfig.hostUrl, JSON.stringify(AppConfig.Get_Spec_Value_List),
            function (result, status) {
                if (result) {
                    let json = JSON.parse(result);
                    //保存玩家信息
                    AppData.specValueList = json.data.spec_list;
                    _this.setState({
                        specValueList : json.data.spec_list
                    })
                    console.log("json.data:" + JSON.stringify(json));
                } else {
                    console.log("get Spec List fail:" + status);
                }
            });
    };

    handleSubmit = (e) => {
        let _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                AppConfig.Add_Spec_Value.id = this.state.specId;
                AppConfig.Add_Spec_Value.value = values.specValue;
                $.post(AppConfig.hostUrl, JSON.stringify(AppConfig.Add_Spec_Value),
                    function (result, status) {
                        if (result) {
                            let json = JSON.parse(result);
                            console.log("json.data:" + JSON.stringify(json));
                            _this.getSpecValueList();
                        } else {
                            console.log("ajax rspd code:" + status);
                        }
                    });
            }
        });
    };

    onModify = (record) => {
        console.log(record.name)
    };

    onDelete = (record) =>{
        console.log(record.name)
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {specValueList} = this.state;
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
                            <Divider type="vertical" />
                            <a href="javascript:;" name="delete" onClick={() => this.onDelete(record)}>删除</a>
                        </span>
                }
            ];
        return (
            <div>
                <Table columns={Columns} dataSource={specValueList} size='small'/>
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