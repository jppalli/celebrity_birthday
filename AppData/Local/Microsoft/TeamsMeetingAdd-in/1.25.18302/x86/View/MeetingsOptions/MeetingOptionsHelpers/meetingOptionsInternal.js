window.external = {
    getAadCurrentUser: async (successCallback, errorCallback) => {
        if (!successCallback || !errorCallback) {
            return;
        }
        const dataProvider = chrome.webview.hostObjects.dataProvider;
        let responseString = await dataProvider.getAadCurrentUser();
        var aadUserInfo = JSON.parse(responseString);
        if (aadUserInfo.success) {
            successCallback(aadUserInfo.success);
        }
        else if (aadUserInfo.error) {
            errorCallback(aadUserInfo.error);
        }
    },
    getAadToken: async (successCallback, errorCallback, resource, claim) => {
        if (!successCallback || !errorCallback) {
            return;
        }
        const dataProvider = chrome.webview.hostObjects.dataProvider;
        var aadRequestJson = {
            resource: resource        }

        var json = JSON.stringify(aadRequestJson);
        let responseString = await dataProvider.getAadToken(resource);
        var response = JSON.parse(responseString);
        if (response.success) {
            successCallback(response.success);
        }
        else if (response.error) {
            errorCallback(response.error);
        }
     },    
        //this.log("meetingOptionsScript: requesting meetingOptions aad token", this.logType.LogInfo);
        //webkit.messageHandlers.listener.postMessage({ "event": "getAadToken", "requestId": this.requestId++, "resource": resource, });
    getRecipients: async (successCallback, errorCallback) => {
        if (!successCallback || !errorCallback) {
            return;
        }
        const dataProvider = chrome.webview.hostObjects.dataProvider;
        let responseString = await dataProvider.GetRecipients();
        var response = JSON.parse(responseString);
        if (response.success != undefined) {
            successCallback(response.success);
        }
        else if (response.error) {
            errorCallback(response.error);
        }
    },
    sendPresenters: async (presenterJson) => {
        const dataProvider = chrome.webview.hostObjects.dataProvider;
        dataProvider.sendPresenters(presenterJson);
    },

    getSensitivityLabelId: async (successCallback, errorCallback) => {
        if (!successCallback || !errorCallback) {
            return;
        }
        const dataProvider = chrome.webview.hostObjects.dataProvider;
        let responseString = await dataProvider.getSensitivityLabelId();
        var response = JSON.parse(responseString);
        if (response.success != undefined) {
            successCallback(response.success);
        }
        else if (response.error) {
            errorCallback(response.error);
        }
    },

    sendSensitivityLabelId: async (sensitivityLabelId) => {
        const dataProvider = chrome.webview.hostObjects.dataProvider;
        dataProvider.setSensitivityLabel(sensitivityLabelId);
    },

    sendMeetingOptionsData: async (meetingOptionsData) => {
        const dataProvider = chrome.webview.hostObjects.dataProvider;
        dataProvider.sendMeetingOptionsData(meetingOptionsData);
    },

    getClientRecipientInfo: async (successCallback, errorCallback) => {
        if (!successCallback || !errorCallback) {
            return;
        }
        const dataProvider = chrome.webview.hostObjects.dataProvider;
        let responseString = await dataProvider.getRecipientMetadataAsync();
        var response = JSON.parse(responseString);
        if (response.success != undefined) {
            successCallback(response.success);
        }
        else if (response.error) {
            errorCallback(response.error);
        }
    },
};

async function handleAadCurrentUser(data, origin) {
    const dataProvider = chrome.webview.hostObjects.dataProvider;
    let responseString = await dataProvider.getAadCurrentUser();
    var aadUserInfo = JSON.parse(responseString);

    if (aadUserInfo.error) {
        console.log("handleAadCurrentUser parse failed");
    }

    const parsedUser = JSON.parse(aadUserInfo.success);
    const payload = {
        eventId: data.payload.eventId,
        correlationId: data.payload.correlationId,
        payload: {
            authUser: {
                isAuthenticated: true,
                profile: {
                    oid: parsedUser?.oid ?? undefined,
                    tid: parsedUser?.tid ?? "",
                    upn: parsedUser?.upn ?? ""
                }
            },
            correlationId: data.payload.correlationId,
        },
        channel: data.channel,
        origin,
        metaData: {
            correlationId: data.payload.correlationId,
            source: "browserWindow",
            destination: {
                channel: data.payload.eventId,
                processIds: []
            }
        }
    }

    window.postMessage(payload);
}

const eventHandlers = {
    "aadCurrentUser": handleAadCurrentUser,
    "aadGetToken": handleAadGetToken,
    "moreOptionsButtonClick": handleMoreOptionsButtonClick
};

async function handleMessage(event) {
    console.log("Received event from meeting options page");
    if (event.data?.channel !== "multi-window-manager-channel") {
        return;
    }

    const eventId = event.data?.payload?.eventId || "";
    if (!eventHandlers.hasOwnProperty(eventId)) {
        console.log(`No handler found for event ID: ${eventId}`);
        return;
    }

    const dataProvider = chrome.webview.hostObjects.dataProvider;
    const isOriginAllowed = await dataProvider.IsAllowedOrigin(event.origin);
    if (!isOriginAllowed) {
        return;
    }

    const handler = eventHandlers[eventId];
    if (handler) {
        handler(event.data, event.origin);
    }
}

async function handleMoreOptionsButtonClick(event) {
    const dataProvider = chrome.webview.hostObjects.dataProvider;

    await dataProvider.handleMoreOptionsButtonClick();
}

window.addEventListener("message", event => {
    handleMessage(event);
})

document.addEventListener('DOMContentLoaded', () => {
    // Remove any existing focus event listeners before adding a new one
    window.removeEventListener('focus', handleFocus);

    window.addEventListener('focus', handleFocus);
});

function handleFocus() {
    const dataProvider = chrome.webview.hostObjects.dataProvider;
    dataProvider.handleRightPaneFocusEvent();
}

async function handleAadGetToken(data, origin) {
    const dataProvider = chrome.webview.hostObjects.dataProvider;

    let tokenResponseString = await dataProvider.getAadToken(data.payload.payload.resource);
    var tokenResponse = JSON.parse(tokenResponseString);

    if (!tokenResponse.success) {
        console.log("getAadToken failed");
    }

    let expiryResponseString = await dataProvider.GetExpiryTimestamp(tokenResponse.success || "");
    var expiryResponse = JSON.parse(expiryResponseString);

    if (!expiryResponse.success) {
        console.log("GetExpiryDate failed");
    }

    const finalPayload = {
        eventId: data.payload.eventId,
        correlationId: data.payload.correlationId,
        payload: {
            token: tokenResponse?.success || "",
            expiry: Number(expiryResponse.success),
            correlationId: data.payload.correlationId,
        },
        channel: "multi-window-manager-channel",
        origin,
        metaData: {
            correlationId: data.payload.correlationId,
            source: "browserWindow",
            destination: {
                channel: data.payload.eventId,
                processIds: [],
            },
        },
    };
    window.postMessage(finalPayload);
}