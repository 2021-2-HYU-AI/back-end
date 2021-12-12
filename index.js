const AWS = require('aws-sdk');
const DOMAIN = "https://storage.googleapis.com/nugutest/";
// const DOMAIN = "https://storage.googleapis.com/uploadtts/";

exports.handler = (event, context, callback) => {
    var UtteranceParameters = new Array('soundType', 'isRecent', 'whoMade');
    let type = "";
    
    try {
        var requestBody = JSON.parse(event);
    } catch(e) {
        var requestBody = event;
    }
   
    var action = requestBody.action;
    var actionName = action.actionName;
    var parameters = action.parameters;
    
    // var soundFileName = soundType.value;
    
    /*
    try {
        var soundFileName = type.value;
    } catch(e) {
        var soundFileName = "no soundFileName";
    }
    
    if(soundFileName == null) {
        soundFileName = "no entity";
    } */
    
    /*
    try {
        var AudioPlayer = requestBody.context.supportedInterfaces.AudioPlayer;
    } catch(e) {
        var AudioPlayer = "";
    }
    
    if(AudioPlayer != "") {
        var playerActivity = AudioPlayer.playerActivity;
        var token = AudioPlayer.token;
        var offsetInMilliseconds = AudioPlayer.offsetInMilliseconds;
    } else {
        var offsetInMilliseconds = 0;
        var token = "";
        var playerActivity = "";
    } */
    
    let momOrdad = ""; // NUGU로 다시 되돌려주는 parameter
    let soundFileName = "";
    let messageMaker = "";
    let recentIs = "";
    let detailUrl = "";
    let url = "";
    let offsetInMilliseconds = 0;
    let token = "";
    
    if(actionName == "playsound") {
        type = parameters.soundType;
        soundFileName = type.value;
        
        switch (soundFileName) {
            case "엄마":
                momOrdad = soundFileName;
                detailUrl = "mom/output.m3u8";
                url = DOMAIN + detailUrl;
                break;
            case "아빠":
                momOrdad = soundFileName;
                detailUrl = "dad/output.m3u8";
                url = DOMAIN + detailUrl;
                break;
             default:
                break;
        }
        
        callbackResponseBasic(momOrdad, url, offsetInMilliseconds, token, callback);
    } /* else if(actionName == "p_m_recent") {
        type = parameters.isRecent;
        recentIs = type.value;
        
        detailUrl = "/Nolie.m3u8";
        url = DOMAIN + detailUrl;
        
        callbackResponseRecent(recentIs, url, offsetInMilliseconds, token, callback);
        
    }*/ else if(actionName == "p_m_whose") {
        type = parameters.whoMade;
        messageMaker = type.value;
        
        switch (messageMaker) {
            case '엄마':
                detailUrl = "mom/output.m3u8";
                break;
                
            case '아빠':
                detailUrl = "dad/output.m3u8";
                break;
                
            default:
                break;
        }
        // detailUrl = "B/Nolie.m3u8";
        url = DOMAIN + detailUrl;
        
        callbackResponseWhose(messageMaker, url, offsetInMilliseconds, token, callback);
    } else {
        callbackResponseBasic(momOrdad, url, offsetInMilliseconds, token, callback);
    }
    
};

function callbackResponseBasic(output, url, offsetInMilliseconds, token, callback) {
        callback(null, 
            {
                "version": "2.0",
                "resultCode": "OK",
                "output": {
                    "momOrdad": output
                },
                "directives": [
                    {
                        "type": "AudioPlayer.Play",
                        "audioItem": {     
                            "stream": {
                                "url": url,
                                "offsetInMilliseconds": offsetInMilliseconds,
                                "progressReport": {
                                    "progressReportDelayInMilliseconds": 0,
                                    "progressReportIntervalInMilliseconds": 0
                                },
                                "token": token,
                                "expectedPreviousToken": "anything"
                                
                            },
                            "metadata": { } // reserved
                            }
                        }
                    ]
            }
    );
}


function callbackResponseRecent(output, url, offsetInMilliseconds, token, callback){
        callback(null, 
            {
                "version": "2.0",
                "resultCode": "OK",
                "output": {
                    "recentIs": output
                },
                "directives": [
                    {
                        "type": "AudioPlayer.Play",
                        "audioItem": {     
                            "stream": {
                                "url": url,
                                "offsetInMilliseconds": offsetInMilliseconds,
                                "progressReport": {
                                    "progressReportDelayInMilliseconds": 0,
                                    "progressReportIntervalInMilliseconds": 0
                                },
                                "token": token,
                                "expectedPreviousToken": "anything"
                                
                            },
                            "metadata": { } // reserved
                            }
                        }
                    ]
            }
    );
}


function callbackResponseWhose(output, url, offsetInMilliseconds, token, callback){
        callback(null, 
            {
                "version": "2.0",
                "resultCode": "OK",
                "output": {
                    "messageMaker": output
                },
                "directives": [
                    {
                        "type": "AudioPlayer.Play",
                        "audioItem": {     
                            "stream": {
                                "url": url,
                                "offsetInMilliseconds": offsetInMilliseconds,
                                "progressReport": {
                                    "progressReportDelayInMilliseconds": 0,
                                    "progressReportIntervalInMilliseconds": 0
                                },
                                "token": token,
                                "expectedPreviousToken": "anything"
                                
                            },
                            "metadata": { } // reserved
                            }
                        }
                    ]
            }
    );
}