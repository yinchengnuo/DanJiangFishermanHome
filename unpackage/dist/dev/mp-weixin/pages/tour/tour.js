"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_tour_map = require("./map.js");
const shop = {
  id: 1,
  width: 30,
  height: 30,
  name: "旅友之家",
  latitude: 32.662064,
  longitude: 111.723755,
  iconPath: "/static/home.png",
  callout: {
    padding: 4,
    color: "#f0f",
    fontSize: 14,
    bgColor: "#fff",
    content: "旅友之家",
    display: "ALWAYS",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#aaa"
  }
};
const markers = [...pages_tour_map.list.map((e) => ({
  ...e,
  width: 20,
  height: 20,
  iconPath: "/static/tour.png",
  callout: {
    padding: 4,
    fontSize: 10,
    color: "#000",
    bgColor: "#fff",
    content: `${e.name}`,
    display: "ALWAYS"
  }
})), shop];
const _sfc_main = {
  data() {
    return {
      list: pages_tour_map.list,
      index: -1,
      active: 0,
      buttons: [],
      toName: "",
      paddingBottom: 0,
      markers,
      toItem: shop
    };
  },
  onLoad() {
    common_vendor.index.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"]
    });
  },
  async mounted() {
    const info = await common_vendor.index.getSystemInfoAsync();
    this.paddingBottom = info.screenHeight - info.safeArea.bottom;
    this._mapContext = common_vendor.index.createMapContext("map", this);
    this._mapContext.includePoints({
      points: this.markers,
      padding: 10
    });
  },
  methods: {
    switchPlace(index, item) {
      this.active = index;
      if (index) {
        this.toName = item.name;
        this.toItem = item;
      } else {
        this.toName = "旅友之家";
        this.toItem = shop;
      }
    },
    go() {
      common_vendor.index.navigateTo({
        url: "plugin://routePlan/index?key=LGJBZ-5PIKW-XVLRS-O3PJF-473BQ-FTFF5&referer=丹江渔友之家&navigation=1&endPoint=" + JSON.stringify(this.toItem)
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.markers,
    b: common_vendor.o(($event) => $options.switchPlace(0)),
    c: common_vendor.n($data.active === 0 ? "bg-black" : "line-black"),
    d: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.name,
        c: common_vendor.o(($event) => $options.switchPlace(index + 1, item), item.name),
        d: common_vendor.n($data.active === index + 1 ? "bg-black" : "line-black")
      };
    }),
    e: common_vendor.t($data.toName),
    f: common_vendor.o((...args) => $options.go && $options.go(...args)),
    g: $data.paddingBottom + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yinchengnuo/Desktop/my/丹江渔友之家/pages/tour/tour.vue"]]);
wx.createPage(MiniProgramPage);
