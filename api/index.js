export default (url, data, config) => {
	return uni.request({
		url: 'https://tcb-hflrdf3i866dfa-3d9ak4a6ee545.service.tcloudbase.com/mp' + url,
		data,
		method: 'POST',
	});
}