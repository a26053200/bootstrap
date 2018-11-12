import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import $ from 'jquery';
import './style.css';
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
        //const {from} = this.props.location.state || {from: {pathname: '/'}}
        //this.props.history.push(from);

        //请求扫码登录
        const srvUrl = "http://127.0.0.1:8090/";
        var data = {};
        data.server = "BusinessServer";
        data.action = "seller@web_rqst_login_QR_code";
        console.log("Request login QR code:" + srvUrl);
        var _this = this
        //发送数据时 用JSON.stringify转换一下
        $.post(srvUrl, JSON.stringify(data),
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
        const srvUrl = "http://127.0.0.1:8090/";
        var data = {};
        data.server = "BusinessServer";
        data.action = "seller@web_login";
        data.scan_id = this.state.QR_code;
        //发送数据时 用JSON.stringify转换一下
        $.post(srvUrl, JSON.stringify(data),
            function (result, status) {
                if (result) {
                    var json = JSON.parse(result);
                    var scanState = json.data.scan_state;
                    if(scanState == "Fail" || scanState == "Success")
                    {
                        clearInterval(_this.timerID);
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