import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import $ from 'jquery';
import './style.css';
import AppConfig from '../../configs/AppConfig'
import AppData from '../../AppData'
import QRCode from 'qrcode.react';
import {sendAction2Business} from '../../utils/Net';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            QR_code: '',
            loginCount: 0
        };
    }

    componentDidMount () {
        let _this = this;
        setTimeout(() => _this.quickLogin(),1000);
    }

    //快捷登录
    quickLogin = () => {
        console.log("start quick login..");
        let _this = this;
        sendAction2Business(AppConfig.Quick_Login,{profileId: "oqZlN5Qw3-Ch1WqidzgW9DX5uGg0"},function (json)
        {
            //保存玩家信息
            AppData.sellerInfo = json.data.seller_info;
            AppData.token = json.data.token;
            //跳转到主页
            const {from} = _this.props.location.state || {from: {pathname: '/index'}};
            _this.props.history.push(from);
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        //请求扫码登录
        console.log("Request login QR code:" + AppConfig.hostUrl);
        let _this = this;
        //发送数据时 用JSON.stringify转换一下
        $.post(AppConfig.hostUrl, JSON.stringify(AppConfig.Rqst_QR_Code),
            function (result, status) {
                if (result) {
                    let json = JSON.parse(result);
                    let code = json.data.scan_id;
                    _this.setState({
                        QR_code: code,
                        loginCount: 0
                    });
                    console.log("rspd code:" + json.data.scan_id);
                    _this.timerID = setInterval(() => _this.loginRqst(), 2000);
                } else {
                    console.log("ajax rspd code:" + status);
                }
            });
    };

    loginRqst = () => {
        //请求登录
        let _this = this;
        this.setState({
            loginCount : this.state.loginCount + 1,
        });
        if (this.state.loginCount >= 20)
        {//登录超时
            clearInterval(_this.timerID);
            console.log("login timeout");
            return
        }
        AppConfig.Scan_Login.scan_id = this.state.QR_code;
        //发送数据时 用JSON.stringify转换一下
        $.post(AppConfig.hostUrl, JSON.stringify(AppConfig.Scan_Login),
            function (result, status) {
                if (result) {
                    let json = JSON.parse(result);
                    let scanState = json.data.scan_state;
                    if(scanState === "Fail" || scanState === "Success")
                    {
                        clearInterval(_this.timerID);
                        //保存玩家信息
                        AppData.sellerInfo = json.data.seller_info;
                        AppData.token = json.data.token;

                        //跳转到主页
                        const {from} = _this.props.location.state || {from: {pathname: '/index'}};
                        _this.props.history.push(from);
                    }
                    console.log("scanState:" + scanState);
                } else {
                    console.log("scanState:" + status);
                }
            });
    };

    //保存卖家登录信息
    storeSellerInfo = () => {

    };

    //显示微信二维码
    showMP_QRCode = () => {
        console.log("显示微信二维码")
    };

    render() {
        const {handleSubmit,showMP_QRCode} = this;
        const {QR_code} = this.state;
        if (QR_code === '')
        {
            return (
                <div className="login-container">
                    <div className="login-form">
                        <Button type="primary" onClick={handleSubmit} className="login-form-button">
                            点击获取二维码
                        </Button>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="login-container">
                    <div className="login-qrcode">
                        <div className="login-qrcode-header">
                            手机扫码，安全登录
                        </div>
                        <div id="qrcode" className="login-qrcode-code">
                            <QRCode value={QR_code}/>
                        </div>
                        <div className="login-qrcode-bottom">
                            打开微信小程序
                            <a onClick={showMP_QRCode} className="login-qrcode-mp">"小鞋城"</a><br/>
                            扫一扫登录
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Login;