import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Form, Input, Table, Button} from 'antd';
import MyBreadcrumb from "../../components/MyBreadcrumb/index";
import AppConfig from "../../configs/AppConfig";
import {sendAction2Business} from '../../utils/Net';
import AttributeTable from "../../components/Tables/AttributeTable";

const FormItem = Form.Item;

class CategoryList extends Component
{
    constructor(props)
    {
        super(props);
        let MyBreadcrumbPaths = ""
        if (props.match && props.match.params && props.match.params.path)
            MyBreadcrumbPaths = this.props.match.params.path.split(",");
        this.state = {
            pid: ((props.pid === undefined || props.pid == null) ? 0 : props.pid),
            paths: MyBreadcrumbPaths
        };
    }

    //规格值
    expandedRowRender = (record, index, indent, expanded) =>
    {
        let pid = record.id;
        if (expanded)
        {
            return (
                <CategoryList pid={pid} style={{margin: 0}}/>
            );
        }

    };

    render()
    {
        const {pid, paths} = this.state;
        const columns =
            [
                {
                    title: 'id',
                    dataIndex: 'id',
                },
                {
                    title: '分类',
                    dataIndex: 'name',
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
                    fieldLabel: "分类",
                    errorMsg: "分类名称不能为空!",
                    placeholder: "请输入分类名称"
                }
            ];

        return (
            <div>
                {pid !== 0 ? <span/> : <MyBreadcrumb paths={paths}/>}
                <AttributeTable
                    columns={columns}
                    fieldData={fieldData}
                    addAction={{action: AppConfig.Add_Category, pid: pid}}
                    delAction={{action: AppConfig.Del_Category, pid: pid}}
                    listAction={{action: AppConfig.Get_Category_Sublist, pid: pid}}
                    getDefaultField={(record) =>
                    {
                        return {
                            name: record.name
                        }
                    }}
                    onFieldsModify={(record, fields, callback) =>
                    {
                        if (fields.name !== record.name)
                        {
                            console.log("handleModify", fields.name);
                            sendAction2Business(AppConfig.Mod_Category,
                                {id: record.id, name: fields.name},
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

const CategoryListForm = Form.create()(CategoryList);

export default CategoryListForm;
