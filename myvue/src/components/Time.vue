<template>
  <div id="main">
    <div id="error">亲，您使用的浏览器无法支持即将显示的内容，请换成谷歌(<a
      href="http://www.google.cn/chrome/intl/zh-CN/landing_chrome.html?hl=zh-CN&brand=CHMI">Chrome</a>)或者火狐(<a
      href="http://firefox.com.cn/download/">Firefox</a>)浏览器哟~
    </div>
    <div id="wrap">
      <div id="text">
        <div id="code">
          <span class="say">aaaaaaaa</span><br>
          <span class="say">bbbbbbb</span><br>
          <span class="say">sssssss</span><br>
        </div>
      </div>
      <div id="clock-box">
        <span style="color: #138cbc;font-size: large" target="_blank">波波</span> 与 <span
        style="color: hotpink;font-size: larger" target="_blank">贝贝</span> 在一起的
        <div id="clock"></div>
      </div>
      <div id="canvasDiv">
      </div>
      <canvas id="canvas" width="1100" height="680"></canvas>
    </div>
    <audio id="myAudio" src="../../static/js/Love_files/Love.mp3" autoplay="autoplay" loop="loop"></audio>
  </div>
</template>
<script>
  import Vue from "vue/dist/vue.esm";
  import  $ from  "jquery";

  export default {
    data() {
      return {
        str:"aaaaaaaaaaaaaaaaaaa",
        str2:""
      }
    },
    mounted() {
      this.action()
    },
    methods: {
      action() {
        var canvas = $("#canvas");
        console.log(canvas)
        if (!canvas[0].getContext('2d')) {
          $("#error").show();
          return false;
        }
        console.log(canvas.width)
        var width = canvas.width();
        var height = canvas.height();
        canvas.attr("width", width);
        canvas.attr("height", height);

        var opts = {
          seed: {
            x: width / 2 - 20,
            color: "rgb(190, 26, 37)",
            scale: 2
          },
          branch: [
            [535, 680, 570, 250, 500, 200, 30, 100, [
              [540, 500, 455, 417, 340, 400, 13, 100, [
                [450, 435, 434, 430, 394, 395, 2, 40]
              ]],
              [550, 445, 600, 356, 680, 345, 12, 100, [
                [578, 400, 648, 409, 661, 426, 3, 80]
              ]],
              [539, 281, 537, 248, 534, 217, 3, 40],
              [546, 397, 413, 247, 328, 244, 9, 80, [
                [427, 286, 383, 253, 371, 205, 2, 40],
                [498, 345, 435, 315, 395, 330, 4, 60]
              ]],
              [546, 357, 608, 252, 678, 221, 6, 100, [
                [590, 293, 646, 277, 648, 271, 2, 80]
              ]]
            ]]
          ],
          bloom: {
            num: 700,
            width: 1080,
            height: 650,
          },
          footer: {
            width: 1200,
            height: 5,
            speed: 10,
          }
        }

        var tree = new Tree(canvas[0], width, height, opts);
        var seed = tree.seed;
        var foot = tree.footer;
        var hold = 1;

        canvas.click(function(e) {
          var offset = canvas.offset(), x, y;
          x = e.pageX - offset.left;
          y = e.pageY - offset.top;
          if (seed.hover(x, y)) {
            hold = 0;
            canvas.unbind("click");
            canvas.unbind("mousemove");
            canvas.removeClass('hand');
          }
        }).mousemove(function(e){
          var offset = canvas.offset(), x, y;
          x = e.pageX - offset.left;
          y = e.pageY - offset.top;
          canvas.toggleClass('hand', seed.hover(x, y));
        });

        var seedAnimate = eval(Jscex.compile("async", function () {
          seed.draw();
          while (hold) {
            $await(Jscex.Async.sleep(10));
          }
          while (seed.canScale()) {
            seed.scale(0.95);
            $await(Jscex.Async.sleep(10));
          }
          while (seed.canMove()) {
            seed.move(0, 2);
            $await(Jscex.Async.sleep(10));
          }
          foot.draw();
        }));

        var growAnimate = eval(Jscex.compile("async", function () {
          do {
            tree.grow();
            $await(Jscex.Async.sleep(10));
          } while (tree.canGrow());
        }));

        var flowAnimate = eval(Jscex.compile("async", function () {
          do {
            tree.flower(2);
            $await(Jscex.Async.sleep(10));
          } while (tree.canFlower());
        }));

        var moveAnimate = eval(Jscex.compile("async", function () {
          tree.snapshot("p1", 240, 0, 610, 680);
          while (tree.move("p1", 500, 0)) {
            foot.draw();
            $await(Jscex.Async.sleep(10));
          }
          foot.draw();
          tree.snapshot("p2", 500, 0, 610, 680);

          // 会有闪烁不得意这样做, (＞﹏＜)
          canvas.parent().css("background", "url(" + tree.toDataURL('image/png') + ")");
          canvas.css("background", "#ffe");
          $await(Jscex.Async.sleep(300));
          canvas.css("background", "none");
        }));

        var jumpAnimate = eval(Jscex.compile("async", function () {
          var ctx = tree.ctx;
          while (true) {
            tree.ctx.clearRect(0, 0, width, height);
            tree.jump();
            foot.draw();
            $await(Jscex.Async.sleep(25));
          }
        }));
//设定起始时间
        var textAnimate = eval(Jscex.compile("async", function () {
          var together = new Date();
          together.setYear(2018);
          together.setMonth(9);
          together.setDate(9);
          together.setHours(4);
          together.setMinutes(30);
          together.setSeconds(0);
          together.setMilliseconds(0);
          $("#code").show().typewriter();
          console.log("vvvvvvvvvvvvvvv")
          $("#clock-box").fadeIn(500);
          while (true) {
            timeElapse(together);
            $await(Jscex.Async.sleep(1000));
          }
        }));

        var runAsync = eval(Jscex.compile("async", function () {
          console.log("1111111111")
          $await(seedAnimate());
          console.log("22222222222222")
          $await(growAnimate());
          console.log("33333333333333")
          $await(flowAnimate());
          console.log("44444444444444444")
          $await(moveAnimate());
          console.log("5555555555555555555555")
          textAnimate().start();
          console.log("66666666666666666666")
          $await(jumpAnimate());
          console.log("777777777777777")
        }));

        runAsync().start();
      },

    }
  }

</script>

