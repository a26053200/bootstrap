import $ from "jquery";
import AppConfig from "../configs/AppConfig";

const hostUrl = AppConfig.hostUrl;

/**
 *
 * @param actionData
 * @param callback
 */
export function sendAction(actionData, callback)
{
    console.log("Send action:" + actionData.action);
    let _this = this;
    $.post(hostUrl, JSON.stringify(actionData),
        function (result, status)
        {
            if (result)
            {
                let json = JSON.parse(result);
                console.log("Json data:" + JSON.stringify(json));
                callback(json);
            } else
            {
                console.log("Send action fail:" + status);
            }
        });
};
