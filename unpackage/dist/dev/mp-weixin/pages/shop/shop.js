"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
    const info = await common_vendor.index.getSystemInfoAsync();
    this.paddingBottom = info.screenHeight - info.safeArea.bottom;
    setTimeout(() => {
      common_vendor.index.createSelectorQuery().in(this).select("#scrollView").boundingClientRect(({
        height
      }) => {
        this.scrollViewHeight = height;
      }).exec();
    });
  },
  onLoad() {
    common_vendor.index.showLoading({
      title: "加载中...",
      mask: true
    });
    common_vendor.index.startPullDownRefresh();
    common_vendor.index.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"]
    });
  },
  onReady() {
    common_vendor.index.hideLoading();
  },
  onPullDownRefresh() {
    this.query();
  },
  methods: {
    query() {
      common_vendor.index.showLoading({});
      common_vendor.index.request({
        url: "https://fc-mp-f3138cb7-2a3b-4344-8e79-a1f65871aab2.next.bspapp.com/mp/yuyou"
      }).then(({
        data
      }) => {
        console.log(data.good_list);
        this.banner_list = data.banner_list;
        const type = data.good_list.map((e) => e.name);
        let list = [{}];
        for (let i = 0; i < type.length; i++) {
          list[i] = {};
          list[i].name = type[i];
          list[i].list = data.good_list[i].list;
          list[i].id = i;
          this.previewList.push(...list[i].list.map(({
            pic
          }) => pic.replace(new RegExp("(?<=good_img\\/)\\d"), ($) => $ + "_字")));
        }
        this.list = list;
        this.listCur = list[0];
      }).finally(() => {
        common_vendor.index.hideLoading({});
        common_vendor.index.stopPullDownRefresh();
      });
    },
    TabSelect(e) {
      this.tabCur = e.currentTarget.dataset.id;
      this.mainCur = e.currentTarget.dataset.id;
      this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50;
    },
    VerticalMain(e) {
      let tabHeight = 0;
      if (this.load) {
        for (let i = 0; i < this.list.length; i++) {
          let view = common_vendor.index.createSelectorQuery().select("#main-" + this.list[i].id);
          view.fields({
            size: true
          }, (data) => {
            this.list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            this.list[i].bottom = tabHeight;
          }).exec();
        }
        this.load = false;
      }
      let scrollTop = e.detail.scrollTop;
      for (let i = 0; i < this.list.length; i++) {
        if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
          this.verticalNavTop = (this.list[i].id - 1) * 50;
          this.tabCur = this.list[i].id;
          return false;
        }
      }
    },
    call() {
      common_vendor.index.makePhoneCall({
        phoneNumber: "13782023787"
      });
    },
    toShop() {
      const item = {
        name: "渔友之家",
        latitude: "32.662064",
        longitude: "111.723755"
      };
      common_vendor.index.navigateTo({
        url: "plugin://routePlan/index?key=LGJBZ-5PIKW-XVLRS-O3PJF-473BQ-FTFF5&referer=丹江渔友之家&navigation=1&endPoint=" + JSON.stringify(item)
      });
    },
    preview({
      pic
    }) {
      common_vendor.index.previewImage({
        urls: this.previewList,
        current: pic.replace(new RegExp("(?<=good_img\\/)\\d"), ($) => $ + "_字"),
        showmenu: false
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.banner_list, (item, k0, i0) => {
      return {
        a: item,
        b: item
      };
    }),
    b: common_vendor.o(($event) => $options.call()),
    c: common_vendor.o((...args) => $options.toShop && $options.toShop(...args)),
    d: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n(index == $data.tabCur ? "text-green cur" : ""),
        c: index,
        d: common_vendor.o((...args) => $options.TabSelect && $options.TabSelect(...args), index),
        e: index
      };
    }),
    e: $data.verticalNavTop,
    f: $data.scrollViewHeight + "px",
    g: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.f(item.list, (itemm, index2, i1) => {
          return {
            a: "url(" + itemm.pic + ")",
            b: common_vendor.t(itemm.name),
            c: index2,
            d: common_vendor.o(($event) => $options.preview(itemm), index2)
          };
        }),
        c: index,
        d: "main-" + index
      };
    }),
    h: $data.scrollViewHeight + "px",
    i: "main-" + $data.mainCur,
    j: common_vendor.o((...args) => $options.VerticalMain && $options.VerticalMain(...args)),
    k: $data.paddingBottom + "px",
    l: common_vendor.o((...args) => $options.call && $options.call(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yinchengnuo/Desktop/my/丹江渔友之家/pages/shop/shop.vue"]]);
wx.createPage(MiniProgramPage);
