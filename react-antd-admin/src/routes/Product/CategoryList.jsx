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
        this.state = {

        };
    }

    render()
    {
        const paths = this.props.match.params.path.split(",");
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
                <MyBreadcrumb paths={paths}/>
                <AttributeTable
                    columns={columns}
                    fieldData={fieldData}
                    addAction={AppConfig.Add_Category}
                    delAction={AppConfig.Del_Category}
                    listAction={{action: AppConfig.Get_Category_List}}
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
                />
            </div>
        )
    }
}
const CategoryListForm = Form.create()(CategoryList);

export default CategoryListForm;
