const { merge } = require("webpack-merge");

const common = require("./common.config");

module.exports = merge(common, {
	devtool: "inline-source-map",
	devServer: {
		historyApiFallback: true,
		port: 3000,
	// proxy: {
	// 		"/api": "https://[::1]:3100",
			
	// 	},	
	},
//  resolve: {
//       fallback: {
//         util: require.resolve("util/"),
//       }
// 	},
//   resolve: {
//       fallback: {
//         path: false
//       }
//   },
	mode: "development",
});
