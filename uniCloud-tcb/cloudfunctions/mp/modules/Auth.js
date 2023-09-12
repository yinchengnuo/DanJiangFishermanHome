module.exports = (event, context, result) => {
	if (event.path === '/auth/login') {
		result.data = {
			a: 1,
			b: 2,
			c: 3
		}
	}
}