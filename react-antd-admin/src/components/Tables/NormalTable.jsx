import React, {Component} from 'react'
import {Form, Table, Divider, Popconfirm} from 'antd';
import 'antd/dist/antd.css';
import {sendAction2Business} from '../../utils/Net';

const FormItem = Form.Item;

class NormalTable extends Component
{
    constructor(props)
    {
        super(props);

        let columns = props.columns;
        let actionCol =
            {
                title: '操作',
                key: 'action',
                render: (record) =>
                    <span>
                        <a href="javascript:;" name="modify" onClick={() => this.onModify(record)}>修改</a>
                        <Divider type="vertical"/>
                        <Popconfirm title="确认删除该条记录"
                                    onConfirm={() => this.onDeleteConfirm(record)}
                                    onCancel={() => this.onDeleteCancel(record)}
                                    okText="确认" cancelText="取消">
                            <a href="javascript:;" name="delete">删除</a>
                        </Popconfirm>
                    </span>
            };
        columns[columns.length] = actionCol;

        this.state = {
            pagination: (props.pagination == null ? false : props.pagination),
            showHeader: (props.showHeader == null ? true : props.showHeader),
            bordered: (props.bordered == null ? false : props.bordered),
            dataList: (props.dataList != null ? props.dataList : []),       //数据
            columns: columns,   //列
            expandedRowRender: props.expandedRowRender,
            formData:           //表单数据
                {
                    //列表
                    listAction: props.formData.listAction,
                    listCallback: props.formData.listCallback,
                    //删除
                    //delRqstData: props.formData.delRqstData,
                    delCallback: props.formData.delCallback,
                    //修改
                    //modRqstData: props.formData.modRqstData,
                    modCallback: props.formData.modCallback,
                },
        };
    }

    componentDidMount()
    {
        let _this = this;
        if(_this.state.dataList.length === 0)
            _this.getDataList();
    }

    componentWillUnmount() {
        //console.log("componentWillUnmount")
        this.setState({
            dataList: []
        })
    }

    //获取数据列表
    getDataList = () =>
    {
        let _this = this;
        let formData = this.state.formData;
        sendAction2Business(formData.listAction, function (json)
        {
            let list =  json.data.beanList;
            formData.listCallback(json);
            _this.setState({
                dataList: list
            })
        })
    };

    onModify = (record) =>
    {
        let _this = this;
        this.state.formData.modCallback(record, function ()
        {
            _this.getDataList();
        })
    };

    onDeleteConfirm = (record) =>
    {
        let _this = this;
        this.state.formData.delCallback(record, function ()
        {
            _this.getDataList();
        })
    };

    onDeleteCancel = (record) =>
    {
        console.log("取消删除");
    };


    render()
    {
        const {columns, dataList, expandedRowRender,pagination,showHeader} = this.state;
        return (
            <div>
                <Table
                    showHeader = {showHeader}
                    pagination = {pagination}
                    size='small'
                    rowKey="id"
                    columns={columns}
                    expandedRowRender={expandedRowRender}
                    dataSource={dataList}/>
            </div>
        )
    }
}

export default NormalTable;
