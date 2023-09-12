"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      i: -1,
      paddingBottom: 0,
      url: "https://mp-f3138cb7-2a3b-4344-8e79-a1f65871aab2.cdn.bspapp.com/丹江渔友之家/index_banner/f",
      key: "LGJBZ-5PIKW-XVLRS-O3PJF-473BQ-FTFF5",
      markers: [{
        id: 1,
        width: 34,
        height: 34,
        name: "渔友之家",
        latitude: 32.662064,
        longitude: 111.723755,
        iconPath: "/static/home.png",
        callout: {
          padding: 4,
          color: "#f0f",
          fontSize: 14,
          bgColor: "#fff",
          content: "渔友之家",
          display: "ALWAYS",
          borderRadius: 4,
          borderWidth: 1,
          borderColor: "#aaa"
        }
      }]
    };
  },
  async mounted() {
    const info = await common_vendor.index.getSystemInfoAsync();
    this.paddingBottom = info.screenHeight - info.safeArea.bottom;
  },
  onLoad() {
    common_vendor.index.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"]
    });
  },
  methods: {
    toShop() {
      common_vendor.index.navigateTo({
        url: "/pages/shop/shop"
      });
    },
    toFish() {
      common_vendor.index.navigateTo({
        url: "/pages/fish/fish"
      });
    },
    toTour() {
      common_vendor.index.navigateTo({
        url: "/pages/tour/tour"
      });
    },
    call() {
      common_vendor.index.makePhoneCall({
        phoneNumber: "13782023787"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.toShop && $options.toShop(...args)),
    b: common_vendor.o((...args) => $options.toFish && $options.toFish(...args)),
    c: common_vendor.o((...args) => $options.toTour && $options.toTour(...args)),
    d: $data.markers[$data.markers.length - 1].longitude,
    e: $data.markers[$data.markers.length - 1].latitude,
    f: _ctx.includePoints,
    g: $data.markers,
    h: common_vendor.o((...args) => $options.toShop && $options.toShop(...args)),
    i: common_vendor.o((...args) => $options.toShop && $options.toShop(...args)),
    j: common_vendor.o((...args) => $options.toShop && $options.toShop(...args)),
    k: common_vendor.o((...args) => $options.toShop && $options.toShop(...args)),
    l: $data.paddingBottom + "px",
    m: common_vendor.o((...args) => $options.call && $options.call(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yinchengnuo/Desktop/my/丹江渔友之家/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
