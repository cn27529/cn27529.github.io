// $(function () {     resize_tensvg();     window.onresize = function (event) {
//         resize_tensvg();     }     var deg_num = 0;
// //setTimeout('run(6)', 3000);     setInterval(function () {
// goo(0.125);     }, 50); }); var luopan = new Luopan('luopan'); function
// goo(number) {     luopan.run(number); } function Luopan(obj_id) {     var
// w_win = $(window).width();     var h_win = $(window).height();
// this.luopan_id = obj_id;     this.deg_number = 0; } 畫十字線
var TenLine = function TenLine(props) {
    // this.w_win = w_win; this.h_win = h_win;

    this.src = props.src;
    this.ele_id = props.ele_id;
    this.w_id = props.w_id;
    this.h_id = props.h_id;
    this.color_code = props.color_code;

    this.w_win = window.innerWidth / 2; //目前瑩幕寛
    this.h_win = window.innerHeight; //目前瑩幕高
    this.stroke_width = props.stroke_width; //筆畫寛度

    this.w_svg = 0;
    this.h_svg = 0;

    this.show_line = function(value) {
        var tl = document.getElementById(this.ele_id);

        if (value) tl.setAttribute("style", "display: block;");
        else tl.setAttribute("style", "display: none;");

        this.reset_tenline();
    };

    this.reset_tenline = function() {
        this.w_win = window.innerWidth; //目前瑩幕寛
        this.h_win = window.innerHeight; //目前瑩幕高
        console.log("reset_tenline");
        console.log("this.w_win=", this.w_win);
        console.log("this.h_win=", this.h_win);

        this.w_svg = this.w_win; //設寬
        this.h_svg = this.h_win; //設高

        console.log("w_svg=", this.w_svg);
        console.log("h_svg=", this.h_svg);

        var my_style = "stroke:#0080ff;stroke-width:1;"; //設藍色

        my_style = "";
        if (typeof this.color_code !== "undefined") {
            my_style += "stroke:" + this.color_code + ";";
        }
        if (typeof this.stroke_width !== "undefined") {
            my_style += "stroke-width:" + this.stroke_width + ";";
        }

        var my_svg = document.querySelector("#" + this.ele_id);
        var my_w = document.querySelector("#" + this.w_id);
        var my_h = document.querySelector("#" + this.h_id);
        var my_left = 0;
        //設定svg寛高
        if (this.w_win >= this.h_win) {
            console.log("寛>高");
            my_svg.setAttribute("width", this.h_win + "px");
            my_svg.setAttribute("height", this.h_win + "px");
            my_left = this.w_win - this.h_win;
        } else {
            console.log("高>寛");
            my_svg.setAttribute("width", this.w_win + "px");
            my_svg.setAttribute("height", this.w_win + "px");
            my_left = 0;
        }
        console.log("marginLeft", my_left);
        my_svg.style.marginLeft = my_left / 2 + "px";

        // my_svg.attr({     width: w_svg + 'px',     height: h_svg + 'px', });

        //console.log("my_style", my_style);

        my_w.setAttribute("style", my_style);
        my_w.setAttribute("x1", "0");
        my_w.setAttribute("y1", "50%");
        my_w.setAttribute("x2", "100%");
        my_w.setAttribute("y2", "50%");

        // my_w.attr({     style: my_style,     x1: '0',     y1: '50%',     x2: '100%',
        //    y2: '50%', });

        my_h.setAttribute("style", my_style);
        my_h.setAttribute("x1", "50%");
        my_h.setAttribute("y1", "0");
        my_h.setAttribute("x2", "50%");
        my_h.setAttribute("y2", "100%");

        // my_h.attr({     style: my_style,     x1: '50%',     y1: '0',     x2: '50%',
        //   y2: '100%', });
    };

    this.element = function() {
        return document.querySelector("#" + ele_id);
    };
};

var Luopan = function Luopan(props) {

    this.src = props.src;
    this.ele_id = props.ele_id;
    this.deg_number = 0;
    this.my_style = "";
    this.w_win = window.innerWidth;
    this.h_win = window.innerHeight;
    this.my_width = 0;

    this.find_transform = function(props) {
        this.deg_number = props.number;
        //歸零
        var deg = "rotate(0deg)";
        var luopan = document.querySelector("#" + this.ele_id);

        if (props.number >= 360) {
            $("#" + this.ele_id).rotate({
                duration: 4500,
                angle: 180,
                animateTo: 360
            });
        } else {
            //goto
            // $("#" + this.ele_id).rotate({
            //     duration: 4500,
            //     angle: 180,
            //     animateTo: 180 - props.number
            // });

            $("#" + this.ele_id).rotate({
                duration: 4500,
                angle: 180,
                animateTo: 360 - props.number
            });

        }

        return luopan;
    };

    this.set_transform = function(props) {
        if (props.move === "left") {
            this.deg_number -= props.number;
        } else {
            this.deg_number += props.number;
        }
        var deg = "rotate(" + 180 + "deg)";
        deg = "rotate(" + this.deg_number + "deg)";
        document.querySelector("#" + this.ele_id).style.transform = deg;
    };

    this.img = function() {
        var luopan = document.querySelector("#" + this.ele_id);
        luopan.src = this.src;
        return luopan;
    };

    this.reset_luopan = function(cb) {

        this.w_win = window.innerWidth;
        this.h_win = window.innerHeight;
        console.log("reset_luopan");
        console.log("this.w_win=", this.w_win);
        console.log("this.h_win=", this.h_win);

        var luopan = document.querySelector("#" + this.ele_id);

        var isFun = typeof cb === 'function';
        if (typeof cb === 'function') {
            luopan.onload = function() {
                // the image is ready
                cb('the image onload is ready');
            };
            luopan.onerror = function() {
                // the image has failed
                cb('the image has failed');
            };
        }
        luopan.src = this.src;

        var my_left_gap = 0; //修正誤差
        //取得left要位移的位置
        var my_left = 0;
        var my_top = 0;
        var my_top_gap = 0;
        if (this.w_win >= this.h_win) {
            my_width = this.h_win - 0;
            my_left = this.w_win - this.h_win;
            my_left_gap = 0;
            my_left = (my_left + my_left_gap) / 2;
            my_top = 0;
        }

        if (this.w_win <= this.h_win) {
            my_width = this.w_win - 0;
            my_left = this.w_win - 0;
            my_left_gap = 0;
            my_left = (my_left - my_left_gap) / 2;
            my_top = this.h_win - this.w_win;
            my_top_gap = 0;
            my_top = (this.h_win - this.w_win) / 2;
            my_top = 0;
            my_width = this.w_win;
            my_left = 0;
        }

        console.log("my_width", my_width);

        luopan.setAttribute("width", my_width + "px"); //設定寛為營目同高
        //console.log('my_left:' + my_left);
        //my_left = 0;
        var my_style =
            "display:block; border: 0px solid #000000; position: absolute; z-index: -999; top: " +
            my_top +
            "px; left: " +
            my_left +
            "px; width: " +
            my_width +
            "px;";

        luopan.setAttribute("style", my_style);

        this.my_style = my_style;

        console.log("luopan my_style=", my_style);

        return luopan;
    };
};