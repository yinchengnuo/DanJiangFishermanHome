<!--
 * @Author: 尹成诺
 * @Date: 2023-08-30 18:50:55
 * @LastEditors: 尹成诺
 * @LastEditTime: 2023-09-04 19:28:27
 * @Description: file content
-->
<template>
	<view class="index h100">
		<map v-if="map" id="map" class="w100 h100" :longitude="markers[markers.length - 1].longitude"
			:latitude="markers[markers.length - 1].latitude" :include-points="includePoints" :enable-3D="true"
			:show-compass="true" :enable-rotate="true" :enable-overlooking="true" :enable-satellite="false"
			:enable-traffic="true" :enable-poi="true" :enable-building="true" :show-location="true" :markers="markers">
		</map>
		<view class="bar" :style="{ paddingBottom: paddingBottom + 'px' }">
			<view v-if="active" class="buttons">
				<button v-for="(e, i) in buttons" :key="e.name" @click="switchIndex(i)" class="cu-btn round shadow xl"
					:class="index === i ? 'bg-gray' : 'line-gray'"
					style="margin: 0 8rpx 12rpx 0;">{{ i + 1 }}号钓点</button>
			</view>
			<view class="flex" style="justify-content: space-evenly; margin-top: 12rpx;">
				<button @click="switchPlace(0)" class="cu-btn round shadow xl"
					:class="active === 0 ? 'bg-black' : 'line-black'">🏠</button>
				<button @click="switchPlace(1)" class="cu-btn round shadow xl"
					:class="active === 1 ? 'bg-black' : 'line-black'">渠首</button>
				<button @click="switchPlace(2)" class="cu-btn round shadow xl"
					:class="active === 2 ? 'bg-black' : 'line-black'">刘山水库</button>
				<button @click="switchPlace(3)" class="cu-btn round shadow xl"
					:class="active === 3 ? 'bg-black' : 'line-black'">白龙泉水库</button>
			</view>
			<button class="cu-btn bg-black lg xxl" style="width: calc(100% - 24rpx); margin: 12rpx;" @click="go">出发前往{{ toName
			}}</button>
		</view>
	</view>
</template>

<script>
	import list from './map'
	const shop = {
		id: 1,
		width: 34,
		height: 34,
		name: '渔友之家',
		latitude: 32.662064,
		longitude: 111.723755,
		iconPath: '/static/home.png',
		callout: {
			padding: 4,
			color: '#f0f',
			fontSize: 14,
			bgColor: '#fff',
			content: '渔友之家',
			display: 'ALWAYS',
			borderRadius: 4,
			borderWidth: 1,
			borderColor: "#aaa"
		},
	}
	const markers = [...list.map(e => ({
		...e,
		width: 20,
		height: 20,
		iconPath: '/static/fish.png',
		callout: {
			padding: 4,
			color: '#000',
			fontSize: 8,
			bgColor: '#fff',
			content: `${e.name}号钓点`,
			display: 'ALWAYS',
		},
	})), shop]
	export default {
		data() {
			return {
				map: true,
				index: -1,
				active: 0,
				buttons: [],
				paddingBottom: 0,
				markers,
				includePoints: markers
			};
		},
		computed: {
			toName() {
				if (this.active) {
					if (this.index > -1) {
						if (this.active === 1) return '渠首' + (this.index + 1) + '号钓点'
						if (this.active === 2) return '刘山水库' + (this.index + 1) + '号钓点'
						if (this.active === 3) return '白龙泉水库' + (this.index + 1) + '号钓点'
					} else {
						if (this.active === 1) return '渠首'
						if (this.active === 2) return '刘山水库'
						if (this.active === 3) return '白龙泉水库'
					}
				} else {
					return '渔友之家'
				}
			}
		},
		onLoad() {
			uni.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		async mounted() {
			const info = await uni.getSystemInfoAsync()
			this.paddingBottom = info.screenHeight - info.safeArea.bottom

			this._mapContext = uni.createMapContext("map", this);

			this.showAll()
		},
		methods: {
			async refreshMap() {
				return new Promise(resolve => {
					this.map = false
					setTimeout(() => {
						this.map = true
						setTimeout(() => {
							this._mapContext = uni.createMapContext("map", this);
							resolve()
						})
					})
				})
			},
			async switchPlace(index) {
				this.index = -1

				this.active = index
				if (index === 0) {
					this.showAll()
					this.buttons = []
				}
				if (index === 1) {
					this.buttons = this.markers.filter(e => e.group === '渠首')
					this._mapContext.includePoints({
						points: this.buttons,
						padding: [0, 28, 128, 28]
					})
				}
				if (index === 2) {
					this.buttons = this.markers.filter(e => e.group === '刘山水库')
					this._mapContext.includePoints({
						points: this.buttons,
						padding: [0, 28, 128, 28]
					})
				}
				if (index === 3) {
					this.buttons = this.markers.filter(e => e.group === '白龙泉水库')
					this._mapContext.includePoints({
						points: this.buttons,
						padding: [0, 28, 128, 28]
					})
				}
			},
			showAll() {
				uni.getLocation().then(res => {
					this._mapContext.includePoints({
						points: [res, ...this.markers],
						padding: [0, 28, 128, 28]
					})
				})
			},

			async switchIndex(index) {
				this.index = index
				this.includePoints = [this.buttons[index]]
				await this.refreshMap()
			},

			go() {
				const item = {
					name: '',
					latitude: '',
					longitude: ''
				}
				if (this.active) {
					if (this.index > -1) {
						item.latitude = this.buttons[this.index].latitude
						item.longitude = this.buttons[this.index].longitude
						if (this.active === 1) item.name = '渠首' + (this.index + 1) + '号钓点'
						if (this.active === 2) item.name = '刘山水库' + (this.index + 1) + '号钓点'
						if (this.active === 3) item.name = '白龙泉水库' + (this.index + 1) + '号钓点'
					} else {
						return uni.showToast({
							icon: "none",
							title: '请选择钓点'
						})
					}
				} else {
					item.name = '渔友之家'
					item.latitude = shop.latitude
					item.longitude = shop.longitude
				}
				uni.navigateTo({
					url: 'plugin://routePlan/index?key=LGJBZ-5PIKW-XVLRS-O3PJF-473BQ-FTFF5&referer=丹江渔友之家&navigation=1&endPoint=' +
						JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang="scss">
	.index {
		position: relative;

		.bar {
			left: 0;
			bottom: 0;
			width: 100%;
			position: fixed;
			justify-content: space-evenly;
			background: rgba(255, 255, 255, .3);

			.buttons {
				padding: 12px 8px 0;
				background: rgba(255, 255, 255, .8);

			}
		}
	}
</style>