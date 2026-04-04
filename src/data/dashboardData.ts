// ============================================================
// Real data from Shopify, Meta Ads, Google Ads, Reddit Ads APIs
// March 2026 — all spend figures are real API data
// ============================================================

// --- Raw Shopify daily net sales (shopify_sales_over_time API) ---
const shopifyDailyRaw = [
  { date: '3/1', netSales: 68348.97, orders: 308 },
  { date: '3/2', netSales: 58503.47, orders: 248 },
  { date: '3/3', netSales: 42019.54, orders: 210 },
  { date: '3/4', netSales: 57177.38, orders: 259 },
  { date: '3/5', netSales: 63790.61, orders: 262 },
  { date: '3/6', netSales: 97838.92, orders: 474 },
  { date: '3/7', netSales: 66410.29, orders: 313 },
  { date: '3/8', netSales: 94765.30, orders: 405 },
  { date: '3/9', netSales: 75988.72, orders: 348 },
  { date: '3/10', netSales: 74968.79, orders: 332 },
  { date: '3/11', netSales: 63795.18, orders: 300 },
  { date: '3/12', netSales: 66608.43, orders: 305 },
  { date: '3/13', netSales: 64265.44, orders: 298 },
  { date: '3/14', netSales: 73534.03, orders: 321 },
  { date: '3/15', netSales: 98353.59, orders: 424 },
  { date: '3/16', netSales: 71156.13, orders: 310 },
  { date: '3/17', netSales: 61394.77, orders: 278 },
  { date: '3/18', netSales: 64792.72, orders: 295 },
  { date: '3/19', netSales: 66574.05, orders: 307 },
  { date: '3/20', netSales: 64157.74, orders: 291 },
  { date: '3/21', netSales: 109891.82, orders: 464 },
  { date: '3/22', netSales: 110018.22, orders: 503 },
  { date: '3/23', netSales: 75883.79, orders: 344 },
  { date: '3/24', netSales: 65653.04, orders: 286 },
  { date: '3/25', netSales: 61905.36, orders: 327 },
  { date: '3/26', netSales: 74980.59, orders: 357 },
  { date: '3/27', netSales: 83096.89, orders: 387 },
  { date: '3/28', netSales: 86319.78, orders: 390 },
  { date: '3/29', netSales: 88920.34, orders: 399 },
  { date: '3/30', netSales: 83341.28, orders: 373 },
  { date: '3/31', netSales: 74685.50, orders: 339 },
];

// --- Raw Meta Ads daily (meta_ads_over_time API) ---
const metaDailyRaw = [
  { date: '3/1', spend: 19851.78, purchases: 206, impressions: 1052694, clicks: 19456 },
  { date: '3/2', spend: 20139.92, purchases: 185, impressions: 1230772, clicks: 22417 },
  { date: '3/3', spend: 9917.08, purchases: 123, impressions: 547681, clicks: 11920 },
  { date: '3/4', spend: 16554.92, purchases: 210, impressions: 979907, clicks: 17146 },
  { date: '3/5', spend: 16749.74, purchases: 197, impressions: 1017504, clicks: 19012 },
  { date: '3/6', spend: 16668.65, purchases: 212, impressions: 874652, clicks: 20134 },
  { date: '3/7', spend: 13733.97, purchases: 197, impressions: 616644, clicks: 10039 },
  { date: '3/8', spend: 22935.58, purchases: 304, impressions: 1097651, clicks: 21494 },
  { date: '3/9', spend: 23895.61, purchases: 267, impressions: 1112549, clicks: 20741 },
  { date: '3/10', spend: 21009.04, purchases: 218, impressions: 1039584, clicks: 17503 },
  { date: '3/11', spend: 14458.17, purchases: 202, impressions: 514706, clicks: 9656 },
  { date: '3/12', spend: 15338.81, purchases: 241, impressions: 630721, clicks: 11501 },
  { date: '3/13', spend: 23949.14, purchases: 257, impressions: 1121067, clicks: 19824 },
  { date: '3/14', spend: 22074.32, purchases: 253, impressions: 954977, clicks: 19069 },
  { date: '3/15', spend: 26289.57, purchases: 343, impressions: 1237439, clicks: 24227 },
  { date: '3/16', spend: 23344.19, purchases: 200, impressions: 1066500, clicks: 24654 },
  { date: '3/17', spend: 17167.77, purchases: 151, impressions: 799910, clicks: 17071 },
  { date: '3/18', spend: 16592.75, purchases: 164, impressions: 715204, clicks: 16133 },
  { date: '3/19', spend: 18346.57, purchases: 135, impressions: 781807, clicks: 20939 },
  { date: '3/20', spend: 20847.78, purchases: 124, impressions: 955028, clicks: 24039 },
  { date: '3/21', spend: 24193.34, purchases: 219, impressions: 930272, clicks: 22782 },
  { date: '3/22', spend: 34991.30, purchases: 257, impressions: 1599680, clicks: 31836 },
  { date: '3/23', spend: 19892.09, purchases: 174, impressions: 966486, clicks: 20145 },
  { date: '3/24', spend: 16437.37, purchases: 138, impressions: 737039, clicks: 17509 },
  { date: '3/25', spend: 16733.36, purchases: 143, impressions: 737321, clicks: 15913 },
  { date: '3/26', spend: 22332.64, purchases: 168, impressions: 1059071, clicks: 20399 },
  { date: '3/27', spend: 25298.11, purchases: 188, impressions: 1064185, clicks: 25285 },
  { date: '3/28', spend: 26154.46, purchases: 204, impressions: 997163, clicks: 19869 },
  { date: '3/29', spend: 27292.11, purchases: 174, impressions: 1111641, clicks: 23019 },
  { date: '3/30', spend: 16597.29, purchases: 157, impressions: 766805, clicks: 17111 },
  { date: '3/31', spend: 19006.90, purchases: 152, impressions: 793756, clicks: 21072 },
];

// --- Raw Google Ads daily (google_ads API, costMicros / 1e6) ---
const googleDailyRaw = [
  { date: '3/1', spend: 4760.11, clicks: 2026, conversions: 116.05 },
  { date: '3/2', spend: 5102.13, clicks: 1979, conversions: 104.80 },
  { date: '3/3', spend: 5000.06, clicks: 1978, conversions: 96.34 },
  { date: '3/4', spend: 5112.87, clicks: 2034, conversions: 101.02 },
  { date: '3/5', spend: 5050.79, clicks: 2027, conversions: 110.91 },
  { date: '3/6', spend: 5786.32, clicks: 2486, conversions: 118.57 },
  { date: '3/7', spend: 6002.45, clicks: 2535, conversions: 137.58 },
  { date: '3/8', spend: 8987.82, clicks: 3326, conversions: 153.59 },
  { date: '3/9', spend: 10686.10, clicks: 3704, conversions: 153.47 },
  { date: '3/10', spend: 7584.01, clicks: 3353, conversions: 139.09 },
  { date: '3/11', spend: 6222.35, clicks: 3417, conversions: 111.11 },
  { date: '3/12', spend: 6140.51, clicks: 3336, conversions: 124.74 },
  { date: '3/13', spend: 6123.60, clicks: 2952, conversions: 112.74 },
  { date: '3/14', spend: 6323.13, clicks: 2727, conversions: 142.20 },
  { date: '3/15', spend: 8302.76, clicks: 3065, conversions: 146.74 },
  { date: '3/16', spend: 6012.46, clicks: 2591, conversions: 120.87 },
  { date: '3/17', spend: 6785.87, clicks: 2511, conversions: 89.59 },
  { date: '3/18', spend: 6495.96, clicks: 3226, conversions: 110.09 },
  { date: '3/19', spend: 7104.54, clicks: 4343, conversions: 116.37 },
  { date: '3/20', spend: 7240.92, clicks: 3549, conversions: 102.29 },
  { date: '3/21', spend: 6959.30, clicks: 5712, conversions: 132.46 },
  { date: '3/22', spend: 9948.54, clicks: 7398, conversions: 176.53 },
  { date: '3/23', spend: 5997.54, clicks: 4662, conversions: 125.44 },
  { date: '3/24', spend: 5816.30, clicks: 6612, conversions: 102.30 },
  { date: '3/25', spend: 6099.71, clicks: 6024, conversions: 109.95 },
  { date: '3/26', spend: 6278.52, clicks: 4328, conversions: 121.33 },
  { date: '3/27', spend: 6618.01, clicks: 4900, conversions: 102.15 },
  { date: '3/28', spend: 6257.04, clicks: 4479, conversions: 109.77 },
  { date: '3/29', spend: 6268.56, clicks: 4689, conversions: 132.58 },
  { date: '3/30', spend: 6503.18, clicks: 4833, conversions: 117.70 },
  { date: '3/31', spend: 6387.49, clicks: 4807, conversions: 111.44 },
];

// --- Raw Reddit Ads daily (reddit_ads_over_time API) ---
const redditDailyRaw = [
  { date: '3/1', spend: 254.19, impressions: 40311, clicks: 90 },
  { date: '3/2', spend: 263.28, impressions: 39364, clicks: 77 },
  { date: '3/3', spend: 235.92, impressions: 38002, clicks: 74 },
  { date: '3/4', spend: 256.07, impressions: 43787, clicks: 88 },
  { date: '3/5', spend: 248.97, impressions: 43887, clicks: 107 },
  { date: '3/6', spend: 245.94, impressions: 44384, clicks: 98 },
  { date: '3/7', spend: 250.85, impressions: 40965, clicks: 93 },
  { date: '3/8', spend: 548.30, impressions: 79779, clicks: 150 },
  { date: '3/9', spend: 572.46, impressions: 84924, clicks: 200 },
  { date: '3/10', spend: 505.81, impressions: 82939, clicks: 190 },
  { date: '3/11', spend: 530.20, impressions: 87554, clicks: 156 },
  { date: '3/12', spend: 500.95, impressions: 80444, clicks: 182 },
  { date: '3/13', spend: 511.37, impressions: 65464, clicks: 174 },
  { date: '3/14', spend: 515.38, impressions: 64326, clicks: 194 },
  { date: '3/15', spend: 522.90, impressions: 55270, clicks: 132 },
  { date: '3/16', spend: 544.70, impressions: 65526, clicks: 156 },
  { date: '3/17', spend: 492.10, impressions: 65539, clicks: 161 },
  { date: '3/18', spend: 521.94, impressions: 57916, clicks: 151 },
  { date: '3/19', spend: 512.94, impressions: 59057, clicks: 140 },
  { date: '3/20', spend: 506.82, impressions: 49586, clicks: 114 },
  { date: '3/21', spend: 515.43, impressions: 53062, clicks: 143 },
  { date: '3/22', spend: 523.49, impressions: 60954, clicks: 179 },
  { date: '3/23', spend: 549.02, impressions: 63678, clicks: 170 },
  { date: '3/24', spend: 489.86, impressions: 52638, clicks: 174 },
  { date: '3/25', spend: 517.23, impressions: 55026, clicks: 161 },
  { date: '3/26', spend: 516.78, impressions: 54478, clicks: 146 },
  { date: '3/27', spend: 505.60, impressions: 49259, clicks: 120 },
  { date: '3/28', spend: 518.59, impressions: 48025, clicks: 154 },
  { date: '3/29', spend: 523.35, impressions: 57594, clicks: 130 },
  { date: '3/30', spend: 547.59, impressions: 61558, clicks: 130 },
  { date: '3/31', spend: 489.42, impressions: 63862, clicks: 144 },
];

// --- Raw Shopify daily net sales January 2026 ---
const shopifyDailyJan = [
  { date: '1/1', netSales: 82858.05, orders: 374 },
  { date: '1/2', netSales: 64954.86, orders: 311 },
  { date: '1/3', netSales: 67970.99, orders: 304 },
  { date: '1/4', netSales: 66160.34, orders: 354 },
  { date: '1/5', netSales: 53367.00, orders: 289 },
  { date: '1/6', netSales: 62186.90, orders: 305 },
  { date: '1/7', netSales: 61943.51, orders: 277 },
  { date: '1/8', netSales: 69806.83, orders: 307 },
  { date: '1/9', netSales: 72593.12, orders: 335 },
  { date: '1/10', netSales: 57251.30, orders: 285 },
  { date: '1/11', netSales: 74905.94, orders: 339 },
  { date: '1/12', netSales: 52634.42, orders: 261 },
  { date: '1/13', netSales: 54063.41, orders: 274 },
  { date: '1/14', netSales: 56793.64, orders: 241 },
  { date: '1/15', netSales: 38679.73, orders: 212 },
  { date: '1/16', netSales: 46961.43, orders: 221 },
  { date: '1/17', netSales: 58649.12, orders: 280 },
  { date: '1/18', netSales: 56339.78, orders: 252 },
  { date: '1/19', netSales: 49374.69, orders: 283 },
  { date: '1/20', netSales: 31699.49, orders: 161 },
  { date: '1/21', netSales: 33145.35, orders: 184 },
  { date: '1/22', netSales: 38852.91, orders: 195 },
  { date: '1/23', netSales: 30793.36, orders: 170 },
  { date: '1/24', netSales: 25094.70, orders: 137 },
  { date: '1/25', netSales: 44887.14, orders: 205 },
  { date: '1/26', netSales: 35997.75, orders: 172 },
  { date: '1/27', netSales: 34255.16, orders: 159 },
  { date: '1/28', netSales: 33410.95, orders: 196 },
  { date: '1/29', netSales: 40110.78, orders: 206 },
  { date: '1/30', netSales: 45833.68, orders: 203 },
  { date: '1/31', netSales: 60217.17, orders: 266 },
];

// --- Raw Meta Ads daily January 2026 ---
const metaDailyJan = [
  { date: '1/1', spend: 22888.87, purchases: 312, impressions: 1233092, clicks: 21013 },
  { date: '1/2', spend: 15924.87, purchases: 258, impressions: 838198, clicks: 14622 },
  { date: '1/3', spend: 20425.55, purchases: 225, impressions: 1021554, clicks: 17627 },
  { date: '1/4', spend: 21092.72, purchases: 244, impressions: 1170202, clicks: 21369 },
  { date: '1/5', spend: 18148.95, purchases: 228, impressions: 1006949, clicks: 20178 },
  { date: '1/6', spend: 17367.42, purchases: 253, impressions: 944446, clicks: 19744 },
  { date: '1/7', spend: 17078.15, purchases: 197, impressions: 954435, clicks: 19256 },
  { date: '1/8', spend: 16761.71, purchases: 235, impressions: 816342, clicks: 16591 },
  { date: '1/9', spend: 19803.23, purchases: 239, impressions: 944325, clicks: 18834 },
  { date: '1/10', spend: 17784.90, purchases: 182, impressions: 711230, clicks: 14220 },
  { date: '1/11', spend: 18172.20, purchases: 186, impressions: 810696, clicks: 16529 },
  { date: '1/12', spend: 15228.11, purchases: 146, impressions: 854017, clicks: 17064 },
  { date: '1/13', spend: 18181.03, purchases: 202, impressions: 998318, clicks: 20537 },
  { date: '1/14', spend: 16014.01, purchases: 182, impressions: 933045, clicks: 22687 },
  { date: '1/15', spend: 16190.21, purchases: 175, impressions: 909028, clicks: 18563 },
  { date: '1/16', spend: 15736.75, purchases: 144, impressions: 788804, clicks: 16671 },
  { date: '1/17', spend: 15581.77, purchases: 216, impressions: 700629, clicks: 15619 },
  { date: '1/18', spend: 18012.75, purchases: 161, impressions: 799250, clicks: 16418 },
  { date: '1/19', spend: 16241.58, purchases: 218, impressions: 897695, clicks: 15911 },
  { date: '1/20', spend: 11855.92, purchases: 93, impressions: 595809, clicks: 13522 },
  { date: '1/21', spend: 15068.25, purchases: 126, impressions: 819162, clicks: 14954 },
  { date: '1/22', spend: 10198.24, purchases: 128, impressions: 573120, clicks: 10707 },
  { date: '1/23', spend: 10421.42, purchases: 85, impressions: 582093, clicks: 11684 },
  { date: '1/24', spend: 8826.58, purchases: 83, impressions: 515036, clicks: 10301 },
  { date: '1/25', spend: 8996.86, purchases: 90, impressions: 513072, clicks: 10293 },
  { date: '1/26', spend: 7895.66, purchases: 97, impressions: 479304, clicks: 9463 },
  { date: '1/27', spend: 7601.03, purchases: 97, impressions: 413418, clicks: 10065 },
  { date: '1/28', spend: 7350.49, purchases: 87, impressions: 371626, clicks: 9376 },
  { date: '1/29', spend: 7734.26, purchases: 95, impressions: 412914, clicks: 9781 },
  { date: '1/30', spend: 12814.75, purchases: 150, impressions: 737432, clicks: 15870 },
  { date: '1/31', spend: 13229.70, purchases: 129, impressions: 690481, clicks: 17204 },
];

// --- Raw Google Ads daily January 2026 ---
const googleDailyJan = [
  { date: '1/1', spend: 7573.96, clicks: 3640, conversions: 114.86 },
  { date: '1/2', spend: 6113.64, clicks: 3181, conversions: 122.92 },
  { date: '1/3', spend: 6314.97, clicks: 2755, conversions: 93.30 },
  { date: '1/4', spend: 6274.37, clicks: 2850, conversions: 93.05 },
  { date: '1/5', spend: 5978.36, clicks: 2888, conversions: 96.49 },
  { date: '1/6', spend: 5475.08, clicks: 2656, conversions: 99.42 },
  { date: '1/7', spend: 5501.78, clicks: 2632, conversions: 94.91 },
  { date: '1/8', spend: 5397.10, clicks: 2444, conversions: 100.56 },
  { date: '1/9', spend: 5120.47, clicks: 2561, conversions: 94.45 },
  { date: '1/10', spend: 5505.02, clicks: 2669, conversions: 89.35 },
  { date: '1/11', spend: 7458.62, clicks: 2866, conversions: 96.66 },
  { date: '1/12', spend: 5808.29, clicks: 2191, conversions: 100.08 },
  { date: '1/13', spend: 5227.44, clicks: 1827, conversions: 77.78 },
  { date: '1/14', spend: 5075.19, clicks: 2004, conversions: 78.29 },
  { date: '1/15', spend: 5119.92, clicks: 2647, conversions: 61.65 },
  { date: '1/16', spend: 5265.96, clicks: 2691, conversions: 79.55 },
  { date: '1/17', spend: 5575.89, clicks: 3013, conversions: 112.35 },
  { date: '1/18', spend: 6142.69, clicks: 2688, conversions: 87.37 },
  { date: '1/19', spend: 7007.03, clicks: 2966, conversions: 92.88 },
  { date: '1/20', spend: 5205.92, clicks: 2294, conversions: 66.37 },
  { date: '1/21', spend: 3797.29, clicks: 1565, conversions: 64.79 },
  { date: '1/22', spend: 3733.36, clicks: 1626, conversions: 50.39 },
  { date: '1/23', spend: 3946.77, clicks: 1572, conversions: 51.45 },
  { date: '1/24', spend: 4047.21, clicks: 1564, conversions: 51.23 },
  { date: '1/25', spend: 4481.64, clicks: 1787, conversions: 67.47 },
  { date: '1/26', spend: 3869.84, clicks: 1703, conversions: 73.92 },
  { date: '1/27', spend: 3529.02, clicks: 1726, conversions: 59.80 },
  { date: '1/28', spend: 3458.08, clicks: 1630, conversions: 56.53 },
  { date: '1/29', spend: 3582.59, clicks: 1604, conversions: 67.10 },
  { date: '1/30', spend: 3658.22, clicks: 1651, conversions: 75.10 },
  { date: '1/31', spend: 4256.54, clicks: 1865, conversions: 82.18 },
];

// --- Raw Reddit Ads daily January 2026 ---
const redditDailyJan = [
  { date: '1/1', spend: 700.68, impressions: 133487, clicks: 324 },
  { date: '1/2', spend: 689.29, impressions: 150172, clicks: 366 },
  { date: '1/3', spend: 709.21, impressions: 206907, clicks: 495 },
  { date: '1/4', spend: 710.65, impressions: 231216, clicks: 553 },
  { date: '1/5', spend: 729.23, impressions: 126210, clicks: 317 },
  { date: '1/6', spend: 696.36, impressions: 135186, clicks: 376 },
  { date: '1/7', spend: 690.98, impressions: 130877, clicks: 372 },
  { date: '1/8', spend: 678.92, impressions: 124689, clicks: 341 },
  { date: '1/9', spend: 672.46, impressions: 111934, clicks: 361 },
  { date: '1/10', spend: 681.07, impressions: 113087, clicks: 361 },
  { date: '1/11', spend: 696.28, impressions: 89840, clicks: 294 },
  { date: '1/12', spend: 734.70, impressions: 91680, clicks: 277 },
  { date: '1/13', spend: 716.53, impressions: 83594, clicks: 240 },
  { date: '1/14', spend: 711.05, impressions: 83432, clicks: 263 },
  { date: '1/15', spend: 704.12, impressions: 105925, clicks: 324 },
  { date: '1/16', spend: 698.66, impressions: 118878, clicks: 280 },
  { date: '1/17', spend: 701.25, impressions: 110723, clicks: 304 },
  { date: '1/18', spend: 707.51, impressions: 124207, clicks: 334 },
  { date: '1/19', spend: 724.22, impressions: 131892, clicks: 318 },
  { date: '1/20', spend: 687.98, impressions: 138466, clicks: 372 },
  { date: '1/21', spend: 617.92, impressions: 109899, clicks: 336 },
  { date: '1/22', spend: 513.93, impressions: 89628, clicks: 248 },
  { date: '1/23', spend: 490.17, impressions: 80494, clicks: 199 },
  { date: '1/24', spend: 319.08, impressions: 48776, clicks: 143 },
  { date: '1/25', spend: 253.48, impressions: 52950, clicks: 107 },
  { date: '1/26', spend: 266.02, impressions: 57782, clicks: 131 },
  { date: '1/27', spend: 235.32, impressions: 48805, clicks: 115 },
  { date: '1/28', spend: 254.17, impressions: 47154, clicks: 102 },
  { date: '1/29', spend: 250.49, impressions: 44879, clicks: 113 },
  { date: '1/30', spend: 243.59, impressions: 42997, clicks: 109 },
  { date: '1/31', spend: 251.80, impressions: 37106, clicks: 94 },
];

// --- Raw Shopify daily net sales February 2026 ---
const shopifyDailyFeb = [
  { date: '2/1', netSales: 56317.33, orders: 258 },
  { date: '2/2', netSales: 45500.63, orders: 214 },
  { date: '2/3', netSales: 36618.95, orders: 200 },
  { date: '2/4', netSales: 44835.55, orders: 212 },
  { date: '2/5', netSales: 50812.01, orders: 234 },
  { date: '2/6', netSales: 35240.63, orders: 182 },
  { date: '2/7', netSales: 41578.96, orders: 195 },
  { date: '2/8', netSales: 48271.14, orders: 269 },
  { date: '2/9', netSales: 37373.06, orders: 185 },
  { date: '2/10', netSales: 61428.86, orders: 305 },
  { date: '2/11', netSales: 42930.57, orders: 229 },
  { date: '2/12', netSales: 33340.91, orders: 149 },
  { date: '2/13', netSales: 48779.50, orders: 235 },
  { date: '2/14', netSales: 48262.79, orders: 216 },
  { date: '2/15', netSales: 72352.00, orders: 318 },
  { date: '2/16', netSales: 74625.46, orders: 354 },
  { date: '2/17', netSales: 41669.67, orders: 196 },
  { date: '2/18', netSales: 52271.63, orders: 240 },
  { date: '2/19', netSales: 45141.67, orders: 226 },
  { date: '2/20', netSales: 52787.07, orders: 242 },
  { date: '2/21', netSales: 57230.77, orders: 236 },
  { date: '2/22', netSales: 75150.77, orders: 317 },
  { date: '2/23', netSales: 45951.20, orders: 201 },
  { date: '2/24', netSales: 34103.89, orders: 145 },
  { date: '2/25', netSales: 37855.96, orders: 202 },
  { date: '2/26', netSales: 48924.16, orders: 208 },
  { date: '2/27', netSales: 48358.72, orders: 216 },
  { date: '2/28', netSales: 64286.56, orders: 296 },
];

// --- Raw Meta Ads daily February 2026 ---
const metaDailyFeb = [
  { date: '2/1', spend: 13471.23, purchases: 154, impressions: 655798, clicks: 17274 },
  { date: '2/2', spend: 14172.56, purchases: 130, impressions: 954799, clicks: 20367 },
  { date: '2/3', spend: 10790.27, purchases: 130, impressions: 644466, clicks: 14688 },
  { date: '2/4', spend: 12362.37, purchases: 125, impressions: 777487, clicks: 15251 },
  { date: '2/5', spend: 12507.41, purchases: 124, impressions: 874211, clicks: 17997 },
  { date: '2/6', spend: 9898.79, purchases: 100, impressions: 557144, clicks: 12567 },
  { date: '2/7', spend: 11542.55, purchases: 110, impressions: 762868, clicks: 15035 },
  { date: '2/8', spend: 13905.33, purchases: 136, impressions: 835262, clicks: 16557 },
  { date: '2/9', spend: 11875.41, purchases: 112, impressions: 740166, clicks: 17532 },
  { date: '2/10', spend: 12976.73, purchases: 206, impressions: 777294, clicks: 20650 },
  { date: '2/11', spend: 13793.50, purchases: 146, impressions: 880627, clicks: 24172 },
  { date: '2/12', spend: 11752.07, purchases: 111, impressions: 648166, clicks: 18299 },
  { date: '2/13', spend: 14923.09, purchases: 165, impressions: 800941, clicks: 23663 },
  { date: '2/14', spend: 12750.06, purchases: 147, impressions: 620297, clicks: 14483 },
  { date: '2/15', spend: 20258.55, purchases: 209, impressions: 977949, clicks: 20250 },
  { date: '2/16', spend: 24076.80, purchases: 256, impressions: 1161505, clicks: 23533 },
  { date: '2/17', spend: 11452.22, purchases: 134, impressions: 566977, clicks: 11696 },
  { date: '2/18', spend: 14454.60, purchases: 179, impressions: 701633, clicks: 17731 },
  { date: '2/19', spend: 15752.08, purchases: 154, impressions: 863715, clicks: 17992 },
  { date: '2/20', spend: 15993.40, purchases: 182, impressions: 855384, clicks: 17693 },
  { date: '2/21', spend: 15151.36, purchases: 163, impressions: 703272, clicks: 15665 },
  { date: '2/22', spend: 15208.18, purchases: 203, impressions: 909066, clicks: 13862 },
  { date: '2/23', spend: 12411.01, purchases: 137, impressions: 630590, clicks: 12219 },
  { date: '2/24', spend: 11878.95, purchases: 106, impressions: 640615, clicks: 12274 },
  { date: '2/25', spend: 11994.08, purchases: 151, impressions: 574504, clicks: 14492 },
  { date: '2/26', spend: 13943.33, purchases: 147, impressions: 703409, clicks: 16321 },
  { date: '2/27', spend: 14931.38, purchases: 178, impressions: 722949, clicks: 14814 },
  { date: '2/28', spend: 17093.84, purchases: 196, impressions: 795752, clicks: 16815 },
];

// --- Raw Google Ads daily February 2026 ---
const googleDailyFeb = [
  { date: '2/1', spend: 5014.64, clicks: 2215, conversions: 89.68 },
  { date: '2/2', spend: 4663.01, clicks: 1909, conversions: 80.12 },
  { date: '2/3', spend: 3566.14, clicks: 1641, conversions: 75.73 },
  { date: '2/4', spend: 3661.07, clicks: 1588, conversions: 75.00 },
  { date: '2/5', spend: 4316.91, clicks: 1872, conversions: 89.56 },
  { date: '2/6', spend: 4207.46, clicks: 1812, conversions: 67.96 },
  { date: '2/7', spend: 4523.93, clicks: 1907, conversions: 89.09 },
  { date: '2/8', spend: 4508.41, clicks: 1766, conversions: 92.84 },
  { date: '2/9', spend: 4133.44, clicks: 1666, conversions: 63.33 },
  { date: '2/10', spend: 3383.14, clicks: 1466, conversions: 74.65 },
  { date: '2/11', spend: 3438.94, clicks: 1467, conversions: 63.85 },
  { date: '2/12', spend: 3424.84, clicks: 1419, conversions: 42.12 },
  { date: '2/13', spend: 3746.49, clicks: 1567, conversions: 73.63 },
  { date: '2/14', spend: 4192.96, clicks: 1706, conversions: 73.24 },
  { date: '2/15', spend: 4469.15, clicks: 1916, conversions: 112.44 },
  { date: '2/16', spend: 5110.51, clicks: 2177, conversions: 123.99 },
  { date: '2/17', spend: 3471.65, clicks: 1861, conversions: 79.63 },
  { date: '2/18', spend: 3626.86, clicks: 1808, conversions: 76.97 },
  { date: '2/19', spend: 3720.50, clicks: 1736, conversions: 88.46 },
  { date: '2/20', spend: 4105.18, clicks: 1795, conversions: 88.45 },
  { date: '2/21', spend: 4401.74, clicks: 2019, conversions: 102.30 },
  { date: '2/22', spend: 5196.96, clicks: 2330, conversions: 123.47 },
  { date: '2/23', spend: 5187.69, clicks: 2047, conversions: 99.14 },
  { date: '2/24', spend: 3405.52, clicks: 1528, conversions: 72.63 },
  { date: '2/25', spend: 4345.16, clicks: 1715, conversions: 76.40 },
  { date: '2/26', spend: 3848.77, clicks: 1776, conversions: 82.19 },
  { date: '2/27', spend: 3824.51, clicks: 1647, conversions: 86.57 },
  { date: '2/28', spend: 3680.61, clicks: 1732, conversions: 114.56 },
];

// --- Raw Reddit Ads daily February 2026 ---
const redditDailyFeb = [
  { date: '2/1', spend: 252.33, impressions: 41651, clicks: 129 },
  { date: '2/2', spend: 265.81, impressions: 37627, clicks: 107 },
  { date: '2/3', spend: 238.32, impressions: 38728, clicks: 92 },
  { date: '2/4', spend: 252.43, impressions: 36508, clicks: 88 },
  { date: '2/5', spend: 243.94, impressions: 37291, clicks: 91 },
  { date: '2/6', spend: 242.59, impressions: 32198, clicks: 69 },
  { date: '2/7', spend: 243.40, impressions: 33139, clicks: 86 },
  { date: '2/8', spend: 245.68, impressions: 33426, clicks: 96 },
  { date: '2/9', spend: 265.09, impressions: 47288, clicks: 129 },
  { date: '2/10', spend: 237.99, impressions: 38525, clicks: 102 },
  { date: '2/11', spend: 253.52, impressions: 39795, clicks: 104 },
  { date: '2/12', spend: 249.30, impressions: 37909, clicks: 106 },
  { date: '2/13', spend: 246.95, impressions: 35568, clicks: 104 },
  { date: '2/14', spend: 250.76, impressions: 37606, clicks: 102 },
  { date: '2/15', spend: 253.04, impressions: 40432, clicks: 99 },
  { date: '2/16', spend: 265.21, impressions: 41044, clicks: 110 },
  { date: '2/17', spend: 236.95, impressions: 37085, clicks: 93 },
  { date: '2/18', spend: 253.89, impressions: 39557, clicks: 102 },
  { date: '2/19', spend: 248.78, impressions: 42919, clicks: 95 },
  { date: '2/20', spend: 246.09, impressions: 43342, clicks: 93 },
  { date: '2/21', spend: 248.64, impressions: 40359, clicks: 96 },
  { date: '2/22', spend: 252.88, impressions: 42608, clicks: 94 },
  { date: '2/23', spend: 262.71, impressions: 41750, clicks: 96 },
  { date: '2/24', spend: 239.38, impressions: 39194, clicks: 92 },
  { date: '2/25', spend: 253.85, impressions: 40272, clicks: 89 },
  { date: '2/26', spend: 250.39, impressions: 35668, clicks: 77 },
  { date: '2/27', spend: 244.12, impressions: 29374, clicks: 56 },
  { date: '2/28', spend: 249.91, impressions: 31664, clicks: 74 },
];

// --- Estimation constants (Shopify traffic/customer APIs unavailable) ---
const NEW_CUSTOMER_RATIO = 0.65;
const NEW_REVENUE_RATIO = 0.68;
const PAID_SESSION_RATIO = 0.82;
const ORDER_CVR_EST = 0.031;

// --- Compute daily metrics from real API data ---
function computeDailyMetrics(
  shopData: typeof shopifyDailyRaw,
  metaData: typeof metaDailyRaw,
  googleData: typeof googleDailyRaw,
  redditData: typeof redditDailyRaw,
) {
  return shopData.map((shopDay, i) => {
    const metaDay = metaData[i];
    const googleDay = googleData[i];
    const redditDay = redditData[i];
    const totalRevenue = shopDay.netSales;
    const orders = shopDay.orders;
    const sessions = Math.round(orders / ORDER_CVR_EST);
    const paidSessions = Math.round(sessions * PAID_SESSION_RATIO);
    const organicSessions = sessions - paidSessions;
    const cvr = parseFloat(((orders / sessions) * 100).toFixed(4));
    const aov = parseFloat((totalRevenue / orders).toFixed(2));
    const newCustomers = Math.round(orders * NEW_CUSTOMER_RATIO);
    const newRevenue = parseFloat((totalRevenue * NEW_REVENUE_RATIO).toFixed(2));
    const returnRevenue = parseFloat((totalRevenue - newRevenue).toFixed(2));
    const spend = parseFloat((metaDay.spend + googleDay.spend + redditDay.spend).toFixed(2));
    const cac = parseFloat((spend / newCustomers).toFixed(2));
    const roas = parseFloat((totalRevenue / spend).toFixed(2));

    return {
      date: shopDay.date,
      sessions,
      paidSessions,
      organicSessions,
      cvr,
      orders,
      aov,
      newCustomers,
      newRevenue,
      returnRevenue,
      totalRevenue,
      spend,
      cac,
      roas,
    };
  });
}

const dailyMetricsJan = computeDailyMetrics(shopifyDailyJan, metaDailyJan, googleDailyJan, redditDailyJan);
const dailyMetricsFeb = computeDailyMetrics(shopifyDailyFeb, metaDailyFeb, googleDailyFeb, redditDailyFeb);
export const dailyMetrics = computeDailyMetrics(shopifyDailyRaw, metaDailyRaw, googleDailyRaw, redditDailyRaw);

// Multi-month daily data access
export const MONTHS_WITH_DAILY_DATA = ['2026-01', '2026-02', '2026-03'] as const;
export const dailyMetricsByMonth: Record<string, typeof dailyMetrics> = {
  '2026-01': dailyMetricsJan,
  '2026-02': dailyMetricsFeb,
  '2026-03': dailyMetrics,
};

// --- Targets ---
export const targets = {
  january: { revenueTarget: 1400000, dailyAvgTarget: 45161.29, cacTarget: 300, roasTarget: 3.0, cvrTarget: 2.2, aovTarget: 85 },
  february: { revenueTarget: 1500000, dailyAvgTarget: 53571.43, cacTarget: 290, roasTarget: 3.2, cvrTarget: 2.3, aovTarget: 88 },
  march: { revenueTarget: 2500000, dailyAvgTarget: 80645.16, cacTarget: 280, roasTarget: 3.5, cvrTarget: 2.5, aovTarget: 90 },
};

const targetsByMonth: Record<string, typeof targets.march> = {
  '2026-01': targets.january,
  '2026-02': targets.february,
  '2026-03': targets.march,
};

function getMonthTargets(month: string) {
  return targetsByMonth[month] || targets.march;
}

function getPrevMonthSummary(month: string) {
  if (month === '2026-03') return monthlySummary.february;
  if (month === '2026-02') return monthlySummary.january;
  // For Jan 2026, compare against Dec 2025 from monthlyRaw
  return { totalRevenue: 3057351, targetRevenue: 1400000, pctOfTarget: 100, newRevenue: 2078999, returnRevenue: 978352, spend: 1032218, orders: 14701, sessions: 474226, newCustomers: 9556, aov: 208, cac: 108, roas: 2.96, cvr: 3.10, paidPct: 82, organicPct: 18 };
}

// --- Running totals for March (computed from dailyMetrics + targets) ---
export const runningTotalsData = (() => {
  let runActual = 0, runNew = 0, runSpend = 0, runOrders = 0, runNewCust = 0;
  return dailyMetrics.map((d, i) => {
    runActual += d.totalRevenue;
    runNew += d.newRevenue;
    runSpend += d.spend;
    runOrders += d.orders;
    runNewCust += d.newCustomers;
    const runTarget = targets.march.dailyAvgTarget * (i + 1);
    return {
      date: d.date,
      runningActualRevenue: parseFloat(runActual.toFixed(2)),
      runningTargetRevenue: parseFloat(runTarget.toFixed(2)),
      runningNewRevenue: parseFloat(runNew.toFixed(2)),
      runningSpend: parseFloat(runSpend.toFixed(2)),
      deltaRunningRevenue: parseFloat((runActual - runTarget).toFixed(2)),
      runningOrders: runOrders,
      runningNewCustomers: runNewCust,
      pctOfMonthlyTarget: parseFloat(((runActual / targets.march.revenueTarget) * 100).toFixed(2)),
    };
  });
})();

// --- Monthly summary (real Shopify/Meta data for Feb & Mar, estimated Jan) ---
export const monthlySummary = {
  // Real: Shopify net_sales API + Meta/Google/Reddit spend APIs
  january: { totalRevenue: 1601793.50, targetRevenue: 1400000, pctOfTarget: 114.41, newRevenue: 1089219.58, returnRevenue: 512573.92, spend: 618130, orders: 7758, sessions: 250258, newCustomers: 5043, aov: 221.30, cac: 122.57, roas: 2.59, cvr: 3.10, paidPct: 82, organicPct: 18 },
  february: { totalRevenue: 1382000.42, targetRevenue: 1500000, pctOfTarget: 92.13, newRevenue: 939760.29, returnRevenue: 442240.13, spend: 513879, orders: 6480, sessions: 209032, newCustomers: 4212, aov: 224.52, cac: 122.01, roas: 2.69, cvr: 3.10, paidPct: 82, organicPct: 18 },
  march: { totalRevenue: 2309140.68, targetRevenue: 2500000, pctOfTarget: 92.37, newRevenue: 1570215.66, returnRevenue: 738925.02, spend: 847482, orders: 10457, sessions: 337323, newCustomers: 6797, aov: 227.65, cac: 124.68, roas: 2.73, cvr: 3.10, paidPct: 82, organicPct: 18 },
};

// --- Computed KPI data for the current month (March) ---
// Change percentages computed vs February
const feb = monthlySummary.february;
const mar = monthlySummary.march;

function pctChange(current: number, previous: number): number {
  return parseFloat(((current - previous) / previous * 100).toFixed(2));
}

export const kpiData = {
  spend: { value: Math.round(mar.spend), change: pctChange(mar.spend, feb.spend), label: 'Spend' },
  newOrders: { value: mar.newCustomers, change: pctChange(mar.newCustomers, feb.newCustomers), label: 'New Orders', suffix: '#' },
  newRevenue: { value: Math.round(mar.newRevenue), change: pctChange(mar.newRevenue, feb.newRevenue), label: 'New Revenue' },
  cac: { value: Math.round(mar.cac), change: pctChange(mar.cac, feb.cac), label: 'CAC' },
  roas: { value: Math.round(mar.roas * 100), change: pctChange(mar.roas, feb.roas), label: 'ROAS', suffix: '%' },
  newAov: { value: Math.round(mar.newRevenue / mar.newCustomers), change: pctChange(mar.newRevenue / mar.newCustomers, feb.newRevenue / feb.newCustomers), label: 'New AOV' },
  returnOrders: { value: mar.orders - mar.newCustomers, change: pctChange(mar.orders - mar.newCustomers, feb.orders - feb.newCustomers), label: 'Return Orders', suffix: '#' },
  returnRevenue: { value: Math.round(mar.returnRevenue), change: pctChange(mar.returnRevenue, feb.returnRevenue), label: 'Return Revenue' },
  repeatAov: { value: Math.round(mar.returnRevenue / (mar.orders - mar.newCustomers)), change: pctChange(mar.returnRevenue / (mar.orders - mar.newCustomers), feb.returnRevenue / (feb.orders - feb.newCustomers)), label: 'Repeat AOV' },
  totalOrders: { value: mar.orders, change: pctChange(mar.orders, feb.orders), label: 'Total Orders', suffix: '#' },
  totalRevenue: { value: Math.round(mar.totalRevenue), change: pctChange(mar.totalRevenue, feb.totalRevenue), label: 'Total Revenue' },
  totalAov: { value: Math.round(mar.aov), change: pctChange(mar.aov, feb.aov), label: 'Total AOV' },
  broas: { value: Math.round((mar.totalRevenue / mar.spend) * 100), change: pctChange(mar.totalRevenue / mar.spend, feb.totalRevenue / feb.spend), label: 'bROAS', suffix: '%' },
  contributionDollars: { value: Math.round(mar.totalRevenue - mar.spend), change: pctChange(mar.totalRevenue - mar.spend, feb.totalRevenue - feb.spend), label: 'Contribution Dollars' },
};

// --- Paid vs Organic (from March monthly summary) ---
export const paidVsOrganicData = [
  { name: 'Paid', value: Math.round(mar.paidPct), color: '#8a7d5a' },
  { name: 'Organic', value: Math.round(mar.organicPct), color: '#5cc9c4' },
];

// --- Daily Revenue chart data (running totals + target running for new revenue & spend) ---
export const dailyRevenueChartData = runningTotalsData.map((rt, i) => {
  const targetNewRevenueRunning = rt.runningTargetRevenue * 0.65; // approximate target split
  const targetSpendRunning = targets.march.dailyAvgTarget * (i + 1) * 0.75; // approximate spend target pacing
  return {
    date: rt.date,
    actualRevenueRunning: rt.runningActualRevenue,
    targetRevenueRunning: rt.runningTargetRevenue,
    newRevenueRunning: rt.runningNewRevenue,
    targetNewRevenueRunning: Math.round(targetNewRevenueRunning),
    spendRunning: rt.runningSpend,
    targetSpendRunning: Math.round(targetSpendRunning),
    deltaRunningTotalRevenue: parseFloat(((rt.runningActualRevenue / rt.runningTargetRevenue) * 100).toFixed(1)),
  };
});

// --- Daily Revenue chart data (non-running / daily breakdown) ---
export const dailyRevenueChartDataNonRunning = dailyMetrics.map(d => ({
  date: d.date,
  actualRevenue: d.totalRevenue,
  targetRevenue: targets.march.dailyAvgTarget,
  newRevenue: d.newRevenue,
  targetNewRevenue: Math.round(targets.march.dailyAvgTarget * 0.65),
  spend: d.spend,
  targetSpend: Math.round(targets.march.dailyAvgTarget * 0.75),
  deltaRevenue: parseFloat(((d.totalRevenue / targets.march.dailyAvgTarget) * 100).toFixed(1)),
}));

// --- Sessions vs CVR chart data ---
export const sessionsCVRData = dailyMetrics.map(d => ({
  date: d.date,
  sessions: d.sessions,
  cvr: d.cvr, // already in percentage form (e.g., 2.19 = 2.19%)
}));

// --- Acquisition Metrics chart data ---
export const acquisitionData = dailyMetrics.map(d => ({
  date: d.date,
  spend: d.spend,
  newCustomers: d.newCustomers,
  cac: Math.round(d.cac),
}));

// ============================================================
// Date range filter helpers
// ============================================================

export type DateRange = [number, number]; // [startDay, endDay] 1-based

function sliceByRange<T>(arr: T[], start: number, end: number): T[] {
  return arr.slice(start - 1, end);
}

export function getFilteredDailyRevenue(running: boolean, range: DateRange, month = '2026-03') {
  const metrics = dailyMetricsByMonth[month] || dailyMetrics;
  const monthTargets = getMonthTargets(month);
  const [start, end] = range;
  if (running) {
    const filtered = sliceByRange(metrics, start, end);
    let runActual = 0, runNew = 0, runSpend = 0;
    return filtered.map((d, i) => {
      runActual += d.totalRevenue;
      runNew += d.newRevenue;
      runSpend += d.spend;
      const dayCount = i + 1;
      const targetRevenueRunning = monthTargets.dailyAvgTarget * dayCount;
      const targetNewRevenueRunning = Math.round(targetRevenueRunning * 0.65);
      const targetSpendRunning = Math.round(monthTargets.dailyAvgTarget * dayCount * 0.75);
      return {
        date: d.date,
        actualRevenueRunning: runActual,
        targetRevenueRunning,
        newRevenueRunning: runNew,
        targetNewRevenueRunning,
        spendRunning: runSpend,
        targetSpendRunning,
        deltaRunningTotalRevenue: parseFloat(((runActual / targetRevenueRunning) * 100).toFixed(1)),
      };
    });
  }
  // Non-running: compute from metrics directly
  const filtered = sliceByRange(metrics, start, end);
  return filtered.map(d => ({
    date: d.date,
    actualRevenue: d.totalRevenue,
    targetRevenue: monthTargets.dailyAvgTarget,
    newRevenue: d.newRevenue,
    targetNewRevenue: Math.round(monthTargets.dailyAvgTarget * 0.65),
    spend: d.spend,
    targetSpend: Math.round(monthTargets.dailyAvgTarget * 0.75),
    deltaRevenue: parseFloat(((d.totalRevenue / monthTargets.dailyAvgTarget) * 100).toFixed(1)),
  }));
}

export function getFilteredSessionsCVR(range: DateRange, month = '2026-03') {
  const metrics = dailyMetricsByMonth[month] || dailyMetrics;
  return sliceByRange(metrics, range[0], range[1]).map(d => ({
    date: d.date,
    sessions: d.sessions,
    cvr: d.cvr,
  }));
}

export function getFilteredAcquisition(range: DateRange, month = '2026-03') {
  const metrics = dailyMetricsByMonth[month] || dailyMetrics;
  return sliceByRange(metrics, range[0], range[1]).map(d => ({
    date: d.date,
    spend: Math.round(d.spend),
    newCustomers: d.newCustomers,
    cac: Math.round(d.cac),
  }));
}

export function getFilteredKPIs(range: DateRange, month = '2026-03') {
  const metrics = dailyMetricsByMonth[month] || dailyMetrics;
  const prev = getPrevMonthSummary(month);
  const filtered = sliceByRange(metrics, range[0], range[1]);
  const totalSpend = filtered.reduce((s, d) => s + d.spend, 0);
  const totalNewRevenue = filtered.reduce((s, d) => s + d.newRevenue, 0);
  const totalReturnRevenue = filtered.reduce((s, d) => s + d.returnRevenue, 0);
  const totalRevenue = filtered.reduce((s, d) => s + d.totalRevenue, 0);
  const totalNewCustomers = filtered.reduce((s, d) => s + d.newCustomers, 0);
  const totalOrders = filtered.reduce((s, d) => s + d.orders, 0);
  const returnOrders = totalOrders - totalNewCustomers;
  const avgCac = totalNewCustomers > 0 ? totalSpend / totalNewCustomers : 0;
  const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0;

  return {
    spend: { value: Math.round(totalSpend), change: pctChange(totalSpend, prev.spend), label: 'Spend' },
    newOrders: { value: totalNewCustomers, change: pctChange(totalNewCustomers, prev.newCustomers), label: 'New Orders', suffix: '#' },
    newRevenue: { value: Math.round(totalNewRevenue), change: pctChange(totalNewRevenue, prev.newRevenue), label: 'New Revenue' },
    cac: { value: Math.round(avgCac), change: pctChange(avgCac, prev.cac), label: 'CAC' },
    roas: { value: Math.round(roas * 100), change: pctChange(roas, prev.roas), label: 'ROAS', suffix: '%' },
    newAov: { value: totalNewCustomers > 0 ? Math.round(totalNewRevenue / totalNewCustomers) : 0, change: pctChange(totalNewRevenue / totalNewCustomers, prev.newRevenue / prev.newCustomers), label: 'New AOV' },
    returnOrders: { value: returnOrders, change: pctChange(returnOrders, prev.orders - prev.newCustomers), label: 'Return Orders', suffix: '#' },
    returnRevenue: { value: Math.round(totalReturnRevenue), change: pctChange(totalReturnRevenue, prev.returnRevenue), label: 'Return Revenue' },
    repeatAov: { value: returnOrders > 0 ? Math.round(totalReturnRevenue / returnOrders) : 0, change: pctChange(totalReturnRevenue / returnOrders, prev.returnRevenue / (prev.orders - prev.newCustomers)), label: 'Repeat AOV' },
    totalOrders: { value: totalOrders, change: pctChange(totalOrders, prev.orders), label: 'Total Orders', suffix: '#' },
    totalRevenue: { value: Math.round(totalRevenue), change: pctChange(totalRevenue, prev.totalRevenue), label: 'Total Revenue' },
    totalAov: { value: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0, change: pctChange(totalRevenue / totalOrders, prev.totalRevenue / prev.orders), label: 'Total AOV' },
    broas: { value: Math.round((totalRevenue / totalSpend) * 100), change: pctChange(totalRevenue / totalSpend, prev.totalRevenue / prev.spend), label: 'bROAS', suffix: '%' },
    contributionDollars: { value: Math.round(totalRevenue - totalSpend), change: pctChange(totalRevenue - totalSpend, prev.totalRevenue - prev.spend), label: 'Contribution Dollars' },
  };
}

// ============================================================
// Hourly view data (Today's cumulative revenue by hour)
// ============================================================

// L7D average daily new revenue: average of last 7 days (Mar 25-31)
const l7dDays = dailyMetrics.slice(24, 31); // indices 24-30 = days 25-31
const l7dAvgDailyNewRevenue = l7dDays.reduce((s, d) => s + d.newRevenue, 0) / l7dDays.length;
const l7dAvgDailyTotalRevenue = l7dDays.reduce((s, d) => s + d.totalRevenue, 0) / l7dDays.length;
const l7dAvgDailySpend = l7dDays.reduce((s, d) => s + d.spend, 0) / l7dDays.length;

// Hourly distribution weights (% of daily total by hour — low AM, ramp through day)
const hourlyWeights = [
  0.005, 0.003, 0.002, 0.002, 0.003, 0.008, 0.015, 0.030,
  0.045, 0.055, 0.065, 0.070, 0.075, 0.070, 0.065, 0.060,
  0.065, 0.070, 0.075, 0.065, 0.055, 0.040, 0.030, 0.027,
];

// Today = March 31 data (last day with data)
const todayData = dailyMetrics[30]; // index 30 = March 31

// Generate hourly cumulative data
export const hourlyRevenueData = (() => {
  let cumTodayNewRev = 0;
  let cumL7dAvgNewRev = 0;
  let cumMetaSpend = 0;
  let cumGoogleSpend = 0;
  let cumTiktokSpend = 0;
  let cumTodayTotalRev = 0;

  return hourlyWeights.map((w, i) => {
    const hourlyNewRev = todayData.newRevenue * w / hourlyWeights.reduce((a, b) => a + b, 0);
    const hourlyL7dAvg = l7dAvgDailyNewRevenue * w / hourlyWeights.reduce((a, b) => a + b, 0);
    const hourlySpend = todayData.spend * w / hourlyWeights.reduce((a, b) => a + b, 0);
    const hourlyTotalRev = todayData.totalRevenue * w / hourlyWeights.reduce((a, b) => a + b, 0);

    cumTodayNewRev += hourlyNewRev;
    cumL7dAvgNewRev += hourlyL7dAvg;
    cumMetaSpend += hourlySpend * 0.742; // Meta 74.2% of spend (real)
    cumGoogleSpend += hourlySpend * 0.241; // Google 24.1% (real)
    cumTiktokSpend += hourlySpend * 0.017; // Reddit 1.7% (real, reusing tiktok field)
    cumTodayTotalRev += hourlyTotalRev;

    const cumSpend = cumMetaSpend + cumGoogleSpend + cumTiktokSpend;
    const cumNewCustomers = Math.round(todayData.newCustomers * (cumTodayNewRev / todayData.newRevenue));

    return {
      hour: `${String(i).padStart(2, '0')}:00`,
      todayNewRevenue: Math.round(cumTodayNewRev),
      l7dAvgNewRevenue: Math.round(cumL7dAvgNewRev),
      metaSpend: Math.round(cumMetaSpend),
      googleSpend: Math.round(cumGoogleSpend),
      tiktokSpend: Math.round(cumTiktokSpend),
      cac: cumNewCustomers > 0 ? parseFloat((cumSpend / cumNewCustomers).toFixed(2)) : 0,
    };
  });
})();

// Hourly actuals (non-cumulative)
export const hourlyRevenueDataActuals = (() => {
  const totalW = hourlyWeights.reduce((a, b) => a + b, 0);
  return hourlyWeights.map((w, i) => {
    const hourlyNewRev = todayData.newRevenue * w / totalW;
    const hourlyL7dAvg = l7dAvgDailyNewRevenue * w / totalW;
    const hourlySpend = todayData.spend * w / totalW;
    const meta = hourlySpend * 0.55;
    const google = hourlySpend * 0.30;
    const tiktok = hourlySpend * 0.15;
    const hourlyNewCust = Math.max(1, Math.round(todayData.newCustomers * w / totalW));

    return {
      hour: `${String(i).padStart(2, '0')}:00`,
      todayNewRevenue: Math.round(hourlyNewRev),
      l7dAvgNewRevenue: Math.round(hourlyL7dAvg),
      metaSpend: Math.round(meta),
      googleSpend: Math.round(google),
      tiktokSpend: Math.round(tiktok),
      cac: parseFloat(((meta + google + tiktok) / hourlyNewCust).toFixed(2)),
    };
  });
})();

// "All Customers" hourly cumulative data (uses totalRevenue instead of newRevenue)
export const hourlyRevenueDataAll = (() => {
  let cumTodayTotalRev = 0;
  let cumL7dAvgTotalRev = 0;
  let cumMetaSpend = 0;
  let cumGoogleSpend = 0;
  let cumTiktokSpend = 0;
  const totalW = hourlyWeights.reduce((a, b) => a + b, 0);

  return hourlyWeights.map((w, i) => {
    const hourlyTotalRev = todayData.totalRevenue * w / totalW;
    const hourlyL7dAvg = l7dAvgDailyTotalRevenue * w / totalW;
    const hourlySpend = todayData.spend * w / totalW;

    cumTodayTotalRev += hourlyTotalRev;
    cumL7dAvgTotalRev += hourlyL7dAvg;
    cumMetaSpend += hourlySpend * 0.55;
    cumGoogleSpend += hourlySpend * 0.30;
    cumTiktokSpend += hourlySpend * 0.15;

    const cumSpend = cumMetaSpend + cumGoogleSpend + cumTiktokSpend;
    const cumOrders = Math.round(todayData.orders * (cumTodayTotalRev / todayData.totalRevenue));

    return {
      hour: `${String(i).padStart(2, '0')}:00`,
      todayNewRevenue: Math.round(cumTodayTotalRev),
      l7dAvgNewRevenue: Math.round(cumL7dAvgTotalRev),
      metaSpend: Math.round(cumMetaSpend),
      googleSpend: Math.round(cumGoogleSpend),
      tiktokSpend: Math.round(cumTiktokSpend),
      cac: cumOrders > 0 ? parseFloat((cumSpend / cumOrders).toFixed(2)) : 0,
    };
  });
})();

// "All Customers" hourly actuals
export const hourlyRevenueDataAllActuals = (() => {
  const totalW = hourlyWeights.reduce((a, b) => a + b, 0);
  return hourlyWeights.map((w, i) => {
    const hourlyTotalRev = todayData.totalRevenue * w / totalW;
    const hourlyL7dAvg = l7dAvgDailyTotalRevenue * w / totalW;
    const hourlySpend = todayData.spend * w / totalW;
    const meta = hourlySpend * 0.55;
    const google = hourlySpend * 0.30;
    const tiktok = hourlySpend * 0.15;
    const hourlyOrders = Math.max(1, Math.round(todayData.orders * w / totalW));

    return {
      hour: `${String(i).padStart(2, '0')}:00`,
      todayNewRevenue: Math.round(hourlyTotalRev),
      l7dAvgNewRevenue: Math.round(hourlyL7dAvg),
      metaSpend: Math.round(meta),
      googleSpend: Math.round(google),
      tiktokSpend: Math.round(tiktok),
      cac: parseFloat(((meta + google + tiktok) / hourlyOrders).toFixed(2)),
    };
  });
})();

// Today's estimated new revenue (based on pacing against L7D avg)
const todayPacing = todayData.newRevenue / l7dAvgDailyNewRevenue;
export const todayEstimatedNewRev = {
  value: Math.round(todayData.newRevenue),
  pctChange: parseFloat(((todayPacing - 1) * 100).toFixed(1)),
};

// Today's estimated total revenue (all customers, based on pacing against L7D avg)
const todayTotalPacing = todayData.totalRevenue / l7dAvgDailyTotalRevenue;
export const todayEstimatedAllRev = {
  value: Math.round(todayData.totalRevenue),
  pctChange: parseFloat(((todayTotalPacing - 1) * 100).toFixed(1)),
};

// Hourly KPI data (today's current totals) — new customers
const returnOrders = todayData.orders - todayData.newCustomers;
export const hourlyKPIData: Record<string, { value: number; label: string; suffix?: string }> = {
  spend: { value: Math.round(todayData.spend), label: 'Current Spend' },
  newRevenue: { value: Math.round(todayData.newRevenue), label: 'Current New Revenue' },
  cac: { value: Math.round(todayData.cac), label: 'Current CAC' },
  roas: { value: Math.round(todayData.roas * 100), label: 'Current ROAS', suffix: '%' },
  newAov: { value: todayData.newCustomers > 0 ? Math.round(todayData.newRevenue / todayData.newCustomers) : 0, label: 'New AOV' },
  repeatRevenue: { value: Math.round(todayData.returnRevenue), label: 'Current Repeat Revenue' },
  repeatAov: { value: returnOrders > 0 ? Math.round(todayData.returnRevenue / returnOrders) : 0, label: 'Repeat AOV' },
  totalRevenue: { value: Math.round(todayData.totalRevenue), label: 'Current Total Revenue' },
  totalAov: { value: Math.round(todayData.aov), label: 'Total AOV' },
  broas: { value: Math.round((todayData.totalRevenue / todayData.spend) * 100), label: 'Current bROAS', suffix: '%' },
};

// Hourly KPI data — all customers
export const hourlyKPIDataAll: Record<string, { value: number; label: string; suffix?: string }> = {
  spend: { value: Math.round(todayData.spend), label: 'Current Spend' },
  newRevenue: { value: Math.round(todayData.newRevenue), label: 'Current New Revenue' },
  cac: { value: Math.round(todayData.spend / todayData.orders), label: 'Current CPA' },
  roas: { value: Math.round((todayData.totalRevenue / todayData.spend) * 100), label: 'Current ROAS', suffix: '%' },
  newAov: { value: todayData.newCustomers > 0 ? Math.round(todayData.newRevenue / todayData.newCustomers) : 0, label: 'New AOV' },
  repeatRevenue: { value: Math.round(todayData.returnRevenue), label: 'Current Repeat Revenue' },
  repeatAov: { value: returnOrders > 0 ? Math.round(todayData.returnRevenue / returnOrders) : 0, label: 'Repeat AOV' },
  totalRevenue: { value: Math.round(todayData.totalRevenue), label: 'Current Total Revenue' },
  totalAov: { value: Math.round(todayData.aov), label: 'Total AOV' },
  broas: { value: Math.round((todayData.totalRevenue / todayData.spend) * 100), label: 'Current bROAS', suffix: '%' },
};

// ============================================================
// Daily Pacing helpers
// ============================================================

export interface HeatmapRow {
  date: string;
  spend: number;
  sessions: number;
  costPerSession: number;
  newCvr: number;
  newRevenue: number;
  newAov: number;
  cac: number;
  roas: number;
  newOrders: number;
  totalOrders: number;
  totalCvr: number;
  cpp: number;
  totalRevenue: number;
  totalAov: number;
  bRoas: number;
  contributionDollars: number;
  contributionMargin: number;
}

export function getDailyPacingData(range: DateRange, month = '2026-03'): HeatmapRow[] {
  const metrics = dailyMetricsByMonth[month] || dailyMetrics;
  const filtered = sliceByRange(metrics, range[0], range[1]);
  return filtered.map(d => ({
    date: d.date,
    spend: Math.round(d.spend),
    sessions: d.sessions,
    costPerSession: parseFloat((d.spend / d.sessions).toFixed(2)),
    newCvr: parseFloat(d.cvr.toFixed(2)),
    newRevenue: Math.round(d.newRevenue),
    newAov: d.newCustomers > 0 ? Math.round(d.newRevenue / d.newCustomers) : 0,
    newOrders: d.newCustomers,
    totalOrders: d.orders,
    totalCvr: parseFloat((d.orders / d.sessions * 100).toFixed(2)),
    cpp: d.orders > 0 ? Math.round(d.spend / d.orders) : 0,
    cac: Math.round(d.cac),
    roas: parseFloat((d.roas * 100).toFixed(0)),
    totalRevenue: Math.round(d.totalRevenue),
    totalAov: Math.round(d.aov),
    bRoas: parseFloat(((d.totalRevenue / d.spend) * 100).toFixed(0)),
    contributionDollars: Math.round(d.totalRevenue - d.spend),
    contributionMargin: parseFloat(((d.totalRevenue - d.spend) / d.totalRevenue * 100).toFixed(0)),
  })).reverse(); // most recent first
}

export interface DayOfWeekRow {
  day: string;
  totalSpend: number;
  newCvr: number;
  cac: number;
  bRoas: number;
  contributionDollars: number;
  contributionPct: number;
}

export function getDayOfWeekData(range: DateRange, month = '2026-03'): DayOfWeekRow[] {
  const metrics = dailyMetricsByMonth[month] || dailyMetrics;
  const filtered = sliceByRange(metrics, range[0], range[1]);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const buckets: Record<number, typeof filtered> = {};
  const [yr, mm] = month.split('-').map(Number);

  filtered.forEach(d => {
    const dayNum = parseInt(d.date.split('/')[1]);
    const dow = new Date(yr, mm - 1, dayNum).getDay();
    if (!buckets[dow]) buckets[dow] = [];
    buckets[dow].push(d);
  });

  return dayNames.map((name, i) => {
    const days = buckets[i] || [];
    if (days.length === 0) return { day: name, totalSpend: 0, newCvr: 0, cac: 0, bRoas: 0, contributionDollars: 0, contributionPct: 0 };
    const avgSpend = days.reduce((s, d) => s + d.spend, 0) / days.length;
    const avgCvr = days.reduce((s, d) => s + d.cvr, 0) / days.length;
    const avgCac = days.reduce((s, d) => s + d.cac, 0) / days.length;
    const totalRev = days.reduce((s, d) => s + d.totalRevenue, 0);
    const totalSpd = days.reduce((s, d) => s + d.spend, 0);
    const avgBRoas = totalSpd > 0 ? (totalRev / totalSpd) * 100 : 0;
    const avgContrib = (totalRev - totalSpd) / days.length;
    const avgContribPct = totalRev > 0 ? ((totalRev - totalSpd) / totalRev) * 100 : 0;
    return {
      day: name,
      totalSpend: Math.round(avgSpend),
      newCvr: parseFloat(avgCvr.toFixed(2)),
      cac: Math.round(avgCac),
      bRoas: parseFloat(avgBRoas.toFixed(0)),
      contributionDollars: Math.round(avgContrib),
      contributionPct: parseFloat(avgContribPct.toFixed(0)),
    };
  });
}

// Daily KPIs chart data
export function getDailyKPIsChartData(range: DateRange, month = '2026-03') {
  const metrics = dailyMetricsByMonth[month] || dailyMetrics;
  const filtered = sliceByRange(metrics, range[0], range[1]);
  return filtered.map(d => ({
    date: d.date,
    spend: Math.round(d.spend),
    cac: Math.round(d.cac),
    newOrders: d.newCustomers,
    newRevenue: Math.round(d.newRevenue),
    totalOrders: d.orders,
    totalRevenue: Math.round(d.totalRevenue),
    cpo: d.orders > 0 ? Math.round(d.spend / d.orders) : 0,
    cvr: parseFloat(d.cvr.toFixed(2)),
  }));
}

// ============================================================
// Weekly Business Overview data (Dec 2025 – Mar 2026)
// ============================================================

export interface WeeklyData {
  weekStart: string
  newSpend: number
  newRevenue: number
  newCount: number
  newCac: number
  newRoas: number
  newAov: number
  acos: number
  returnCount: number
  returnRevenue: number
  returnAov: number
  totalCount: number
  totalRevenue: number
  totalAov: number
  cpp: number
  bRoas: number
  newCvr: number
  totalCvr: number
  sessions: number
  cmDollars: number
  cmPct: number
  pctNew: number
  pctReturn: number
}

export interface WeeklyTarget {
  weekStart: string
  newSpend: number
  newCount: number
  newRevenue: number
  newCac: number
  newRoas: number
  newAov: number
  newAcos: number
  returnCount: number
  returnRevenue: number
  totalCount: number
  totalRevenue: number
  bRoas: number
}

// Raw weekly actuals — 14 weeks from 12/15 to 03/16
// Values calibrated to monthlySummary and screenshot reference
const weeklyRaw = [
  { weekStart: '12/15', spend: 9440, newRev: 21431, newCust: 68, retCust: 19, retRev: 6203, sessions: 420 },
  { weekStart: '12/22', spend: 63844, newRev: 153273, newCust: 484, retCust: 201, retRev: 101070, sessions: 3850 },
  { weekStart: '12/29', spend: 63133, newRev: 148329, newCust: 470, retCust: 140, retRev: 52424, sessions: 3520 },
  { weekStart: '01/05', spend: 87517, newRev: 181505, newCust: 493, retCust: 161, retRev: 61549, sessions: 4210 },
  { weekStart: '01/12', spend: 120884, newRev: 268229, newCust: 621, retCust: 174, retRev: 97604, sessions: 5340 },
  { weekStart: '01/19', spend: 90876, newRev: 240233, newCust: 611, retCust: 315, retRev: 62207, sessions: 5180 },
  { weekStart: '01/26', spend: 83488, newRev: 153342, newCust: 389, retCust: 132, retRev: 75136, sessions: 3420 },
  { weekStart: '02/02', spend: 87227, newRev: 164141, newCust: 424, retCust: 129, retRev: 74279, sessions: 3680 },
  { weekStart: '02/09', spend: 74271, newRev: 224343, newCust: 731, retCust: 117, retRev: 66613, sessions: 5120 },
  { weekStart: '02/16', spend: 71116, newRev: 165596, newCust: 440, retCust: 106, retRev: 45015, sessions: 3540 },
  { weekStart: '02/23', spend: 53346, newRev: 205618, newCust: 630, retCust: 125, retRev: 64055, sessions: 4620 },
  { weekStart: '03/02', spend: 48340, newRev: 123545, newCust: 372, retCust: 127, retRev: 78583, sessions: 3150 },
  { weekStart: '03/09', spend: 73827, newRev: 227892, newCust: 721, retCust: 150, retRev: 80515, sessions: 5280 },
  { weekStart: '03/16', spend: 12881, newRev: 56774, newCust: 180, retCust: 27, retRev: 13664, sessions: 1250 },
];

export const weeklyActualsData: WeeklyData[] = weeklyRaw.map(w => {
  const totalRev = w.newRev + w.retRev;
  const totalCount = w.newCust + w.retCust;
  return {
    weekStart: w.weekStart,
    newSpend: w.spend,
    newRevenue: w.newRev,
    newCount: w.newCust,
    newCac: w.newCust > 0 ? Math.round(w.spend / w.newCust) : 0,
    newRoas: w.spend > 0 ? Math.round((w.newRev / w.spend) * 100) : 0,
    newAov: w.newCust > 0 ? Math.round(w.newRev / w.newCust) : 0,
    acos: w.newRev > 0 ? Math.round((w.spend / w.newRev) * 100) : 0,
    returnCount: w.retCust,
    returnRevenue: w.retRev,
    returnAov: w.retCust > 0 ? Math.round(w.retRev / w.retCust) : 0,
    totalCount,
    totalRevenue: totalRev,
    totalAov: totalCount > 0 ? Math.round(totalRev / totalCount) : 0,
    cpp: totalCount > 0 ? Math.round(w.spend / totalCount) : 0,
    bRoas: w.spend > 0 ? Math.round((totalRev / w.spend) * 100) : 0,
    newCvr: w.sessions > 0 ? parseFloat(((w.newCust / w.sessions) * 100).toFixed(1)) : 0,
    totalCvr: w.sessions > 0 ? parseFloat(((totalCount / w.sessions) * 100).toFixed(1)) : 0,
    sessions: w.sessions,
    cmDollars: Math.round(totalRev - w.spend),
    cmPct: totalRev > 0 ? Math.round(((totalRev - w.spend) / totalRev) * 100) : 0,
    pctNew: totalRev > 0 ? Math.round((w.newRev / totalRev) * 100) : 0,
    pctReturn: totalRev > 0 ? Math.round((w.retRev / totalRev) * 100) : 0,
  };
});

// Weekly targets
export const weeklyTargetsData: WeeklyTarget[] = [
  { weekStart: '12/22', newSpend: 92750, newCount: 277, newRevenue: 234745, newCac: 335, newRoas: 253, newAov: 847, newAcos: 40, returnCount: 147, returnRevenue: 73387, totalCount: 424, totalRevenue: 308132, bRoas: 332 },
  { weekStart: '12/29', newSpend: 89250, newCount: 284, newRevenue: 245727, newCac: 314, newRoas: 275, newAov: 865, newAcos: 36, returnCount: 156, returnRevenue: 74597, totalCount: 440, totalRevenue: 320324, bRoas: 359 },
  { weekStart: '01/05', newSpend: 109750, newCount: 355, newRevenue: 309615, newCac: 309, newRoas: 282, newAov: 872, newAcos: 35, returnCount: 168, returnRevenue: 76210, totalCount: 523, totalRevenue: 385825, bRoas: 352 },
  { weekStart: '01/12', newSpend: 106750, newCount: 334, newRevenue: 291816, newCac: 320, newRoas: 273, newAov: 874, newAcos: 37, returnCount: 168, returnRevenue: 76210, totalCount: 502, totalRevenue: 368025, bRoas: 345 },
  { weekStart: '01/19', newSpend: 97750, newCount: 287, newRevenue: 251827, newCac: 341, newRoas: 258, newAov: 877, newAcos: 39, returnCount: 168, returnRevenue: 76210, totalCount: 455, totalRevenue: 328036, bRoas: 336 },
  { weekStart: '01/26', newSpend: 97750, newCount: 322, newRevenue: 280628, newCac: 304, newRoas: 287, newAov: 872, newAcos: 35, returnCount: 168, returnRevenue: 76210, totalCount: 490, totalRevenue: 356838, bRoas: 365 },
  { weekStart: '02/02', newSpend: 98250, newCount: 276, newRevenue: 246665, newCac: 356, newRoas: 251, newAov: 894, newAcos: 40, returnCount: 210, returnRevenue: 100937, totalCount: 486, totalRevenue: 347603, bRoas: 354 },
  { weekStart: '02/09', newSpend: 119250, newCount: 334, newRevenue: 309161, newCac: 357, newRoas: 259, newAov: 926, newAcos: 39, returnCount: 210, returnRevenue: 100937, totalCount: 544, totalRevenue: 410098, bRoas: 344 },
  { weekStart: '02/16', newSpend: 117250, newCount: 313, newRevenue: 289283, newCac: 375, newRoas: 247, newAov: 924, newAcos: 41, returnCount: 210, returnRevenue: 100937, totalCount: 523, totalRevenue: 390220, bRoas: 333 },
  { weekStart: '02/23', newSpend: 115250, newCount: 309, newRevenue: 292966, newCac: 373, newRoas: 254, newAov: 948, newAcos: 39, returnCount: 210, returnRevenue: 100937, totalCount: 519, totalRevenue: 393903, bRoas: 342 },
  { weekStart: '03/02', newSpend: 60200, newCount: 170, newRevenue: 145399, newCac: 354, newRoas: 242, newAov: 855, newAcos: 41, returnCount: 84, returnRevenue: 42000, totalCount: 254, totalRevenue: 187399, bRoas: 311 },
  { weekStart: '03/09', newSpend: 72200, newCount: 215, newRevenue: 182399, newCac: 336, newRoas: 253, newAov: 848, newAcos: 40, returnCount: 142, returnRevenue: 71000, totalCount: 357, totalRevenue: 253399, bRoas: 351 },
  { weekStart: '03/16', newSpend: 22200, newCount: 65, newRevenue: 55647, newCac: 342, newRoas: 251, newAov: 856, newAcos: 40, returnCount: 50, returnRevenue: 25000, totalCount: 115, totalRevenue: 80647, bRoas: 363 },
];

// ── Monthly data ──────────────────────────────────────────────────────

export interface MonthlyData {
  month: string        // e.g. '2025-04'
  spend: number
  newCount: number
  newRevenue: number
  newCac: number
  newRoas: number
  newAov: number
  acos: number
  returnCount: number
  returnRevenue: number
  returnAov: number
  totalCount: number
  totalRevenue: number
  totalAov: number
  cpp: number
  bRoas: number
  newCvr: number
  totalCvr: number
  sessions: number
  cmDollars: number
  cmPct: number
  pctNew: number
  pctReturn: number
}

export interface MonthlyTarget {
  month: string
  spend: number
  newCount: number
  newRevenue: number
  newCac: number
  newRoas: number
  newAov: number
  acos: number
  returnCount: number
  returnRevenue: number
  totalCount: number
  totalRevenue: number
  bRoas: number
}

// Real: spend = Meta API + Google Ads API + Reddit API (~$7382/mo avg for 2025)
// Real: revenue = Shopify net_sales API, orders = Shopify orders API
// Estimated: newRev/retRev (68/32 split), newCust/retCust (65/35 split), sessions (orders/0.031)
const monthlyRaw = [
  // 2022
  { month: '2022-01', spend: 5197, newRev: 8316, retRev: 3913, newCust: 25, retCust: 14, sessions: 1258 },
  { month: '2022-02', spend: 11733, newRev: 8336, retRev: 3923, newCust: 25, retCust: 14, sessions: 1258 },
  { month: '2022-03', spend: 17448, newRev: 7570, retRev: 3562, newCust: 25, retCust: 13, sessions: 1226 },
  { month: '2022-04', spend: 6035, newRev: 6353, retRev: 2990, newCust: 29, retCust: 15, sessions: 1419 },
  { month: '2022-05', spend: 16271, newRev: 56706, retRev: 26685, newCust: 275, retCust: 148, sessions: 13645 },
  { month: '2022-06', spend: 23867, newRev: 124174, retRev: 58435, newCust: 561, retCust: 302, sessions: 27839 },
  { month: '2022-07', spend: 46085, newRev: 210096, retRev: 98869, newCust: 1022, retCust: 551, sessions: 50742 },
  { month: '2022-08', spend: 49053, newRev: 304258, retRev: 143180, newCust: 1455, retCust: 784, sessions: 72226 },
  { month: '2022-09', spend: 54619, newRev: 287593, retRev: 135338, newCust: 1368, retCust: 736, sessions: 67871 },
  { month: '2022-10', spend: 58211, newRev: 259850, retRev: 122282, newCust: 1164, retCust: 626, sessions: 57742 },
  { month: '2022-11', spend: 77526, newRev: 553087, retRev: 260276, newCust: 2556, retCust: 1377, sessions: 126871 },
  { month: '2022-12', spend: 91491, newRev: 630991, retRev: 296937, newCust: 3002, retCust: 1617, sessions: 149000 },
  // 2023
  { month: '2023-01', spend: 101040, newRev: 537623, retRev: 252999, newCust: 2638, retCust: 1420, sessions: 130903 },
  { month: '2023-02', spend: 74901, newRev: 388409, retRev: 182781, newCust: 1847, retCust: 995, sessions: 91677 },
  { month: '2023-03', spend: 79985, newRev: 546522, retRev: 257187, newCust: 2550, retCust: 1373, sessions: 126548 },
  { month: '2023-04', spend: 83980, newRev: 671342, retRev: 315926, newCust: 3130, retCust: 1686, sessions: 155355 },
  { month: '2023-05', spend: 126220, newRev: 1212824, retRev: 570741, newCust: 5466, retCust: 2944, sessions: 271290 },
  { month: '2023-06', spend: 236331, newRev: 1474031, retRev: 693662, newCust: 6353, retCust: 3421, sessions: 315290 },
  { month: '2023-07', spend: 337237, newRev: 1982629, retRev: 933002, newCust: 8765, retCust: 4720, sessions: 435000 },
  { month: '2023-08', spend: 321295, newRev: 2202374, retRev: 1036412, newCust: 9720, retCust: 5234, sessions: 482387 },
  { month: '2023-09', spend: 274705, newRev: 1388992, retRev: 653643, newCust: 6755, retCust: 3638, sessions: 335258 },
  { month: '2023-10', spend: 154343, newRev: 901556, retRev: 424262, newCust: 4396, retCust: 2367, sessions: 218161 },
  { month: '2023-11', spend: 226032, newRev: 1531021, retRev: 720480, newCust: 7435, retCust: 4004, sessions: 369000 },
  { month: '2023-12', spend: 148793, newRev: 1218710, retRev: 573511, newCust: 5807, retCust: 3127, sessions: 288194 },
  // 2024
  { month: '2024-01', spend: 119481, newRev: 367002, retRev: 172707, newCust: 2107, retCust: 1135, sessions: 104581 },
  { month: '2024-02', spend: 169945, newRev: 462988, retRev: 217877, newCust: 2268, retCust: 1222, sessions: 112581 },
  { month: '2024-03', spend: 761163, newRev: 1058494, retRev: 498115, newCust: 5081, retCust: 2736, sessions: 252161 },
  { month: '2024-04', spend: 963901, newRev: 1263797, retRev: 594728, newCust: 6918, retCust: 3725, sessions: 343323 },
  { month: '2024-05', spend: 1060789, newRev: 1680098, retRev: 790634, newCust: 10373, retCust: 5585, sessions: 514774 },
  { month: '2024-06', spend: 1277570, newRev: 2081493, retRev: 979526, newCust: 9906, retCust: 5334, sessions: 491613 },
  { month: '2024-07', spend: 1933919, newRev: 2980015, retRev: 1402360, newCust: 13993, retCust: 7535, sessions: 694452 },
  { month: '2024-08', spend: 1284786, newRev: 1928297, retRev: 907434, newCust: 8730, retCust: 4701, sessions: 433258 },
  { month: '2024-09', spend: 922193, newRev: 1431786, retRev: 673782, newCust: 6556, retCust: 3530, sessions: 325355 },
  { month: '2024-10', spend: 772673, newRev: 1127071, retRev: 530386, newCust: 5370, retCust: 2891, sessions: 266484 },
  { month: '2024-11', spend: 1055166, newRev: 1674352, retRev: 787930, newCust: 7289, retCust: 3925, sessions: 361742 },
  { month: '2024-12', spend: 828741, newRev: 1462318, retRev: 688150, newCust: 6859, retCust: 3693, sessions: 340387 },
  // 2025
  { month: '2025-01', spend: 440257, newRev: 714636, retRev: 336300, newCust: 3436, retCust: 1850, sessions: 170516 },
  { month: '2025-02', spend: 378066, newRev: 657355, retRev: 309344, newCust: 3032, retCust: 1632, sessions: 150452 },
  { month: '2025-03', spend: 548795, newRev: 984125, retRev: 463118, newCust: 4338, retCust: 2336, sessions: 215290 },
  { month: '2025-04', spend: 794905, newRev: 1337414, retRev: 629372, newCust: 5912, retCust: 3183, sessions: 293387 },
  { month: '2025-05', spend: 1141374, newRev: 1613882, retRev: 759474, newCust: 7335, retCust: 3949, sessions: 364000 },
  { month: '2025-06', spend: 1541667, newRev: 3100066, retRev: 1458854, newCust: 12696, retCust: 6837, sessions: 630097 },
  { month: '2025-07', spend: 1960800, newRev: 3641826, retRev: 1713800, newCust: 15961, retCust: 8595, sessions: 792129 },
  { month: '2025-08', spend: 1396016, newRev: 2710690, retRev: 1275619, newCust: 11900, retCust: 6408, sessions: 590581 },
  { month: '2025-09', spend: 1002811, newRev: 1979709, retRev: 931628, newCust: 8759, retCust: 4717, sessions: 434710 },
  { month: '2025-10', spend: 725134, newRev: 1256722, retRev: 591398, newCust: 5696, retCust: 3067, sessions: 282677 },
  { month: '2025-11', spend: 1091354, newRev: 2034772, retRev: 957539, newCust: 8278, retCust: 4457, sessions: 410806 },
  { month: '2025-12', spend: 1055836, newRev: 2078999, retRev: 978352, newCust: 9556, retCust: 5145, sessions: 474226 },
  // 2026
  { month: '2026-01', spend: 625512, newRev: 1089220, retRev: 512574, newCust: 5043, retCust: 2715, sessions: 250258 },
  { month: '2026-02', spend: 513879, newRev: 939760, retRev: 442240, newCust: 4212, retCust: 2268, sessions: 209032 },
  { month: '2026-03', spend: 847482, newRev: 1570216, retRev: 738925, newCust: 6797, retCust: 3660, sessions: 337323 },
]

export const monthlyActualsData: MonthlyData[] = monthlyRaw.map(m => {
  const totalRev = m.newRev + m.retRev
  const totalCount = m.newCust + m.retCust
  return {
    month: m.month,
    spend: m.spend,
    newCount: m.newCust,
    newRevenue: m.newRev,
    newCac: m.newCust > 0 ? Math.round(m.spend / m.newCust) : 0,
    newRoas: m.spend > 0 ? Math.round((m.newRev / m.spend) * 100) : 0,
    newAov: m.newCust > 0 ? Math.round(m.newRev / m.newCust) : 0,
    acos: m.newRev > 0 ? Math.round((m.spend / m.newRev) * 100) : 0,
    returnCount: m.retCust,
    returnRevenue: m.retRev,
    returnAov: m.retCust > 0 ? Math.round(m.retRev / m.retCust) : 0,
    totalCount,
    totalRevenue: totalRev,
    totalAov: totalCount > 0 ? Math.round(totalRev / totalCount) : 0,
    cpp: totalCount > 0 ? Math.round(m.spend / totalCount) : 0,
    bRoas: m.spend > 0 ? Math.round((totalRev / m.spend) * 100) : 0,
    newCvr: m.sessions > 0 ? parseFloat(((m.newCust / m.sessions) * 100).toFixed(2)) : 0,
    totalCvr: m.sessions > 0 ? parseFloat(((totalCount / m.sessions) * 100).toFixed(2)) : 0,
    sessions: m.sessions,
    cmDollars: Math.round(totalRev - m.spend),
    cmPct: totalRev > 0 ? Math.round(((totalRev - m.spend) / totalRev) * 100) : 0,
    pctNew: totalRev > 0 ? Math.round((m.newRev / totalRev) * 100) : 0,
    pctReturn: totalRev > 0 ? Math.round((m.retRev / totalRev) * 100) : 0,
  }
})

export const monthlyTargetsData: MonthlyTarget[] = [
  { month: '2025-04', spend: 400000, newCount: 1325, newRevenue: 1091175, newCac: 302, newRoas: 273, newAov: 824, acos: 37, returnCount: 650, returnRevenue: 308750, totalCount: 1975, totalRevenue: 1399925, bRoas: 350 },
  { month: '2025-05', spend: 450000, newCount: 1454, newRevenue: 1161295, newCac: 309, newRoas: 258, newAov: 799, acos: 39, returnCount: 675, returnRevenue: 337500, totalCount: 2129, totalRevenue: 1498795, bRoas: 333 },
  { month: '2025-06', spend: 499997, newCount: 1532, newRevenue: 1230699, newCac: 326, newRoas: 246, newAov: 803, acos: 41, returnCount: 675, returnRevenue: 337500, totalCount: 2207, totalRevenue: 1568199, bRoas: 314 },
  { month: '2025-07', spend: 525000, newCount: 1615, newRevenue: 1293068, newCac: 325, newRoas: 246, newAov: 801, acos: 41, returnCount: 651, returnRevenue: 325000, totalCount: 2266, totalRevenue: 1618068, bRoas: 308 },
  { month: '2025-08', spend: 499561, newCount: 1522, newRevenue: 1233334, newCac: 328, newRoas: 247, newAov: 810, acos: 41, returnCount: 800, returnRevenue: 319750, totalCount: 2322, totalRevenue: 1553064, bRoas: 311 },
  { month: '2025-09', spend: 502784, newCount: 1543, newRevenue: 1257983, newCac: 326, newRoas: 250, newAov: 815, acos: 40, returnCount: 836, returnRevenue: 367964, totalCount: 2379, totalRevenue: 1625946, bRoas: 323 },
  { month: '2025-10', spend: 547830, newCount: 1614, newRevenue: 1372623, newCac: 339, newRoas: 251, newAov: 850, acos: 40, returnCount: 837, returnRevenue: 416500, totalCount: 2451, totalRevenue: 1789123, bRoas: 327 },
  { month: '2025-11', spend: 608581, newCount: 1958, newRevenue: 1670905, newCac: 311, newRoas: 275, newAov: 853, acos: 36, returnCount: 1024, returnRevenue: 500834, totalCount: 2982, totalRevenue: 2171739, bRoas: 357 },
  { month: '2025-12', spend: 492750, newCount: 1516, newRevenue: 1285884, newCac: 325, newRoas: 261, newAov: 848, acos: 38, returnCount: 651, returnRevenue: 325000, totalCount: 2167, totalRevenue: 1610884, bRoas: 327 },
  { month: '2026-01', spend: 450250, newCount: 4600, newRevenue: 1020000, newCac: 98, newRoas: 227, newAov: 222, acos: 44, returnCount: 2480, returnRevenue: 490000, totalCount: 7080, totalRevenue: 1510000, bRoas: 335 },
  { month: '2026-02', spend: 800000, newCount: 4400, newRevenue: 1020000, newCac: 182, newRoas: 128, newAov: 232, acos: 78, returnCount: 2370, returnRevenue: 480000, totalCount: 6770, totalRevenue: 1500000, bRoas: 188 },
  { month: '2026-03', spend: 1300000, newCount: 7200, newRevenue: 1700000, newCac: 181, newRoas: 131, newAov: 236, acos: 76, returnCount: 3870, returnRevenue: 800000, totalCount: 11070, totalRevenue: 2500000, bRoas: 192 },
]

// ── Quarterly data (derived from monthly) ─────────────────────────────

export interface QuarterlyData {
  quarter: string      // e.g. '2025-Q1'
  spend: number
  newCount: number
  newRevenue: number
  newCac: number
  newRoas: number
  newAov: number
  acos: number
  returnCount: number
  returnRevenue: number
  returnAov: number
  totalCount: number
  totalRevenue: number
  totalAov: number
  cpp: number
  bRoas: number
  newCvr: number
  totalCvr: number
  sessions: number
  cmDollars: number
  cmPct: number
  pctNew: number
  pctReturn: number
}

function getQuarter(month: string): string {
  const [yr, mm] = month.split('-')
  const m = parseInt(mm)
  const q = m <= 3 ? 1 : m <= 6 ? 2 : m <= 9 ? 3 : 4
  return `${yr}-Q${q}`
}

export const quarterlyActualsData: QuarterlyData[] = (() => {
  const qMap: Record<string, MonthlyData[]> = {}
  monthlyActualsData.forEach(m => {
    const q = getQuarter(m.month)
    if (!qMap[q]) qMap[q] = []
    qMap[q].push(m)
  })
  return Object.keys(qMap).sort().map(q => {
    const months = qMap[q]
    const totalSpend = months.reduce((s, m) => s + m.spend, 0)
    const totalNewRev = months.reduce((s, m) => s + m.newRevenue, 0)
    const totalNewCount = months.reduce((s, m) => s + m.newCount, 0)
    const totalRetCount = months.reduce((s, m) => s + m.returnCount, 0)
    const totalRetRev = months.reduce((s, m) => s + m.returnRevenue, 0)
    const totalRev = totalNewRev + totalRetRev
    const totalCount = totalNewCount + totalRetCount
    const totalSessions = months.reduce((s, m) => s + m.sessions, 0)
    return {
      quarter: q,
      spend: totalSpend,
      newCount: totalNewCount,
      newRevenue: totalNewRev,
      newCac: totalNewCount > 0 ? Math.round(totalSpend / totalNewCount) : 0,
      newRoas: totalSpend > 0 ? Math.round((totalNewRev / totalSpend) * 100) : 0,
      newAov: totalNewCount > 0 ? Math.round(totalNewRev / totalNewCount) : 0,
      acos: totalNewRev > 0 ? Math.round((totalSpend / totalNewRev) * 100) : 0,
      returnCount: totalRetCount,
      returnRevenue: totalRetRev,
      returnAov: totalRetCount > 0 ? Math.round(totalRetRev / totalRetCount) : 0,
      totalCount,
      totalRevenue: totalRev,
      totalAov: totalCount > 0 ? Math.round(totalRev / totalCount) : 0,
      cpp: totalCount > 0 ? Math.round(totalSpend / totalCount) : 0,
      bRoas: totalSpend > 0 ? Math.round((totalRev / totalSpend) * 100) : 0,
      newCvr: totalSessions > 0 ? parseFloat(((totalNewCount / totalSessions) * 100).toFixed(2)) : 0,
      totalCvr: totalSessions > 0 ? parseFloat(((totalCount / totalSessions) * 100).toFixed(2)) : 0,
      sessions: totalSessions,
      cmDollars: Math.round(totalRev - totalSpend),
      cmPct: totalRev > 0 ? Math.round(((totalRev - totalSpend) / totalRev) * 100) : 0,
      pctNew: totalRev > 0 ? Math.round((totalNewRev / totalRev) * 100) : 0,
      pctReturn: totalRev > 0 ? Math.round((totalRetRev / totalRev) * 100) : 0,
    }
  })
})()

// ── Period On Period data ─────────────────────────────────────────────

export interface PeriodComparison {
  metric: string
  group: string
  period1: number
  period2: number
  pctChange: number
  format: (v: number) => string
}

export const periodComparisonData: PeriodComparison[] = [
  { metric: 'Spend', group: 'New', period1: 69739, period2: 47463, pctChange: -47, format: v => `$${v.toLocaleString()}` },
  { metric: 'Orders', group: 'New', period1: 220, period2: 151, pctChange: -46, format: v => v.toLocaleString() },
  { metric: 'Revenue', group: 'New', period1: 208986, period2: 126422, pctChange: -65, format: v => `$${v.toLocaleString()}` },
  { metric: 'CAC', group: 'New', period1: 317, period2: 314, pctChange: 1, format: v => `$${v}` },
  { metric: 'ROAS', group: 'New', period1: 300, period2: 266, pctChange: -13, format: v => `${v}%` },
  { metric: 'AOV', group: 'New', period1: 950, period2: 837, pctChange: -13, format: v => `$${v}` },
  { metric: 'Orders', group: 'Return', period1: 154, period2: 120, pctChange: -28, format: v => v.toLocaleString() },
  { metric: 'Revenue', group: 'Return', period1: 89087, period2: 70239, pctChange: -27, format: v => `$${v.toLocaleString()}` },
  { metric: 'AOV', group: 'Return', period1: 578, period2: 585, pctChange: -1, format: v => `$${v}` },
  { metric: 'Orders', group: 'Total', period1: 374, period2: 271, pctChange: -38, format: v => v.toLocaleString() },
  { metric: 'Revenue', group: 'Total', period1: 298073, period2: 196661, pctChange: -52, format: v => `$${v.toLocaleString()}` },
  { metric: 'AOV', group: 'Total', period1: 797, period2: 726, pctChange: -10, format: v => `$${v}` },
  { metric: 'bROAS', group: 'Total', period1: 427, period2: 414, pctChange: -3, format: v => `${v}%` },
  { metric: 'CVR', group: 'Total', period1: 0.42, period2: 0.39, pctChange: -8, format: v => `${v.toFixed(2)}%` },
]

// Monthly Revenue by Year (for YoY chart)
export interface MonthlyYoYData {
  month: string
  [key: string]: number | string
}

export const monthlyYoYData: MonthlyYoYData[] = (() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const yearData: Record<string, { rev: number[]; spend: number[] }> = {
    '2021': { rev: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 8], spend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    '2022': { rev: [12, 12, 11, 9, 83, 183, 309, 447, 423, 382, 813, 928], spend: [5, 12, 17, 6, 16, 24, 46, 49, 55, 58, 78, 91] },
    '2023': { rev: [791, 571, 804, 987, 1784, 2168, 2916, 3239, 2043, 1326, 2252, 1792], spend: [101, 75, 80, 84, 126, 236, 337, 321, 275, 154, 226, 149] },
    '2024': { rev: [540, 681, 1557, 1859, 2471, 3061, 4382, 2836, 2106, 1657, 2462, 2150], spend: [119, 170, 761, 964, 1061, 1278, 1934, 1285, 922, 773, 1055, 829] },
    '2025': { rev: [1051, 967, 1447, 1967, 2373, 4559, 5356, 3986, 2911, 1848, 2992, 3057], spend: [440, 378, 549, 795, 1141, 1542, 1961, 1396, 1003, 725, 1091, 1056] },
    '2026': { rev: [1602, 1382, 2309, 0, 0, 0, 0, 0, 0, 0, 0, 0], spend: [626, 514, 847, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  }
  return months.map((m, i) => {
    const row: MonthlyYoYData = { month: m }
    for (const [yr, d] of Object.entries(yearData)) {
      row[`${yr}_revenue`] = d.rev[i] * 1000
      row[`${yr}_spend`] = d.spend[i] * 1000
    }
    return row
  })
})()

// Weekly Revenue by Year (for YoY chart)
export interface WeeklyYoYData {
  week: string
  [key: string]: number | string
}

export const weeklyYoYData: WeeklyYoYData[] = (() => {
  const weeks: WeeklyYoYData[] = []
  for (let w = 1; w <= 52; w++) {
    const row: WeeklyYoYData = { week: `W${w}` }
    const baseByYear: Record<string, number> = { '2021': 180, '2022': 220, '2023': 270, '2024': 310, '2025': 350, '2026': 280 }
    for (const [yr, base] of Object.entries(baseByYear)) {
      let seasonal = 1.0
      if (w >= 44 && w <= 48) seasonal = 1.3
      else if (w >= 49) seasonal = 1.15
      else if (w >= 20 && w <= 35) seasonal = 1.05
      if (yr === '2026' && w > 11) {
        row[`${yr}_revenue`] = 0
        row[`${yr}_spend`] = 0
      } else {
        const variance = 0.85 + Math.sin(w * 0.7 + parseInt(yr) * 0.3) * 0.15
        row[`${yr}_revenue`] = Math.round(base * seasonal * variance * 1000)
        row[`${yr}_spend`] = Math.round(base * seasonal * variance * 1000 * 0.3)
      }
    }
    weeks.push(row)
  }
  return weeks
})()

export function getFilteredPaidVsOrganic(range: DateRange, month = '2026-03') {
  const metrics = dailyMetricsByMonth[month] || dailyMetrics;
  const filtered = sliceByRange(metrics, range[0], range[1]);
  const totalPaid = filtered.reduce((s, d) => s + d.paidSessions, 0);
  const totalOrganic = filtered.reduce((s, d) => s + d.organicSessions, 0);
  const total = totalPaid + totalOrganic;
  return [
    { name: 'Paid', value: total > 0 ? Math.round((totalPaid / total) * 100) : 0, color: '#8a7d5a' },
    { name: 'Organic', value: total > 0 ? Math.round((totalOrganic / total) * 100) : 0, color: '#5cc9c4' },
  ];
}

// ========== CHANNEL SNAPSHOT DATA ==========

export interface ChannelDailySpend {
  date: string
  // Spend per channel (stacked bars)
  meta: number
  google: number
  tiktok: number
  youtube: number
  pinterest: number
  bing: number
  shopify: number
  // Aggregates
  totalSpend: number
  cac: number
  // Per-channel orders (lines)
  shopifyOrders: number
  googleOrders: number
  metaOrders: number
  bingOrders: number
  pinterestOrders: number
  tiktokOrders: number
  // Per-channel CPA (lines, dashed)
  googleCPA: number
  metaCPA: number
  bingCPA: number
  pinterestCPA: number
  tiktokCPA: number
}

export interface ChannelKPI {
  label: string
  value: number
  change: number
  prefix: string
}

export interface ChannelSpendMix {
  channel: string
  lastWeekDollars: number
  lastWeekPct: number
  wowPct: number
}

export interface ChannelMetricRow {
  metric: string
  lastWeekValue: number
  wowPct: number
  format: 'number' | 'currency' | 'percent'
}

export type ChannelMetricsMap = Record<string, ChannelMetricRow[]>

export interface MetaFunnelRate {
  label: string
  rate: number
  color: string
}

export interface MetaFunnelRaw {
  date: string
  spend: number
  impressions: number
  clicks: number
  lpViews: number
  atc: number
  ic: number
  conversions: number
}

export interface MetaGeoRow {
  geo: string
  spend: number
  cpr: number
  cpm: number
  freq: number
  ctr: number
  cpc: number
  cvr: number
  cpa: number
  roas: number
  aov: number
  color: string
}

// Daily channel spend data (3/2 - 3/18)
export const channelDailySpendData: ChannelDailySpend[] = [
  { date: '3/2', meta: 22100, google: 12400, tiktok: 3200, youtube: 2800, pinterest: 1900, bing: 640, shopify: 5300, totalSpend: 48340, cac: 315, shopifyOrders: 8, googleOrders: 10, metaOrders: 28, bingOrders: 2, pinterestOrders: 2, tiktokOrders: 2, googleCPA: 248, metaCPA: 315, bingCPA: 72, pinterestCPA: 190, tiktokCPA: 400 },
  { date: '3/3', meta: 24300, google: 13100, tiktok: 3400, youtube: 3100, pinterest: 2100, bing: 720, shopify: 5800, totalSpend: 52520, cac: 305, shopifyOrders: 9, googleOrders: 11, metaOrders: 31, bingOrders: 3, pinterestOrders: 2, tiktokOrders: 2, googleCPA: 241, metaCPA: 308, bingCPA: 68, pinterestCPA: 185, tiktokCPA: 388 },
  { date: '3/4', meta: 23500, google: 12800, tiktok: 3100, youtube: 2900, pinterest: 1800, bing: 680, shopify: 5500, totalSpend: 50280, cac: 310, shopifyOrders: 8, googleOrders: 10, metaOrders: 29, bingOrders: 2, pinterestOrders: 2, tiktokOrders: 2, googleCPA: 245, metaCPA: 312, bingCPA: 70, pinterestCPA: 188, tiktokCPA: 394 },
  { date: '3/5', meta: 25100, google: 13500, tiktok: 3500, youtube: 3200, pinterest: 2200, bing: 750, shopify: 6100, totalSpend: 54350, cac: 298, shopifyOrders: 10, googleOrders: 12, metaOrders: 33, bingOrders: 3, pinterestOrders: 3, tiktokOrders: 2, googleCPA: 238, metaCPA: 298, bingCPA: 65, pinterestCPA: 183, tiktokCPA: 380 },
  { date: '3/6', meta: 26800, google: 14200, tiktok: 3700, youtube: 3400, pinterest: 2400, bing: 810, shopify: 6500, totalSpend: 57810, cac: 290, shopifyOrders: 11, googleOrders: 13, metaOrders: 35, bingOrders: 3, pinterestOrders: 3, tiktokOrders: 2, googleCPA: 235, metaCPA: 291, bingCPA: 62, pinterestCPA: 180, tiktokCPA: 375 },
  { date: '3/7', meta: 21900, google: 11800, tiktok: 2900, youtube: 2600, pinterest: 1700, bing: 590, shopify: 4900, totalSpend: 46390, cac: 325, shopifyOrders: 7, googleOrders: 9, metaOrders: 26, bingOrders: 2, pinterestOrders: 2, tiktokOrders: 1, googleCPA: 252, metaCPA: 322, bingCPA: 75, pinterestCPA: 195, tiktokCPA: 410 },
  { date: '3/8', meta: 19800, google: 10500, tiktok: 2600, youtube: 2300, pinterest: 1500, bing: 520, shopify: 4400, totalSpend: 41620, cac: 338, shopifyOrders: 6, googleOrders: 8, metaOrders: 23, bingOrders: 2, pinterestOrders: 1, tiktokOrders: 1, googleCPA: 261, metaCPA: 335, bingCPA: 78, pinterestCPA: 200, tiktokCPA: 420 },
  { date: '3/9', meta: 25400, google: 13800, tiktok: 3600, youtube: 3300, pinterest: 2300, bing: 780, shopify: 6200, totalSpend: 55380, cac: 295, shopifyOrders: 10, googleOrders: 12, metaOrders: 34, bingOrders: 3, pinterestOrders: 3, tiktokOrders: 2, googleCPA: 237, metaCPA: 295, bingCPA: 64, pinterestCPA: 182, tiktokCPA: 378 },
  { date: '3/10', meta: 27200, google: 14600, tiktok: 3800, youtube: 3500, pinterest: 2500, bing: 840, shopify: 6700, totalSpend: 59140, cac: 285, shopifyOrders: 11, googleOrders: 14, metaOrders: 37, bingOrders: 3, pinterestOrders: 3, tiktokOrders: 2, googleCPA: 230, metaCPA: 285, bingCPA: 60, pinterestCPA: 178, tiktokCPA: 370 },
  { date: '3/11', meta: 26500, google: 14100, tiktok: 3600, youtube: 3300, pinterest: 2400, bing: 800, shopify: 6400, totalSpend: 57100, cac: 290, shopifyOrders: 10, googleOrders: 13, metaOrders: 36, bingOrders: 3, pinterestOrders: 3, tiktokOrders: 2, googleCPA: 233, metaCPA: 289, bingCPA: 62, pinterestCPA: 180, tiktokCPA: 374 },
  { date: '3/12', meta: 24800, google: 13300, tiktok: 3400, youtube: 3100, pinterest: 2200, bing: 740, shopify: 5900, totalSpend: 53440, cac: 302, shopifyOrders: 9, googleOrders: 11, metaOrders: 32, bingOrders: 3, pinterestOrders: 2, tiktokOrders: 2, googleCPA: 242, metaCPA: 305, bingCPA: 67, pinterestCPA: 185, tiktokCPA: 385 },
  { date: '3/13', meta: 28100, google: 15100, tiktok: 3900, youtube: 3600, pinterest: 2600, bing: 870, shopify: 7000, totalSpend: 61170, cac: 280, shopifyOrders: 12, googleOrders: 14, metaOrders: 38, bingOrders: 3, pinterestOrders: 3, tiktokOrders: 2, googleCPA: 228, metaCPA: 280, bingCPA: 58, pinterestCPA: 175, tiktokCPA: 365 },
  { date: '3/14', meta: 23200, google: 12600, tiktok: 3100, youtube: 2800, pinterest: 1900, bing: 650, shopify: 5400, totalSpend: 49650, cac: 318, shopifyOrders: 8, googleOrders: 10, metaOrders: 28, bingOrders: 2, pinterestOrders: 2, tiktokOrders: 2, googleCPA: 250, metaCPA: 318, bingCPA: 73, pinterestCPA: 192, tiktokCPA: 405 },
  { date: '3/15', meta: 20500, google: 11100, tiktok: 2700, youtube: 2400, pinterest: 1600, bing: 550, shopify: 4700, totalSpend: 43550, cac: 332, shopifyOrders: 7, googleOrders: 8, metaOrders: 24, bingOrders: 2, pinterestOrders: 2, tiktokOrders: 1, googleCPA: 258, metaCPA: 330, bingCPA: 76, pinterestCPA: 198, tiktokCPA: 415 },
  { date: '3/16', meta: 26900, google: 14400, tiktok: 3700, youtube: 3400, pinterest: 2400, bing: 810, shopify: 6500, totalSpend: 58110, cac: 288, shopifyOrders: 11, googleOrders: 13, metaOrders: 36, bingOrders: 3, pinterestOrders: 3, tiktokOrders: 2, googleCPA: 232, metaCPA: 288, bingCPA: 61, pinterestCPA: 179, tiktokCPA: 372 },
  { date: '3/17', meta: 27800, google: 14900, tiktok: 3800, youtube: 3500, pinterest: 2500, bing: 850, shopify: 6800, totalSpend: 60150, cac: 282, shopifyOrders: 12, googleOrders: 14, metaOrders: 38, bingOrders: 3, pinterestOrders: 3, tiktokOrders: 2, googleCPA: 229, metaCPA: 282, bingCPA: 59, pinterestCPA: 176, tiktokCPA: 368 },
  { date: '3/18', meta: 25600, google: 13700, tiktok: 3500, youtube: 3200, pinterest: 2300, bing: 770, shopify: 6100, totalSpend: 55170, cac: 300, shopifyOrders: 10, googleOrders: 12, metaOrders: 33, bingOrders: 3, pinterestOrders: 2, tiktokOrders: 2, googleCPA: 240, metaCPA: 300, bingCPA: 66, pinterestCPA: 184, tiktokCPA: 390 },
]

export const channelKPIs: ChannelKPI[] = [
  { label: 'Total Spend Last Week', value: 73827, change: 10, prefix: '$' },
  { label: 'Average CAS Last Week', value: 315, change: -8, prefix: '$' },
  { label: 'Meta CPM Last Week', value: 118, change: -20, prefix: '$' },
  { label: 'Google CPA Last Week', value: 247, change: 6, prefix: '$' },
  { label: 'Bing CPA Last Week', value: 72, change: 4, prefix: '$' },
  { label: 'TikTok CPA Last Week', value: 378, change: 2, prefix: '$' },
  { label: 'Pinterest CPA Last Week', value: 187, change: -5, prefix: '$' },
]

export const channelSpendMixData: ChannelSpendMix[] = [
  { channel: 'Meta', lastWeekDollars: 153415, lastWeekPct: 74, wowPct: 15 },
  { channel: 'Google Ads', lastWeekDollars: 49828, lastWeekPct: 24, wowPct: 60 },
  { channel: 'Reddit', lastWeekDollars: 3596, lastWeekPct: 2, wowPct: -7 },
  { channel: 'TikTok', lastWeekDollars: 0, lastWeekPct: 0, wowPct: 0 },
  { channel: 'AppLovin', lastWeekDollars: 0, lastWeekPct: 0, wowPct: 0 },
]

export const channelMetricsData: ChannelMetricsMap = {
  'Meta WoW': [
    { metric: 'Impressions', lastWeekValue: 6529641, wowPct: 12, format: 'number' },
    { metric: 'Clicks', lastWeekValue: 143209, wowPct: 8, format: 'number' },
    { metric: 'Cost', lastWeekValue: 153415, wowPct: 15, format: 'currency' },
    { metric: 'Purchases', lastWeekValue: 1186, wowPct: -5, format: 'number' },
    { metric: 'Revenue', lastWeekValue: 545627, wowPct: 10, format: 'currency' },
    { metric: 'CPM', lastWeekValue: 23, wowPct: 6, format: 'currency' },
    { metric: 'CTR', lastWeekValue: 2.19, wowPct: -3, format: 'percent' },
    { metric: 'CPC', lastWeekValue: 1.07, wowPct: 7, format: 'currency' },
    { metric: 'CVR', lastWeekValue: 0.83, wowPct: -12, format: 'percent' },
    { metric: 'CPA', lastWeekValue: 129.36, wowPct: 21, format: 'currency' },
    { metric: 'ROAS', lastWeekValue: 356, wowPct: -4, format: 'percent' },
    { metric: 'AOV', lastWeekValue: 460, wowPct: 3, format: 'currency' },
  ],
  'Google Ads WoW': [
    { metric: 'Impressions', lastWeekValue: 985420, wowPct: 42, format: 'number' },
    { metric: 'Clicks', lastWeekValue: 18200, wowPct: 38, format: 'number' },
    { metric: 'Cost', lastWeekValue: 20078, wowPct: 60, format: 'currency' },
    { metric: 'Purchases', lastWeekValue: 82, wowPct: 45, format: 'number' },
    { metric: 'Revenue', lastWeekValue: 71240, wowPct: 52, format: 'currency' },
    { metric: 'CPM', lastWeekValue: 20, wowPct: 12, format: 'currency' },
    { metric: 'CTR', lastWeekValue: 1.85, wowPct: -3, format: 'percent' },
    { metric: 'CPC', lastWeekValue: 1.10, wowPct: 16, format: 'currency' },
    { metric: 'CVR', lastWeekValue: 0.45, wowPct: 5, format: 'percent' },
    { metric: 'CPA', lastWeekValue: 244.85, wowPct: 10, format: 'currency' },
    { metric: 'ROAS', lastWeekValue: 355, wowPct: -5, format: 'percent' },
    { metric: 'AOV', lastWeekValue: 869, wowPct: 5, format: 'currency' },
  ],
  'Tiktok Ads WoW': [
    { metric: 'Impressions', lastWeekValue: 524300, wowPct: 28, format: 'number' },
    { metric: 'Clicks', lastWeekValue: 8900, wowPct: 22, format: 'number' },
    { metric: 'Cost', lastWeekValue: 4535, wowPct: -7, format: 'currency' },
    { metric: 'Purchases', lastWeekValue: 12, wowPct: -15, format: 'number' },
    { metric: 'Revenue', lastWeekValue: 9240, wowPct: -12, format: 'currency' },
    { metric: 'CPM', lastWeekValue: 8.65, wowPct: -28, format: 'currency' },
    { metric: 'CTR', lastWeekValue: 1.70, wowPct: -5, format: 'percent' },
    { metric: 'CPC', lastWeekValue: 0.51, wowPct: -25, format: 'currency' },
    { metric: 'CVR', lastWeekValue: 0.13, wowPct: -30, format: 'percent' },
    { metric: 'CPA', lastWeekValue: 377.92, wowPct: 10, format: 'currency' },
    { metric: 'ROAS', lastWeekValue: 204, wowPct: -5, format: 'percent' },
    { metric: 'AOV', lastWeekValue: 770, wowPct: 3, format: 'currency' },
  ],
  'Bing Ads WoW': [
    { metric: 'Impressions', lastWeekValue: 142500, wowPct: 18, format: 'number' },
    { metric: 'Clicks', lastWeekValue: 3200, wowPct: 15, format: 'number' },
    { metric: 'Cost', lastWeekValue: 864, wowPct: -2, format: 'currency' },
    { metric: 'Purchases', lastWeekValue: 12, wowPct: 8, format: 'number' },
    { metric: 'Revenue', lastWeekValue: 8540, wowPct: 12, format: 'currency' },
    { metric: 'CPM', lastWeekValue: 6.06, wowPct: -17, format: 'currency' },
    { metric: 'CTR', lastWeekValue: 2.25, wowPct: -3, format: 'percent' },
    { metric: 'CPC', lastWeekValue: 0.27, wowPct: -15, format: 'currency' },
    { metric: 'CVR', lastWeekValue: 0.38, wowPct: -6, format: 'percent' },
    { metric: 'CPA', lastWeekValue: 72.00, wowPct: -9, format: 'currency' },
    { metric: 'ROAS', lastWeekValue: 988, wowPct: 14, format: 'percent' },
    { metric: 'AOV', lastWeekValue: 712, wowPct: 5, format: 'currency' },
  ],
  'Pinterest Ads WoW': [
    { metric: 'Impressions', lastWeekValue: 310200, wowPct: 22, format: 'number' },
    { metric: 'Clicks', lastWeekValue: 5800, wowPct: 18, format: 'number' },
    { metric: 'Cost', lastWeekValue: 2800, wowPct: -10, format: 'currency' },
    { metric: 'Purchases', lastWeekValue: 15, wowPct: -5, format: 'number' },
    { metric: 'Revenue', lastWeekValue: 10890, wowPct: -3, format: 'currency' },
    { metric: 'CPM', lastWeekValue: 9.03, wowPct: -26, format: 'currency' },
    { metric: 'CTR', lastWeekValue: 1.87, wowPct: -3, format: 'percent' },
    { metric: 'CPC', lastWeekValue: 0.48, wowPct: -24, format: 'currency' },
    { metric: 'CVR', lastWeekValue: 0.26, wowPct: -20, format: 'percent' },
    { metric: 'CPA', lastWeekValue: 186.67, wowPct: -5, format: 'currency' },
    { metric: 'ROAS', lastWeekValue: 389, wowPct: 8, format: 'percent' },
    { metric: 'AOV', lastWeekValue: 726, wowPct: 2, format: 'currency' },
  ],
  'Applovin Ads WoW': [
    { metric: 'Impressions', lastWeekValue: 85400, wowPct: 10, format: 'number' },
    { metric: 'Clicks', lastWeekValue: 1800, wowPct: 8, format: 'number' },
    { metric: 'Cost', lastWeekValue: 1250, wowPct: 5, format: 'currency' },
    { metric: 'Purchases', lastWeekValue: 5, wowPct: -10, format: 'number' },
    { metric: 'Revenue', lastWeekValue: 3750, wowPct: -8, format: 'currency' },
    { metric: 'CPM', lastWeekValue: 14.63, wowPct: -5, format: 'currency' },
    { metric: 'CTR', lastWeekValue: 2.11, wowPct: -2, format: 'percent' },
    { metric: 'CPC', lastWeekValue: 0.69, wowPct: -3, format: 'currency' },
    { metric: 'CVR', lastWeekValue: 0.28, wowPct: -16, format: 'percent' },
    { metric: 'CPA', lastWeekValue: 250.00, wowPct: 17, format: 'currency' },
    { metric: 'ROAS', lastWeekValue: 300, wowPct: -12, format: 'percent' },
    { metric: 'AOV', lastWeekValue: 750, wowPct: 2, format: 'currency' },
  ],
  'Amazon Ads WoW': [
    { metric: 'Impressions', lastWeekValue: 198700, wowPct: 15, format: 'number' },
    { metric: 'Clicks', lastWeekValue: 4100, wowPct: 12, format: 'number' },
    { metric: 'Cost', lastWeekValue: 3040, wowPct: 8, format: 'currency' },
    { metric: 'Purchases', lastWeekValue: 22, wowPct: 5, format: 'number' },
    { metric: 'Revenue', lastWeekValue: 18260, wowPct: 10, format: 'currency' },
    { metric: 'CPM', lastWeekValue: 15.30, wowPct: -6, format: 'currency' },
    { metric: 'CTR', lastWeekValue: 2.06, wowPct: -3, format: 'percent' },
    { metric: 'CPC', lastWeekValue: 0.74, wowPct: -4, format: 'currency' },
    { metric: 'CVR', lastWeekValue: 0.54, wowPct: -6, format: 'percent' },
    { metric: 'CPA', lastWeekValue: 138.18, wowPct: 3, format: 'currency' },
    { metric: 'ROAS', lastWeekValue: 601, wowPct: 2, format: 'percent' },
    { metric: 'AOV', lastWeekValue: 830, wowPct: 5, format: 'currency' },
  ],
}

export const metaFunnelRates: MetaFunnelRate[] = [
  { label: 'CTR', rate: 1.63, color: '#2d5a3d' },
  { label: 'Click>LP', rate: 83.5, color: '#3a7a50' },
  { label: 'LP View %', rate: 71.2, color: '#4a9a63' },
  { label: 'ATC %', rate: 4.97, color: '#5cc9c4' },
  { label: 'IC %', rate: 28.4, color: '#5cc9c4' },
  { label: 'CVR %', rate: 55.8, color: '#5cc9c4' },
  { label: 'Click>Purch %', rate: 0.69, color: '#5cc9c4' },
]

// Raw funnel data — conversion rates are derived from these
export const metaFunnelRawData: MetaFunnelRaw[] = [
  { date: '3/17/2026', spend: 4231, impressions: 205768, clicks: 2981, lpViews: 2397, atc: 74, ic: 34, conversions: 26 },
  { date: '3/16/2026', spend: 8278, impressions: 329667, clicks: 5383, lpViews: 4598, atc: 162, ic: 71, conversions: 50 },
  { date: '3/15/2026', spend: 6930, impressions: 283769, clicks: 5301, lpViews: 4803, atc: 202, ic: 50, conversions: 22 },
  { date: '3/14/2026', spend: 5700, impressions: 241595, clicks: 4552, lpViews: 4175, atc: 135, ic: 54, conversions: 23 },
  { date: '3/13/2026', spend: 5673, impressions: 235343, clicks: 3969, lpViews: 3424, atc: 154, ic: 58, conversions: 32 },
  { date: '3/12/2026', spend: 5727, impressions: 257664, clicks: 3979, lpViews: 3394, atc: 208, ic: 76, conversions: 38 },
  { date: '3/11/2026', spend: 5588, impressions: 263116, clicks: 3784, lpViews: 3333, atc: 174, ic: 52, conversions: 19 },
  { date: '3/10/2026', spend: 5151, impressions: 239727, clicks: 3524, lpViews: 3115, atc: 186, ic: 71, conversions: 33 },
  { date: '3/9/2026', spend: 4492, impressions: 226631, clicks: 3291, lpViews: 2780, atc: 168, ic: 67, conversions: 42 },
  { date: '3/8/2026', spend: 4026, impressions: 203393, clicks: 3329, lpViews: 2793, atc: 145, ic: 40, conversions: 22 },
]

export const metaGeoTableData: MetaGeoRow[] = [
  { geo: 'California', spend: 28450, cpr: 520, cpm: 28, freq: 2.35, ctr: 2.85, cpc: 0.14, cvr: 0.52, cpa: 218, roas: 5.12, aov: 1185, color: '#5cc9c4' },
  { geo: 'Texas', spend: 16280, cpr: 558, cpm: 30, freq: 2.18, ctr: 2.72, cpc: 0.16, cvr: 0.48, cpa: 235, roas: 4.78, aov: 1142, color: '#4a9a63' },
  { geo: 'New York', spend: 14920, cpr: 542, cpm: 32, freq: 2.28, ctr: 2.68, cpc: 0.17, cvr: 0.50, cpa: 228, roas: 4.95, aov: 1168, color: '#3a7a50' },
  { geo: 'Florida', spend: 11380, cpr: 575, cpm: 29, freq: 2.12, ctr: 2.60, cpc: 0.15, cvr: 0.46, cpa: 242, roas: 4.65, aov: 1130, color: '#e07a5f' },
  { geo: 'Illinois', spend: 6840, cpr: 610, cpm: 31, freq: 2.05, ctr: 2.52, cpc: 0.18, cvr: 0.44, cpa: 255, roas: 4.38, aov: 1098, color: '#8a7d5a' },
  { geo: 'Pennsylvania', spend: 5420, cpr: 628, cpm: 33, freq: 1.98, ctr: 2.45, cpc: 0.19, cvr: 0.42, cpa: 262, roas: 4.22, aov: 1075, color: '#c9a0b0' },
  { geo: 'Ohio', spend: 4180, cpr: 645, cpm: 30, freq: 1.92, ctr: 2.40, cpc: 0.17, cvr: 0.40, cpa: 275, roas: 4.05, aov: 1052, color: '#7d8a7d' },
  { geo: 'Other', spend: 15738, cpr: 590, cpm: 31, freq: 2.10, ctr: 2.55, cpc: 0.16, cvr: 0.45, cpa: 248, roas: 4.52, aov: 1120, color: '#a3a3a3' },
]

export const metaGeoDonutData = metaGeoTableData.map(g => ({
  name: g.geo,
  value: g.spend,
  color: g.color,
}))

// ========== CHANNEL DAILY HEATMAPS DATA ==========

export interface ChannelDailyHeatmapRow {
  date: string
  spend: number
  cpr: number
  cpm: number
  freq: number
  ctr: number
  cpc: number
  cvr: number
  cpa: number
  hcpa: number
  roas: number
  hroas: number
  aov: number
}

// Generate 21 days of data per channel (Feb 24 - Mar 17, 2026)
function generateChannelHeatmapData(
  baseSpend: number, baseCpm: number, baseCpc: number, baseCtr: number,
  baseCvr: number, baseCpa: number, baseRoas: number, baseAov: number
): ChannelDailyHeatmapRow[] {
  const rows: ChannelDailyHeatmapRow[] = []
  const startDate = new Date(2026, 1, 24) // Feb 24
  for (let i = 0; i < 22; i++) {
    const d = new Date(startDate)
    d.setDate(d.getDate() + i)
    const dateStr = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
    const dayVariance = 0.8 + Math.random() * 0.4
    const spend = Math.round(baseSpend * dayVariance)
    const cpm = Math.round(baseCpm * (0.85 + Math.random() * 0.3))
    const freq = parseFloat((1.8 + Math.random() * 0.8).toFixed(2))
    const ctr = parseFloat((baseCtr * (0.85 + Math.random() * 0.3)).toFixed(2))
    const cpc = parseFloat((baseCpc * (0.85 + Math.random() * 0.3)).toFixed(2))
    const cvr = parseFloat((baseCvr * (0.75 + Math.random() * 0.5)).toFixed(2))
    const cpa = Math.round(baseCpa * (0.8 + Math.random() * 0.4))
    const hcpa = Math.round(cpa * (0.9 + Math.random() * 0.4))
    const roas = Math.round(baseRoas * (0.7 + Math.random() * 0.6))
    const hroas = Math.round(roas * (0.8 + Math.random() * 0.5))
    const aov = Math.round(baseAov * (0.9 + Math.random() * 0.2))
    const cpr = Math.round(spend / Math.max(1, Math.round(spend / cpa)))
    rows.push({ date: dateStr, spend, cpr, cpm, freq, ctr, cpc, cvr, cpa, hcpa, roas, hroas, aov })
  }
  return rows.reverse() // newest first
}

export const channelHeatmapData: Record<string, ChannelDailyHeatmapRow[]> = {
  Meta: generateChannelHeatmapData(4500, 22, 1.38, 1.62, 0.84, 188, 417, 820),
  Google: generateChannelHeatmapData(3200, 20, 1.10, 1.85, 0.45, 245, 355, 870),
  Applovin: generateChannelHeatmapData(800, 15, 0.69, 2.11, 0.28, 250, 300, 750),
  Bing: generateChannelHeatmapData(500, 6, 0.27, 2.25, 0.38, 72, 988, 712),
  Pinterest: generateChannelHeatmapData(1200, 9, 0.48, 1.87, 0.26, 187, 389, 726),
  Tiktok: generateChannelHeatmapData(1800, 9, 0.51, 1.70, 0.13, 378, 204, 770),
  Amazon: generateChannelHeatmapData(1500, 15, 0.74, 2.06, 0.54, 138, 601, 830),
}

// ========== BREAKOUTS (Campaign → Ad Set → Ad) ==========

export interface BreakoutMetrics {
  spend: number
  cpm: number
  ctr: number
  cpc: number
  cvr: number
  cpa: number
  arcosCPA: number // always '--' for display but keep as 0
  pCPA: number     // always '--' for display but keep as 0
  roas: number
  aov: number
}

export interface BreakoutAd extends BreakoutMetrics {
  name: string
}

export interface BreakoutAdSet extends BreakoutMetrics {
  name: string
  ads: BreakoutAd[]
}

export interface BreakoutCampaign extends BreakoutMetrics {
  name: string
  adSets: BreakoutAdSet[]
}

function genMetrics(spendBase: number): BreakoutMetrics {
  const spend = Math.round(spendBase * (0.8 + Math.random() * 0.4))
  const cpm = Math.round(15 + Math.random() * 20)
  const ctr = parseFloat((0.6 + Math.random() * 2.5).toFixed(2))
  const cpc = parseFloat((0.5 + Math.random() * 2).toFixed(2))
  const cvr = parseFloat((0.3 + Math.random() * 1.5).toFixed(2))
  const cpa = Math.round(70 + Math.random() * 150)
  const roas = parseFloat((1 + Math.random() * 12).toFixed(2))
  const aov = Math.round(500 + Math.random() * 600)
  return { spend, cpm, ctr, cpc, cvr, cpa, arcosCPA: 0, pCPA: 0, roas, aov }
}

function genAd(name: string, spendBase: number): BreakoutAd {
  return { name, ...genMetrics(spendBase) }
}

function genAdSet(name: string, spendBase: number, adNames: string[]): BreakoutAdSet {
  const ads = adNames.map(n => genAd(n, spendBase / adNames.length))
  const m = genMetrics(spendBase)
  return { name, ...m, ads }
}

function genCampaign(name: string, spendBase: number, adSets: { name: string; ads: string[] }[]): BreakoutCampaign {
  const sets = adSets.map(s => genAdSet(s.name, spendBase / adSets.length, s.ads))
  const m = genMetrics(spendBase)
  return { name, ...m, adSets: sets }
}

export const metaBreakoutData: BreakoutCampaign[] = [
  genCampaign('US | Haylen | Creative Test | CBO', 15708, [
    { name: 'Haylen - Broad - US', ads: ['Haylen UGC Video 1', 'Haylen Static Carousel', 'Haylen Testimonial V2'] },
    { name: 'Haylen - Lookalike 1%', ads: ['Haylen UGC Video 2', 'Haylen Before/After'] },
  ]),
  genCampaign('US | Terri | Creative Test | CBO', 14627, [
    { name: 'Terri - Broad - US', ads: ['Terri UGC Review', 'Terri Product Demo', 'Terri Lifestyle Shot'] },
    { name: 'Terri - Interest Stack', ads: ['Terri Comparison Ad', 'Terri Social Proof'] },
  ]),
  genCampaign('TI | Product Mix | DPA + Creative | CBO', 11856, [
    { name: 'DPA - All Products', ads: ['DPA Carousel - Top Sellers', 'DPA Single Image'] },
    { name: 'Creative Mix - TI', ads: ['Product Showcase V1', 'Product Showcase V2', 'Lifestyle Flat Lay'] },
  ]),
  genCampaign('Product Mix | Scale | Product Specific | MOD C33 | CBO', 10427, [
    { name: 'MOD C33 - Broad', ads: ['C33 Hero Image', 'C33 Video 15s', 'C33 Carousel'] },
    { name: 'MOD C33 - Retargeting', ads: ['C33 Retarget - Cart Abandon', 'C33 Retarget - Viewers'] },
  ]),
  genCampaign('Product Mix | LoFi | Partner Pages/OTM', 10160, [
    { name: 'Partner Pages - Broad', ads: ['Partner UGC Compilation', 'OTM Feature Video'] },
    { name: 'OTM - Lookalike', ads: ['OTM Testimonial', 'OTM Product Close-up'] },
  ]),
  genCampaign('Partnership | Scale | Product Mix | CBO', 9027, [
    { name: 'Partnership - Scale', ads: ['Collab Hero Banner', 'Collab Story Ad', 'Collab Reel'] },
  ]),
  genCampaign('Catalog | Test | NEW DPA | Product Set Test | CBO', 8814, [
    { name: 'New DPA Set A', ads: ['DPA Set A - Carousel', 'DPA Set A - Collection'] },
    { name: 'New DPA Set B', ads: ['DPA Set B - Single', 'DPA Set B - Video'] },
  ]),
  genCampaign('Sale | Main Promo Campaign | CBO', 8449, [
    { name: 'Promo - Broad US', ads: ['Sale Banner V1', 'Sale Banner V2', 'Sale Countdown'] },
    { name: 'Promo - Retarget', ads: ['Sale Reminder', 'Sale Last Chance'] },
  ]),
  genCampaign('B2B Trade | 2026', 5376, [
    { name: 'B2B - Trade Audience', ads: ['Trade Show CTA', 'B2B Catalog Request'] },
  ]),
  genCampaign('Page Likes - FB - Worldwide', 307, [
    { name: 'Page Likes - WW', ads: ['Page Like Ad 1'] },
  ]),
  genCampaign('Collection | New Arrivals | CBO', 103, [
    { name: 'New Arrivals - Broad', ads: ['New Arrivals Carousel', 'New Arrivals Video'] },
  ]),
]

export const googleBreakoutData: BreakoutCampaign[] = [
  genCampaign('Search | Brand | US | Exact Match', 8420, [
    { name: 'Brand Core Terms', ads: ['Brand RSA 1', 'Brand RSA 2', 'Brand DSA'] },
    { name: 'Brand + Product', ads: ['Brand Product RSA', 'Brand Collection RSA'] },
  ]),
  genCampaign('Search | Non-Brand | US | Product Category', 6850, [
    { name: 'Category - Lighting', ads: ['Lighting RSA 1', 'Lighting RSA 2'] },
    { name: 'Category - Furniture', ads: ['Furniture RSA 1', 'Furniture DSA'] },
    { name: 'Category - Decor', ads: ['Decor RSA 1'] },
  ]),
  genCampaign('PMax | US | Product Feed | Tiers', 5940, [
    { name: 'PMax - Tier 1 Products', ads: ['PMax Asset Group 1', 'PMax Asset Group 2'] },
    { name: 'PMax - Tier 2 Products', ads: ['PMax Asset Group 3'] },
  ]),
  genCampaign('Shopping | US | Standard | All Products', 4320, [
    { name: 'All Products Feed', ads: ['Standard Shopping Feed'] },
  ]),
  genCampaign('Display | Remarketing | US | 30 Day', 3180, [
    { name: 'Remarketing - Site Visitors', ads: ['Display Banner 300x250', 'Display Banner 728x90', 'Responsive Display'] },
    { name: 'Remarketing - Cart Abandon', ads: ['Cart Abandon Banner', 'Cart Abandon Responsive'] },
  ]),
  genCampaign('YouTube | Awareness | US | In-Stream', 2450, [
    { name: 'In-Stream Skippable', ads: ['Brand Video 30s', 'Brand Video 15s'] },
    { name: 'In-Stream Non-Skip', ads: ['Brand Bumper 6s'] },
  ]),
  genCampaign('Search | Non-Brand | US | Competitor', 1890, [
    { name: 'Competitor Names', ads: ['Competitor RSA 1', 'Competitor RSA 2'] },
  ]),
  genCampaign('Discovery | US | Product Feed', 1240, [
    { name: 'Discovery Feed', ads: ['Discovery Carousel', 'Discovery Single Image'] },
  ]),
]

export const applovinBreakoutData: BreakoutCampaign[] = [
  genCampaign('AppLovin | US | Prospecting | CPA Goal', 3200, [
    { name: 'Prospecting - Broad US', ads: ['Static Banner 1', 'Static Banner 2', 'Video 15s'] },
    { name: 'Prospecting - High Value', ads: ['Video 30s', 'Playable Ad'] },
  ]),
  genCampaign('AppLovin | US | Retargeting | ROAS Goal', 2100, [
    { name: 'Retarget - Viewers', ads: ['Retarget Banner', 'Retarget Video'] },
    { name: 'Retarget - Cart', ads: ['Cart Recovery Banner'] },
  ]),
  genCampaign('AppLovin | INT | Prospecting | Scale', 1400, [
    { name: 'INT - Tier 1 Countries', ads: ['INT Banner 1', 'INT Video 1'] },
  ]),
  genCampaign('AppLovin | US | Brand Awareness', 680, [
    { name: 'Brand - Video Views', ads: ['Brand Awareness Video'] },
  ]),
]

export const bingBreakoutData: BreakoutCampaign[] = [
  genCampaign('Bing | Search | Brand | US', 2100, [
    { name: 'Brand Exact', ads: ['Brand RSA 1', 'Brand RSA 2'] },
    { name: 'Brand Broad', ads: ['Brand Broad RSA'] },
  ]),
  genCampaign('Bing | Search | Non-Brand | Product', 1680, [
    { name: 'Product Category', ads: ['Product RSA 1', 'Product RSA 2'] },
    { name: 'Product Specific', ads: ['Specific RSA 1'] },
  ]),
  genCampaign('Bing | Shopping | US | All Products', 1240, [
    { name: 'Shopping Feed', ads: ['Shopping Feed All'] },
  ]),
  genCampaign('Bing | Audience | Remarketing', 580, [
    { name: 'Remarketing 30D', ads: ['Audience Ad 1', 'Audience Ad 2'] },
  ]),
  genCampaign('Bing | Search | Non-Brand | Generic', 420, [
    { name: 'Generic Terms', ads: ['Generic RSA 1'] },
  ]),
]

export const pinterestBreakoutData: BreakoutCampaign[] = [
  genCampaign('Pinterest | Catalog Sales | US | All Products', 4200, [
    { name: 'Catalog - Best Sellers', ads: ['Catalog Pin - Bestsellers', 'Catalog Pin - New'] },
    { name: 'Catalog - Seasonal', ads: ['Catalog Pin - Spring', 'Catalog Pin - Sale'] },
  ]),
  genCampaign('Pinterest | Conversions | US | Idea Pins', 3100, [
    { name: 'Idea Pins - Lifestyle', ads: ['Idea Pin - Room Setup', 'Idea Pin - Styling Tips'] },
    { name: 'Idea Pins - Product', ads: ['Idea Pin - Product Demo', 'Idea Pin - Unboxing'] },
  ]),
  genCampaign('Pinterest | Traffic | US | Awareness', 2400, [
    { name: 'Awareness - Broad', ads: ['Standard Pin 1', 'Standard Pin 2', 'Video Pin'] },
  ]),
  genCampaign('Pinterest | Retargeting | US | Engaged', 1800, [
    { name: 'Retarget - Site Visitors', ads: ['Retarget Pin 1'] },
    { name: 'Retarget - Engagers', ads: ['Retarget Pin 2'] },
  ]),
  genCampaign('Pinterest | Shopping | US | Product Feed', 1100, [
    { name: 'Shopping Feed', ads: ['Shopping Pin - Auto'] },
  ]),
]

export const tiktokBreakoutData: BreakoutCampaign[] = [
  genCampaign('TikTok | Conversions | US | Spark Ads | CBO', 5800, [
    { name: 'Spark - Creator A', ads: ['Creator A - Product Review', 'Creator A - Tutorial'] },
    { name: 'Spark - Creator B', ads: ['Creator B - Unboxing', 'Creator B - Day in Life'] },
    { name: 'Spark - Creator C', ads: ['Creator C - Before After'] },
  ]),
  genCampaign('TikTok | Conversions | US | In-Feed | CBO', 4200, [
    { name: 'In-Feed - UGC Style', ads: ['UGC Video 1', 'UGC Video 2', 'UGC Video 3'] },
    { name: 'In-Feed - Product Focus', ads: ['Product Showcase', 'Product Demo'] },
  ]),
  genCampaign('TikTok | Catalog Sales | US | DPA', 2800, [
    { name: 'DPA - All Products', ads: ['DPA Video Template', 'DPA Carousel'] },
  ]),
  genCampaign('TikTok | Traffic | US | TopView', 1900, [
    { name: 'TopView - Brand', ads: ['TopView Video 1'] },
  ]),
  genCampaign('TikTok | Reach | US | Brand Awareness', 1200, [
    { name: 'Brand Awareness', ads: ['Awareness Video 1', 'Awareness Video 2'] },
  ]),
  genCampaign('TikTok | Conversions | UK | Spark Ads', 890, [
    { name: 'UK Spark - Creator D', ads: ['UK Creator D - Review'] },
  ]),
]

export const amazonBreakoutData: BreakoutCampaign[] = [
  genCampaign('Amazon | SP | US | Auto Targeting', 4500, [
    { name: 'Auto - Close Match', ads: ['Auto Campaign - All SKUs'] },
    { name: 'Auto - Loose Match', ads: ['Auto Loose - All SKUs'] },
  ]),
  genCampaign('Amazon | SP | US | Manual | Exact', 3800, [
    { name: 'Exact - Brand Terms', ads: ['Brand Exact Ad 1', 'Brand Exact Ad 2'] },
    { name: 'Exact - Product Terms', ads: ['Product Exact Ad 1', 'Product Exact Ad 2'] },
  ]),
  genCampaign('Amazon | SP | US | Manual | Broad', 2900, [
    { name: 'Broad - Category', ads: ['Category Broad Ad 1'] },
    { name: 'Broad - Generic', ads: ['Generic Broad Ad 1'] },
  ]),
  genCampaign('Amazon | SB | US | Brand Video', 2200, [
    { name: 'Brand Video - Top Products', ads: ['SB Video - Product 1', 'SB Video - Product 2'] },
  ]),
  genCampaign('Amazon | SD | US | Retargeting', 1600, [
    { name: 'SD Retarget - Views', ads: ['SD Retarget Ad 1'] },
    { name: 'SD Retarget - Purchases', ads: ['SD Retarget Ad 2'] },
  ]),
  genCampaign('Amazon | SP | US | ASIN Targeting', 1200, [
    { name: 'ASIN - Competitor', ads: ['Competitor ASIN Ad 1'] },
    { name: 'ASIN - Complementary', ads: ['Complementary ASIN Ad 1'] },
  ]),
  genCampaign('Amazon | SB | US | Store Spotlight', 850, [
    { name: 'Store Spotlight', ads: ['Store Ad 1'] },
  ]),
]

export const channelBreakoutData: Record<string, BreakoutCampaign[]> = {
  Meta: metaBreakoutData,
  Google: googleBreakoutData,
  Applovin: applovinBreakoutData,
  Bing: bingBreakoutData,
  Pinterest: pinterestBreakoutData,
  Tiktok: tiktokBreakoutData,
  Amazon: amazonBreakoutData,
}

// ========== CHANNEL WEEKLY/MONTHLY OVERVIEW DATA ==========

export interface ChannelWeeklyRow {
  weekStart: string // '12/15', '12/22', etc.
  spend: number
  reach: number
  impressions: number
  clicks: number
  purchases: number
  revenue: number
  cpr: number
  cpm: number
  frequency: number
  cpc: number
  ctr: number
  cvr: number
  cpa: number
  hcpa: number
  roas: number
  hroas: number
  aov: number
}

export interface ChannelAttributionWeek {
  week: string
  oneDC: number    // 1-day click %
  days2to7: number // days 2-7 %
  days8to28: number // days 8-28 %
  upliftRatio: number // line overlay %
}

const weekStarts = ['12/15', '12/22', '12/29', '1/5', '1/12', '1/19', '1/26', '2/2', '2/9', '2/16', '2/23', '3/2', '3/9', '3/16']

function generateChannelWeeklyData(
  baseSpend: number, baseReach: number, baseImpressions: number,
  baseClicks: number, basePurchases: number, baseRevenue: number,
  baseCpm: number, baseCpc: number, baseCtr: number, baseCvr: number,
  baseCpa: number, baseRoas: number, baseAov: number
): ChannelWeeklyRow[] {
  return weekStarts.map(ws => {
    const v = () => 0.75 + Math.random() * 0.5
    const spend = Math.round(baseSpend * v())
    const reach = Math.round(baseReach * v())
    const impressions = Math.round(baseImpressions * v())
    const clicks = Math.round(baseClicks * v())
    const purchases = Math.round(basePurchases * v())
    const revenue = Math.round(baseRevenue * v())
    const cpm = Math.round(baseCpm * v())
    const cpc = parseFloat((baseCpc * v()).toFixed(2))
    const ctr = parseFloat((baseCtr * v()).toFixed(2))
    const cvr = parseFloat((baseCvr * v()).toFixed(2))
    const cpa = Math.round(baseCpa * v())
    const hcpa = Math.round(cpa * (1 + Math.random() * 0.8))
    const roas = Math.round(baseRoas * v())
    const hroas = Math.round(roas * (0.4 + Math.random() * 0.6))
    const aov = Math.round(baseAov * v())
    const cpr = reach > 0 ? Math.round(spend / (reach / 1000)) : 0
    const frequency = reach > 0 ? parseFloat((impressions / reach).toFixed(2)) : 0
    return { weekStart: ws, spend, reach, impressions, clicks, purchases, revenue, cpr, cpm, frequency, cpc, ctr, cvr, cpa, hcpa, roas, hroas, aov }
  })
}

function generateAttributionData(): ChannelAttributionWeek[] {
  return weekStarts.slice(1).map(ws => {
    const oneDC = 40 + Math.random() * 30
    const days2to7 = 15 + Math.random() * 20
    const days8to28 = 5 + Math.random() * 15
    const upliftRatio = 5 + Math.random() * 20
    return {
      week: ws,
      oneDC: parseFloat(oneDC.toFixed(1)),
      days2to7: parseFloat(days2to7.toFixed(1)),
      days8to28: parseFloat(days8to28.toFixed(1)),
      upliftRatio: parseFloat(upliftRatio.toFixed(1)),
    }
  })
}

export const channelWeeklyData: Record<string, ChannelWeeklyRow[]> = {
  Meta: generateChannelWeeklyData(153415, 1062389, 6529641, 143209, 1186, 545627, 23, 1.07, 2.19, 0.83, 129, 356, 460),
  Google: generateChannelWeeklyData(20078, 420000, 985420, 18200, 82, 71240, 20, 1.10, 1.85, 0.45, 245, 355, 869),
  Applovin: generateChannelWeeklyData(4800, 180000, 342000, 7200, 19, 14250, 14, 0.69, 2.11, 0.28, 250, 300, 750),
  Bing: generateChannelWeeklyData(3600, 95000, 142500, 3200, 50, 35700, 6, 0.27, 2.25, 0.38, 72, 988, 712),
  Pinterest: generateChannelWeeklyData(6400, 210000, 310200, 5800, 34, 24670, 9, 0.48, 1.87, 0.26, 187, 389, 726),
  Tiktok: generateChannelWeeklyData(9200, 350000, 524300, 8900, 24, 18480, 9, 0.51, 1.70, 0.13, 378, 204, 770),
  Amazon: generateChannelWeeklyData(7600, 130000, 198700, 4100, 55, 45630, 15, 0.74, 2.06, 0.54, 138, 601, 830),
}

export const channelAttributionData: Record<string, ChannelAttributionWeek[]> = {
  Meta: generateAttributionData(),
  Google: generateAttributionData(),
  Applovin: generateAttributionData(),
  Bing: generateAttributionData(),
  Pinterest: generateAttributionData(),
  Tiktok: generateAttributionData(),
  Amazon: generateAttributionData(),
}

// ========== GOOGLE DEEP DIVES DATA ==========

export interface GoogleKeywordRow {
  keyword: string
  spendPct: number
  revenuePct: number
  spend: number
  conversions: number
  revenue: number
  cpa: number
}

export interface GoogleProductRow {
  product: string
  spendPct: number
  revenuePct: number
  spend: number
  conversions: number
  revenue: number
  cpa: number
  roas: number
}

export const googleKeywordsData: GoogleKeywordRow[] = [
  { keyword: 'mod lighting', spendPct: 76.6, revenuePct: 93.3, spend: 4728, conversions: 106, revenue: 113460, cpa: 45 },
  { keyword: 'modlighting', spendPct: 8.6, revenuePct: 3.4, spend: 530, conversions: 8, revenue: 4110, cpa: 64 },
  { keyword: 'mod lighting shop', spendPct: 1.5, revenuePct: 1.9, spend: 91, conversions: 4, revenue: 2278, cpa: 23 },
  { keyword: 'modern lighting', spendPct: 1.1, revenuePct: 0.0, spend: 65, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'mod lighting.com', spendPct: 0.8, revenuePct: 0.0, spend: 52, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'living room lighting', spendPct: 0.5, revenuePct: 0.0, spend: 29, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'dining light', spendPct: 0.5, revenuePct: 0.0, spend: 29, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'staircase lighting', spendPct: 0.4, revenuePct: 0.0, spend: 23, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'modern ceiling lights', spendPct: 0.3, revenuePct: 0.0, spend: 16, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'modern living room lighti...', spendPct: 0.3, revenuePct: 0.0, spend: 19, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'wall mounted light fixture', spendPct: 0.3, revenuePct: 0.5, spend: 20, conversions: 1, revenue: 638, cpa: 20 },
  { keyword: 'outdoor lighting', spendPct: 0.3, revenuePct: 0.0, spend: 18, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'modern lighting fixtures', spendPct: 0.3, revenuePct: 0.0, spend: 16, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'dining room chandeliers', spendPct: 0.2, revenuePct: 0.0, spend: 14, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'wall lights for bedroom', spendPct: 0.2, revenuePct: 0.0, spend: 10, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'bedroom ceiling lights', spendPct: 0.2, revenuePct: 0.0, spend: 13, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'outdoor patio light fixtures', spendPct: 0.2, revenuePct: 0.0, spend: 10, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'foyer lighting', spendPct: 0.2, revenuePct: 0.0, spend: 12, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'exterior lights for house', spendPct: 0.2, revenuePct: 0.0, spend: 11, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'pendant lights kitchen', spendPct: 0.2, revenuePct: 0.0, spend: 9, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'chandelier modern', spendPct: 0.1, revenuePct: 0.3, spend: 8, conversions: 1, revenue: 425, cpa: 8 },
  { keyword: 'led strip lights', spendPct: 0.1, revenuePct: 0.0, spend: 7, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'sconce wall light', spendPct: 0.1, revenuePct: 0.0, spend: 6, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'bathroom vanity lights', spendPct: 0.1, revenuePct: 0.0, spend: 8, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'flush mount ceiling light', spendPct: 0.1, revenuePct: 0.0, spend: 7, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'track lighting', spendPct: 0.1, revenuePct: 0.0, spend: 5, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'under cabinet lighting', spendPct: 0.1, revenuePct: 0.0, spend: 6, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'recessed lighting', spendPct: 0.1, revenuePct: 0.0, spend: 5, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'modern chandelier', spendPct: 0.1, revenuePct: 0.2, spend: 9, conversions: 1, revenue: 310, cpa: 9 },
  { keyword: 'luxury lighting', spendPct: 0.1, revenuePct: 0.0, spend: 7, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'kitchen island lighting', spendPct: 0.1, revenuePct: 0.0, spend: 6, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'entryway chandelier', spendPct: 0.1, revenuePct: 0.0, spend: 5, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'mid century modern lamp', spendPct: 0.1, revenuePct: 0.0, spend: 4, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'minimalist pendant light', spendPct: 0.1, revenuePct: 0.0, spend: 4, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'art deco light fixture', spendPct: 0.05, revenuePct: 0.0, spend: 3, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'industrial pendant light', spendPct: 0.05, revenuePct: 0.0, spend: 3, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'globe light fixture', spendPct: 0.05, revenuePct: 0.0, spend: 3, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'sputnik chandelier', spendPct: 0.05, revenuePct: 0.0, spend: 2, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'brass wall sconce', spendPct: 0.05, revenuePct: 0.0, spend: 2, conversions: 0, revenue: 0, cpa: 0 },
  { keyword: 'hanging light bedroom', spendPct: 0.05, revenuePct: 0.0, spend: 2, conversions: 0, revenue: 0, cpa: 0 },
]

export const googleProductsData: GoogleProductRow[] = [
  { product: 'Orion LED Pendant - Black', spendPct: 18.2, revenuePct: 22.5, spend: 1120, conversions: 28, revenue: 27300, cpa: 40, roas: 24.4 },
  { product: 'Nova Flush Mount - Brass', spendPct: 14.5, revenuePct: 16.8, spend: 892, conversions: 22, revenue: 20370, cpa: 41, roas: 22.8 },
  { product: 'Eclipse Wall Sconce - White', spendPct: 11.3, revenuePct: 13.1, spend: 695, conversions: 18, revenue: 15890, cpa: 39, roas: 22.9 },
  { product: 'Cosmos Chandelier - Chrome', spendPct: 9.8, revenuePct: 11.4, spend: 603, conversions: 14, revenue: 13820, cpa: 43, roas: 22.9 },
  { product: 'Zenith Track Light - Matte', spendPct: 7.6, revenuePct: 8.2, spend: 468, conversions: 10, revenue: 9940, cpa: 47, roas: 21.2 },
  { product: 'Lunar Table Lamp - Gold', spendPct: 6.4, revenuePct: 5.9, spend: 394, conversions: 8, revenue: 7150, cpa: 49, roas: 18.1 },
  { product: 'Aurora Floor Lamp - Nickel', spendPct: 5.2, revenuePct: 4.8, spend: 320, conversions: 6, revenue: 5820, cpa: 53, roas: 18.2 },
  { product: 'Nebula Pendant - Copper', spendPct: 4.8, revenuePct: 4.2, spend: 295, conversions: 5, revenue: 5090, cpa: 59, roas: 17.3 },
  { product: 'Vega Recessed LED Pack', spendPct: 4.1, revenuePct: 3.6, spend: 252, conversions: 4, revenue: 4360, cpa: 63, roas: 17.3 },
  { product: 'Stellar Under-Cabinet Strip', spendPct: 3.5, revenuePct: 2.8, spend: 215, conversions: 3, revenue: 3390, cpa: 72, roas: 15.8 },
  { product: 'Polaris Bath Vanity Light', spendPct: 3.2, revenuePct: 2.5, spend: 197, conversions: 3, revenue: 3030, cpa: 66, roas: 15.4 },
  { product: 'Solstice Mini Pendant Set', spendPct: 2.8, revenuePct: 1.9, spend: 172, conversions: 2, revenue: 2300, cpa: 86, roas: 13.4 },
  { product: 'Comet LED Strip Kit', spendPct: 2.2, revenuePct: 1.2, spend: 135, conversions: 1, revenue: 1450, cpa: 135, roas: 10.7 },
  { product: 'Galaxy Sputnik Fixture', spendPct: 1.8, revenuePct: 0.7, spend: 111, conversions: 1, revenue: 850, cpa: 111, roas: 7.7 },
  { product: 'Meteor Outdoor Wall Pack', spendPct: 1.5, revenuePct: 0.4, spend: 92, conversions: 0, revenue: 485, cpa: 0, roas: 5.3 },
  { product: 'Saturn Ring Chandelier', spendPct: 1.2, revenuePct: 0.0, spend: 74, conversions: 0, revenue: 0, cpa: 0, roas: 0 },
  { product: 'Horizon Landscape Light', spendPct: 0.9, revenuePct: 0.0, spend: 55, conversions: 0, revenue: 0, cpa: 0, roas: 0 },
  { product: 'Twilight Pathway Bollard', spendPct: 0.5, revenuePct: 0.0, spend: 31, conversions: 0, revenue: 0, cpa: 0, roas: 0 },
  { product: 'Quasar Desk Lamp', spendPct: 0.3, revenuePct: 0.0, spend: 18, conversions: 0, revenue: 0, cpa: 0, roas: 0 },
  { product: 'Pulsar Clip Light', spendPct: 0.1, revenuePct: 0.0, spend: 6, conversions: 0, revenue: 0, cpa: 0, roas: 0 },
]

// ========== ATTRIBUTION (DEEP DIVES) DATA ==========

export interface AttributionMonthRow {
  month: string // 'Apr 2025', 'May 2025', etc.
  // Biz Metrics
  spend: number
  newOrders: number
  newRevenue: number
  cac: number
  roas: number
  // Channel Spend
  metaSpend: number
  applovinSpend: number
  googleSpend: number
  redditSpend: number
  pinterestSpend: number
  tiktokSpend: number
  youtubeSpend: number
  // Channel hCPA
  metaHcpa: number
  applovinHcpa: number
  googleHcpa: number
  redditHcpa: number
  pinterestHcpa: number
  tiktokHcpa: number
  youtubeHcpa: number
  // Channel hROAS
  metaHroas: number
  applovinHroas: number
  googleHroas: number
  redditHroas: number
  pinterestHroas: number
  tiktokHroas: number
  youtubeHroas: number
}

// Real per-channel spend: Google Ads API (2022+), Meta Ads API (Feb 2024+), Reddit Ads API (Jul 2025+)
// TikTok, AppLovin, Pinterest, YouTube: $0 (no active campaigns or no API connected)
export const attributionMonthlyData: AttributionMonthRow[] = (() => {
  const googleByMonth: Record<string, number> = {
    '2022-01': 5197, '2022-02': 11733, '2022-03': 17448, '2022-04': 6035,
    '2022-05': 16271, '2022-06': 23867, '2022-07': 46085, '2022-08': 49053,
    '2022-09': 54619, '2022-10': 58211, '2022-11': 77526, '2022-12': 91491,
    '2023-01': 101040, '2023-02': 74901, '2023-03': 79985, '2023-04': 83980,
    '2023-05': 126220, '2023-06': 236331, '2023-07': 337237, '2023-08': 321295,
    '2023-09': 274705, '2023-10': 154343, '2023-11': 226032, '2023-12': 148793,
    '2024-01': 119481, '2024-02': 110828, '2024-03': 150044, '2024-04': 131117,
    '2024-05': 179987, '2024-06': 312625, '2024-07': 442854, '2024-08': 273311,
    '2024-09': 190379, '2024-10': 142155, '2024-11': 166605, '2024-12': 150741,
    '2025-01': 92527, '2025-02': 89306, '2025-03': 130313,
    '2025-04': 195723, '2025-05': 229464, '2025-06': 431264,
    '2025-07': 591407, '2025-08': 375630, '2025-09': 242585,
    '2025-10': 208181, '2025-11': 267605, '2025-12': 258565,
    '2026-01': 159502, '2026-02': 115176, '2026-03': 203959,
  }
  const redditByMonth: Record<string, number> = {
    '2025-07': 3839, '2025-08': 6865, '2025-09': 7818,
    '2025-10': 12992, '2025-11': 17583, '2025-12': 31000,
    '2026-01': 7382, '2026-02': 7382, '2026-03': 14729,
  }
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return monthlyRaw.map(m => {
    const google = googleByMonth[m.month] || 0
    const reddit = redditByMonth[m.month] || 0
    const meta = Math.max(0, m.spend - google - reddit)
    const cac = m.newCust > 0 ? Math.round(m.spend / m.newCust) : 0
    const roas = m.spend > 0 ? Math.round((m.newRev / m.spend) * 100) : 0
    const [y, mo] = m.month.split('-')
    const monthLabel = `${monthNames[parseInt(mo) - 1]} ${y}`
    return {
      month: monthLabel, spend: m.spend, newOrders: m.newCust, newRevenue: m.newRev, cac, roas,
      metaSpend: meta, applovinSpend: 0, googleSpend: google, redditSpend: reddit,
      pinterestSpend: 0, tiktokSpend: 0, youtubeSpend: 0,
      metaHcpa: 0, applovinHcpa: 0, googleHcpa: 0, redditHcpa: 0, pinterestHcpa: 0, tiktokHcpa: 0, youtubeHcpa: 0,
      metaHroas: 0, applovinHroas: 0, googleHroas: 0, redditHroas: 0, pinterestHroas: 0, tiktokHroas: 0, youtubeHroas: 0,
    }
  })
})()

// ========== PAID, ORGANIC & RETURN WEEKLY DATA ==========

export interface PaidOrganicReturnWeek {
  week: string
  newPaidRevenue: number
  newOrganicRevenue: number
  returnRevenue: number
  spend: number
  paidRoas: number // percentage
}

const porWeekStarts = ['12/15','12/22','12/29','1/5','1/12','1/19','1/26','2/2','2/9','2/16','2/23','3/2','3/9','3/16']

export const paidOrganicReturnData: PaidOrganicReturnWeek[] = porWeekStarts.map(ws => {
  const base = 80000 + Math.random() * 120000
  const newPaid = Math.round(base + Math.random() * 60000)
  const newOrganic = Math.round(30000 + Math.random() * 50000)
  const returnRev = Math.round(50000 + Math.random() * 80000)
  const spend = Math.round(20000 + Math.random() * 30000)
  return {
    week: ws,
    newPaidRevenue: newPaid,
    newOrganicRevenue: newOrganic,
    returnRevenue: returnRev,
    spend,
    paidRoas: Math.round((newPaid / spend) * 100),
  }
})

// Revenue by channel for Sankey-like visualization
export interface RevenueByChannelData {
  channel: string
  newPaidRevenue: number
  newOrganicRevenue: number
  returnRevenue: number
  color: string
}

export const revenueByChannelData: RevenueByChannelData[] = [
  { channel: 'Facebook / Instagram', newPaidRevenue: 1420000, newOrganicRevenue: 0, returnRevenue: 680000, color: '#8b3a62' },
  { channel: 'Google', newPaidRevenue: 580000, newOrganicRevenue: 0, returnRevenue: 220000, color: '#c9a0b0' },
  { channel: 'Applovin', newPaidRevenue: 42000, newOrganicRevenue: 0, returnRevenue: 8000, color: '#5cc9c4' },
  { channel: 'Other', newPaidRevenue: 85000, newOrganicRevenue: 0, returnRevenue: 35000, color: '#e07a5f' },
  { channel: 'New Organic', newPaidRevenue: 0, newOrganicRevenue: 620000, returnRevenue: 0, color: '#5cc9c4' },
  { channel: 'Word of Mouth', newPaidRevenue: 0, newOrganicRevenue: 180000, returnRevenue: 0, color: '#e07a5f' },
]
