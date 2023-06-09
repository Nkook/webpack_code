// 完整引入 打包体积较大
// import "core-js";
// 按需引入
// import "core-js/es/promise";
import count from "./js/count";
import sum from "./js/sum";
// 要想webpack打包资源必须在main.js中引入
import "./css/iconfont.css";
import "./css/index.css"
import "./less/index.less"
import "./sass/index.sass"
import "./sass/index.scss"
import "./stylus/index.styl"
// import {mul} from "./js/math"

document.getElementById('btn').onclick = function () {
    // 动态导入 --> 实现按需加载：会将动态导入的文件代码分割，拆分成单独的模块，在需要使用的时候自动加载
    // 即使只被引用了一次，也会代码分割
    // 打包后会将该js文件单独分割出来587.js，在点击的时候 network中可以看到该js文件的加载
    // /* webpackChunkName: "math" */ 这是webpack命名的方式，也叫魔法命名。此时打包的就不是587这种随机数了，而是math.js
    import(/* webpackChunkName: "math" */ "./js/math").then(({ mul }) => { // import有波浪线是eslint不能识别动态导入，需要额外配置
        console.log('/js/math模块加载成功', mul(1, 3))
    })
}
// console.log('mul', mul(1, 2))
// var a = 1 // 此时打包会报错
console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));

if (module.hot) {
    // 判断是否支持热模块替换功能: 局部更新js文件，不再编译刷新整个页面
    module.hot.accept("./js/count.js");
    // module.hot.accept("./js/sum.js", function (sum) {
    //     const result2 = sum(1, 2, 3, 4);
    //     console.log('result2', result2);
    //   });
    module.hot.accept("./js/sum.js");
}

// 添加promise代码
const promise = Promise.resolve();
promise.then(() => {
  console.log("hello promise");
});

const arr = [1, 2]
console.log('arr', arr.includes(1))

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
            console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
        });
    });
}