import React, {Component} from 'react'
import 'antd/dist/antd.css';
import MyBreadcrumb from "../../components/MyBreadcrumb/index";
import AppConfig from "../../configs/AppConfig";
import {sendAction2Business} from "../../utils/Net";
import AttributeTable from "../../components/Tables/AttributeTable";

class BrandList extends Component
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
                    title: '品牌',
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
                    fieldLabel: "品牌",
                    errorMsg: "品牌名称不能为空!",
                    placeholder: "请输入品牌名称"
                }
            ];

        return (
            <div>
                <MyBreadcrumb paths={paths}/>
                <AttributeTable
                    columns={columns}
                    fieldData={fieldData}
                    addAction={AppConfig.Add_Brand}
                    delAction={AppConfig.Del_Brand}
                    listAction={{action: AppConfig.Get_Brand_List}}
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
                            sendAction2Business(AppConfig.Mod_Brand,
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

export default BrandList;