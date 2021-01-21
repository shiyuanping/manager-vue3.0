const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
	//配置根目录
	publicPath: './',
	runtimeCompiler: true,
	chainWebpack: (config) => {
		config.resolve.alias.set('@', resolve('./src'));
	},
	//构建输出目录
	outputDir: 'tea_manager_vue_dist',
	//静态资源目录（js,css,image）
	assetsDir: 'assets',
	//是否开启eslint检测，false不开启，有效值：true || false
	lintOnSave: false,
	//生成环境下面开启sourceMap支持断点调试
	productionSourceMap: false,
	configureWebpack: {
		devtool: 'source-map', //配置开发者环境的sourceMap用于断点调试
	},
	devServer: {
		open: true, //是否启动打开浏览器
		host: 'localhost',
		https: false, //是否启动https
		//配置跨域代理http,https
		proxy: {
			'/api': {
				target: 'http://10.234.255.14:8080',
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					//表示需要rewrite重写的
					'^/api': '',
				},
			},
		},
	},
	css: {
		requireModuleExtension: true,
		sourceMap: true,
		loaderOptions: {
			scss: {
				/*sass-loader 8.0语法 */
				//prependData: '@import "~@/styles/variables.scss";',

				/*sass-loader 9.0写法，感谢github用户 shaonialife*/
				additionalData(content, loaderContext) {
					const { resourcePath, rootContext } = loaderContext;
					const relativePath = path.relative(rootContext, resourcePath);
					if (relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss') {
						return '@import "~@/styles/variables.scss";' + content;
					}
					return content;
				},
			},
		},
	},
};
