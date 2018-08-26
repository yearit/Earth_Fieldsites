function measure() {
    alert("Press 1 to start measuring, 2 to end")
}
function startEdit() {
    window.isSubmitted = !1;
    var a = document.getElementById("View"), b = a.toDataURL("image/png");
    document.getElementById("painter").style.display = "block", document.getElementById("viewer3d").style.display = "none", window.esviewer3d.hideGui(), window.esviewer3d.disableManipulator(), painterTool ? painterTool.showGui() : (painterTool = new window.painter.Tool, painterTool.init()), window.painter.Canvas.init();
    var c = window.painter.canvas.currentCanvas, d = new window.painter.model.shapeModel.ImageShape;
    d.init({src:b, x:0, y:0, width:a.width, height:a.height}), c.paint(d)
}
function saveImage() {
    var a = document.getElementById("canvas-layer"), b = a.toDataURL("image/png"), c = document.createElement("a");
    if ("string" == typeof c.download)document.body.appendChild(c), c.download = "screenshot.png", c.href = b, c.click(), document.body.removeChild(c); else {
        var d = window.open("", ""), e = new Image;
        e.src = b, d.document.body.appendChild(e)
    }
}
function submitImage() {
    if (window.isSubmitted)alert("The current image has already been submitted!"); else {
        var a = document.getElementById("canvas-layer"), b = a.toDataURL("image/png"), c = window.esviewer3d.modelNames[0];
        console.log(c), $.ajax({type:"POST", url:"/secure/submit.php", data:{data64:b, name:c}}).done(
            function (a) {
                window.isSubmitted = !0, alert("Submission complete.")
            }).error(function () {
            alert("There was a problem submitting the image. Please use the Download button and/or try again later.")
        })
    }
}
function backTo3D() {
    document.getElementById("painter").style.display = "none", document.getElementById("viewer3d").style.display = "block", window.esviewer3d.showGui(), painterTool.hideGui(), window.esviewer3d.enableManipulator()
}
var logo =[], lighting = [];
!function () {
    "use strict";
    function a(a) {

        for (var b = [], c = window.location.search.substring(1).split("&"), d = 0; d < c.length; d++) {
            var e = c[d].split("=");
            e[0] == a && b.push(unescape(e[1]));
            if(e[0] == 'logo' ){logo.push(e[1])};
            if(e[0] == 'lighting' ){lighting.push(e[1])};
        }
        return b
    }

    function b(a) {
        var b, c, d;
        if (3 === a.length)b = a[0], c = a[1], d = a[2]; else if (7 === a.length) {
            var e = parseInt(a.slice(1), 16);
            b = e >> 16, c = e >> 8 & 255, d = 255 & e
        }
        return[b / 255, c / 255, d / 255, 1]
    }

    var c = "/data/models/", d = window.P, e = window.OSG, f = e.osg, g = e.osgDB, h = e.osgGA, i = e.osgText, j = (e.osgUtil, e.osgViewer), k = function () {
    };
    k.prototype = {scene:void 0, lightNode:void 0, modelNode:void 0, modelNames:[], models:[], gui:void 0, viewer:void 0, manipulator:void 0, _material:void 0, _headLight:void 0, _directionalLight:void 0, _directionalLightTransform:void 0, _hemiLight:void 0, _hemiLightTransform:void 0, _pointLight:void 0, _pointLightTransform:void 0, _spotLight:void 0, _spotLightTransform:void 0, ruler:void 0, rulerImage:void 0, rulerText:void 0, mouse:{x:0, y:0}, measuring:!1, ruler0:void 0, _config:{headOnOff:!0, headAmbient:[0, 0, 0], headDiffuse:[199, 199, 199], headSpecular:[105, 105, 105], spotOnOff:!1, spotAmbient:[57, 57, 57], spotDiffuse:[199, 203, 255], spotSpecular:[105, 105, 105], spotCutoff:57, spotBlend:.54, spotAttenuation:18, pointOnOff:!1, pointAmbient:[100, 100, 100], pointDiffuse:[200, 150, 150], pointSpecular:[120, 120, 120], pointAttenuation:16, directionalOnOff:!1, directionalAmbient:[150, 150, 128], directionalDiffuse:[186, 212, 140], directionalSpecular:[0, 0, 0], hemiOnOff:!1, hemiDiffuse:[128, 64, 128], hemiGround:[105, 105, 105], materialAmbient:[20, 20, 20], materialDiffuse:[212, 212, 212], materialSpecular:[64, 64, 64], materialEmission:[0, 0, 0], materialShininess:.3}, loadConfig:function (a) {
        for (var b in this._config)"true" == a[b] && (a[b] = !0), "false" == a[b] && (a[b] = !1), this._config[b] = a[b];
        if (this._directionalLightTransform.setMatrix(a.directionalMatrix), this._hemiLightTransform.setMatrix(a.hemiMatrix), this._pointLightTransform.setMatrix(a.pointMatrix), this._spotLightTransform.setMatrix(a.spotMatrix), "logo1"in a) {
            var c = a.logo1, d = c[0], e = c[1], f = parseInt(c[3]), g = parseInt(c[4]);
            this.setLogo(d, f, g, e)
        }
        this.updateAll()
    }, setLogo:function (a, b, c, d) {
        if ((a && "none" != a) || (logo.length != 0)) {
            var e = new Image;
            if (a && "none" !=a){
                e.src = "logos/" + a;
                    $("#logo1img").attr("src", e.src), $("#logo1").width(b).height(c), "w" == d ? $("#logo1").css("right", "auto").css("left", "10px") : $("#logo1").css("left", "auto").css("right", "10px"), $("#logo1").css("top", "auto").css("visibility", "visible")


            }else {
                e.src = "logos/" + logo;

                    $("#logo1img").attr("src", e.src), $("#logo1").width(b).height(c), "w" == d ? $("#logo1").css("right", "auto").css("left", "10px") : $("#logo1").css("left", "auto").css("right", "10px"), $("#logo1").css("top", "auto").css("visibility", "visible")


            }

        } else $("#logo1").css("visibility", "hidden")
    }, createHeadLight:function () {
        var a = this.viewer.getLight();
        return this._headLight = a, a
    }, createDirectionalLight:function () {
        var a = this._directionalLightTransform = new f.MatrixTransform, b = new f.LightSource, c = new f.Light(1);
        return this._directionalLight = c, b.setLight(c), a.addChild(b), a
    }, createSpotLight:function () {
        var a = this._spotLightTransform = new f.MatrixTransform, b = new f.LightSource, c = new f.Light(2);
        return this._spotLight = c, c.setPosition([0, 0, 0, 1]), b.setLight(c), a.addChild(b), a
    }, createPointLight:function () {
        var a = this._pointLightTransform = new f.MatrixTransform, b = new f.LightSource, c = new f.Light(3);
        return this._pointLight = c, c.setPosition([0, 0, 0, 1]), b.setLight(c), a.addChild(b), a
    }, createHemiLight:function () {
        var a = this._hemiLightTransform = new f.MatrixTransform, b = new f.LightSource, c = new f.Light(4);
        return this._hemiLight = c, c.setLightAsHemi(), b.setLight(c), a.addChild(b), a
    }, createLights:function () {
        this.createHeadLight(), this.lightNode.addChild(this.createDirectionalLight()), this.lightNode.addChild(this.createSpotLight()), this.lightNode.addChild(this.createPointLight()), this.lightNode.addChild(this.createHemiLight())
    }, updateAll:function () {
        this.updateHead(), this.updateDirectional(), this.updateSpot(), this.updatePoint(), this.updateHemi(), this.updateMaterial()
    }, updateMaterial:function () {
        this._material.setDiffuse(b(this._config.materialDiffuse)), this._material.setSpecular(b(this._config.materialSpecular)), this._material.setAmbient(b(this._config.materialAmbient)), this._material.setEmission(b(this._config.materialEmission)), this._material.setShininess(this._config.materialShininess)
    }, updateHead:function () {
        this._headLight.setEnabled(this._config.headOnOff), this._headLight.setDiffuse(b(this._config.headDiffuse)), this._headLight.setSpecular(b(this._config.headSpecular)), this._headLight.setAmbient(b(this._config.headAmbient))
    }, updateDirectional:function () {
        this._directionalLight.setEnabled(this._config.directionalOnOff), this._directionalLight.setDiffuse(b(this._config.directionalDiffuse)), this._directionalLight.setSpecular(b(this._config.directionalSpecular)), this._directionalLight.setAmbient(b(this._config.directionalAmbient))
    }, updatePoint:function () {
        this._pointLight.setEnabled(this._config.pointOnOff), this._pointLight.setDiffuse(b(this._config.pointDiffuse)), this._pointLight.setSpecular(b(this._config.pointSpecular)), this._pointLight.setAmbient(b(this._config.pointAmbient));
        var a = 1 / this._config.pointAttenuation;
        this._pointLight.setConstantAttenuation(0), this._pointLight.setLinearAttenuation(0), this._pointLight.setQuadraticAttenuation(a * a)
    }, updateSpot:function () {
        this._spotLight.setEnabled(this._config.spotOnOff), this._spotLight.setDiffuse(b(this._config.spotDiffuse)), this._spotLight.setSpecular(b(this._config.spotSpecular)), this._spotLight.setAmbient(b(this._config.spotAmbient)), this._spotLight.setSpotCutoff(this._config.spotCutoff), this._spotLight.setSpotBlend(this._config.spotBlend);
        var a = 1 / this._config.spotAttenuation;
        this._spotLight.setConstantAttenuation(0), this._spotLight.setLinearAttenuation(0), this._spotLight.setQuadraticAttenuation(a * a)
    }, updateHemi:function () {
        this._hemiLight.setEnabled(this._config.hemiOnOff), this._hemiLight.setDiffuse(b(this._config.hemiDiffuse)), this._hemiLight.setGround(b(this._config.hemiGround))
    }, onKeyDown:function (a, b) {
        this.viewer.getManipulator() && (49 == b.keyCode ? (this.ruler0 = this.mouseTo3dPoint(a), this.measuring = !!this.ruler0) : 50 == b.keyCode ? this.measuring = !1 : 27 == b.keyCode && this.ruler && (this.scene.removeChild(this.ruler), this.rulerText.setText("")))
    }, mouseTo3dPoint:function (a) {
        var b = a.width / a.clientWidth, c = a.height / a.clientHeight, d = this.viewer.computeIntersections(this.mouse.x * b, (a.clientHeight - this.mouse.y) * c);
        if (d.sort(function (a, b) {
            return a.ratio - b.ratio
        }), 0 !== d.length)return d[0].point
    }, onMouseUp:function (a, b) {
        this.measuring = !1
    }, onMouseMove:function (a, b) {
        if (this.mouse.x = b.clientX, this.mouse.y = b.clientY, this.measuring) {
            var c = this.mouseTo3dPoint(a);
            if (c) {
                var d = .01, e = this.ruler0, g = [], h = f.Vec3.distance(e, c);
                f.Vec3.cross(e, c, g), f.Vec3.normalize(g, g);
                var i = e[0] - .5 * d * g[0], j = e[1] - .5 * d * g[1], k = e[2] - .5 * d * g[2];
                this.ruler && this.scene.removeChild(this.ruler), this.ruler = f.createTexturedQuadGeometry(i, j, k, c[0] - e[0], c[1] - e[1], c[2] - e[2], d * g[0], d * g[1], d * g[2], 0, 0, 50 * h, 1), this.scene.addChild(this.ruler);
                var l = this.ruler.getOrCreateStateSet(), m = new f.Texture;
                m.setImage(this.rulerImage), m.setWrapS("REPEAT"), m.setMinFilter("LINEAR_MIPMAP_LINEAR"), l.setTextureAttributeAndModes(0, m);
                var n = "Size: " + (h > .5 ? String(h.toFixed(2) + "m") : String((100 * h).toFixed(2) + "cm"));
                this.rulerText.setText(n)
            }
        }
    }, run:function (a, b) {
        document.addEventListener("keydown", this.onKeyDown.bind(this, a), !0), a.addEventListener("mousemove", this.onMouseMove.bind(this, a), !0), a.addEventListener("mouseup", this.onMouseUp.bind(this, a), !0), this.viewer = new j.Viewer(a, {antialias:!0, alpha:!0, premultipliedAlpha:!0, preserveDrawingBuffer:!0}), this.viewer.init(), this.viewer.getCamera().setClearColor([.005, .005, .005, 1]), this.scene = new f.Node, this.lightNode = new f.Node, this.modelNode = new f.Node, this.scene.addChild(this.modelNode), this.scene.addChild(this.lightNode), this.scene.getOrCreateStateSet().setAttributeAndModes(new f.CullFace("DISABLE"));
        var c = g.readImageURL("images/ruler.png");
        c.then(function (a) {
            this.rulerImage = a
        }.bind(this)), this.viewer.setSceneData(this.scene), this.manipulator = new h.SwitchManipulator, this.manipulator.addManipulator(new h.OrbitManipulator), this.manipulator.addManipulator(new h.FirstPersonManipulator), this.viewer.setupManipulator(this.manipulator), this.viewer.setLightingMode(j.View.LightingMode.HEADLIGHT), this.viewer.run(), this._material = new f.Material, this.updateMaterial(), this.loadModels(b), this.rulerText = new i.Text, this.rulerText.setColor([1, 1, 1, 1]), this.rulerText.setCharacterSize(50);
        var d = new f.Camera;
        f.Matrix.makeOrtho(0, a.width, 0, a.height, -5, 5, d.getProjectionMatrix()), f.Matrix.makeTranslate(105, a.height - 25, 0, d.getViewMatrix()), d.setRenderOrder(f.Camera.NESTED_RENDER, 0), d.setReferenceFrame(f.Transform.ABSOLUTE_RF), d.addChild(this.rulerText), this.scene.addChild(d)
    }, disableManipulator:function () {
        this.viewer.setManipulator(void 0)
    }, enableManipulator:function () {
        this.viewer.setManipulator(this.manipulator)
    }, hideGui:function () {
        this.gui && (this.gui.domElement.hidden = !0)
    }, showGui:function () {
        this.gui && (this.gui.domElement.hidden = !1)
    }, initGui:function () {
        this.gui = new window.dat.GUI, this.params = {manipulator:0};
        var a = {Orbit:0, First_Person:1}, b = this, c = this.gui.add(this.params, "manipulator", a);
        c.onFinishChange(function (a) {
            b.manipulator.setManipulatorIndex(a), b.viewer.getManipulator().computeHomePosition()
        });
        var d = function (a) {
            for (var c = 0; c < b.models.length; c++)if (b.modelNames[c] == this.property) {
                a === !0 ? b.modelNode.addChild(b.models[c]) : b.modelNode.removeChild(b.models[c]);
                break
            }
        };
        if (this.modelNames.length > 1)for (var e = 0; e < this.modelNames.length; e++) {
            this.params[this.modelNames[e]] = !0;
            var f = this.gui.add(this.params, this.modelNames[e]);
            f.onChange(d)
        }
    }, setModel:function (a, b) {
        var e;
        for (e = 0; e < this.models.length; e++)this.modelNode.removeChild(this.models[e]);
        for (this.models = a, e = 0; e < a.length; e++)this.modelNode.addChild(a[e]);
        this.initGui();
        var f = a[0].getOrCreateStateSet(), h = f.getAttribute("Material");
        h || (h = this._material), f.setAttributeAndModes(h), this.viewer.getManipulator().setNode(this.modelNode), this.viewer.getManipulator().computeHomePosition(), this.createLights();
        var i = g.registry(), j = d.defer(), k = i.requestFile(c + b), jlighting = i.requestFile(c+lighting);
        if(lighting.length){
          k=jlighting;

        }
        return k.then(function (a) {
            var c;
            try {
                return c = JSON.parse(a), this.loadConfig(c), !0
            } catch (d) {
                console.log("Can't read " + b)
            }
        }.bind(this))["catch"](
            function (a) {
                console.log("Can't get " + c + b + ": " + a)
            }).done(), j.promise
    }, loadModels:function (a) {
        this.modelNames = [];
        for (var b, e = [], f = 0; f < a.length; f++) {
            var h, i = a[f], j = i.indexOf(".osgjs");
            j < 0 ? (h = i, i += ".osgjs.gz") : h = i.substring(0, j), 0 === f && (b = h + ".json"), j = i.lastIndexOf("/"), j >= 0 && (h = h.substring(j + 1)), this.modelNames.push(h), e.push(g.readNodeURL(c + i))
        }
        d.all(e).then(function (a) {
            this.setModel(a, b)
        }.bind(this))
    }}, window.addEventListener("load", function () {
        document.getElementById("painter").style.display = "none";
        var b = a("m");
        if (b.length > 0) {
            var c = document.getElementById("View");
            window.esviewer3d = new k, window.esviewer3d.run(c, b)
        }
    }, !0)
}();
var painterTool;
$(function () {
    $("#submitDlg").dialog({autoOpen:!1, resizable:!1, height:400, width:500, modal:!0, buttons:{Submit:submitImage, Download:saveImage, Close:function () {
        $(this).dialog("close")
    }}})
});
