// List of all 25 provinces with their unique ID
const provinces = [
  { id: 1, name: "ភ្នំពេញ" },
  { id: 2, name: "បាត់ដំបង" },
  { id: 3, name: "សៀមរាប" },
  { id: 4, name: "ព្រះសីហនុ" },
  { id: 5, name: "កំពង់ចាម" },
  { id: 6, name: "កំពង់ឆ្នាំង" },
  { id: 7, name: "កំពង់ស្ពឺ" },
  { id: 8, name: "កំពង់ធំ" },
  { id: 9, name: "កណ្តាល" },
  { id: 10, name: "កោះកុង" },
  { id: 11, name: "កែប" },
  { id: 12, name: "កំពត" },
  { id: 13, name: "ព្រះវិហារ" },
  { id: 14, name: "ពោធិ៍សាត់" },
  { id: 15, name: "ព្រៃវែង" },
  { id: 16, name: "រតនគីរី" },
  { id: 17, name: "ស្ទឹងត្រែង" },
  { id: 18, name: "ស្វាយរៀង" },
  { id: 19, name: "តាកែវ" },
  { id: 20, name: "ឧត្ដរមានជ័យ" },
  { id: 21, name: "ប៉ៃលិន" },
  { id: 22, name: "បន្ទាយមានជ័យ" },
  { id: 23, name: "មណ្ឌលគីរី" },
  { id: 24, name: "ក្រចេះ" },
  { id: 25, name: "ត្បូងឃ្មុំ" },
];

// List of districts linked by provinceId
const districts = [
  // Phnom Penh (id: 1)
  { id: 101, name: "ខណ្ឌ ដូនពេញ", provinceId: 1 },
  { id: 102, name: "ខណ្ឌ ចំការមន", provinceId: 1 },
  { id: 103, name: "ខណ្ឌ ៧ មករា", provinceId: 1 },
  { id: 104, name: "ខណ្ឌ ទួលគោក", provinceId: 1 },
  { id: 105, name: "ខណ្ឌ ដង្កោ", provinceId: 1 },
  { id: 106, name: "ខណ្ឌ មានជ័យ", provinceId: 1 },
  { id: 107, name: "ខណ្ឌ ពោធិ៍សែនជ័យ", provinceId: 1 },
  { id: 108, name: "ខណ្ឌ ឫស្សីកែវ", provinceId: 1 },
  { id: 109, name: "ខណ្ឌ សែនសុខ", provinceId: 1 },
  { id: 110, name: "ខណ្ឌ ព្រែកព្នៅ", provinceId: 1 },
  { id: 111, name: "ខណ្ឌ ជ្រោយចង្វារ", provinceId: 1 },
  { id: 112, name: "ខណ្ឌ ស្ទឹងមានជ័យ", provinceId: 1 },
  // Battambang (id: 2)
  { id: 201, name: "ស្រុក បាណន់", provinceId: 2 },
  { id: 202, name: "ស្រុក ថ្មពួក", provinceId: 2 },
  { id: 203, name: "ស្រុក បវេល", provinceId: 2 },
  { id: 204, name: "ស្រុក មោងឫស្សី", provinceId: 2 },
  { id: 205, name: "ក្រុង បាត់ដំបង", provinceId: 2 },
  { id: 206, name: "ស្រុក សំពៅលូន", provinceId: 2 },
  { id: 207, name: "ស្រុក ឯកភ្នំ", provinceId: 2 },
  { id: 208, name: "ស្រុក រតនមណ្ឌល", provinceId: 2 },
  { id: 209, name: "ស្រុក សង្កែ", provinceId: 2 },
  { id: 210, name: "ស្រុក កំរៀង", provinceId: 2 },
  { id: 211, name: "ស្រុក កោះក្រឡ", provinceId: 2 },
  { id: 212, name: "ស្រុក ភ្នំព្រឹក", provinceId: 2 },
  { id: 213, name: "ស្រុក សំពៅលូន", provinceId: 2 },
  { id: 214, name: "ស្រុក សុខសាន្ត", provinceId: 2 },
  // Siem Reap (id: 3)
  { id: 301, name: "ស្រុក អង្គរជុំ", provinceId: 3 },
  { id: 302, name: "ស្រុក អង្គរធំ", provinceId: 3 },
  { id: 303, name: "ស្រុក បន្ទាយស្រី", provinceId: 3 },
  { id: 304, name: "ក្រុង សៀមរាប", provinceId: 3 },
  { id: 305, name: "ស្រុក ជីក្រែង", provinceId: 3 },
  { id: 306, name: "ស្រុក ពួក", provinceId: 3 },
  { id: 307, name: "ស្រុក ក្រឡាញ់", provinceId: 3 },
  { id: 308, name: "ស្រុក ប្រាសាទបាគង", provinceId: 3 },
  { id: 309, name: "ស្រុក សូត្រនិគម", provinceId: 3 },
  { id: 310, name: "ស្រុក វ៉ារិន", provinceId: 3 },
  { id: 311, name: "ស្រុក ស្រីស្នំ", provinceId: 3 },
  { id: 312, name: "ស្រុក ស្វាយលើ", provinceId: 3 },
  // Preah Sihanouk (id: 4)
  { id: 401, name: "ក្រុង ព្រះសីហនុ", provinceId: 4 },
  { id: 402, name: "ស្រុក ព្រៃនប់", provinceId: 4 },
  { id: 403, name: "ស្រុក កំពង់សីលា", provinceId: 4 },
  { id: 404, name: "ស្រុក ស្ទឹងហាវ", provinceId: 4 },
  // Kampong Cham (id: 5)
  { id: 501, name: "ស្រុក បាធាយ", provinceId: 5 },
  { id: 502, name: "ស្រុក កងមាស", provinceId: 5 },
  { id: 503, name: "ស្រុក កោះសូទិន", provinceId: 5 },
  { id: 504, name: "ក្រុង កំពង់ចាម", provinceId: 5 },
  { id: 505, name: "ស្រុក ជើងព្រៃ", provinceId: 5 },
  { id: 506, name: "ស្រុក ស្រីសន្ធរ", provinceId: 5 },
  { id: 507, name: "ស្រុក កំពង់សៀម", provinceId: 5 },
  { id: 508, name: "ស្រុក អូរាំងឪ", provinceId: 5 },
  // Kampong Chhnang (id: 6)
  { id: 601, name: "ក្រុង កំពង់ឆ្នាំង", provinceId: 6 },
  { id: 602, name: "ស្រុក កំពង់លែង", provinceId: 6 },
  { id: 603, name: "ស្រុក ជលគិរី", provinceId: 6 },
  { id: 604, name: "ស្រុក រលាប្អៀរ", provinceId: 6 },
  { id: 605, name: "ស្រុក ទឹកផុស", provinceId: 6 },
  { id: 606, name: "ស្រុក បរិបូណ៌", provinceId: 6 },
  { id: 607, name: "ស្រុក កំពង់ត្រឡាច", provinceId: 6 },
  { id: 608, name: "ស្រុក សាមគ្គីមានជ័យ", provinceId: 6 },
  // Kampong Speu (id: 7)
  { id: 701, name: "ក្រុង ច្បារមន", provinceId: 7 },
  { id: 702, name: "ស្រុក បសេដ្ឋ", provinceId: 7 },
  { id: 703, name: "ស្រុក ឱរ៉ាល់", provinceId: 7 },
  { id: 704, name: "ស្រុក ថ្ពង", provinceId: 7 },
  { id: 705, name: "ស្រុក ភ្នំស្រួច", provinceId: 7 },
  { id: 706, name: "ស្រុក ឧត្តុង្គ", provinceId: 7 },
  { id: 707, name: "ស្រុក សាមគ្គីមុនីរម្យ", provinceId: 7 },
  { id: 708, name: "ស្រុក គងពិសី", provinceId: 7 },
  // Kampong Thom (id: 8)
  { id: 801, name: "ស្រុក បារាយណ៍", provinceId: 8 },
  { id: 802, name: "ស្រុក កំពង់ស្វាយ", provinceId: 8 },
  { id: 803, name: "ក្រុង ស្ទឹងសែន", provinceId: 8 },
  { id: 804, name: "ស្រុក សន្ទុក", provinceId: 8 },
  { id: 805, name: "ស្រុក ស្ទោង", provinceId: 8 },
  { id: 806, name: "ស្រុក ប្រាសាទសំបូរ", provinceId: 8 },
  { id: 807, name: "ស្រុក ប្រាសាទបល្ល័ង្ក", provinceId: 8 },
  { id: 808, name: "ស្រុក សណ្ដាន់", provinceId: 8 },
  // Kandal (id: 9)
  { id: 901, name: "ស្រុក កោះធំ", provinceId: 9 },
  { id: 902, name: "ស្រុក កណ្តាលស្ទឹង", provinceId: 9 },
  { id: 903, name: "ស្រុក កៀនស្វាយ", provinceId: 9 },
  { id: 904, name: "ស្រុក ស្អាង", provinceId: 9 },
  { id: 905, name: "ក្រុង តាខ្មៅ", provinceId: 9 },
  { id: 906, name: "ស្រុក អង្គស្នួល", provinceId: 9 },
  { id: 907, name: "ស្រុក ខ្សាច់កណ្ដាល", provinceId: 9 },
  { id: 908, name: "ស្រុក លើកដែក", provinceId: 9 },
  { id: 909, name: "ស្រុក ពញាឭ", provinceId: 9 },
  { id: 910, name: "ស្រុក ស្អាង", provinceId: 9 },
  { id: 911, name: "ស្រុក មុខកំពូល", provinceId: 9 },
  // Koh Kong (id: 10)
  { id: 1001, name: "ស្រុក កោះកុង", provinceId: 10 },
  { id: 1002, name: "ស្រុក ស្រែអំបិល", provinceId: 10 },
  { id: 1003, name: "ស្រុក កោះស្រឡៅ", provinceId: 10 },
  { id: 1004, name: "ក្រុង ខេមរភូមិន្ទ", provinceId: 10 },
  { id: 1005, name: "ស្រុក បូទុមសាគរ", provinceId: 10 },
  { id: 1006, name: "ស្រុក ថ្មបាំង", provinceId: 10 },
  // Kep (id: 11)
  { id: 1101, name: "ក្រុង កែប", provinceId: 11 },
  { id: 1102, name: "ស្រុក ដំណាក់ចង្អើរ", provinceId: 11 },
  // Kampot (id: 12)
  { id: 1201, name: "ក្រុង កំពត", provinceId: 12 },
  { id: 1202, name: "ស្រុក ដងទង់", provinceId: 12 },
  { id: 1203, name: "ស្រុក ទឹកឈូ", provinceId: 12 },
  { id: 1204, name: "ស្រុក ឈូក", provinceId: 12 },
  { id: 1205, name: "ស្រុក ជុំគិរី", provinceId: 12 },
  { id: 1206, name: "ស្រុក បន្ទាយមាស", provinceId: 12 },
  { id: 1207, name: "ស្រុក ឈូក", provinceId: 12 },
  // Preah Vihear (id: 13)
  { id: 1301, name: "ក្រុង ព្រះវិហារ", provinceId: 13 },
  { id: 1302, name: "ស្រុក ជ័យសែន", provinceId: 13 },
  { id: 1303, name: "ស្រុក ឆែប", provinceId: 13 },
  { id: 1304, name: "ស្រុក ជាំក្សាន្ត", provinceId: 13 },
  { id: 1305, name: "ស្រុក គូលែន", provinceId: 13 },
  { id: 1306, name: "ស្រុក រវៀង", provinceId: 13 },
  { id: 1307, name: "ស្រុក សង្គមថ្មី", provinceId: 13 },
  // Pursat (id: 14)
  { id: 1401, name: "ក្រុង ពោធិ៍សាត់", provinceId: 14 },
  { id: 1402, name: "ស្រុក បាកាន", provinceId: 14 },
  { id: 1403, name: "ស្រុក កណ្តៀង", provinceId: 14 },
  { id: 1404, name: "ស្រុក ក្រគរ", provinceId: 14 },
  { id: 1405, name: "ស្រុក វាលវែង", provinceId: 14 },
  { id: 1406, name: "ស្រុក ភ្នំក្រវាញ", provinceId: 14 },
  { id: 1407, name: "ស្រុក តាលោសែនជ័យ", provinceId: 14 },
  // Prey Veng (id: 15)
  { id: 1501, name: "ក្រុង ព្រៃវែង", provinceId: 15 },
  { id: 1502, name: "ស្រុក ពោធិ៍រៀង", provinceId: 15 },
  { id: 1503, name: "ស្រុក កំចាយមារ", provinceId: 15 },
  { id: 1504, name: "ស្រុក ពារាំង", provinceId: 15 },
  { id: 1505, name: "ស្រុក កំរៀង", provinceId: 15 },
  { id: 1506, name: "ស្រុក មេសាង", provinceId: 15 },
  { id: 1507, name: "ស្រុក ពាមរ", provinceId: 15 },
  { id: 1508, name: "ស្រុក ពាមជរ", provinceId: 15 },
  { id: 1509, name: "ស្រុក ព្រះស្តេច", provinceId: 15 },
  { id: 1510, name: "ស្រុក ស្វាយអន្ទរ", provinceId: 15 },
  { id: 1511, name: "ស្រុក កោះអណ្ដែត", provinceId: 15 },
  // Ratanakiri (id: 16)
  { id: 1601, name: "ក្រុង បានលុង", provinceId: 16 },
  { id: 1602, name: "ស្រុក អណ្ដូងមាស", provinceId: 16 },
  { id: 1603, name: "ស្រុក កូនមុំ", provinceId: 16 },
  { id: 1604, name: "ស្រុក អូរជុំ", provinceId: 16 },
  { id: 1605, name: "ស្រុក អូរយ៉ាដាវ", provinceId: 16 },
  { id: 1606, name: "ស្រុក លំផាត់", provinceId: 16 },
  { id: 1607, name: "ស្រុក វើនសៃ", provinceId: 16 },
  { id: 1608, name: "ស្រុក បក្សី", provinceId: 16 },
  { id: 1609, name: "ស្រុក តាវែង", provinceId: 16 },
  // Stung Treng (id: 17)
  { id: 1701, name: "ក្រុង ស្ទឹងត្រែង", provinceId: 17 },
  { id: 1702, name: "ស្រុក ស្ទឹងត្រែង", provinceId: 17 },
  { id: 1703, name: "ស្រុក សេសាន", provinceId: 17 },
  { id: 1704, name: "ស្រុក សៀមបូក", provinceId: 17 },
  { id: 1705, name: "ស្រុក បន្ទាយស្រី", provinceId: 17 },
  { id: 1706, name: "ស្រុក ថាឡាបរិវ៉ាត់", provinceId: 17 },
  // Svay Rieng (id: 18)
  { id: 1801, name: "ក្រុង ស្វាយរៀង", provinceId: 18 },
  { id: 1802, name: "ស្រុក ចន្ទ្រា", provinceId: 18 },
  { id: 1803, name: "ស្រុក ស្វាយជ្រុំ", provinceId: 18 },
  { id: 1804, name: "ស្រុក ស្វាយរៀង", provinceId: 18 },
  { id: 1805, name: "ស្រុក រំដួល", provinceId: 18 },
  { id: 1806, name: "ស្រុក កំពង់រោទិ៍", provinceId: 18 },
  { id: 1807, name: "ស្រុក រមាសហែក", provinceId: 18 },
  // Takeo (id: 19)
  { id: 1901, name: "ក្រុង ដូនកែវ", provinceId: 19 },
  { id: 1902, name: "ស្រុក បាទី", provinceId: 19 },
  { id: 1903, name: "ស្រុក ព្រៃកប្បាស", provinceId: 19 },
  { id: 1904, name: "ស្រុក សំរោង", provinceId: 19 },
  { id: 1905, name: "ស្រុក អង្គរបុរី", provinceId: 19 },
  { id: 1906, name: "ស្រុក គីរីវង់", provinceId: 19 },
  { id: 1907, name: "ស្រុក ត្រាំកក់", provinceId: 19 },
  { id: 1908, name: "ស្រុក បូរីជលសារ", provinceId: 19 },
  { id: 1909, name: "ស្រុក កោះអណ្ដែត", provinceId: 19 },
  // Oddar Meanchey (id: 20)
  { id: 2001, name: "ក្រុង សំរោង", provinceId: 20 },
  { id: 2002, name: "ស្រុក ត្រពាំងប្រាសាទ", provinceId: 20 },
  { id: 2003, name: "ស្រុក អន្លង់វែង", provinceId: 20 },
  { id: 2004, name: "ស្រុក ចុងកាល់", provinceId: 20 },
  { id: 2005, name: "ស្រុក បន្ទាយអំពិល", provinceId: 20 },
  // Pailin (id: 21)
  { id: 2101, name: "ក្រុង ប៉ៃលិន", provinceId: 21 },
  { id: 2102, name: "ស្រុក សាលាក្រៅ", provinceId: 21 },
  // Banteay Meanchey (id: 22)
  { id: 2201, name: "ក្រុង សិរីសោភ័ណ", provinceId: 22 },
  { id: 2202, name: "ស្រុក ម៉ាឡៃ", provinceId: 22 },
  { id: 2203, name: "ស្រុក មង្គលបូរី", provinceId: 22 },
  { id: 2204, name: "ស្រុក អូរជិញ្ជៀន", provinceId: 22 },
  { id: 2205, name: "ស្រុក ស្វាយចេក", provinceId: 22 },
  { id: 2206, name: "ស្រុក ភ្នំស្រុក", provinceId: 22 },
  { id: 2207, name: "ស្រុក ថ្មពួក", provinceId: 22 },
  { id: 2208, name: "ស្រុក បន្ទាយអំពិល", provinceId: 22 },
  { id: 2209, name: "ស្រុក ព្រះនេត្រព្រះ", provinceId: 22 },
  // Mondulkiri (id: 23)
  { id: 2301, name: "ស្រុក កែវសីមា", provinceId: 23 },
  { id: 2302, name: "ស្រុក កោះញែក", provinceId: 23 },
  { id: 2303, name: "ក្រុង សែនមនោរម្យ", provinceId: 23 },
  { id: 2304, name: "ស្រុក ពេជ្រាដា", provinceId: 23 },
  { id: 2305, name: "ស្រុក អូររាំង", provinceId: 23 },
  // Kratie (id: 24)
  { id: 2401, name: "ស្រុក ក្រចេះ", provinceId: 24 },
  { id: 2402, name: "ស្រុក ព្រែកប្រសព្វ", provinceId: 24 },
  { id: 2403, name: "ស្រុក សំបូរ", provinceId: 24 },
  { id: 2404, name: "ក្រុង ក្រចេះ", provinceId: 24 },
  { id: 2405, name: "ស្រុក ឆ្លូង", provinceId: 24 },
  { id: 2406, name: "ស្រុក សំបូរ", provinceId: 24 },
  { id: 2407, name: "ស្រុក ព្រែកប្រសព្វ", provinceId: 24 },
  // Tboung Khmum (id: 25)
  { id: 2501, name: "ស្រុក ត្បូងឃ្មុំ", provinceId: 25 },
  { id: 2502, name: "ស្រុក អូររាំងឪ", provinceId: 25 },
  { id: 2503, name: "ស្រុក ក្រូចឆ្មារ", provinceId: 25 },
  { id: 2504, name: "ស្រុក ដំបែ", provinceId: 25 },
  { id: 2505, name: "ស្រុក ពញាក្រែក", provinceId: 25 },
  { id: 2506, name: "ស្រុក មេមត់", provinceId: 25 },
  { id: 2507, name: "ស្រុក គងគង់", provinceId: 25 },
  { id: 2508, name: "ស្រុក ពញាក្រែក", provinceId: 25 },
];

// const provinceDistricts = [
//   {
//     province: "ភ្នំពេញ",
//     districts: [
//       "ខណ្ឌ ដូនពេញ", "ខណ្ឌ ចំការមន", "ខណ្ឌ ៧មករា", "ខណ្ឌ ទួលគោក",
//       "ខណ្ឌ ដង្កោ", "ខណ្ឌ មានជ័យ", "ខណ្ឌ ពោធិ៍សែនជ័យ",
//     ]
//   },
//   {
//     province: "បាត់ដំបង",
//     districts: [
//       "ស្រុក បាណន់", "ស្រុក ថ្មពួក", "ស្រុក បវេល", "ស្រុក មោងឫស្សី",
//       "ក្រុង បាត់ដំបង", "ស្រុក សំពៅលូន",
//     ]
//   },
//   {
//     province: "សៀមរាប",
//     districts: [
//       "ស្រុក អង្គរជុំ", "ស្រុក អង្គរធំ", "ស្រុក បន្ទាយស្រី", "ក្រុង សៀមរាប",
//       "ស្រុក ជីក្រែង", "ស្រុក ពួក",
//     ]
//   },
//   {
//     province: "ព្រះសីហនុ",
//     districts: [
//       "ក្រុង ព្រះសីហនុ", "ស្រុក ព្រៃនប់", "ស្រុក កំពង់សីលា", "ស្រុក ស្ទឹងហាវ",
//     ]
//   },
//   {
//     province: "កំពង់ចាម",
//     districts: [
//       "ស្រុក បាធាយ", "ស្រុក កងមាស", "ស្រុក កោះសូទិន", "ក្រុង កំពង់ចាម",
//     ]
//   },
//   {
//     province: "កំពង់ឆ្នាំង",
//     districts: [
//       "ក្រុង កំពង់ឆ្នាំង", "ស្រុក កំពង់លែង", "ស្រុក ជលគិរី", "ស្រុក រលាប្អៀរ",
//     ]
//   },
//   {
//     province: "កំពង់ស្ពឺ",
//     districts: [
//       "ក្រុង ច្បារមន", "ស្រុក បសេដ្ឋ", "ស្រុក ឱរ៉ាល់", "ស្រុក ថ្ពង",
//     ]
//   },
//   {
//     province: "កំពង់ធំ",
//     districts: [
//       "ស្រុក បារាយណ៍", "ស្រុក កំពង់ស្វាយ", "ក្រុង ស្ទឹងសែន", "ស្រុក សន្ទុក",
//     ]
//   },
//   {
//     province: "កណ្តាល",
//     districts: [
//       "ស្រុក កោះធំ", "ស្រុក កណ្តាលស្ទឹង", "ស្រុក កៀនស្វាយ", "ស្រុក ស្អាង", "ក្រុង តាខ្មៅ",
//     ]
//   },
//   {
//     province: "កោះកុង",
//     districts: [
//       "ស្រុក កោះកុង", "ស្រុក ស្រែអំបិល", "ស្រុក កោះស្រឡៅ", "ក្រុង ខេមរភូមិន្ទ",
//     ]
//   },
//   {
//     province: "កែប",
//     districts: [
//       "ក្រុង កែប", "ស្រុក ដំណាក់ចង្អើរ",
//     ]
//   },
//   {
//     province: "កំពត",
//     districts: [
//       "ក្រុង កំពត", "ស្រុក ដងទង់", "ស្រុក ទឹកឈូ", "ស្រុក ឈូក",
//     ]
//   },
//   {
//     province: "ព្រះវិហារ",
//     districts: [
//       "ក្រុង ព្រះវិហារ", "ស្រុក ជ័យសែន", "ស្រុក ឆែប", "ស្រុក ជាំក្សាន្ត",
//     ]
//   },
//   {
//     province: "ពោធិ៍សាត់",
//     districts: [
//       "ក្រុង ពោធិ៍សាត់", "ស្រុក បាកាន", "ស្រុក កណ្តៀង", "ស្រុក ក្រគរ",
//     ]
//   },
//   {
//     province: "ព្រៃវែង",
//     districts: [
//       "ក្រុង ព្រៃវែង", "ស្រុក ពោធិ៍រៀង", "ស្រុក កំចាយមារ", "ស្រុក ពារាំង",
//     ]
//   },
//   {
//     province: "រតនគីរី",
//     districts: [
//       "ក្រុង បានលុង", "ស្រុក អណ្ដូងមាស", "ស្រុក កូនមុំ", "ស្រុក អូរជុំ",
//     ]
//   },
//   {
//     province: "ស្ទឹងត្រែង",
//     districts: [
//       "ក្រុង ស្ទឹងត្រែង", "ស្រុក ស្ទឹងត្រែង", "ស្រុក សេសាន", "ស្រុក សៀមបូក",
//     ]
//   },
//   {
//     province: "ស្វាយរៀង",
//     districts: [
//       "ក្រុង ស្វាយរៀង", "ស្រុក ចន្ទ្រា", "ស្រុក ស្វាយជ្រុំ", "ស្រុក ស្វាយរៀង",
//     ]
//   },
//   {
//     province: "តាកែវ",
//     districts: [
//       "ក្រុង ដូនកែវ", "ស្រុក បាទី", "ស្រុក ព្រៃកប្បាស", "ស្រុក សំរោង",
//     ]
//   },
//   {
//     province: "ឧត្ដរមានជ័យ",
//     districts: [
//       "ក្រុង សំរោង", "ស្រុក ត្រពាំងប្រាសាទ", "ស្រុក អន្លង់វែង", "ស្រុក ចុងកាល់",
//     ]
//   },
//   {
//     province: "ប៉ៃលិន",
//     districts: [
//       "ក្រុង ប៉ៃលិន", "ស្រុក សាលាក្រៅ",
//     ]
//   },
//   {
//     province: "បន្ទាយមានជ័យ",
//     districts: [
//       "ក្រុង សិរីសោភ័ណ", "ស្រុក ម៉ាឡៃ", "ស្រុក មង្គលបូរី", "ស្រុក អូរជិញ្ជៀន",
//     ]
//   },
//   {
//     province: "មណ្ឌលគីរី",
//     districts: [
//       "ស្រុក កែវសីមា", "ស្រុក កោះញែក", "ក្រុង សែនមនោរម្យ", "ស្រុក ពេជ្រាដា",
//     ]
//   },
//   {
//     province: "ក្រចេះ",
//     districts: [
//       "ស្រុក ក្រចេះ", "ស្រុក ព្រែកប្រសព្វ", "ស្រុក សំបូរ", "ក្រុង ក្រចេះ",
//     ]
//   },
//   {
//     province: "ត្បូងឃ្មុំ",
//     districts: [
//       "ស្រុក ត្បូងឃ្មុំ", "ស្រុក អូររាំងឪ", "ស្រុក ក្រូចឆ្មារ", "ស្រុក ដំបែ",
//     ]
//   },
// ];