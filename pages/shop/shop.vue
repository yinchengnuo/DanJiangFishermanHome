<template>
	<view class="index">
		<swiper class="round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			duration="500" style="height: 300rpx;">
			<swiper-item v-for="item in banner_list" :key="item">
				<image :src="item" style="width: 100%; height: 100%;" mode="aspectFill">
				</image>
			</swiper-item>
		</swiper>
		<view @click="toShop"
			style="margin: 10rpx 0;display: flex; align-items: center; box-sizing: border-box;padding: 10rpx 20rpx; border: 10rpx 10rpx;">
			<view class="" style="flex: 1">
				<view class="icon cuIcon-shop" style="font-size: 34rpx;">&nbsp;玉华名酒行</view>
				<view class="icon cuIcon-phone text-blue" style="font-size: 30rpx;display: inline;"
					@click.stop="call()">
					&nbsp;13782023787
				</view>
				<view class="icon cuIcon-location" style="font-size: 28rpx;">&nbsp;&nbsp;中国河南省南阳市邓州市韩营村</view>
			</view>
			<view class="icon cuIcon-right" style="font-size: 36rpx;"></view>
		</view>
		<view id="scrollView" class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop"
				:style="{ height: scrollViewHeight + 'px' }">
				<view class="cu-item" :class="index == tabCur ? 'text-green cur' : ''" v-for="(item, index) in list"
					:key="index" @tap="TabSelect" :data-id="index">
					{{ item.name }}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation
				:style="{ height: scrollViewHeight + 'px' }" :scroll-into-view="'main-' + mainCur"
				@scroll="VerticalMain">
				<view v-for="(item, index) in list" :key="index" :id="'main-' + index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text>{{ item.name }}
						</view>
					</view>
					<view v-for="(itemm, index) in item.list" :key="index" class="cu-list menu-avatar solid-top"
						style="background: #fff; margin-top: 0;" @click="preview(itemm)">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style="{ backgroundImage: 'url(' + itemm.pic + ')' }">
							</view>
							<view class="content">
								<view class="text-grey">{{ itemm.name }}</view>
								<!-- <view class="text-gray text-sm flex">
									<text class="text-cut">
										<text class="cuIcon-infofill text-red  margin-right-xs"></text>
										我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。
									</text>
								</view> -->
							</view>
							<view class="action icon cuIcon-right">
								<!-- <view class="text-grey text-xs">22:20</view> -->
								<!-- <view class="cu-tag round bg-grey sm">5</view> -->
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view
			style="text-align: center; line-height: 2; font-size: 28rpx; font-weight: bolder;background-color: #f1f1f1;"
			:style="{ paddingBottom: paddingBottom + 'px' }" @click="call">
			点击拨打服务热线：<text class="text-blue">13782023787</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				scrollViewHeight: 0,
				paddingBottom: 0,
				verticalNavTop: 0,
				load: true,
				banner_list: [],
				previewList: []
			};
		},
		async mounted() {
			const info = await uni.getSystemInfoAsync()
			this.paddingBottom = info.screenHeight - info.safeArea.bottom

			setTimeout(() => {
				uni.createSelectorQuery().in(this).select('#scrollView').boundingClientRect(({
					height
				}) => {
					this.scrollViewHeight = height
				}).exec()
			})
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});

			uni.startPullDownRefresh()

			uni.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		onReady() {
			uni.hideLoading()
		},
		onPullDownRefresh() {
			this.query()
		},
		methods: {
			query() {
				uni.showLoading({})
				uni.request({
					url: 'https://fc-mp-f3138cb7-2a3b-4344-8e79-a1f65871aab2.next.bspapp.com/mp/yuyou'
				}).then(({
					data
				}) => {
					console.log(data.good_list)
					this.banner_list = data.banner_list

					const type = data.good_list.map(e => e.name)
					let list = [{}];
					for (let i = 0; i < type.length; i++) {
						list[i] = {};
						list[i].name = type[i];
						list[i].list = data.good_list[i].list;
						list[i].id = i;
						// this.previewList.push(...list[i].list.map(({ pic }) => pic.replace(/(?<=good_img\/)\d/, $ => $ + '_字')))
						// console.log()
						this.previewList.push(...(list[i].list.map(({
							pic
						}) => pic.replace(/(?<=good_img\/)\d/, $ => $ + '_字'))))
					}
					this.list = list;
					this.listCur = list[0];
				}).finally(() => {
					uni.hideLoading({})
					uni.stopPullDownRefresh()
				})
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						return false
					}
				}
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: '13782023787'
				});
			},
			toShop() {
				const item = {
					name: '渔友之家',
					latitude: '32.662064',
					longitude: '111.723755'
				}
				uni.navigateTo({
					url: 'plugin://routePlan/index?key=LGJBZ-5PIKW-XVLRS-O3PJF-473BQ-FTFF5&referer=丹江渔友之家&navigation=1&endPoint=' +
						JSON.stringify(item)
				})
			},
			preview({
				pic
			}) {
				// uni.showToast({
				// 	title: pic
				// })
				uni.previewImage({
					urls: this.previewList,
					current: pic.replace(/(?<=good_img\/)\d/, $ => $ + '_字'),
					showmenu: false
				})
			}
		},
	}
</script>

<style>
	.index {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200rpx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8rpx;
		height: 30rpx;
		border-radius: 10rpx 0 0 10rpx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0rpx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
		width: 100%;
		flex: 1;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>