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

// List of communes/sangkats linked by districtId
const communes = [
  // Khn Daun Penh (id: 101)
  { id: 10101, name: "សង្កាត់ វត្តភ្នំ", districtId: 101 },
  { id: 10102, name: "សង្កាត់ ផ្សារកណ្ដាល១", districtId: 101 },
  { id: 10103, name: "សង្កាត់ ផ្សារកណ្ដាល២", districtId: 101 },
  { id: 10104, name: "សង្កាត់ ផ្សារថ្មី១", districtId: 101 },
  { id: 10105, name: "សង្កាត់ ផ្សារថ្មី២", districtId: 101 },
  { id: 10106, name: "សង្កាត់ ផ្សារថ្មី៣", districtId: 101 },
  { id: 10107, name: "សង្កាត់ ស្រះចក", districtId: 101 },
  { id: 10108, name: "សង្កាត់ បាងកក", districtId: 101 },
  { id: 10109, name: "សង្កាត់ ស្ទឹងមានជ័យ", districtId: 101 },
  { id: 10110, name: "សង្កាត់ បឹងកក់២", districtId: 101 },
  // Khn Chamkarmon (id: 102)
  { id: 10201, name: "សង្កាត់ ទន្លេបាសាក់", districtId: 102 },
  { id: 10202, name: "សង្កាត់ បឹងកេងកង១", districtId: 102 },
  { id: 10203, name: "សង្កាត់ បឹងកេងកង២", districtId: 102 },
  { id: 10204, name: "សង្កាត់ បឹងកេងកង៣", districtId: 102 },
  { id: 10205, name: "សង្កាត់ ផ្សារដើមថ្កូវ", districtId: 102 },
  { id: 10206, name: "សង្កាត់ ផ្សារដើមថ្កូវ", districtId: 102 },
  { id: 10207, name: "សង្កាត់ ទំនប់ទឹក", districtId: 102 },
  { id: 10208, name: "សង្កាត់ ស្វាយផ្ដៅ", districtId: 102 },
  // Khn 7 Makara (id: 103)
  { id: 10301, name: "សង្កាត់ វាំងចាស់", districtId: 103 },
  { id: 10302, name: "សង្កាត់ មេត្តាភាព", districtId: 103 },
  { id: 10303, name: "សង្កាត់ ផ្សារដេប៉ូ១", districtId: 103 },
  { id: 10304, name: "សង្កាត់ ផ្សារដេប៉ូ២", districtId: 103 },
  { id: 10305, name: "សង្កាត់ ផ្សារដេប៉ូ៣", districtId: 103 },
  { id: 10306, name: "សង្កាត់ ស្រះចក", districtId: 103 },
  { id: 10307, name: "សង្កាត់ ទឹកល្អក់១", districtId: 103 },
  // Khn Tuol Kouk (id: 104)
  { id: 10401, name: "សង្កាត់ ទឹកល្អក់១", districtId: 104 },
  { id: 10402, name: "សង្កាត់ ទឹកល្អក់២", districtId: 104 },
  { id: 10403, name: "សង្កាត់ ទឹកល្អក់៣", districtId: 104 },
  { id: 10404, name: "សង្កាត់ គីឡូម៉ែត្រលេខ៦", districtId: 104 },
  { id: 10405, name: "សង្កាត់ គីឡូម៉ែត្រលេខ៧", districtId: 104 },
  { id: 10406, name: "សង្កាត់ ភ្នំពេញថ្មី", districtId: 104 },
  { id: 10407, name: "សង្កាត់ ក្រាំងថ្កូវ", districtId: 104 },
  { id: 10408, name: "សង្កាត់ ក្រាំងដូង", districtId: 104 },
  // Khn Dangkao (id: 105)
  { id: 10501, name: "សង្កាត់ ដង្កោ", districtId: 105 },
  { id: 10502, name: "សង្កាត់ ព្រៃស", districtId: 105 },
  { id: 10503, name: "សង្កាត់ ព្រៃវែង", districtId: 105 },
  { id: 10504, name: "សង្កាត់ ជើងឯក", districtId: 105 },
  { id: 10505, name: "សង្កាត់ ពងទឹក", districtId: 105 },
  { id: 10506, name: "សង្កាត់ គងពិសី", districtId: 105 },
  { id: 10507, name: "សង្កាត់ សាក់សំរោង", districtId: 105 },
  // Khn Mean Chey (id: 106)
  { id: 10601, name: "សង្កាត់ ស្ទឹងមានជ័យ", districtId: 106 },
  { id: 10602, name: "សង្កាត់ ស្ទឹងមានជ័យ១", districtId: 106 },
  { id: 10603, name: "សង្កាត់ ស្ទឹងមានជ័យ២", districtId: 106 },
  { id: 10604, name: "សង្កាត់ ស្ទឹងមានជ័យ៣", districtId: 106 },
  // Khn Pou Senchey (id: 107)
  { id: 10701, name: "សង្កាត់ កាកាប", districtId: 107 },
  { id: 10702, name: "សង្កាត់ ចោមចៅ", districtId: 107 },
  { id: 10703, name: "សង្កាត់ ត្រពាំងក្រសាំង", districtId: 107 },
  { id: 10704, name: "សង្កាត់ ត្រពាំងក្រសាំង១", districtId: 107 },
  { id: 10705, name: "សង្កាត់ ត្រពាំងក្រសាំង២", districtId: 107 },
  // Khn Russey Keo (id: 108)
  { id: 10801, name: "សង្កាត់ ស្វាយប៉ាក", districtId: 108 },
  { id: 10802, name: "សង្កាត់ គីឡូម៉ែត្រលេខ៦", districtId: 108 },
  { id: 10803, name: "សង្កាត់ គីឡូម៉ែត្រលេខ៧", districtId: 108 },
  { id: 10804, name: "សង្កាត់ គីឡូម៉ែត្រលេខ៨", districtId: 108 },
  { id: 10805, name: "សង្កាត់ ព្រែកលៀប", districtId: 108 },
  // Khn Sen Sok (id: 109)
  { id: 10901, name: "សង្កាត់ ទឹកថ្លា", districtId: 109 },
  { id: 10902, name: "សង្កាត់ ភ្នំពេញថ្មី", districtId: 109 },
  { id: 10903, name: "សង្កាត់ ក្រាំងថ្កូវ", districtId: 109 },
  // Khn Prek Pnov (id: 110)
  { id: 11001, name: "សង្កាត់ ព្រែកព្នៅ", districtId: 110 },
  { id: 11002, name: "សង្កាត់ ពញាព្នៅ", districtId: 110 },
  // Khn Chroy Changvar (id: 111)
  { id: 11101, name: "សង្កាត់ ជ្រោយចង្វារ", districtId: 111 },
  { id: 11102, name: "សង្កាត់ ព្រែកលៀប", districtId: 111 },
  // Khn Steung Meanchey (id: 112)
  { id: 11201, name: "សង្កាត់ ស្ទឹងមានជ័យ", districtId: 112 },
  { id: 11202, name: "សង្កាត់ ស្ទឹងមានជ័យ១", districtId: 112 },
  // Srok Banan (id: 201)
  { id: 20101, name: "ឃុំ ជើងគោ", districtId: 201 },
  { id: 20102, name: "ឃុំ សំរោងក្នុង", districtId: 201 },
  { id: 20103, name: "ឃុំ គោកឃ្មុំ", districtId: 201 },
  { id: 20104, name: "ឃុំ បាណន់", districtId: 201 },
  { id: 20105, name: "ឃុំ ជីផុច", districtId: 201 },
  { id: 20106, name: "ឃុំ ព្រែកព្រះស្តេច", districtId: 201 },
  { id: 20107, name: "ឃុំ បន្ទាយមាស", districtId: 201 },
  { id: 20108, name: "ឃុំ ខ្នងភ្នំ", districtId: 201 },
  { id: 20109, name: "ឃុំ ភ្នំដី", districtId: 201 },
  // Srok Thma Puok (id: 202)
  { id: 20201, name: "ឃុំ ថ្មពួក", districtId: 202 },
  { id: 20202, name: "ឃុំ ភ្នំកូន", districtId: 202 },
  { id: 20203, name: "ឃុំ គោគ", districtId: 202 },
  // Srok Bavel (id: 203)
  { id: 20301, name: "ឃុំ បវេល", districtId: 203 },
  { id: 20302, name: "ឃុំ ល្វា", districtId: 203 },
  { id: 20303, name: "ឃុំ កន្ទឺ១", districtId: 203 },
  { id: 20304, name: "ឃុំ កន្ទឺ២", districtId: 203 },
  // Srok Moung Ruessei (id: 204)
  { id: 20401, name: "ឃុំ ឫស្សីក្រាំង", districtId: 204 },
  { id: 20402, name: "ឃុំ ឫស្សីសាញ់", districtId: 204 },
  { id: 20403, name: "ឃុំ សំរោងក្នុង", districtId: 204 },
  { id: 20404, name: "ឃុំ ព្រៃទទឹង", districtId: 204 },
  // Srok Battambang (id: 205)
  { id: 20501, name: "សង្កាត់ ស្វាយប៉ោ", districtId: 205 },
  { id: 20502, name: "សង្កាត់ កំពង់ព្រះ", districtId: 205 },
  { id: 20503, name: "សង្កាត់ ជ្រោយថ្ម", districtId: 205 },
  { id: 20504, name: "សង្កាត់ សំរោង", districtId: 205 },
  { id: 20505, name: "សង្កាត់ រាំង", districtId: 205 },
  // Srok Sampov Loun (id: 206)
  { id: 20601, name: "ឃុំ សំពៅលូន", districtId: 206 },
  { id: 20602, name: "ឃុំ ថ្មគោល", districtId: 206 },
  // Srok Ek Phnom (id: 207)
  { id: 20701, name: "ឃុំ ព្រែកទាល់", districtId: 207 },
  { id: 20702, name: "ឃុំ ព្រែកលៀប", districtId: 207 },
  { id: 20703, name: "ឃុំ ព្រែកទា", districtId: 207 },
  // Srok Rotanak Mondul (id: 208)
  { id: 20801, name: "ឃុំ រតនមណ្ឌល", districtId: 208 },
  { id: 20802, name: "ឃុំ ភ្នំល្ហុង", districtId: 208 },
  { id: 20803, name: "ឃុំ ភ្នំកូន", districtId: 208 },
  // Srok Sangkae (id: 209)
  { id: 20901, name: "ឃុំ សង្កែ", districtId: 209 },
  { id: 20902, name: "ឃុំ ព្រែកដំបង", districtId: 209 },
  { id: 20903, name: "ឃុំ ព្រែកដំបង១", districtId: 209 },
  // Srok Kamrieng (id: 210)
  { id: 21001, name: "ឃុំ កំរៀង", districtId: 210 },
  { id: 21002, name: "ឃុំ ថ្មដារ", districtId: 210 },
  { id: 21003, name: "ឃុំ អូររំដួល", districtId: 210 },
  // Srok Koas Krala (id: 211)
  { id: 21101, name: "ឃុំ ក្រឡា", districtId: 211 },
  { id: 21102, name: "ឃុំ តាគោក", districtId: 211 },
  { id: 21103, name: "ឃុំ តាជោ", districtId: 211 },
  // Srok Phnom Proek (id: 212)
  { id: 21201, name: "ឃុំ ភ្នំព្រឹក", districtId: 212 },
  { id: 21202, name: "ឃុំ ដីក្រហម", districtId: 212 },
  { id: 21203, name: "ឃុំ ដីក្រហម១", districtId: 212 },
  // Srok Sampov Loun (id: 213)
  { id: 21301, name: "ឃុំ សំពៅលូន", districtId: 213 },
  { id: 21302, name: "ឃុំ ថ្មគោល", districtId: 213 },
  // Srok Sok San (id: 214)
  { id: 21401, name: "ឃុំ សុខសាន្ត", districtId: 214 },
  { id: 21402, name: "ឃុំ ដីក្រហម", districtId: 214 },
  // Srok Angkor Chum (id: 301)
  { id: 30101, name: "ឃុំ អង្គរជុំ", districtId: 301 },
  { id: 30102, name: "ឃុំ កន្ទឺ១", districtId: 301 },
  { id: 30103, name: "ឃុំ កន្ទឺ២", districtId: 301 },
  // Srok Angkor Thom (id: 302)
  { id: 30201, name: "ឃុំ អង្គរធំ", districtId: 302 },
  { id: 30202, name: "ឃុំ គោកថ្កូវ", districtId: 302 },
  { id: 30203, name: "ឃុំ ភ្នំល្ហុង", districtId: 302 },
  // Srok Banteay Srei (id: 303)
  { id: 30301, name: "ឃុំ បន្ទាយស្រី", districtId: 303 },
  { id: 30302, name: "ឃុំ ខ្នងភ្នំ", districtId: 303 },
  { id: 30303, name: "ឃុំ ភ្នំល្ហុង", districtId: 303 },
  // Krong Siem Reap (id: 304)
  { id: 30401, name: "សង្កាត់ សៀមរាប", districtId: 304 },
  { id: 30402, name: "សង្កាត់ អង្គរធំ", districtId: 304 },
  { id: 30403, name: "សង្កាត់ គោកថ្កូវ", districtId: 304 },
  { id: 30404, name: "សង្កាត់ ភ្នំល្ហុង", districtId: 304 },
  // Srok Chi Kraeng (id: 305)
  { id: 30501, name: "ឃុំ ជីក្រែង", districtId: 305 },
  { id: 30502, name: "ឃុំ ល្វា", districtId: 305 },
  { id: 30503, name: "ឃុំ ត្បូង", districtId: 305 },
  // Srok Puok (id: 306)
  { id: 30601, name: "ឃុំ ពួក", districtId: 306 },
  { id: 30602, name: "ឃុំ ល្វា", districtId: 306 },
  { id: 30603, name: "ឃុំ ត្បូង", districtId: 306 },
  // Srok Kralanh (id: 307)
  { id: 30701, name: "ឃុំ ក្រឡាញ់", districtId: 307 },
  { id: 30702, name: "ឃុំ ព្រៃរលួស", districtId: 307 },
  // Srok Prasat Bakong (id: 308)
  { id: 30801, name: "ឃុំ ប្រាសាទបាគង", districtId: 308 },
  { id: 30802, name: "ឃុំ គោកត្រាច", districtId: 308 },
  // Srok Sout Nikom (id: 309)
  { id: 30901, name: "ឃុំ សូត្រនិគម", districtId: 309 },
  { id: 30902, name: "ឃុំ គោកត្រាច", districtId: 309 },
  // Srok Varin (id: 310)
  { id: 31001, name: "ឃុំ វ៉ារិន", districtId: 310 },
  { id: 31002, name: "ឃុំ តាត្រាវ", districtId: 310 },
  // Srok Srei Snam (id: 311)
  { id: 31101, name: "ឃុំ ស្រីស្នំ", districtId: 311 },
  { id: 31102, name: "ឃុំ តាត្រាវ", districtId: 311 },
  // Srok Svay Leu (id: 312)
  { id: 31201, name: "ឃុំ ស្វាយលើ", districtId: 312 },
  { id: 31202, name: "ឃុំ ឃុនរាម", districtId: 312 },
  // Krong Preah Sihanouk (id: 401)
  { id: 40101, name: "សង្កាត់ លេខ១", districtId: 401 },
  { id: 40102, name: "សង្កាត់ លេខ២", districtId: 401 },
  { id: 40103, name: "សង្កាត់ លេខ៣", districtId: 401 },
  { id: 40104, name: "សង្កាត់ លេខ៤", districtId: 401 },
  // Srok Prey Nob (id: 402)
  { id: 40201, name: "ឃុំ ព្រៃនប់", districtId: 402 },
  { id: 40202, name: "ឃុំ អណ្ដូងថ្ម", districtId: 402 },
  { id: 40203, name: "ឃុំ ជើងគោ", districtId: 402 },
  // Srok Kampong Seila (id: 403)
  { id: 40301, name: "ឃុំ កំពង់សីលា", districtId: 403 },
  { id: 40302, name: "ឃុំ សុវណ្ណជ័យ", districtId: 403 },
  // Srok Stueng Hav (id: 404)
  { id: 40401, name: "ឃុំ ស្ទឹងហាវ", districtId: 404 },
  { id: 40402, name: "ឃុំ អូរត្រេះ", districtId: 404 },
  // Srok Batheay (id: 501)
  { id: 50101, name: "ឃុំ បាធាយ", districtId: 501 },
  { id: 50102, name: "ឃុំ ជ្រោយថ្ម", districtId: 501 },
  { id: 50103, name: "ឃុំ តាអោង", districtId: 501 },
  // Srok Kang Meas (id: 502)
  { id: 50201, name: "ឃុំ កងមាស", districtId: 502 },
  { id: 50202, name: "ឃុំ ត្បូង", districtId: 502 },
  // Srok Koh Soutin (id: 503)
  { id: 50301, name: "ឃុំ កោះសូទិន", districtId: 503 },
  { id: 50302, name: "ឃុំ កោះ", districtId: 503 },
  // Krong Kampong Cham (id: 504)
  { id: 50401, name: "សង្កាត់ កំពង់ចាម", districtId: 504 },
  { id: 50402, name: "សង្កាត់ កំពង់ប្រាំ", districtId: 504 },
  { id: 50403, name: "សង្កាត់ ជម្ពូវ័ន្ត", districtId: 504 },
  // Srok Cheung Prey (id: 505)
  { id: 50501, name: "ឃុំ ជើងព្រៃ", districtId: 505 },
  { id: 50502, name: "ឃុំ ត្បូងឃ្មុំ", districtId: 505 },
  // Srok Srei Santhor (id: 506)
  { id: 50601, name: "ឃុំ ស្រីសន្ធរ", districtId: 506 },
  { id: 50602, name: "ឃុំ ព្រែកដំបង", districtId: 506 },
  // Srok Kampong Siem (id: 507)
  { id: 50701, name: "ឃុំ កំពង់សៀម", districtId: 507 },
  { id: 50702, name: "ឃុំ គគរ", districtId: 507 },
  { id: 50703, name: "ឃុំ កោះប៉ែន", districtId: 507 },
  // Srok Ou Reang Ov (id: 508)
  { id: 50801, name: "ឃុំ អូរាំងឪ", districtId: 508 },
  { id: 50802, name: "ឃុំ គគរ", districtId: 508 },
  // Krong Kampong Chhnang (id: 601)
  { id: 60101, name: "សង្កាត់ ក្រសាំង", districtId: 601 },
  { id: 60102, name: "សង្កាត់ ភ្នំក្រាំង", districtId: 601 },
  { id: 60103, name: "សង្កាត់ ពញា", districtId: 601 },
  { id: 60104, name: "សង្កាត់ ពញាក្រែង", districtId: 601 },
  // Srok Kampong Leng (id: 602)
  { id: 60201, name: "ឃុំ កំពង់លែង", districtId: 602 },
  { id: 60202, name: "ឃុំ ពាម", districtId: 602 },
  // Srok Chol Kiri (id: 603)
  { id: 60301, name: "ឃុំ ជលគិរី", districtId: 603 },
  { id: 60302, name: "ឃុំ ពាម", districtId: 603 },
  // Srok Rolang Bea (id: 604)
  { id: 60401, name: "ឃុំ រលាប្អៀរ", districtId: 604 },
  { id: 60402, name: "ឃុំ អណ្តូងស្នួល", districtId: 604 },
  { id: 60403, name: "ឃុំ ត្រពាំងក្រសាំង", districtId: 604 },
  // Srok Teuk Phos (id: 605)
  { id: 60501, name: "ឃុំ ទឹកផុស", districtId: 605 },
  { id: 60502, name: "ឃុំ ត្រពាំងក្រសាំង", districtId: 605 },
  // Srok Borey Bo (id: 606)
  { id: 60601, name: "ឃុំ បរិបូណ៌", districtId: 606 },
  { id: 60602, name: "ឃុំ អណ្តូងស្នួល", districtId: 606 },
  // Srok Kampong Tralach (id: 607)
  { id: 60701, name: "ឃុំ កំពង់ត្រឡាច", districtId: 607 },
  { id: 60702, name: "ឃុំ កំពង់ត្រឡាចក្រោម", districtId: 607 },
  // Srok Samaki Mean Chey (id: 608)
  { id: 60801, name: "ឃុំ សាមគ្គីមានជ័យ", districtId: 608 },
  { id: 60802, name: "ឃុំ ពញាឭ", districtId: 608 },
  // Krong Chbar Mon (id: 701)
  { id: 70101, name: "សង្កាត់ ច្បារមន", districtId: 701 },
  { id: 70102, name: "សង្កាត់ កោះស្រឡៅ", districtId: 701 },
  // Srok Baseat (id: 702)
  { id: 70201, name: "ឃុំ បសេដ្ឋ", districtId: 702 },
  { id: 70202, name: "ឃុំ ឫស្សីជ្រុំ", districtId: 702 },
  // Srok Oral (id: 703)
  { id: 70301, name: "ឃុំ ឱរ៉ាល់", districtId: 703 },
  { id: 70302, name: "ឃុំ ត្រែងត្រយឹង", districtId: 703 },
  // Srok Thpong (id: 704)
  { id: 70401, name: "ឃុំ ថ្ពង", districtId: 704 },
  { id: 70402, name: "ឃុំ ត្រែងត្រយឹង", districtId: 704 },
  // Srok Phnom Sruoch (id: 705)
  { id: 70501, name: "ឃុំ ភ្នំស្រួច", districtId: 705 },
  { id: 70502, name: "ឃុំ ត្រពាំងគង", districtId: 705 },
  // Srok Oudong (id: 706)
  { id: 70601, name: "ឃុំ ឧត្តុង្គ", districtId: 706 },
  { id: 70602, name: "ឃុំ វាំងចាស់", districtId: 706 },
  // Srok Samaki Monirom (id: 707)
  { id: 70701, name: "ឃុំ សាមគ្គីមុនីរម្យ", districtId: 707 },
  { id: 70702, name: "ឃុំ កន្ទឺ១", districtId: 707 },
  // Srok Kong Pisei (id: 708)
  { id: 70801, name: "ឃុំ គងពិសី", districtId: 708 },
  { id: 70802, name: "ឃុំ កំពង់ត្រឡាច", districtId: 708 },
  // Srok Baray (id: 801)
  { id: 80101, name: "ឃុំ បារាយណ៍", districtId: 801 },
  { id: 80102, name: "ឃុំ ស្នួល", districtId: 801 },
  { id: 80103, name: "ឃុំ ជ្រោយថ្ម", districtId: 801 },
  // Srok Kampong Svay (id: 802)
  { id: 80201, name: "ឃុំ កំពង់ស្វាយ", districtId: 802 },
  { id: 80202, name: "ឃុំ កំពង់", districtId: 802 },
  // Krong Steung Saen (id: 803)
  { id: 80301, name: "សង្កាត់ ស្ទឹងសែន", districtId: 803 },
  { id: 80302, name: "សង្កាត់ ព្រះសីហនុ", districtId: 803 },
  // Srok Santuk (id: 804)
  { id: 80401, name: "ឃុំ សន្ទុក", districtId: 804 },
  { id: 80402, name: "ឃុំ ស្ទោង", districtId: 804 },
  // Srok Stoung (id: 805)
  { id: 80501, name: "ឃុំ ស្ទោង", districtId: 805 },
  { id: 80502, name: "ឃុំ ប្រាសាទបល្ល័ង្ក", districtId: 805 },
  // Srok Prasat Sambour (id: 806)
  { id: 80601, name: "ឃុំ ប្រាសាទសំបូរ", districtId: 806 },
  { id: 80602, name: "ឃុំ សំរោង", districtId: 806 },
  // Srok Prasat Ballangk (id: 807)
  { id: 80701, name: "ឃុំ ប្រាសាទបល្ល័ង្ក", districtId: 807 },
  { id: 80702, name: "ឃុំ សំរោង", districtId: 807 },
  // Srok Sandan (id: 808)
  { id: 80801, name: "ឃុំ សណ្ដាន់", districtId: 808 },
  { id: 80802, name: "ឃុំ កំពង់ស្វាយ", districtId: 808 },
  // Srok Koh Thum (id: 901)
  { id: 90101, name: "ឃុំ កោះធំ", districtId: 901 },
  { id: 90102, name: "ឃុំ ព្រែកស្តី", districtId: 901 },
  // Srok Kandal Stueng (id: 902)
  { id: 90201, name: "ឃុំ កណ្តាលស្ទឹង", districtId: 902 },
  { id: 90202, name: "ឃុំ កៀនស្វាយ", districtId: 902 },
  // Srok Kien Svay (id: 903)
  { id: 90301, name: "ឃុំ កៀនស្វាយ", districtId: 903 },
  { id: 90302, name: "ឃុំ តាខ្មៅ", districtId: 903 },
  // Srok Sa'ang (id: 904)
  { id: 90401, name: "ឃុំ ស្អាង", districtId: 904 },
  { id: 90402, name: "ឃុំ ព្រែក", districtId: 904 },
  // Krong Ta Khmau (id: 905)
  { id: 90501, name: "សង្កាត់ តាខ្មៅ", districtId: 905 },
  { id: 90502, name: "សង្កាត់ កំពង់", districtId: 905 },
  // Srok Angk Snuol (id: 906)
  { id: 90601, name: "ឃុំ អង្គស្នួល", districtId: 906 },
  { id: 90602, name: "ឃុំ គគរ", districtId: 906 },
  // Srok Khsach Kandal (id: 907)
  { id: 90701, name: "ឃុំ ខ្សាច់កណ្ដាល", districtId: 907 },
  { id: 90702, name: "ឃុំ កោះ", districtId: 907 },
  // Srok Leuk Daek (id: 908)
  { id: 90801, name: "ឃុំ លើកដែក", districtId: 908 },
  { id: 90802, name: "ឃុំ ព្រែកអណ្ដូង", districtId: 908 },
  // Srok Ponhea Leu (id: 909)
  { id: 90901, name: "ឃុំ ពញាឭ", districtId: 909 },
  { id: 90902, name: "ឃុំ កោះអណ្ដែត", districtId: 909 },
  // Srok Sa'ang (id: 910)
  { id: 91001, name: "ឃុំ ស្អាង", districtId: 910 },
  { id: 91002, name: "ឃុំ កោះ", districtId: 910 },
  // Srok Mukh Kampoul (id: 911)
  { id: 91101, name: "ឃុំ មុខកំពូល", districtId: 911 },
  { id: 91102, name: "ឃុំ ព្រែកអណ្ដូង", districtId: 911 },
  // Srok Koh Kong (id: 1001)
  { id: 100101, name: "ឃុំ កោះកុង", districtId: 1001 },
  { id: 100102, name: "ឃុំ ថ្មបាំង", districtId: 1001 },
  // Srok Srae Ambel (id: 1002)
  { id: 100201, name: "ឃុំ ស្រែអំបិល", districtId: 1002 },
  { id: 100202, name: "ឃុំ ដីក្រហម", districtId: 1002 },
  // Srok Koh Sralao (id: 1003)
  { id: 100301, name: "ឃុំ កោះស្រឡៅ", districtId: 1003 },
  { id: 100302, name: "ឃុំ ស្រែ", districtId: 1003 },
  // Krong Khemarak Phoumin (id: 1004)
  { id: 100401, name: "សង្កាត់ ដងទង់", districtId: 1004 },
  { id: 100402, name: "សង្កាត់ ព្រែក", districtId: 1004 },
  // Srok Botum Sakor (id: 1005)
  { id: 100501, name: "ឃុំ បូទុមសាគរ", districtId: 1005 },
  { id: 100502, name: "ឃុំ ដីក្រហម", districtId: 1005 },
  // Srok Thma Bang (id: 1006)
  { id: 100601, name: "ឃុំ ថ្មបាំង", districtId: 1006 },
  { id: 100602, name: "ឃុំ ស្រែ", districtId: 1006 },
  // Krong Kaeb (id: 1101)
  { id: 110101, name: "សង្កាត់ កែប", districtId: 1101 },
  { id: 110102, name: "សង្កាត់ ព្រែក", districtId: 1101 },
  // Srok Damnak Changaeur (id: 1102)
  { id: 110201, name: "ឃុំ ដំណាក់ចង្អើរ", districtId: 1102 },
  { id: 110202, name: "ឃុំ ជើងឯក", districtId: 1102 },
  // Krong Kampot (id: 1201)
  { id: 120101, name: "សង្កាត់ កំពត", districtId: 1201 },
  { id: 120102, name: "សង្កាត់ កំពង់", districtId: 1201 },
  // Srok Dâng Tong (id: 1202)
  { id: 120201, name: "ឃុំ ដងទង់", districtId: 1202 },
  { id: 120202, name: "ឃុំ ព្រែក", districtId: 1202 },
  // Srok Tuek Chhou (id: 1203)
  { id: 120301, name: "ឃុំ ទឹកឈូ", districtId: 1203 },
  { id: 120302, name: "ឃុំ កំពង់ត្រឡាច", districtId: 1203 },
  // Srok Chhuk (id: 1204)
  { id: 120401, name: "ឃុំ ឈូក", districtId: 1204 },
  { id: 120402, name: "ឃុំ ជ្រោយថ្ម", districtId: 1204 },
  // Srok Chum Kiri (id: 1205)
  { id: 120501, name: "ឃុំ ជុំគិរី", districtId: 1205 },
  { id: 120502, name: "ឃុំ ព្រែក", districtId: 1205 },
  // Srok Banteay Meas (id: 1206)
  { id: 120601, name: "ឃុំ បន្ទាយមាស", districtId: 1206 },
  { id: 120602, name: "ឃុំ ព្រែក", districtId: 1206 },
  // Srok Chhuk (id: 1207)
  { id: 120701, name: "ឃុំ ឈូក", districtId: 1207 },
  { id: 120702, name: "ឃុំ កំពង់ត្រឡាច", districtId: 1207 },
  // Krong Preah Vihear (id: 1301)
  { id: 130101, name: "សង្កាត់ ព្រះវិហារ", districtId: 1301 },
  { id: 130102, name: "សង្កាត់ កោះ", districtId: 1301 },
  // Srok Chey Sen (id: 1302)
  { id: 130201, name: "ឃុំ ជ័យសែន", districtId: 1302 },
  { id: 130202, name: "ឃុំ ស្រុក", districtId: 1302 },
  // Srok Chheb (id: 1303)
  { id: 130301, name: "ឃុំ ឆែប", districtId: 1303 },
  { id: 130302, name: "ឃុំ កន្ទឺ១", districtId: 1303 },
  // Srok Cham Ksan (id: 1304)
  { id: 130401, name: "ឃុំ ជាំក្សាន្ត", districtId: 1304 },
  { id: 130402, name: "ឃុំ ស្រុក", districtId: 1304 },
  // Srok Koulen (id: 1305)
  { id: 130501, name: "ឃុំ គូលែន", districtId: 1305 },
  { id: 130502, name: "ឃុំ កន្ទឺ២", districtId: 1305 },
  // Srok Rovieng (id: 1306)
  { id: 130601, name: "ឃុំ រវៀង", districtId: 1306 },
  { id: 130602, name: "ឃុំ ស្រុក", districtId: 1306 },
  // Srok Sangkum Thmey (id: 1307)
  { id: 130701, name: "ឃុំ សង្គមថ្មី", districtId: 1307 },
  { id: 130702, name: "ឃុំ ស្រុក", districtId: 1307 },
  // Krong Pursat (id: 1401)
  { id: 140101, name: "សង្កាត់ ពោធិ៍សាត់", districtId: 1401 },
  { id: 140102, name: "សង្កាត់ កោះ", districtId: 1401 },
  // Srok Bakan (id: 1402)
  { id: 140201, name: "ឃុំ បាកាន", districtId: 1402 },
  { id: 140202, name: "ឃុំ ដីក្រហម", districtId: 1402 },
  // Srok Kandieng (id: 1403)
  { id: 140301, name: "ឃុំ កណ្តៀង", districtId: 1403 },
  { id: 140302, name: "ឃុំ ព្រែក", districtId: 1403 },
  // Srok Krakor (id: 1404)
  { id: 140401, name: "ឃុំ ក្រគរ", districtId: 1404 },
  { id: 140402, name: "ឃុំ ព្រែក", districtId: 1404 },
  // Srok Veal Veaeng (id: 1405)
  { id: 140501, name: "ឃុំ វាលវែង", districtId: 1405 },
  { id: 140502, name: "ឃុំ ព្រែក", districtId: 1405 },
  // Srok Phnom Kravanh (id: 1406)
  { id: 140601, name: "ឃុំ ភ្នំក្រវាញ", districtId: 1406 },
  { id: 140602, name: "ឃុំ ព្រែក", districtId: 1406 },
  // Srok Talo Sen Chey (id: 1407)
  { id: 140701, name: "ឃុំ តាលោសែនជ័យ", districtId: 1407 },
  { id: 140702, name: "ឃុំ ព្រែក", districtId: 1407 },
  // Krong Prey Veng (id: 1501)
  { id: 150101, name: "សង្កាត់ ព្រៃវែង", districtId: 1501 },
  { id: 150102, name: "សង្កាត់ ព្រែក", districtId: 1501 },
  // Srok Po Rieng (id: 1502)
  { id: 150201, name: "ឃុំ ពោធិ៍រៀង", districtId: 1502 },
  { id: 150202, name: "ឃុំ ព្រែក", districtId: 1502 },
  // Srok Kamchay Mear (id: 1503)
  { id: 150301, name: "ឃុំ កំចាយមារ", districtId: 1503 },
  { id: 150302, name: "ឃុំ កំពង់", districtId: 1503 },
  // Srok Peam Ro (id: 1507)
  { id: 150701, name: "ឃុំ ពាមរ", districtId: 1507 },
  { id: 150702, name: "ឃុំ ព្រែក", districtId: 1507 },
  // Srok Peam Chor (id: 1508)
  { id: 150801, name: "ឃុំ ពាមជរ", districtId: 1508 },
  { id: 150802, name: "ឃុំ ព្រែក", districtId: 1508 },
  // Srok Preah Sdach (id: 1509)
  { id: 150901, name: "ឃុំ ព្រះស្តេច", districtId: 1509 },
  { id: 150902, name: "ឃុំ ព្រែក", districtId: 1509 },
  // Srok Svay Antor (id: 1510)
  { id: 151001, name: "ឃុំ ស្វាយអន្ទរ", districtId: 1510 },
  { id: 151002, name: "ឃុំ ព្រែក", districtId: 1510 },
  // Srok Koh Andaet (id: 1511)
  { id: 151101, name: "ឃុំ កោះអណ្ដែត", districtId: 1511 },
  { id: 151102, name: "ឃុំ ព្រែក", districtId: 1511 },
  // Krong Banlung (id: 1601)
  { id: 160101, name: "សង្កាត់ បានលុង", districtId: 1601 },
  { id: 160102, name: "សង្កាត់ បាងកក", districtId: 1601 },
  // Srok Andong Meas (id: 1602)
  { id: 160201, name: "ឃុំ អណ្ដូងមាស", districtId: 1602 },
  { id: 160202, name: "ឃុំ គគរ", districtId: 1602 },
  // Srok Kon Mom (id: 1603)
  { id: 160301, name: "ឃុំ កូនមុំ", districtId: 1603 },
  { id: 160302, name: "ឃុំ ព្រែក", districtId: 1603 },
  // Srok Ou Chum (id: 1604)
  { id: 160401, name: "ឃុំ អូរជុំ", districtId: 1604 },
  { id: 160402, name: "ឃុំ គគរ", districtId: 1604 },
  // Srok Ou Ya Dav (id: 1605)
  { id: 160501, name: "ឃុំ អូរយ៉ាដាវ", districtId: 1605 },
  { id: 160502, name: "ឃុំ ព្រែក", districtId: 1605 },
  // Srok Lumphat (id: 1606)
  { id: 160601, name: "ឃុំ លំផាត់", districtId: 1606 },
  { id: 160602, name: "ឃុំ គគរ", districtId: 1606 },
  // Srok Veun Sai (id: 1607)
  { id: 160701, name: "ឃុំ វើនសៃ", districtId: 1607 },
  { id: 160702, name: "ឃុំ ព្រែក", districtId: 1607 },
  // Srok Paksi (id: 1608)
  { id: 160801, name: "ឃុំ បក្សី", districtId: 1608 },
  { id: 160802, name: "ឃុំ កោះ", districtId: 1608 },
  // Srok Ta Veaeng (id: 1609)
  { id: 160901, name: "ឃុំ តាវែង", districtId: 1609 },
  { id: 160902, name: "ឃុំ ព្រែក", districtId: 1609 },
  // Krong Stung Treng (id: 1701)
  { id: 170101, name: "សង្កាត់ ស្ទឹងត្រែង", districtId: 1701 },
  { id: 170102, name: "សង្កាត់ ព្រែក", districtId: 1701 },
  // Srok Stung Treng (id: 1702)
  { id: 170201, name: "ឃុំ ស្ទឹងត្រែង", districtId: 1702 },
  { id: 170202, name: "ឃុំ ព្រែក", districtId: 1702 },
  // Srok Sesan (id: 1703)
  { id: 170301, name: "ឃុំ សេសាន", districtId: 1703 },
  { id: 170302, name: "ឃុំ ព្រែក", districtId: 1703 },
  // Srok Siem Bok (id: 1704)
  { id: 170401, name: "ឃុំ សៀមបូក", districtId: 1704 },
  { id: 170402, name: "ឃុំ ព្រែក", districtId: 1704 },
  // Srok Banteay Srei (id: 1705)
  { id: 170501, name: "ឃុំ បន្ទាយស្រី", districtId: 1705 },
  { id: 170502, name: "ឃុំ ព្រែក", districtId: 1705 },
  // Srok Thalaborivatt (id: 1706)
  { id: 170601, name: "ឃុំ ថាឡាបរិវ៉ាត់", districtId: 1706 },
  { id: 170602, name: "ឃុំ ព្រែក", districtId: 1706 },
  // Krong Svay Rieng (id: 1801)
  { id: 180101, name: "សង្កាត់ ស្វាយរៀង", districtId: 1801 },
  { id: 180102, name: "សង្កាត់ ព្រែក", districtId: 1801 },
  // Srok Chantrea (id: 1802)
  { id: 180201, name: "ឃុំ ចន្ទ្រា", districtId: 1802 },
  { id: 180202, name: "ឃុំ ព្រែក", districtId: 1802 },
  // Srok Svay Chrum (id: 1803)
  { id: 180301, name: "ឃុំ ស្វាយជ្រុំ", districtId: 1803 },
  { id: 180302, name: "ឃុំ ព្រែក", districtId: 1803 },
  // Srok Svay Rieng (id: 1804)
  { id: 180401, name: "ឃុំ ស្វាយរៀង", districtId: 1804 },
  { id: 180402, name: "ឃុំ ព្រែក", districtId: 1804 },
  // Srok Romduol (id: 1805)
  { id: 180501, name: "ឃុំ រំដួល", districtId: 1805 },
  { id: 180502, name: "ឃុំ ព្រែក", districtId: 1805 },
  // Srok Kampong Roateh (id: 1806)
  { id: 180601, name: "ឃុំ កំពង់រោទិ៍", districtId: 1806 },
  { id: 180602, name: "ឃុំ ព្រែក", districtId: 1806 },
  // Srok Romeas Haek (id: 1807)
  { id: 180701, name: "ឃុំ រមាសហែក", districtId: 1807 },
  { id: 180702, name: "ឃុំ ព្រែក", districtId: 1807 },
  // Krong Daun Kaev (id: 1901)
  { id: 190101, name: "សង្កាត់ ដូនកែវ", districtId: 1901 },
  { id: 190102, name: "សង្កាត់ ព្រែក", districtId: 1901 },
  // Srok Bati (id: 1902)
  { id: 190201, name: "ឃុំ បាទី", districtId: 1902 },
  { id: 190202, name: "ឃុំ ព្រែក", districtId: 1902 },
  // Srok Preah Kb (id: 1903)
  { id: 190301, name: "ឃុំ ព្រៃកប្បាស", districtId: 1903 },
  { id: 190302, name: "ឃុំ ព្រែក", districtId: 1903 },
  // Srok Samraong (id: 1904)
  { id: 190401, name: "ឃុំ សំរោង", districtId: 1904 },
  { id: 190402, name: "ឃុំ ព្រែក", districtId: 1904 },
  // Srok Angkor Borei (id: 1905)
  { id: 190501, name: "ឃុំ អង្គរបុរី", districtId: 1905 },
  { id: 190502, name: "ឃុំ ព្រែក", districtId: 1905 },
  // Srok Kiri Vong (id: 1906)
  { id: 190601, name: "ឃុំ គីរីវង់", districtId: 1906 },
  { id: 190602, name: "ឃុំ ព្រែក", districtId: 1906 },
  // Srok Tram Kak (id: 1907)
  { id: 190701, name: "ឃុំ ត្រាំកក់", districtId: 1907 },
  { id: 190702, name: "ឃុំ ព្រែក", districtId: 1907 },
  // Srok Borey Cholasa (id: 1908)
  { id: 190801, name: "ឃុំ បូរីជលសារ", districtId: 1908 },
  { id: 190802, name: "ឃុំ ព្រែក", districtId: 1908 },
  // Srok Koh Andaet (id: 1909)
  { id: 190901, name: "ឃុំ កោះអណ្ដែត", districtId: 1909 },
  { id: 190902, name: "ឃុំ ព្រែក", districtId: 1909 },
  // Krong Samraong (id: 2001)
  { id: 200101, name: "សង្កាត់ សំរោង", districtId: 2001 },
  { id: 200102, name: "សង្កាត់ ព្រែក", districtId: 2001 },
  // Srok Trapeang Prasat (id: 2002)
  { id: 200201, name: "ឃុំ ត្រពាំងប្រាសាទ", districtId: 2002 },
  { id: 200202, name: "ឃុំ ព្រែក", districtId: 2002 },
  // Srok Anlong Veaeng (id: 2003)
  { id: 200301, name: "ឃុំ អន្លង់វែង", districtId: 2003 },
  { id: 200302, name: "ឃុំ ព្រែក", districtId: 2003 },
  // Srok Chong Kal (id: 2004)
  { id: 200401, name: "ឃុំ ចុងកាល់", districtId: 2004 },
  { id: 200402, name: "ឃុំ ព្រែក", districtId: 2004 },
  // Srok Banteay Ampil (id: 2005)
  { id: 200501, name: "ឃុំ បន្ទាយអំពិល", districtId: 2005 },
  { id: 200502, name: "ឃុំ ព្រែក", districtId: 2005 },
  // Krong Pailin (id: 2101)
  { id: 210101, name: "សង្កាត់ ប៉ៃលិន", districtId: 2101 },
  { id: 210102, name: "សង្កាត់ ព្រែក", districtId: 2101 },
  // Srok Sala Krau (id: 2102)
  { id: 210201, name: "ឃុំ សាលាក្រៅ", districtId: 2102 },
  { id: 210202, name: "ឃុំ ព្រែក", districtId: 2102 },
  // Krong Serei Saophoan (id: 2201)
  { id: 220101, name: "សង្កាត់ សិរីសោភ័ណ", districtId: 2201 },
  { id: 220102, name: "សង្កាត់ ព្រែក", districtId: 2201 },
  // Srok Malai (id: 2202)
  { id: 220201, name: "ឃុំ ម៉ាឡៃ", districtId: 2202 },
  { id: 220202, name: "ឃុំ ព្រែក", districtId: 2202 },
  // Srok Mongkol Borey (id: 2203)
  { id: 220301, name: "ឃុំ មង្គលបូរី", districtId: 2203 },
  { id: 220302, name: "ឃុំ ព្រែក", districtId: 2203 },
  // Srok Ou Chrov (id: 2204)
  { id: 220401, name: "ឃុំ អូរជិញ្ជៀន", districtId: 2204 },
  { id: 220402, name: "ឃុំ ព្រែក", districtId: 2204 },
  // Srok Svay Chek (id: 2205)
  { id: 220501, name: "ឃុំ ស្វាយចេក", districtId: 2205 },
  { id: 220502, name: "ឃុំ ព្រែក", districtId: 2205 },
  // Srok Phnom Srok (id: 2206)
  { id: 220601, name: "ឃុំ ភ្នំស្រុក", districtId: 2206 },
  { id: 220602, name: "ឃុំ ព្រែក", districtId: 2206 },
  // Srok Thma Puok (id: 2207)
  { id: 220701, name: "ឃុំ ថ្មពួក", districtId: 2207 },
  { id: 220702, name: "ឃុំ ព្រែក", districtId: 2207 },
  // Srok Banteay Ampil (id: 2208)
  { id: 220801, name: "ឃុំ បន្ទាយអំពិល", districtId: 2208 },
  { id: 220802, name: "ឃុំ ព្រែក", districtId: 2208 },
  // Srok Preah Netr Preah (id: 2209)
  { id: 220901, name: "ឃុំ ព្រះនេត្រព្រះ", districtId: 2209 },
  { id: 220902, name: "ឃុំ ព្រែក", districtId: 2209 },
  // Srok Kaev Seima (id: 2301)
  { id: 230101, name: "ឃុំ កែវសីមា", districtId: 2301 },
  { id: 230102, name: "ឃុំ ព្រែក", districtId: 2301 },
  // Srok Koh Nheaek (id: 2302)
  { id: 230201, name: "ឃុំ កោះញែក", districtId: 2302 },
  { id: 230202, name: "ឃុំ ព្រែក", districtId: 2302 },
  // Krong Saen Monourom (id: 2303)
  { id: 230301, name: "សង្កាត់ សែនមនោរម្យ", districtId: 2303 },
  { id: 230302, name: "សង្កាត់ ព្រែក", districtId: 2303 },
  // Srok Pechreada (id: 2304)
  { id: 230401, name: "ឃុំ ពេជ្រាដា", districtId: 2304 },
  { id: 230402, name: "ឃុំ ព្រែក", districtId: 2304 },
  // Srok Ou Reang (id: 2305)
  { id: 230501, name: "ឃុំ អូររាំង", districtId: 2305 },
  { id: 230502, name: "ឃុំ ព្រែក", districtId: 2305 },
  // Srok Kratié (id: 2401)
  { id: 240101, name: "ឃុំ ក្រចេះ", districtId: 2401 },
  { id: 240102, name: "ឃុំ ព្រែក", districtId: 2401 },
  // Srok Prek Prasab (id: 2402)
  { id: 240201, name: "ឃុំ ព្រែកប្រសព្វ", districtId: 2402 },
  { id: 240202, name: "ឃុំ ព្រែក", districtId: 2402 },
  // Srok Sambour (id: 2403)
  { id: 240301, name: "ឃុំ សំបូរ", districtId: 2403 },
  { id: 240302, name: "ឃុំ ព្រែក", districtId: 2403 },
  // Krong Kratié (id: 2404)
  { id: 240401, name: "សង្កាត់ ក្រចេះ", districtId: 2404 },
  { id: 240402, name: "សង្កាត់ ព្រែក", districtId: 2404 },
  // Srok Chhlong (id: 2405)
  { id: 240501, name: "ឃុំ ឆ្លូង", districtId: 2405 },
  { id: 240502, name: "ឃុំ ព្រែក", districtId: 2405 },
  // Srok Sambour (id: 2406)
  { id: 240601, name: "ឃុំ សំបូរ", districtId: 2406 },
  { id: 240602, name: "ឃុំ ព្រែក", districtId: 2406 },
  // Srok Prek Prasab (id: 2407)
  { id: 240701, name: "ឃុំ ព្រែកប្រសព្វ", districtId: 2407 },
  { id: 240702, name: "ឃុំ ព្រែក", districtId: 2407 },
  // Srok Tboung Khmum (id: 2501)
  { id: 250101, name: "ឃុំ ត្បូងឃ្មុំ", districtId: 2501 },
  { id: 250102, name: "ឃុំ ព្រែក", districtId: 2501 },
  // Srok Ou Reang Ov (id: 2502)
  { id: 250201, name: "ឃុំ អូររាំងឪ", districtId: 2502 },
  { id: 250202, name: "ឃុំ ព្រែក", districtId: 2502 },
  // Srok Krouch Chhmar (id: 2503)
  { id: 250301, name: "ឃុំ ក្រូចឆ្មារ", districtId: 2503 },
  { id: 250302, name: "ឃុំ ព្រែក", districtId: 2503 },
  // Srok Dambae (id: 2504)
  { id: 250401, name: "ឃុំ ដំបែ", districtId: 2504 },
  { id: 250402, name: "ឃុំ ព្រែក", districtId: 2504 },
  // Srok Ponhea Kraek (id: 2505)
  { id: 250501, name: "ឃុំ ពញាក្រែក", districtId: 2505 },
  { id: 250502, name: "ឃុំ ព្រែក", districtId: 2505 },
  // Srok Memot (id: 2506)
  { id: 250601, name: "ឃុំ មេមត់", districtId: 2506 },
  { id: 250602, name: "ឃុំ ព្រែក", districtId: 2506 },
  // Srok Kong Kong (id: 2507)
  { id: 250701, name: "ឃុំ គងគង់", districtId: 2507 },
  { id: 250702, name: "ឃុំ ព្រែក", districtId: 2507 },
  // Srok Ponhea Kraek (id: 2508)
  { id: 250801, name: "ឃុំ ពញាក្រែក", districtId: 2508 },
  { id: 250802, name: "ឃុំ ព្រែក", districtId: 2508 },
];