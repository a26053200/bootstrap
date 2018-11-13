import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import $ from 'jquery';
import './style.css';
import AppConfig from '../../configs/AppConfig'
import AppData from '../../AppData'
import svgpath from 'svgpath';
import qr from 'qr-image';

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            QR_code: '',
            qrPath: '',
            qrPath: ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();


        //请求扫码登录
        console.log("Request login QR code:" + AppConfig.hostUrl);
        var _this = this
        //发送数据时 用JSON.stringify转换一下
        $.post(AppConfig.hostUrl, JSON.stringify(AppConfig.Rqst_QR_Code),
            function (result, status) {
                if (result) {
                    var json = JSON.parse(result);
                    var code = json.data.scan_id;
                    const originPath = qr.svgObject(code).path; //  获得二维码的绘制路径
                    _this.setState({
                        QR_code: code,
                        qrPath: originPath
                    });
                    console.log("rspd code:" + json.data.scan_id);
                    _this.timerID = setInterval(
                        () => _this.loginRqst(),
                        2000
                    );
                } else {
                    console.log("ajax rspd code:" + status);
                }
            });
    }

    loginRqst = () => {
        //请求登录
        var _this = this;
        AppConfig.Scan_Login.scan_id = this.state.QR_code;
        //发送数据时 用JSON.stringify转换一下
        $.post(AppConfig.hostUrl, JSON.stringify(AppConfig.Scan_Login),
            function (result, status) {
                if (result) {
                    var json = JSON.parse(result);
                    var scanState = json.data.scan_state;
                    if(scanState == "Fail" || scanState == "Success")
                    {
                        clearInterval(_this.timerID);
                        //保存玩家信息
                        AppData.sellerInfo = json.data.seller_info;
                        AppData.token = json.data.token

                        //跳转到主页
                        const {from} = _this.props.location.state || {from: {pathname: '/'}}
                        _this.props.history.push(from);
                    }
                    console.log("scanState:" + scanState);
                } else {
                    console.log("scanState:" + status);
                }
            });
    }

    render() {
        const {QR_code, qrPath} = this.state;
        return (
            <div className="login-form-container">
                <span>{QR_code}</span>
                <div id="qrcode" className="login-qrcode">
                    <svg width="100%" height="100%" transform="scale(2)">
                        <path d={qrPath ? qrPath : null}/>
                    </svg>
                </div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            使用微信小程序登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Login;