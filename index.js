const glob = require("glob");
//参数是模糊匹配的文件路径
const files = glob.sync("src/**/*.js{,x}")
console.log(files);









