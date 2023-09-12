"use strict";
const list = [
  {
    id: "B1",
    // joinCluster: true,
    // clusterId: 'P1',
    group: "白龙泉水库",
    name: "1",
    latitude: 32.588451,
    longitude: 111.748711
  },
  {
    id: "B2",
    // joinCluster: true,
    // clusterId: 'P1',
    group: "白龙泉水库",
    name: "2",
    latitude: 32.58942,
    longitude: 111.745613
  },
  {
    id: "B3",
    // joinCluster: true,
    // clusterId: 'P1',
    group: "白龙泉水库",
    name: "3",
    latitude: 32.591656,
    longitude: 111.747269
  },
  {
    id: "B4",
    // joinCluster: true,
    // clusterId: 'P1',
    group: "白龙泉水库",
    name: "4",
    latitude: 32.589382,
    longitude: 111.7425
  },
  {
    id: "B5",
    // joinCluster: true,
    // clusterId: 'P1',
    group: "白龙泉水库",
    name: "5",
    latitude: 32.592381,
    longitude: 111.743835
  },
  {
    id: "B6",
    // joinCluster: true,
    // clusterId: 'P1',
    group: "白龙泉水库",
    name: "6",
    latitude: 32.595505,
    longitude: 111.747391
  },
  {
    id: "B7",
    // joinCluster: true,
    // clusterId: 'P1',
    group: "白龙泉水库",
    name: "7",
    latitude: 32.59095,
    longitude: 111.742599
  },
  {
    id: "B8",
    // joinCluster: true,
    // clusterId: 'P1',
    group: "白龙泉水库",
    name: "8",
    latitude: 32.593165,
    longitude: 111.747893
  },
  {
    id: "B9",
    // joinCluster: true,
    // clusterId: 'P1',
    group: "白龙泉水库",
    name: "9",
    latitude: 32.589426,
    longitude: 111.742536
  },
  {
    id: "B10",
    // joinCluster: true,
    // clusterId: 'P1',
    group: "白龙泉水库",
    name: "10",
    latitude: 32.590092,
    longitude: 111.743675
  },
  {
    id: "B11",
    // joinCluster: true,
    // clusterId: 'P1',
    group: "白龙泉水库",
    name: "11",
    latitude: 32.592682,
    longitude: 111.749939
  },
  {
    id: "B12",
    // joinCluster: true,
    // clusterId: 'P1',
    group: "白龙泉水库",
    name: "12",
    latitude: 32.591377,
    longitude: 111.741592
  },
  {
    id: "L1",
    // joinCluster: true,
    // clusterId: 'P2',
    group: "刘山水库",
    name: "1",
    latitude: 32.627274,
    longitude: 111.759285
  },
  {
    id: "L2",
    // joinCluster: true,
    // clusterId: 'P2',
    group: "刘山水库",
    name: "2",
    latitude: 32.619785,
    longitude: 111.760765
  },
  {
    id: "L3",
    // joinCluster: true,
    // clusterId: 'P2',
    group: "刘山水库",
    name: "3",
    latitude: 32.624886,
    longitude: 111.759003
  },
  {
    id: "L4",
    // joinCluster: true,
    // clusterId: 'P2',
    group: "刘山水库",
    name: "4",
    latitude: 32.62014,
    longitude: 111.761581
  },
  {
    id: "L5",
    // joinCluster: true,
    // clusterId: 'P2',
    group: "刘山水库",
    name: "5",
    latitude: 32.619301,
    longitude: 111.772232
  },
  {
    id: "L6",
    // joinCluster: true,
    // clusterId: 'P2',
    group: "刘山水库",
    name: "6",
    latitude: 32.62505,
    longitude: 111.772209
  },
  {
    id: "L7",
    // joinCluster: true,
    // clusterId: 'P2',
    group: "刘山水库",
    name: "7",
    latitude: 32.627274,
    longitude: 111.759285
  },
  {
    id: "L8",
    // joinCluster: true,
    // clusterId: 'P2',
    group: "刘山水库",
    name: "8",
    latitude: 32.623482,
    longitude: 111.762138
  },
  {
    id: "L9",
    // joinCluster: true,
    // clusterId: 'P2',
    group: "刘山水库",
    name: "9",
    latitude: 32.623104,
    longitude: 111.761963
  },
  {
    id: "L10",
    // joinCluster: true,
    // clusterId: 'P2',
    group: "刘山水库",
    name: "10",
    latitude: 32.622887,
    longitude: 111.762253
  },
  {
    id: "Q1",
    // joinCluster: true,
    // clusterId: 'P3',
    group: "渠首",
    name: "1",
    latitude: 32.645359,
    longitude: 111.699326
  },
  {
    id: "Q2",
    // joinCluster: true,
    // clusterId: 'P3',
    group: "渠首",
    name: "2",
    latitude: 32.664455,
    longitude: 111.68972
  },
  {
    id: "Q3",
    // joinCluster: true,
    // clusterId: 'P3',
    group: "渠首",
    name: "3",
    latitude: 32.66988,
    longitude: 111.696976
  },
  {
    id: "Q4",
    // joinCluster: true,
    // clusterId: 'P3',
    group: "渠首",
    name: "4",
    latitude: 32.651615,
    longitude: 111.711693
  },
  {
    id: "Q5",
    // joinCluster: true,
    // clusterId: 'P3',
    group: "渠首",
    name: "5",
    latitude: 32.644749,
    longitude: 111.709846
  },
  {
    id: "Q6",
    // joinCluster: true,
    // clusterId: 'P3',
    group: "渠首",
    name: "6",
    latitude: 32.649471,
    longitude: 111.672272
  },
  {
    id: "Q7",
    // joinCluster: true,
    // clusterId: 'P3',
    group: "渠首",
    name: "7",
    latitude: 32.648922,
    longitude: 111.60041
  },
  {
    id: "Q8",
    // joinCluster: true,
    // clusterId: 'P3',
    group: "渠首",
    name: "8",
    latitude: 32.649406,
    longitude: 111.617599
  },
  {
    id: "Q9",
    // joinCluster: true,
    // clusterId: 'P3',
    group: "渠首",
    name: "9",
    latitude: 32.654324,
    longitude: 111.714249
  },
  {
    id: "Q10",
    // joinCluster: true,
    // clusterId: 'P3',
    group: "渠首",
    name: "10",
    latitude: 32.644085,
    longitude: 111.705818
  },
  {
    id: "Q11",
    // joinCluster: true,
    // clusterId: 'P3',
    group: "渠首",
    name: "11",
    latitude: 32.671604,
    longitude: 111.715675
  }
];
exports.list = list;
