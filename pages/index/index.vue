<template>
	<view class="index">
		<!-- <view class="swiper-wrap br20 ofh">
			<swiper class="swiper h100" circular indicator-dots autoplay :interval="3000" :duration="1000">
				<swiper-item v-for="i in 9" :key="i">
					<image class="w100 h100" :src="url + i + '.png'" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view> -->
		<view class="content">
			<view class="image" @click="toShop">
				<image src="https://mp-f3138cb7-2a3b-4344-8e79-a1f65871aab2.cdn.bspapp.com/丹江渔友之家/index.gif"
					mode="aspectFill"></image>
				<view class="text">
					<view>欢迎来到服务之家</view>
					<view>点击进入</view>
				</view>
			</view>
			<view class="cu-list grid" :class="['col-2']">
				<view class="cu-item" style="display: flex; align-items: center;" @click="toFish">
					<image src="../../static/fish_home.png" mode="aspectFit" style="width: 66rpx;height: 66rpx">
					</image>
					<text>渔友导航服务路线图</text>
				</view>
				<view class="cu-item" style="display: flex; align-items: center;" @click="toTour">
					<image src="../../static/place_home.png" mode="aspectFit" style="width: 66rpx;height: 66rpx">
					</image>
					<text>旅友导航服务路线图</text>
				</view>
			</view>
			<view class="" style="height: 0rpx;"></view>
		</view>
		<view style="width: 100%;flex: 1; box-sizing: border-box;padding: 10rpx 0; display: flex; position: relative;"
			@click="toShop">
			<view class="w100 h100">
				<map class="w100 h100" :longitude="markers[markers.length - 1].longitude"
					:latitude="markers[markers.length - 1].latitude" :include-points="includePoints" :enable-3D="true"
					:show-compass="true" :enable-rotate="true" :enable-overlooking="true" :enable-satellite="false"
					:enable-traffic="true" :enable-poi="true" :enable-building="true" :markers="markers" @tap="toShop">
				</map>
			</view>
			<view class=""
				style="position: absolute; width: 100%; left: 0; top: 0;  text-align: center; color: orangered; font-size: 32rpx; font-weight: bolder;"
				@click="toShop">
				渔友之家提供本地特产、烟酒饮料、餐品配送等服务，详细请点击页面底部拨打电话咨询
			</view>
			<view class="" style="position: absolute; width: 100%; left: 0; bottom: 0; ">
				<button class="cu-btn bg-black lg xxl"
					style="width: calc(100% - 24rpx); margin: 12rpx;background: rgba(26, 26, 26, 0.8);"
					@click="toShop">出发前往渔友之家</button>
			</view>
		</view>
		<view style="text-align: center; line-height: 2; font-size: 28rpx; font-weight: bolder;"
			:style="{ paddingBottom: paddingBottom + 'px' }" @click="call">
			点击拨打服务热线：<text class="text-blue">13782023787</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				i: -1,
				paddingBottom: 0,
				url: 'https://mp-f3138cb7-2a3b-4344-8e79-a1f65871aab2.cdn.bspapp.com/丹江渔友之家/index_banner/f',
				key: "LGJBZ-5PIKW-XVLRS-O3PJF-473BQ-FTFF5",
				markers: [{
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
				}]
			}
		},
		async mounted() {
			const info = await uni.getSystemInfoAsync()
			this.paddingBottom = info.screenHeight - info.safeArea.bottom
		},
		onLoad() {
			uni.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		methods: {
			toShop() {
				uni.navigateTo({
					url: '/pages/shop/shop'
				})
			},
			toFish() {
				uni.navigateTo({
					url: '/pages/fish/fish'
				})
			},
			toTour() {
				uni.navigateTo({
					url: '/pages/tour/tour'
				})
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: '13782023787'
				});
			}
		}
	}
</script>

<style lang="scss">
	.index {
		height: 100%;
		display: flex;
		position: relative;
		background: #efefef;
		box-sizing: border-box;
		flex-direction: column;

		.swiper-wrap {
			height: 451rpx;
		}

		.content {
			flex: 1;
			width: 100%;

			.image {
				height: 690rpx;
				overflow: hidden;
				margin-bottom: 10rpx;
				position: relative;
				border-radius: 8rpx;

				image {
					width: 100%;
					height: 100%
				}

				.text {
					left: 0%;
					width: 100%;
					bottom: 42%;
					color: #fff;
					font-size: 66rpx;
					text-align: center;
					position: absolute;
					font-weight: bolder;
					text-shadow: 0px 0rpx 10rpx orangered;

					>view:last-child {
						text-shadow: 0px 0rpx 10rpx blue;
					}
				}
			}
		}
	}
</style>