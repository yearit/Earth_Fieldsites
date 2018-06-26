<?php
$panopath = "/data/panos/";
$name = htmlspecialchars($_REQUEST["n"]);
$libs = $panopath . "generic";

$content = <<<EOC
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Virtual tour</title>
        <meta name="description" content="Virtual tour" />
        <meta name="keywords" content="Virtual tour,Panotour" />
        <meta name="medium" content="mult" />
        <meta name="video_height" content="480"></meta>
        <meta name="video_width" content="640"></meta>
        <meta name="generator" content="Panotour Pro V2.3.2 64bits" />
        <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <link rel="image_src" href="%PATH%data/thumbnail.jpg" />
        <link rel="stylesheet" type="text/css" href="/css/paint.css" />
        <link rel="stylesheet" type="text/css" href="/css/jquery-ui.min.css" />
        <style type="text/css">
            @-ms-viewport { width: device-width; }
            @media only screen and (min-device-width: 800px) { html { overflow:hidden; } }
            * { padding: 0; margin: 0; }
            html { height: 100%; }
            body { height: 100%; overflow:hidden; }
            div#tourDIV {
                height:100%;
                position:relative;
                overflow:hidden;
            }
            div#panoDIV {
                height:100%;
                position:relative;
                overflow:hidden;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -o-user-select: none;
                user-select: none;
            }
            .toolbar {
               position: absolute;
               left: 20px;
               top: 20px;
               width: 32px;
               height: 80px;
               border: 1px solid;
               box-shadow: 4px 4px 2px #888888;
               padding: 3px;
            }
            .tb-btn {
               text-align: center;
               border: 1px dashed;
               cursor: pointer;
            }
            #paintBtn {
               position: absolute;
               z-index: 3001;
               overflow: visible;
               cursor: pointer;
               pointer-events: auto;
               opacity: 1;
               width: 40px;
               height: 40px;
               background-position: 0px 0px;
               background-size: 40px 120px;
               background-image: url(/images/btn_paint.png);
               transform: translateZ(1e+12px) translate(15px, 60px);
            }
        </style>
        <script type="text/javascript" src="/js/jquery.min.js"></script>
        <script type="text/javascript" src="/js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="/js/jquery.ui.touch-punch.min.js"></script>
        <script type="text/javascript" src="/js/KolorTools.min.js"></script>
        <script type="text/javascript" src="%LIBS%/graphics/KolorBootstrap.js"></script>
        <script type="text/javascript" src="/js/panoviewer.js"></script>
		<script type="text/javascript" src="/js/dat.gui.min.js"></script>
		<script type="text/javascript" src="/js/paint.js"></script>
		<script type="text/javascript" src="/js/pvhelper.js"></script>
        <style type="text/css">
            div#panoDIV.cursorMoveMode {
                cursor: move;
                cursor: url(%LIBS%/graphics/cursors_move_html5.cur), move;
            }
            div#panoDIV.cursorDragMode {
                cursor: grab;
                cursor: -moz-grab;
                cursor: -webkit-grab;
                cursor: url(%LIBS%/graphics/cursors_drag_html5.cur), default;
            }
        </style>
    </head>
    <body>
        <div id="tourDIV">
            <div id="panoDIV">
            </div>
            <div id="mapcontainer">
				<div id="mapDIV">
				</div>
            </div>
            <script type="text/javascript" src="%PATH%data/%NAME%.js"></script>
            <script type="text/javascript">
                embedpano({
                    swf:"%PATH%data/%NAME%.swf"
                    ,xml:"%PATH%data/%NAME%.xml"
                    ,target:"panoDIV"
                    ,passQueryParameters:true
                    ,html5:"only,webgl,preservedrawingbuffer"
                });
    			jQuery("<div id='paintBtn' onclick='startEdit()'></div>").insertAfter("#panoDIV canvas");
                jQuery("#paintBtn")
                .mouseenter(function() {
                    jQuery(this).css({'background-position' : '0px -40px'});
                })
                .mouseleave(function() {
                    jQuery(this).css({'background-position' : '0px 0px'});
                })
                .mousedown(function() {
                    jQuery(this).css({'background-position' : '0px -80px'});
                });
            </script>
        </div>
        <div id="painter" style="position:absolute;width:100%;height:100%;display:none">
            <div class="row-fluid main-wrap">
                <div class="span12 canvas-wrap">
                    <canvas id="canvas-background" class="canvas-paint canvas-background"></canvas>
                    <canvas class="canvas-paint canvas-negative"></canvas>
                    <canvas id="canvas-layer" class="canvas-paint canvas-layer"></canvas>
                    <canvas class="canvas-paint canvas-buffer"></canvas>
                    <canvas id="canvas-mouse" class="canvas-paint canvas-mouse"></canvas>
                </div>
            </div>
            <div class="toolbar">
                <img class="tb-btn" src="/images/screenshot.png" title="Click to save current image" onclick="saveImage()">
                <img class="tb-btn" src="/images/go-back-icon.png" title="Click to go back to 3D view" onclick="backTo3D()">
            </div>
            <div id="tool-wrap" class="tool-wrap">
                <div class="tool">
                    <button class="shape active" title="Draw Lines" data-current-tool="Line" data-tool-panel="shape"></button>
                    <button class="stroke" title="Freeform" data-current-tool="Pen" data-tool-panel="stroke"></button>
                    <button class="eraser" title="Eraser" data-current-tool="Eraser" data-tool-panel="eraser"></button>
                    <button class="text" title="Text" data-tool-panel="text" data-current-tool="Text"></button>
                </div>
                <div class="tool-panel">
                    <div class="shape wrap">
                        <button class="line" title="Line" data-tool="shape" data-tool-class="Line"></button>
                        <button class="curve-closed" title="Closed curve" data-tool="shape" data-tool-class="CurveClosed"></button>
                        <button class="rect" title="Rectangle" data-tool="shape" data-tool-class="Rect"></button>
                        <button class="circle" title="Circle" data-tool="shape" data-tool-class="Circle"></button>
                        <button class="ellipse" title="Ellipse" data-tool="shape" data-tool-class="Ellipse"></button>
                    </div>
                    <div class="stroke wrap">
                        <button class="pen" title="Pen" data-tool="stroke" data-tool-class="Pen"> </button>
                        <button class="curve-closed-stroke" title="Closed curve" data-tool="stroke" data-tool-class="CurveClosedStroke"></button>
                        <button class="rect-stroke" title="Rectangle" data-tool="stroke" data-tool-class="RectStroke"> </button>
                        <button class="circle-stroke" title="Circle" data-tool="stroke" data-tool-class="CircleStroke"></button>
                        <button class="ellipse-stroke" title="Ellipse" data-tool="stroke" data-tool-class="EllipseStroke"></button>
                    </div>
                    <div class="eraser wrap">
                    </div>
                    <div class="text wrap">
                        <button class="text" title="Text" data-tool="text" data-tool-class="Text"> </button>
                        <button class="text-stroke" title="Stroked Text" data-tool="text" data-tool-class="TextStroke"> </button>
                    </div>
                </div>
            </div>
            <footer />
        </div>
    </body>
</html>

EOC;
$content = str_replace("%PATH%", $panopath . $name, $content);
$content = str_replace("%NAME%", $name, $content);
$content = str_replace("%LIBS%", $libs, $content);
echo $content;
?>
