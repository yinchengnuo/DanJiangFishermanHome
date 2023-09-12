"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_fish_map = require("./map.js");
const shop = {
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
};
const markers = [...pages_fish_map.list.map((e) => ({
  ...e,
  width: 20,
  height: 20,
  iconPath: "/static/fish.png",
  callout: {
    padding: 4,
    color: "#000",
    fontSize: 8,
    bgColor: "#fff",
    content: `${e.name}号钓点`,
    display: "ALWAYS"
  }
})), shop];
const _sfc_main = {
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
          if (this.active === 1)
            return "渠首" + (this.index + 1) + "号钓点";
          if (this.active === 2)
            return "刘山水库" + (this.index + 1) + "号钓点";
          if (this.active === 3)
            return "白龙泉水库" + (this.index + 1) + "号钓点";
        } else {
          if (this.active === 1)
            return "渠首";
          if (this.active === 2)
            return "刘山水库";
          if (this.active === 3)
            return "白龙泉水库";
        }
      } else {
        return "渔友之家";
      }
    }
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
    this.showAll();
  },
  methods: {
    async refreshMap() {
      return new Promise((resolve) => {
        this.map = false;
        setTimeout(() => {
          this.map = true;
          setTimeout(() => {
            this._mapContext = common_vendor.index.createMapContext("map", this);
            resolve();
          });
        });
      });
    },
    async switchPlace(index) {
      this.index = -1;
      this.active = index;
      if (index === 0) {
        this.showAll();
        this.buttons = [];
      }
      if (index === 1) {
        this.buttons = this.markers.filter((e) => e.group === "渠首");
        this._mapContext.includePoints({
          points: this.buttons,
          padding: [0, 28, 128, 28]
        });
      }
      if (index === 2) {
        this.buttons = this.markers.filter((e) => e.group === "刘山水库");
        this._mapContext.includePoints({
          points: this.buttons,
          padding: [0, 28, 128, 28]
        });
      }
      if (index === 3) {
        this.buttons = this.markers.filter((e) => e.group === "白龙泉水库");
        this._mapContext.includePoints({
          points: this.buttons,
          padding: [0, 28, 128, 28]
        });
      }
    },
    showAll() {
      common_vendor.index.getLocation().then((res) => {
        this._mapContext.includePoints({
          points: [res, ...this.markers],
          padding: [0, 28, 128, 28]
        });
      });
    },
    async switchIndex(index) {
      this.index = index;
      this.includePoints = [this.buttons[index]];
      await this.refreshMap();
    },
    go() {
      const item = {
        name: "",
        latitude: "",
        longitude: ""
      };
      if (this.active) {
        if (this.index > -1) {
          item.latitude = this.buttons[this.index].latitude;
          item.longitude = this.buttons[this.index].longitude;
          if (this.active === 1)
            item.name = "渠首" + (this.index + 1) + "号钓点";
          if (this.active === 2)
            item.name = "刘山水库" + (this.index + 1) + "号钓点";
          if (this.active === 3)
            item.name = "白龙泉水库" + (this.index + 1) + "号钓点";
        } else {
          return common_vendor.index.showToast({
            icon: "none",
            title: "请选择钓点"
          });
        }
      } else {
        item.name = "渔友之家";
        item.latitude = shop.latitude;
        item.longitude = shop.longitude;
      }
      common_vendor.index.navigateTo({
        url: "plugin://routePlan/index?key=LGJBZ-5PIKW-XVLRS-O3PJF-473BQ-FTFF5&referer=丹江渔友之家&navigation=1&endPoint=" + JSON.stringify(item)
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.map
  }, $data.map ? {
    b: $data.markers[$data.markers.length - 1].longitude,
    c: $data.markers[$data.markers.length - 1].latitude,
    d: $data.includePoints,
    e: $data.markers
  } : {}, {
    f: $data.active
  }, $data.active ? {
    g: common_vendor.f($data.buttons, (e, i, i0) => {
      return {
        a: common_vendor.t(i + 1),
        b: e.name,
        c: common_vendor.o(($event) => $options.switchIndex(i), e.name),
        d: common_vendor.n($data.index === i ? "bg-gray" : "line-gray")
      };
    })
  } : {}, {
    h: common_vendor.o(($event) => $options.switchPlace(0)),
    i: common_vendor.n($data.active === 0 ? "bg-black" : "line-black"),
    j: common_vendor.o(($event) => $options.switchPlace(1)),
    k: common_vendor.n($data.active === 1 ? "bg-black" : "line-black"),
    l: common_vendor.o(($event) => $options.switchPlace(2)),
    m: common_vendor.n($data.active === 2 ? "bg-black" : "line-black"),
    n: common_vendor.o(($event) => $options.switchPlace(3)),
    o: common_vendor.n($data.active === 3 ? "bg-black" : "line-black"),
    p: common_vendor.t($options.toName),
    q: common_vendor.o((...args) => $options.go && $options.go(...args)),
    r: $data.paddingBottom + "px"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yinchengnuo/Desktop/my/丹江渔友之家/pages/fish/fish.vue"]]);
wx.createPage(MiniProgramPage);
