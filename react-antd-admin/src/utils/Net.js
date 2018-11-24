import $ from "jquery";
import AppConfig from "../configs/AppConfig";

const hostUrl = AppConfig.hostUrl;

/**
 * 想业务服务器发送书数据
 * @param actionData
 * @param callback
 */
export function sendAction2Business(action, actionData, callback)
{
    if( typeof(actionData) === 'function')
    {
        callback = actionData
        actionData = {}
    }
    actionData.server = "BusinessServer";
    actionData.action = action;
    actionData.client = "web";
    console.log("[send]" + JSON.stringify(actionData));
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
