const a = /^<zx>(.+?\.[\w]*)<\/zx>$/.test();

// 视频
const video = /(mp4)|(ogg)|(webm)<\/zx>$/.test();

// 图片
const image = /(jp(e)?g)|(png)|(gif)<\/zx>$/.test();