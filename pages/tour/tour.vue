<!--
 * @Author: 尹成诺
 * @Date: 2023-08-30 18:50:55
 * @LastEditors: 尹成诺
 * @LastEditTime: 2023-09-01 10:33:47
 * @Description: file content
-->
<template>
	<view class="index h100">
		<map id="map" class="w100 h100" :enable-3D="true" :show-compass="true" :enable-rotate="true"
			:enable-overlooking="true" :enable-satellite="false" :enable-traffic="true" :enable-poi="true"
			:enable-building="true" :show-location="true" :markers="markers">
		</map>
		<view class="bar" :style="{ paddingBottom: paddingBottom + 'px' }">
			<view class="flex" style=" flex-wrap: wrap; padding: 8rpx 12rpx 0;">
				<button @click="switchPlace(0)" class="cu-btn round shadow xl"
					:class="active === 0 ? 'bg-black' : 'line-black'">🏠</button>
				<button v-for="(item, index) in list" :key="item.name" @click="switchPlace(index + 1, item)"
					class="cu-btn round shadow xl"
					:class="active === (index + 1) ? 'bg-black' : 'line-black'">{{ item.name}}</button>
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
		width: 30,
		height: 30,
		name: '旅友之家',
		latitude: 32.662064,
		longitude: 111.723755,
		iconPath: '/static/home.png',
		callout: {
			padding: 4,
			color: '#f0f',
			fontSize: 14,
			bgColor: '#fff',
			content: '旅友之家',
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
		iconPath: '/static/tour.png',
		callout: {
			padding: 4,
			fontSize: 10,
			color: '#000',
			bgColor: '#fff',
			content: `${e.name}`,
			display: 'ALWAYS',
		},
	})), shop]
	export default {
		data() {
			return {
				list,
				index: -1,
				active: 0,
				buttons: [],
				toName: '',
				paddingBottom: 0,
				markers,
				toItem: shop
			};
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
			this._mapContext.includePoints({
				points: this.markers,
				padding: 10
			})

		},
		methods: {
			switchPlace(index, item) {
				this.active = index
				if (index) {
					this.toName = item.name
					this.toItem = item
				} else {
					this.toName = '旅友之家'
					this.toItem = shop
				}

			},
			go() {
				uni.navigateTo({
					url: 'plugin://routePlan/index?key=LGJBZ-5PIKW-XVLRS-O3PJF-473BQ-FTFF5&referer=丹江渔友之家&navigation=1&endPoint=' +
						JSON.stringify(this.toItem)
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
			background: rgba(255, 255, 255, .8);

			button {
				margin: 4rpx 8rpx;
			}
		}
	}
</style>