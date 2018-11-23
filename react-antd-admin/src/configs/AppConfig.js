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

    BusinessServer : "BusinessServer",
    //===============
    // Login Action
    //===============
    /**
     * 测试用快捷登录
     */
    Quick_Login:
        {
            action: "seller@web_quick_login",
            profileId: "oqZlN5Qw3-Ch1WqidzgW9DX5uGg0"
        },

    /**
     * 获取二维码
     */
    Rqst_QR_Code:
        {
            action: "seller@web_rqst_login_QR_code"
        },

    /**
     * 扫码登录
     */
    Scan_Login:
        {
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
            action: "brand@list_brand"
        },
    /**
     * 添加品牌
     */
    Add_Brand:
        {
            action: "brand@add_brand"
        },
    /**
     * 品类列表
     */
    Get_Category_List:
        {
            action: "category@list_category"
        },
    /**
     * 添加品类
     */
    Add_Category:
        {
            action: "category@add_category"
        },
    /**
     * 规格列表
     */
    Get_Spec_List:
        {
            action: "spec@list_spec"
        },
    /**
     * 添加规格
     */
    Add_Spec:
        {
            action: "spec@add_spec"
        },
    /**
     * 删除规格
     */
    Del_Spec:
        {
            action: "spec@del_spec"
        },
    /**
     * 修改规格
     */
    Mod_Spec:
        {
            action: "spec@mod_spec"
        },
    /**
     * 规格值列表
     */
    Get_Spec_Value_List:
        {
            action: "specValue@viceList_specValue"
        },
    /**
     * 添加规格值
     */
    Add_Spec_Value:
        {
            action: "specValue@add_specValue"
        },
    /**
     * 删除规格值
     */
    Del_Spec_Value:
        {
            action: "specValue@del_specValue"
        },
    /**
     * 修改规格值
     */
    Mod_Spec_Value:
        {
            action: "specValue@mod_specValue"
        },
};
export default AppConfig;