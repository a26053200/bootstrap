import $ from "jquery";
import AppConfig from "../configs/AppConfig";

const hostUrl = AppConfig.hostUrl;

/**
 * 想业务服务器发送书数据
 * @param actionData
 * @param callback
 */
export function sendAction2Business(actionData, callback)
{
    console.log("[send]" + JSON.stringify(actionData));
    actionData.server = "BusinessServer";
    actionData.client = "web";
    let _this = this;
    $.post(hostUrl, JSON.stringify(actionData),
        function (result, status)
        {
            if (result)
            {
                let json = JSON.parse(result);
                console.log("[recv]" + JSON.stringify(json));
                callback(json);
            } else
            {
                console.log("Send action fail:" + status);
            }
        });
};
