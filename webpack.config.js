const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const glob = require("glob");

//动态生成entry和html-webpack-plugin
function getMap(){
    const entry = {};
    const htmlPlugins = [];
    const files = glob.sync("src/*/index.js")

    //遍历文件，单个file的展现形式example：src/detail/index.js
    files.forEach((file)=>{
        //相当于拿到detail一级的目录
        const filename = file.split("/")[1];
        //path.join用于连接路径，__dirname用于表示当前路径
        entry[filename] = path.join(__dirname,file);
        //html的处理
        htmlPlugins.push(
            new HtmlWebpackPlugin({
                template:path.join(__dirname,`src/${filename}/index.html`),
                filename:`${filename}.html`,
                //表示要把哪些块插入到html，数组或者"all"
                //这是在webpack打包之后的配置
                chunks: [filename],
                url:filename,//html中icon对应的地址
                title:filename
            })
        )
    })
    return {entry,htmlPlugins}
}

const map = getMap(); 

//动态的配置文件
module.exports = {
    entry:map.entry,
    output:{
        path:path.join(__dirname,"dist"),
        filename: '[name]-[hash:6].js'
    },
    plugins:[...map.htmlPlugins]
}
