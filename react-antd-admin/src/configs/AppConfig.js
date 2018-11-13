/**
 * 系统配置信息
 * @type {{}}
 */

const AppConfig = {

    /**
     * 服务器地址
     */
    hostUrl: 'http://192.168.31.244:8090/',

    /**
     * 令牌
     */
    token : null,

    //===============
    // Action
    //===============
    /**
     * 获取二维码
     */
    Rqst_QR_Code:
        {
            server: "BusinessServer",
            action: "seller@web_rqst_login_QR_code",
        },

    /**
     * 扫码登录
     */
    Scan_Login:
        {
            server: "BusinessServer",
            action: "seller@web_scan_login",
        },
};
export default AppConfig;