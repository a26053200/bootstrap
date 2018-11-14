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
    // Login Action
    //===============
    /**
     * 测试用快捷登录
     */
    Quick_Login:
        {
            server: "BusinessServer",
            action: "seller@web_login",
            profileId: "245314304004329472"
        },

    /**
     * 获取二维码
     */
    Rqst_QR_Code:
        {
            server: "BusinessServer",
            action: "seller@web_rqst_login_QR_code"
        },

    /**
     * 扫码登录
     */
    Scan_Login:
        {
            server: "BusinessServer",
            action: "seller@web_scan_login",
        },

    //===============
    // Product Action
    //===============
    /**
     * 添加品牌
     */
    Product_Add_Brand:
        {
            server: "BusinessServer",
            action: "product@add_brand"
        },
};
export default AppConfig;