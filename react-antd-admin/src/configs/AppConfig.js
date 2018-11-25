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
    token: null,

    //===============
    // Login Action
    //===============
    /**
     * 测试用快捷登录
     */
    Quick_Login: "seller@web_quick_login",

    /**
     * 获取二维码
     */
    Rqst_QR_Code: "seller@web_rqst_login_QR_code",

    /**
     * 扫码登录
     */
    Scan_Login: "seller@web_scan_login",

    //===============
    // Product Action
    //===============
    /**
     * 品牌列表
     */
    Get_Brand_List: "brand@list_brand",

    /**
     * 添加品牌
     */
    Add_Brand: "brand@add_brand",

    /**
     * 删除品牌
     */
    Del_Brand: "brand@del_brand",

    /**
     * 修改品牌
     */
    Mod_Brand: "brand@mod_brand",

    /**
     * 分类列表
     */
    Get_Category_List: "category@list_category",

    /**
     * 分类子列表
     */
    Get_Category_Sublist: "category@viceList_category",

    /**
     * 添加分类
     */
    Add_Category: "category@add_category",

    /**
     * 删除品牌
     */
    Del_Category: "category@del_category",

    /**
     * 修改品牌
     */
    Mod_Category: "category@mod_category",

    /**
     * 规格列表
     */
    Get_Spec_List: "spec@list_spec",

    /**
     * 添加规格
     */
    Add_Spec: "spec@add_spec",

    /**
     * 删除规格
     */
    Del_Spec: "spec@del_spec",

    /**
     * 修改规格
     */
    Mod_Spec: "spec@mod_spec",

    /**
     * 规格值列表
     */
    Get_Spec_Value_List: "specValue@viceList_specValue",

    /**
     * 添加规格值
     */
    Add_Spec_Value: "specValue@add_specValue",

    /**
     * 删除规格值
     */
    Del_Spec_Value: "specValue@del_specValue",

    /**
     * 修改规格值
     */
    Mod_Spec_Value: "specValue@mod_specValue"
};
export default AppConfig;