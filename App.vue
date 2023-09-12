<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import url("style/index.scss");

	page {
		height: 100%;
		padding: 10rpx;
		box-sizing: border-box;
	}

	.index {
		background: #fff;
		border-radius: 10rpx;
	}
</style>