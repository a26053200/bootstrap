import React, {Component} from 'react'
import {sendAction2Business} from "../../utils/Net";
import NormalTable from "../../components/Tables/NormalTable";
import StringFieldForm from "../../components/Forms/StringForm";
import ModalStringForm from "../../components/Forms/ModalStringForm";

class AttributeTable extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            addAction: props.addAction,
            delAction: props.delAction,
            modAction: props.modAction,
            getDefaultField: props.getDefaultField,
            onFieldsModify: props.onFieldsModify,
            formData:
                {
                    listAction: props.listAction,
                    listCallback: this.OnGetDataList,
                    modCallback: this.onShowModify,
                    delCallback: this.onDelete,
                },
            //私有属性
            visible: false,
            handleModify: null,
        };
    }

    OnGetDataList = (json) =>
    {
        let list = json.data.beanList;
        return list;
    };

    onAddHandleSubmit = (json) =>
    {
        this.refs.normalTable.getDataList();
    };

    onShowModify = (record, callback) =>
    {
        let _this = this;
        console.log("onShowModify");
        this.state.handleModify = (fields) =>
        {
            //当属性被修改
            this.state.onFieldsModify(record, fields, callback);
            _this.setState({visible: false});
        };
        this.setState(
            {
                visible: true,
                defaultField: _this.state.getDefaultField(record)
            });

    };

    handleCancel = () =>
    {
        this.setState({visible: false});
    };

    onDelete = (record, callback) =>
    {
        let _this = this;
        //弹出确认框
        sendAction2Business(this.state.delAction, {id: record.id}, function ()
        {
            _this.refs.normalTable.getDataList();
            callback();
        })
    };

    render()
    {
        const {formData, visible, defaultField, addAction} = this.state;
        const {columns, fieldData, expandedRowRender, showHeader, pagination, defaultParams} = this.props;
        return (
            <div>
                <StringFieldForm
                    submitAction={addAction}
                    defaultParams={defaultParams}
                    submitCallback={this.onAddHandleSubmit}
                    fieldData={fieldData}
                />
                <NormalTable
                    ref="normalTable"
                    pagination={pagination}
                    showHeader={showHeader}
                    columns={columns}
                    expandedRowRender={expandedRowRender}
                    formData={formData}
                />
                {
                    visible ?
                        <ModalStringForm
                            ref="modalForm"
                            visible={visible}
                            fieldData={fieldData}
                            defaultField={defaultField}
                            onCancel={this.handleCancel}
                            onOk={this.state.handleModify}
                        />
                        : <br/>
                }

            </div>
        )
    }
}

export default AttributeTable