_perfData.appJsExecutionStart = performance.now();

var _bodyOnLoadCalled = false;
var _fHiddenMode = false;
var _fFirstBtnClicked = false;
var _fAppCmdExecuteActionCalled = false;
var _LaunchHiddenActionCalled = 0;
var _pendingLogs = [];

window.addEventListener('load', function () {
    setTimeout(() => {
        Microsoft.Office.WebExtension.Interactive(true);
        _perfData.interactiveReadyTrue = performance.now();
        log('FullPerfData');
        log(JSON.stringify(_perfData));
    }, 200)
});

function BodyOnLoad() {
    _bodyOnLoadCalled = true;
    for (var i = 0; i < _pendingLogs.length; i++) {
        log(_pendingLogs[i]);
    }
}

function log(text) {
    if (!_bodyOnLoadCalled) {
        _pendingLogs.push(text);
        return;
    }
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    document.getElementById('DivLog').appendChild(div);
}

Office.onReady(function(hostAndPlatform) {
    _perfData.officeOnReadyApp = performance.now();
    _perfData.officeOnReadyAppDuration = _perfData.officeOnReadyApp - _perfData.start;
    _perfData.OfficeonReadyDate = Date.now();
    log('OnReady');
    log(JSON.stringify(_perfData));

    if (typeof(OSFPerformance) !== 'undefined') {
        log('OSFPerformance');
        log(JSON.stringify(OSFPerformance));
        var summary = {
            networkDuration: OSFPerformance.officeExecuteStart - _perfData.start,
            officeJsExecutionDuration: OSFPerformance.officeExecuteEnd - OSFPerformance.officeExecuteStart,
            officeJsStartToGetAppContext: OSFPerformance.getAppContextStart - OSFPerformance.officeExecuteStart,
            getAppContextDuration: OSFPerformance.getAppContextEnd - OSFPerformance.getAppContextStart,
            getAppContextXdmDuration: OSFPerformance.getAppContextXdmEnd - OSFPerformance.getAppContextXdmStart,
            officeOnReadyDuration: Math.max(OSFPerformance.officeExecuteEnd, OSFPerformance.officeOnReady) - OSFPerformance.officeExecuteStart,
            officeOnReadyAppDuration: _perfData.officeOnReadyAppDuration
        };
        log('Summary:');
        log(JSON.stringify(summary));
    }

    Office.addin.onVisibilityModeChanged(function(args) {
        if (args.visibilityMode == 'Taskpane') {
            if (!_fFirstBtnClicked) {
                var SdxButtonClicked = Office.context.document.settings.get('LaunchTimeMs');
                _perfData.BtnClickToVisiblityChangeDuration = Date.now() - SdxButtonClicked;
                log('BtnClickToVisiblityChangeDuration:' + _perfData.BtnClickToVisiblityChangeDuration);
                _fFirstBtnClicked = true;
            }
            _fHiddenMode = false;

            // This is a error case if the AppCmdExecuteAction is never called then Taskpane should not be visible
            if(!_fAppCmdExecuteActionCalled) {
              // send the event
              if (telemetryLogger) {
                telemetryLogger.sendTelemetryEvent({
                  eventName: 'Office.Extensibility.SDX.ExperimentationTaskpaneVisibleError',
                  eventFlags: {
                      samplingPolicy: oteljs.SamplingPolicy.Diagnostics,
                      // tslint:disable-next-line:no-bitwise
                      dataCategories: oteljs.DataCategories.ProductServiceUsage | oteljs.DataCategories.ProductServicePerformance
                  }
                });
              }
            }
        } else if (args.visibilityMode == 'Hidden') {
            _fFirstBtnClicked = true;
            _fHiddenMode = true;
        }
        log('onVisiblityModeChanged:' + args.visibilityMode);
    }).then(function() {
        log('Regisered onVisiblityModeChanged');
    }).catch(function(e) {
        log('Failed to register onVisiblityModeChanged:' + JSON.stringify(e));
    });

    if (hostAndPlatform.addin) {
        log("visibilityMode: " + hostAndPlatform.addin.visibilityMode);
        if (hostAndPlatform.addin.visibilityMode == 'Hidden') {
            _fHiddenMode = true;
        }
    } else {
        log("not a shared runtime addin");
    }

    log(Office.context.displayLanguage);
    log(hostAndPlatform.host);
    log(hostAndPlatform.platform);
    var isSupported = Office.context.requirements.isSetSupported('ExcelApi', '1.7');
    log('ExcelApi1.7=' + isSupported);

    if(hostAndPlatform.host === "Outlook") {
        var item_change_event_count = 0;
        function myItemSelectedChangedHandler(eventArgs) {
            log("'item change' event count : " + ++item_change_event_count);
        }

        function myItemSelectedChangedCallback(asyncResult) {
            log("'item change' event registered.");
            log("'item change' event count : 0");
        }

        if (Office.context.mailbox.addHandlerAsync) {
            Office.context.mailbox.addHandlerAsync
                (
                    Office.EventType.ItemChanged,
                    myItemSelectedChangedHandler,
                    {},
                    myItemSelectedChangedCallback
                );
        }
    }
}).catch(function(e) {
    log('Failed to register OfficeonReady:' + JSON.stringify(e));
});

Office.onReady(function(hostAndPlatform) {
    log('[SecondOnReady] platform=' + hostAndPlatform.platform);
});

function BtnRunClick() {
    var code = document.getElementById("TxtCode").value;
    eval(code);
}

function BtnReloadClick() {
    window.location.reload(true);
}

function BtnTestClick() {
    var context = new Excel.RequestContext();
    var sheet = context.workbook.worksheets.getItem('Sheet1');
    var r = sheet.getRange('A1');
    var text = 'Hello' + Math.random();
    r.values = [
        [text]
    ];
    context.sync()
        .then(function() {
            log('Done');
            log(sheet.id);
        })
        .catch(function(ex) {
            log(JSON.stringify(ex));
        });
}

function BtnTestGetPerfInfo() {
    _perfData.SdxButtonClicked = Office.context.document.settings.get('LaunchTimeMs');
    log('_perfData');
    log(JSON.stringify(_perfData));
}

function BtnTest2Click() {
    var context = new Excel.RequestContext();
    var sheet = context.workbook.worksheets.getItem('Sheet1');
    var r = sheet.getRange('A1:C20');
    var text = 'Hello' + Math.random();
    r.values = text;
    r.load();
    context.sync()
        .then(function() {
            log('Done');
            log(sheet.id);
            log(JSON.stringify(r));
        })
        .catch(function(ex) {
            log(JSON.stringify(ex));
        });
}

function BtnTestEventClick() {
    Excel.run(function(ctx) {
        var testApi = ctx.workbook.internalTest;
        var eventResult = testApi.onTestEvent.add(function(eventArgs) {
            log("Test Event triggered");
            log(JSON.stringify(eventArgs));
            return null;
        });

        var eventResult1 = testApi.onTest1Event.add(function(eventArgs) {
            log("Test Event1 triggered");
            log(JSON.stringify(eventArgs));
            return null;
        });
        return ctx.sync()
            .then(function() {
                log("Trigger events");
                testApi.triggerTestEventWithFilter(200, 1 /*Excel.MessageType.testEvent*/ , ctx.workbook.worksheets.getFirst());
                testApi.triggerTestEventWithFilter(201, 2 /*Excel.MessageType.test1Event*/ , ctx.workbook.worksheets.getFirst());
                return ctx.sync();
            })
            .then(function() {
                log("Waiting for 10 seconds...");
                return OfficeExtension.Utility._createTimeoutPromise(10000);
            })
            .then(function() {
                log("After 10 seconds, calling workbook.load()...");
                ctx.workbook.load();
                return ctx.sync();
            })
            .then(function() {
                log("After 10 seconds and sync, removing event handlers...");
                eventResult.remove()
                eventResult1.remove();
                return ctx.sync();
            })
            .then(function() {
                log("Done");
            })
            .catch(function(ex) {
                log("Error:" + JSON.stringify(ex));
            });
    });
}

function BtnTestEvent2Click() {
    Excel.run(function(ctx) {
        var worksheet;
        var eventResult;
        var eventCount = 0;

        ctx.workbook.worksheets.load();
        return ctx.sync()
            .then(function() {
                if (ctx.workbook.worksheets.items.length < 2) {
                    ctx.workbook.worksheets.add();
                    ctx.workbook.worksheets.load();
                }
                return ctx.sync();
            })
            .then(function() {
                worksheet = ctx.workbook.worksheets.getFirst(true);

                // Register event
                eventResult = worksheet.onActivated.add(
                    function() {
                        eventCount++;
                        log("WorksheetActivatedEvent fired - eventCount=" + eventCount);
                        return null;
                    });
                log("Add event");
                return ctx.sync();
            })
            .then(function() {
                // Activate the last sheet.
                log("activate the last visible sheet");
                var lastsheet = ctx.workbook.worksheets.getLast(true);
                lastsheet.activate();
                return ctx.sync();
            })
            .then(function() {
                // Activate the first sheet.
                log("activate the first visible sheet");
                worksheet.activate();
                return ctx.sync();
            })
            .then(function() {
                log("Wait for 2 seconds");
                return OfficeExtension.Utility._createTimeoutPromise(2000);
            })
            .then(function() {
                if (eventCount !== 1) {
                    log("Event is not fired correctly");
                } else {
                    log("Event is fired correctly");
                }

                log("Remove event");
                eventResult.remove();
                return ctx.sync();
            });
    });
}

function test_settings_updateUsingV2() {
    Excel.run(function(ctx) {
        ctx.workbook.settings.add('stringKey', 'Hello');
        ctx.workbook.settings.add('intKey', 1000);
        ctx.workbook.settings.add('dateKey', new Date());
        return ctx.sync()
            .then(function() {
                log("Done");
            })
            .catch(function(ex) {
                log("Error:" + JSON.stringify(ex));
            });
    });
}

function test_settings_readV1() {
    var stringValue = Office.context.document.settings.get('stringKey');
    var intValue = Office.context.document.settings.get('intKey');
    var dateValue = Office.context.document.settings.get('dateKey');
    log(stringValue);
    log(intValue);
    log(dateValue);
}

function test_settings_updateUsingV1() {
    Office.context.document.settings.set('stringKey', 'HelloV1');
    Office.context.document.settings.set('intKey', 2000);
    var now = new Date();
    var previousDate = new Date(now);
    previousDate.setDate(now.getDate() - 2);
    Office.context.document.settings.set('dateKey', previousDate);
    Office.context.document.settings.saveAsync(function(result) {
        log('Saved:' + result.status);
        test_settings_refreshUsingV1();
    });
}

function test_settings_refreshUsingV1() {
    Office.context.document.settings.refreshAsync(function(result) {
        log('Refreshed:' + result.status);
        test_settings_readV1();
    });
}

function settingsChangedHandler() {
    log('Settings Changed');
}

function test_settings_addChangedHandler() {
    Office.context.document.settings.addHandlerAsync('settingsChanged', settingsChangedHandler, function(result) {
        log('Add SettingsChanged:' + result.status);
    });
}

function test_settings_removeChangedHandler() {
    Office.context.document.settings.removeHandlerAsync('settingsChanged', settingsChangedHandler, function(result) {
        log('Remove SettingsChanged:' + result.status);
    });
}

function BtnClearLogClick() {
    document.getElementById('DivLog').innerHTML = '';
}


function appcmdTestButton(args) {
    log('appcmdTestButton invoked');
    args.completed();
}

function setSpanText(elementId, value) {
    var txt = document.createTextNode(value);
    var span = document.getElementById(elementId);
    if (span.hasChildNodes()) {
        span.removeChild(span.childNodes[0]);
    }
    span.appendChild(txt);
}

function setActionExecuted() {
    setSpanText("ActionExecuted", 'AppCmdExecuteAction');
}

function isObject (value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

Office.actions.associate('AppCmdExecuteAction', function(arg) {
    log('Execute AppCmdExecuteAction');
    // For Testing purpose we are setting the Action Function Label
    setActionExecuted();
    _fAppCmdExecuteActionCalled = true;
    _fFirstBtnClicked = true;
    var value;

    if (isObject(arg)) {
        value = arg.LaunchTime;
    }
    else {
        value = arg;
    }

    // need to always call showasTaskpane as for multiple window scenario
    // even if the taskpane is visible we need to call native side to move Taskpane to active window.
    Office.addin.showAsTaskpane()
        .then(function() {
            _perfData.BtnClickToAppCmdShowTaskpane = Date.now() - parseInt(value);
            log('BtnClickToAppCmdShowTaskpane: ' + _perfData.BtnClickToAppCmdShowTaskpane);
        });

    var BtnClickToAppCmdExecuteAction = Date.now() - parseInt(value);
    log('BtnClickToAppCmdExecuteAction:' + BtnClickToAppCmdExecuteAction);
});

Office.actions.associate('LaunchHiddenAction', function(arg) {
    log('Execute LaunchHiddenAction');
    _fFirstBtnClicked = true;
    _LaunchHiddenActionCalled++;

    // Logging telemetry if this Hidden action is called multiple times
    if (_LaunchHiddenActionCalled >= 2) {
      // send the event
      if (telemetryLogger) {
        var dataFields =[];
        dataFields = dataFields.concat([
          oteljs.makeInt64DataField('LaunchHiddenAction', _LaunchHiddenActionCalled)
        ]);

        telemetryLogger.sendTelemetryEvent({
          eventName: 'Office.Extensibility.SDX.ExperimentationLaunchHiddenMultiple',
          eventFlags: {
              samplingPolicy: oteljs.SamplingPolicy.Diagnostics,
              // tslint:disable-next-line:no-bitwise
              dataCategories: oteljs.DataCategories.ProductServiceUsage | oteljs.DataCategories.ProductServicePerformance
          },
          dataFields: dataFields
        });
      }
    }
    var value;

    if (isObject(arg)) {
        value = arg.LaunchTime;
    }
    else {
        value = arg;
    }
    // call hide to allow creation of taskpane (if not already created) and keep it hidden
    Office.addin.hide()
        .then(function() {
            _perfData.BtnClickToHideTaskpane = Date.now() - parseInt(value);
            log('BtnClickToHideTaskpane: ' + _perfData.BtnClickToHideTaskpane);
        });

    var BtnClickToLaunchHiddenAction = Date.now() - parseInt(value);
    log('BtnClickToLaunchHiddenAction:' + BtnClickToLaunchHiddenAction);
});

_perfData.appJsExecutionEnd = performance.now();