(function(global) {

    var svagInitFun = function(global){
        global.SVGA = {
            isSupportSwf: true,
            SWFLocation: "SVGAPlayerWeb.swf",
            createUUID: function() {
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4";
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
                s[8] = s[13] = s[18] = s[23] = "_";
                var uuid = s.join("");
                return uuid;
            },
            createHandler: function(callback) {
                var uuid = global.SVGA.createUUID();
                global["SVGACB_" + uuid + "_handler"] = function(a, b, c, d, e, f, g) {
                    callback(a, b, c, d, e, f, g);
                };
                return "SVGACB_" + uuid + "_handler";
            },
            createSWFObject: function(container, callback) {
                var uuid = global.SVGA.createUUID();
                var containerElement = typeof container === "object" ? container : document.getElementById(container.replace('#', ''));
                if (containerElement === null || containerElement === undefined) {
                    throw Error("You must provide a valid div ID >>> new Parser(xxx).")
                }
                if (containerElement.getElementsByTagName("object").length === 0) {
                    var id = "id" + uuid;
                    try {
                        var element = document.createElement("<object id='" + id + "' name='" + id + "' type='application/x-shockwave-flash' data='" + global.SVGA.SWFLocation + "'/>");

                    } catch (error) {
                        var element = document.createElement("object");
                        element.setAttribute("id", id);
                        element.setAttribute("name", id);

                        element.setAttribute("type", "application/x-shockwave-flash");
                        element.setAttribute("data", global.SVGA.SWFLocation);
                    }
                    global["SVGACB_" + uuid + "_onReady"] = function() {
                        callback(document.getElementById(id));
                    };


                    var domInstallSwf = function(element) {
                        element.setAttribute("width", containerElement.offsetWidth);
                        element.setAttribute("height", containerElement.offsetHeight);
                        (function(element) {
                            var attr = document.createElement("param");
                            attr.setAttribute("name", "movie");
                            attr.setAttribute("value", global.SVGA.SWFLocation);
                            element.appendChild(attr);

                            var attr = document.createElement("param");
                            attr.setAttribute("name", "Movie");
                            attr.setAttribute("value", global.SVGA.SWFLocation);
                            element.appendChild(attr);

                            var attr = document.createElement("param");
                            attr.setAttribute("name", "src");
                            attr.setAttribute("value", global.SVGA.SWFLocation);
                            element.appendChild(attr);

                            var attr = document.createElement("param");
                            attr.setAttribute("name", "Src");
                            attr.setAttribute("value", global.SVGA.SWFLocation);
                            element.appendChild(attr);

                       // <PARAM NAME="Src" VALUE="SVGAPlayerWeb.swf">
                        })(element);
                        (function(element) {
                            var attr = document.createElement("param");
                            attr.setAttribute("name", "play");
                            attr.setAttribute("value", "true");
                            element.appendChild(attr);
                        })(element);
                        (function(element) {
                            var attr = document.createElement("param");
                            attr.setAttribute("name", "allowScriptAccess");
                            attr.setAttribute("value", "always");
                            element.appendChild(attr);
                        })(element);
                        (function(element) {
                            var attr = document.createElement("param");
                            attr.setAttribute("name", "wmode");
                            attr.setAttribute("value", "transparent");
                            element.appendChild(attr);
                        })(element);
                        (function(element) {
                            var attr = document.createElement("param");
                            attr.setAttribute("name", "FlashVars");
                            attr.setAttribute("value", "uuid=" + uuid);
                            element.appendChild(attr);

                            var attr = document.createElement("param");
                            attr.setAttribute("name", "flashvars");
                            attr.setAttribute("value", "uuid=" + uuid);
                            element.appendChild(attr);
                        })(element);
                    };

                    (function(element) {
                        containerElement.appendChild(element);
                        var swfVersionStr = "11.1.0";
                        var xiSwfUrlStr = "";
                        var width = containerElement.offsetWidth;
                        var height = containerElement.offsetHeight;
                        var url = global.SVGA.SWFLocation;
                        var params = {
                            "play": "true",
                            "allowScriptAccess": "always",
                            "wmode": "transparent"
                        }
                        var flashvars = {
                            uuid: uuid
                        }

                        var attributes = {};
                        attributes.id = id;
                        attributes.name = id;
                        attributes.align = "middle";
                        if (typeof swfobject != "undefined") {
                            swfobject.embedSWF(url, id, width, height, swfVersionStr, xiSwfUrlStr, flashvars, params, attributes, function(result) {
                                if (!result.success) {
                                    if (typeof console != "undefined") {
                                        console.log && console.log("svga flashplayer install failed");
                                        domInstallSwf(element);
                                    }
                                }
                            });
                        } else {
                            domInstallSwf(element);
                        }


                    })(element);




                    //domInstallSwf(element);
                    //containerElement.appendChild(element);


                } else {
                    var swfObject = containerElement.getElementsByTagName("object")[0];
                    // var width = containerElement.offsetWidth;
                    // var height = containerElement.offsetHeight;
                    // if (width != swfObject.width || height != swfObject.height) {
                    //     swfObject.width = width;
                    //     swfObject.height = height;
                    //     swfObject.SVGAPlayer_Instance_setFrame(0, 0, swfObject.offsetWidth, swfObject.offsetHeight);
                    // }
                    callback(swfObject);
                }
            },
            Parser: function(container) {
                return {
                    load: function(url, success, failure) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAParser_Instance_load(url, SVGA.createHandler(function(videoItem) {
                                success(videoItem);
                            }), SVGA.createHandler(function(message) {
                                failure(new Error(message));
                            }));
                        });
                    }
                };
            },
            Player: function(container) {
                return {
                    setLoops: function(value) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_setLoops(value);
                        });
                    },
                    setClearsAfterStop: function(value) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_setClearsAfterStop(value);
                        });
                    },
                    setContentMode: function(value) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_setContentMode(value);
                        });
                    },
                    setClipsToBounds: function(value) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_setClipsToBounds(value);
                        });
                    },
                    pauseAnimation: function() {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_pauseAnimation();
                        });
                    },
                    stopAnimation: function(value) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_stopAnimation(value || true);
                        });
                    },
                    clear: function() {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_clear();
                        });
                    },
                    stepToFrame: function(frame, andPlay) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_stepToFrame(frame, andPlay === true);
                        });
                    },
                    stepToPercentage: function(percentage, andPlay) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_stepToPercentage(percentage, andPlay === true);
                        });
                    },
                    setImage: function(url, forKey) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_setImage(url, forKey);
                        });
                    },
                    setText: function(textORMap, forKey) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            if (typeof textORMap === "object") {
                                swfObject.SVGAPlayer_Instance_setText(textORMap.text, textORMap.size, textORMap.color, forKey);
                            } else {
                                swfObject.SVGAPlayer_Instance_setText(textORMap, "", "", forKey);
                            }
                        });
                    },
                    clearDynamicObjects: function() {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_clearDynamicObjects();
                        });
                    },
                    onFinished: function(callback) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_onFinished(SVGA.createHandler(callback));
                        });
                    },
                    onFrame: function(callback) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_onFrame(SVGA.createHandler(callback));
                        });
                    },
                    onPercentage: function(callback) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_onPercentage(SVGA.createHandler(callback));
                        });
                    },
                    setFrame: function(x, y, width, height) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_setFrame(x, y, width, height);
                        });
                    },
                    setVideoItem: function(videoItem) {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_setVideoItem(videoItem);
                        });
                    },
                    startAnimation: function() {
                        SVGA.createSWFObject(container, function(swfObject) {
                            swfObject.SVGAPlayer_Instance_setFrame(0, 0, swfObject.offsetWidth, swfObject.offsetHeight);
                            swfObject.SVGAPlayer_Instance_startAnimation();
                        });
                    }
                };
            }
        };
    }

    if(typeof module != "undefined"){
        svagInitFun(global);
    }else if (typeof global.SVGA === "undefined" || !global.SVGA.isSupportSwf) {
        svagInitFun(global);
    }
})(window);


if(typeof module != "undefined"){
    module.exports = window.SVGA;
}