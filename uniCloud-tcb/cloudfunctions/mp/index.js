'use strict';
const Config = require('uni-config-center')({
	pluginId: 'mp'
}).config()
const Auth = require('./modules/Auth.js')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log(event, context)

	const result = {}

	if (event && event.path) {
		if (event.path.match(/^\/auth/)) Auth(event, context, result)
	}

	return result
};