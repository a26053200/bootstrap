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
            profileId: "oqZlN5Qw3-Ch1WqidzgW9DX5uGg0"
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
     * 品牌列表
     */
    Get_Brand_List:
        {
            server: "BusinessServer",
            action: "brand@brand_list"
        },
    /**
     * 添加品牌
     */
    Add_Brand:
        {
            server: "BusinessServer",
            action: "brand@add_brand"
        },
    /**
     * 品类列表
     */
    Get_Category_List:
        {
            server: "BusinessServer",
            action: "category@category_list"
        },
    /**
     * 添加品类
     */
    Add_Category:
        {
            server: "BusinessServer",
            action: "category@add_category"
        },
    /**
     * 规格列表
     */
    Get_Spec_List:
        {
            server: "BusinessServer",
            action: "spec@spec_list"
        },
    /**
     * 添加规格
     */
    Add_Spec:
        {
            server: "BusinessServer",
            action: "spec@add_spec"
        },
    /**
     * 删除规格
     */
    Del_Spec:
        {
            server: "BusinessServer",
            action: "spec@delete_spec"
        },
    /**
     * 修改规格
     */
    Mod_Spec:
        {
            server: "BusinessServer",
            action: "spec@modfiy_spec"
        },
    /**
     * 规格值列表
     */
    Get_Spec_Value_List:
        {
            server: "BusinessServer",
            action: "spec@category_list"
        },
    /**
     * 添加规格值
     */
    Add_Spec_Value:
        {
            server: "BusinessServer",
            action: "spec@add_category"
        },
};
export default AppConfig;