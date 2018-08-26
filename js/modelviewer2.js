function toggleViewerLock(e) {
    window.esviewer1.lockView($("#lockBtn").is(":checked")), window.esviewer2.lockView($("#lockBtn").is(":checked"))
}
var lighting = [];
(function () {
    "use strict";
    function f(e) {
        for (var t = window.location.search.substring(1).split("&"), n = 0; n < t.length; n++) {
            var r = t[n].split("=");
            if (r[0] == e)return unescape(r[1])
            if(r[0] == 'lighting' ){lighting.push(r[1])};
        }
        return undefined
    }

    function l(e) {
        return[e[0] * 255, e[1] * 255, e[2] * 255]
    }

    function c(e) {
        var t, n, r;
        if (e.length === 3)t = e[0], n = e[1], r = e[2]; else if (e.length === 7) {
            var i = parseInt(e.slice(1), 16);
            t = i >> 16, n = i >> 8 & 255, r = i & 255
        }
        return[t / 255, n / 255, r / 255, 1]
    }
    var e = "/data/models/", t = window.P, n = window.OSG, r = n.osg, i = n.osgDB, s = n.osgGA, o = n.osgText, u = n.osgUtil, a = n.osgViewer, h = function () {
    };
    h.prototype = {scene:undefined, lightNode:undefined, modelNode:undefined, modelName:"", model:undefined, gui:undefined, viewer:undefined, otherViewer:undefined, viewsLocked:!1, manipulator:undefined, _material:undefined, _headLight:undefined, _directionalLight:undefined, _directionalLightTransform:undefined, _hemiLight:undefined, _hemiLightTransform:undefined, _pointLight:undefined, _pointLightTransform:undefined, _spotLight:undefined, _spotLightTransform:undefined, _config:{headOnOff:!0, headAmbient:[0, 0, 0], headDiffuse:[199, 199, 199], headSpecular:[105, 105, 105], spotOnOff:!1, spotAmbient:[57, 57, 57], spotDiffuse:[199, 203, 255], spotSpecular:[105, 105, 105], spotCutoff:57, spotBlend:.54, spotAttenuation:18, pointOnOff:!1, pointAmbient:[100, 100, 100], pointDiffuse:[200, 150, 150], pointSpecular:[120, 120, 120], pointAttenuation:16, directionalOnOff:!1, directionalAmbient:[150, 150, 128], directionalDiffuse:[186, 212, 140], directionalSpecular:[0, 0, 0], hemiOnOff:!1, hemiDiffuse:[128, 64, 128], hemiGround:[105, 105, 105], materialAmbient:[20, 20, 20], materialDiffuse:[212, 212, 212], materialSpecular:[64, 64, 64], materialEmission:[0, 0, 0], materialShininess:.3}, loadConfig:function (e) {
        for (var t in this._config)e[t] == "true" && (e[t] = !0), e[t] == "false" && (e[t] = !1), this._config[t] = e[t];
        this._directionalLightTransform.setMatrix(e.directionalMatrix), this._hemiLightTransform.setMatrix(e.hemiMatrix), this._pointLightTransform.setMatrix(e.pointMatrix), this._spotLightTransform.setMatrix(e.spotMatrix), this.updateAll()
    }, createHeadLight:function () {
        var e = this.viewer.getLight();
        return this._headLight = e, e
    }, createDirectionalLight:function () {
        var e = this._directionalLightTransform = new r.MatrixTransform, t = new r.LightSource, n = new r.Light(1);
        return this._directionalLight = n, t.setLight(n), e.addChild(t), e
    }, createSpotLight:function () {
        var e = this._spotLightTransform = new r.MatrixTransform, t = new r.LightSource, n = new r.Light(2);
        return this._spotLight = n, n.setPosition([0, 0, 0, 1]), t.setLight(n), e.addChild(t), e
    }, createPointLight:function () {
        var e = this._pointLightTransform = new r.MatrixTransform, t = new r.LightSource, n = new r.Light(3);
        return this._pointLight = n, n.setPosition([0, 0, 0, 1]), t.setLight(n), e.addChild(t), e
    }, createHemiLight:function () {
        var e = this._hemiLightTransform = new r.MatrixTransform, t = new r.LightSource, n = new r.Light(4);
        return this._hemiLight = n, n.setLightAsHemi(), t.setLight(n), e.addChild(t), e
    }, createLights:function () {
        this.createHeadLight(), this.lightNode.addChild(this.createDirectionalLight()), this.lightNode.addChild(this.createSpotLight()), this.lightNode.addChild(this.createPointLight()), this.lightNode.addChild(this.createHemiLight())
    }, updateAll:function () {
        this.updateHead(), this.updateDirectional(), this.updateSpot(), this.updatePoint(), this.updateHemi(), this.updateMaterial()
    }, updateMaterial:function () {
        this._material.setDiffuse(c(this._config.materialDiffuse)), this._material.setSpecular(c(this._config.materialSpecular)), this._material.setAmbient(c(this._config.materialAmbient)), this._material.setEmission(c(this._config.materialEmission)), this._material.setShininess(this._config.materialShininess)
    }, updateHead:function () {
        this._headLight.setEnabled(this._config.headOnOff), this._headLight.setDiffuse(c(this._config.headDiffuse)), this._headLight.setSpecular(c(this._config.headSpecular)), this._headLight.setAmbient(c(this._config.headAmbient))
    }, updateDirectional:function () {
        this._directionalLight.setEnabled(this._config.directionalOnOff), this._directionalLight.setDiffuse(c(this._config.directionalDiffuse)), this._directionalLight.setSpecular(c(this._config.directionalSpecular)), this._directionalLight.setAmbient(c(this._config.directionalAmbient))
    }, updatePoint:function () {
        this._pointLight.setEnabled(this._config.pointOnOff), this._pointLight.setDiffuse(c(this._config.pointDiffuse)), this._pointLight.setSpecular(c(this._config.pointSpecular)), this._pointLight.setAmbient(c(this._config.pointAmbient));
        var e = 1 / this._config.pointAttenuation;
        this._pointLight.setConstantAttenuation(0), this._pointLight.setLinearAttenuation(0), this._pointLight.setQuadraticAttenuation(e * e)
    }, updateSpot:function () {
        this._spotLight.setEnabled(this._config.spotOnOff), this._spotLight.setDiffuse(c(this._config.spotDiffuse)), this._spotLight.setSpecular(c(this._config.spotSpecular)), this._spotLight.setAmbient(c(this._config.spotAmbient)), this._spotLight.setSpotCutoff(this._config.spotCutoff), this._spotLight.setSpotBlend(this._config.spotBlend);
        var e = 1 / this._config.spotAttenuation;
        this._spotLight.setConstantAttenuation(0), this._spotLight.setLinearAttenuation(0), this._spotLight.setQuadraticAttenuation(e * e)
    }, updateHemi:function () {
        this._hemiLight.setEnabled(this._config.hemiOnOff), this._hemiLight.setDiffuse(c(this._config.hemiDiffuse)), this._hemiLight.setGround(c(this._config.hemiGround))
    }, lockView:function (e) {
        this.viewsLocked = e, e ? (this.manipulator = this.viewer.getManipulator(), this.viewer.setManipulator(this.otherViewer.viewer.getManipulator())) : this.viewer.setManipulator(this.manipulator)
    }, onMouseUp:function (e, t) {
        this.viewsLocked && (console.log(this.manipulator.getHomePosition()), console.log(this.viewer.getManipulator().getHomePosition()))
    }, run:function (e, t) {
        this.viewer = new a.Viewer(t, {antialias:!0, alpha:!0, premultipliedAlpha:!0, preserveDrawingBuffer:!0}), this.viewer.init(), this.viewer.getCamera().setClearColor([.005, .005, .005, 1]), this.scene = new r.MatrixTransform, this.lightNode = new r.Node, this.modelNode = new r.Node, this.scene.addChild(this.modelNode), this.scene.addChild(this.lightNode), this.scene.getOrCreateStateSet().setAttributeAndModes(new r.CullFace("DISABLE")), this.viewer.setSceneData(this.scene), this.viewer.setupManipulator(new s.OrbitManipulator), this.viewer.setLightingMode(a.View.LightingMode.HEADLIGHT), this.viewer.run(), this._material = new r.Material, this.updateMaterial(), this.changeModel(e)
    }, setModel:function (n) {
        this.modelNode.removeChild(this.model), this.model = n, this.modelNode.addChild(this.model);
        var s = this.modelNode.getOrCreateStateSet(), o = s.getAttribute("Material");
        o || (o = this._material);
        var u = this.modelNode.getBound().center();
        this.scene.setMatrix(r.Matrix.makeTranslate(-u[0], -u[1], -u[2], r.Matrix.create())), s.setAttributeAndModes(o), this.manipulator = this.viewer.getManipulator(), this.viewer.getManipulator().setNode(this.scene), this.viewer.getManipulator().computeHomePosition(), this.createLights();
        var a = this.modelName + ".json", f = i.registry(), l = t.defer(), c = f.requestFile(e + a), jlighting = f.requestFile(e+lighting);
        if(lighting.length){
            c=jlighting;
        }
        return c.then(function (e) {
            var t;
            try {
                return t = JSON.parse(e), this.loadConfig(t), !0
            } catch (n) {
                console.log("Can't read " + a)
            }
        }.bind(this))["catch"]
        (function (t) {
            console.log("Can't get " + e + a + ": " + t)
        }).done(), l.promise
    }, changeModel:function (t) {
        var n = t.indexOf(".osgjs");
        n < 0 ? (this.modelName = t, t += ".osgjs.gz") : this.modelName = t.substring(0, n), i.readNodeURL(e + t).then(function (e) {
            this.setModel(e)
        }.bind(this))
    }}, window.addEventListener("load", function () {
        window.esviewer1 = new h;
        var e = f("m1"), t = document.getElementById("View1");
        window.esviewer1.run(e, t), window.esviewer2 = new h;
        var n = f("m2"), r = document.getElementById("View2");
        window.esviewer2.run(n, r), window.esviewer1.otherViewer = window.esviewer2, window.esviewer2.otherViewer = window.esviewer1
    }, !0)
})();
