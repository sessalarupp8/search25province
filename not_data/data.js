// List of all 25 provinces with their unique ID
const provinces = [
  // Updated Phnom Penh to include 'រាជធានី'
  { id: 1, name: "រាជធានីភ្នំពេញ" },
  
  // Remaining provinces
  { id: 2, name: "ខេត្តបាត់ដំបង" },
  { id: 3, name: "ខេត្តសៀមរាប" },
  { id: 4, name: "ខេត្តព្រះសីហនុ" },
  { id: 5, name: "ខេត្តកំពង់ចាម" },
  { id: 6, name: "ខេត្តកំពង់ឆ្នាំង" },
  { id: 7, name: "ខេត្តកំពង់ស្ពឺ" },
  { id: 8, name: "ខេត្តកំពង់ធំ" },
  { id: 9, name: "ខេត្តកណ្តាល" },
  { id: 10, name: "ខេត្តកោះកុង" },
  // Kep is often listed as a Municipality (ក្រុង) or its own province
  { id: 11, name: "ខេត្តកែប" }, 
  { id: 12, name: "ខេត្តកំពត" },
  { id: 13, name: "ខេត្តព្រះវិហារ" },
  { id: 14, name: "ខេត្តពោធិ៍សាត់" },
  { id: 15, name: "ខេត្តព្រៃវែង" },
  { id: 16, name: "ខេត្តរតនគីរី" },
  { id: 17, name: "ខេត្តស្ទឹងត្រែង" },
  { id: 18, name: "ខេត្តស្វាយរៀង" },
  { id: 19, name: "ខេត្តតាកែវ" },
  { id: 20, name: "ខេត្តឧត្ដរមានជ័យ" },
  // Pailin is often listed as a Municipality (ក្រុង) or its own province
  { id: 21, name: "ខេត្តប៉ៃលិន" }, 
  { id: 22, name: "ខេត្តបន្ទាយមានជ័យ" },
  { id: 23, name: "ខេត្តមណ្ឌលគីរី" },
  { id: 24, name: "ខេត្តក្រចេះ" },
  { id: 25, name: "ខេត្តត្បូងឃ្មុំ" },
];

// List of districts linked by provinceId
const districts = [
  // Phnom Penh (id: 1)
  { id: 101, name: "ខណ្ឌដូនពេញ", provinceId: 1 },
  { id: 102, name: "ខណ្ឌចំការមន", provinceId: 1 },
  { id: 103, name: "ខណ្ឌ៧មករា", provinceId: 1 },
  { id: 104, name: "ខណ្ឌទួលគោក", provinceId: 1 },
  { id: 105, name: "ខណ្ឌដង្កោ", provinceId: 1 },
  { id: 106, name: "ខណ្ឌមានជ័យ", provinceId: 1 },
  { id: 107, name: "ខណ្ឌពោធិ៍សែនជ័យ", provinceId: 1 },
  { id: 108, name: "ខណ្ឌឫស្សីកែវ", provinceId: 1 },
  { id: 109, name: "ខណ្ឌសែនសុខ", provinceId: 1 },
  { id: 110, name: "ខណ្ឌព្រែកព្នៅ", provinceId: 1 },
  { id: 111, name: "ខណ្ឌជ្រោយចង្វារ", provinceId: 1 },
  { id: 112, name: "ខណ្ឌស្ទឹងមានជ័យ", provinceId: 1 },
  // Battambang (id: 2)
  { id: 201, name: "ស្រុកបាណន់", provinceId: 2 },
  { id: 202, name: "ស្រុកថ្មពួក", provinceId: 2 },
  { id: 203, name: "ស្រុកបវេល", provinceId: 2 },
  { id: 204, name: "ស្រុកមោងឫស្សី", provinceId: 2 },
  { id: 205, name: "ក្រុងបាត់ដំបង", provinceId: 2 },
  { id: 206, name: "ស្រុកសំពៅលូន", provinceId: 2 },
  { id: 207, name: "ស្រុកឯកភ្នំ", provinceId: 2 },
  { id: 208, name: "ស្រុករតនមណ្ឌល", provinceId: 2 },
  { id: 209, name: "ស្រុកសង្កែ", provinceId: 2 },
  { id: 210, name: "ស្រុកកំរៀង", provinceId: 2 },
  { id: 211, name: "ស្រុកកោះក្រឡា", provinceId: 2 },
  { id: 212, name: "ស្រុកភ្នំព្រឹក", provinceId: 2 },
  { id: 213, name: "ស្រុកសំពៅលូន", provinceId: 2 },
  { id: 214, name: "ស្រុកសុខសាន្ត", provinceId: 2 },
  // Siem Reap (id: 3)
  { id: 301, name: "ស្រុកអង្គរជុំ", provinceId: 3 },
  { id: 302, name: "ស្រុកអង្គរធំ", provinceId: 3 },
  { id: 303, name: "ស្រុកបន្ទាយស្រី", provinceId: 3 },
  { id: 304, name: "ក្រុងសៀមរាប", provinceId: 3 },
  { id: 305, name: "ស្រុកជីក្រែង", provinceId: 3 },
  { id: 306, name: "ស្រុកពួក", provinceId: 3 },
  { id: 307, name: "ស្រុកក្រឡាញ់", provinceId: 3 },
  { id: 308, name: "ស្រុកប្រាសាទបាគង", provinceId: 3 },
  { id: 309, name: "ស្រុកសូត្រនិគម", provinceId: 3 },
  { id: 310, name: "ស្រុកវ៉ារិន", provinceId: 3 },
  { id: 311, name: "ស្រុកស្រីស្នំ", provinceId: 3 },
  { id: 312, name: "ស្រុកស្វាយលើ", provinceId: 3 },
  // Preah Sihanouk (id: 4)
  { id: 401, name: "ក្រុងព្រះសីហនុ", provinceId: 4 },
  { id: 402, name: "ស្រុកព្រៃនប់", provinceId: 4 },
  { id: 403, name: "ស្រុកកំពង់សីលា", provinceId: 4 },
  { id: 404, name: "ស្រុកស្ទឹងហាវ", provinceId: 4 },
  // Kampong Cham (id: 5)
  { id: 501, name: "ស្រុកបាធាយ", provinceId: 5 },
  { id: 502, name: "ស្រុកកងមាស", provinceId: 5 },
  { id: 503, name: "ស្រុកកោះសូទិន", provinceId: 5 },
  { id: 504, name: "ក្រុងកំពង់ចាម", provinceId: 5 },
  { id: 505, name: "ស្រុកជើងព្រៃ", provinceId: 5 },
  { id: 506, name: "ស្រុកស្រីសន្ធរ", provinceId: 5 },
  { id: 507, name: "ស្រុកកំពង់សៀម", provinceId: 5 },
  { id: 508, name: "ស្រុកអូរាំងឪ", provinceId: 5 },
  // Kampong Chhnang (id: 6)
  { id: 601, name: "ក្រុងកំពង់ឆ្នាំង", provinceId: 6 },
  { id: 602, name: "ស្រុកកំពង់លែង", provinceId: 6 },
  { id: 603, name: "ស្រុកជលគិរី", provinceId: 6 },
  { id: 604, name: "ស្រុករលាប្អៀរ", provinceId: 6 },
  { id: 605, name: "ស្រុកទឹកផុស", provinceId: 6 },
  { id: 606, name: "ស្រុកបរិបូណ៌", provinceId: 6 },
  { id: 607, name: "ស្រុកកំពង់ត្រឡាច", provinceId: 6 },
  { id: 608, name: "ស្រុកសាមគ្គីមានជ័យ", provinceId: 6 },
  // Kampong Speu (id: 7)
  { id: 701, name: "ក្រុងច្បារមន", provinceId: 7 },
  { id: 702, name: "ស្រុកបសេដ្ឋ", provinceId: 7 },
  { id: 703, name: "ស្រុកឱរ៉ាល់", provinceId: 7 },
  { id: 704, name: "ស្រុកថ្ពង", provinceId: 7 },
  { id: 705, name: "ស្រុកភ្នំស្រួច", provinceId: 7 },
  { id: 706, name: "ស្រុកឧត្តុង្គ", provinceId: 7 },
  { id: 707, name: "ស្រុកសាមគ្គីមុនីរម្យ", provinceId: 7 },
  { id: 708, name: "ស្រុកគងពិសី", provinceId: 7 },
  // Kampong Thom (id: 8)
  { id: 801, name: "ស្រុកបារាយណ៍", provinceId: 8 },
  { id: 802, name: "ស្រុកកំពង់ស្វាយ", provinceId: 8 },
  { id: 803, name: "ក្រុងស្ទឹងសែន", provinceId: 8 },
  { id: 804, name: "ស្រុកសន្ទុក", provinceId: 8 },
  { id: 805, name: "ស្រុកស្ទោង", provinceId: 8 },
  { id: 806, name: "ស្រុកប្រាសាទសំបូរ", provinceId: 8 },
  { id: 807, name: "ស្រុកប្រាសាទបល្ល័ង្ក", provinceId: 8 },
  { id: 808, name: "ស្រុកសណ្ដាន់", provinceId: 8 },
  // Kandal (id: 9)
  { id: 901, name: "ស្រុកកោះធំ", provinceId: 9 },
  { id: 902, name: "ស្រុកកណ្តាលស្ទឹង", provinceId: 9 },
  { id: 903, name: "ស្រុកកៀនស្វាយ", provinceId: 9 },
  { id: 904, name: "ស្រុកស្អាង", provinceId: 9 },
  { id: 905, name: "ក្រុងតាខ្មៅ", provinceId: 9 },
  { id: 906, name: "ស្រុកអង្គស្នួល", provinceId: 9 },
  { id: 907, name: "ស្រុកខ្សាច់កណ្ដាល", provinceId: 9 },
  { id: 908, name: "ស្រុកលើកដែក", provinceId: 9 },
  { id: 909, name: "ស្រុកពញាឭ", provinceId: 9 },
  { id: 910, name: "ស្រុកស្អាង", provinceId: 9 },
  { id: 911, name: "ស្រុកមុខកំពូល", provinceId: 9 },
  // Koh Kong (id: 10)
  { id: 1001, name: "ស្រុកកោះកុង", provinceId: 10 },
  { id: 1002, name: "ស្រុកស្រែអំបិល", provinceId: 10 },
  { id: 1003, name: "ស្រុកកោះស្រឡៅ", provinceId: 10 },
  { id: 1004, name: "ក្រុងខេមរភូមិន្ទ", provinceId: 10 },
  { id: 1005, name: "ស្រុកបូទុមសាគរ", provinceId: 10 },
  { id: 1006, name: "ស្រុកថ្មបាំង", provinceId: 10 },
  // Kep (id: 11)
  { id: 1101, name: "ក្រុងកែប", provinceId: 11 },
  { id: 1102, name: "ស្រុកដំណាក់ចង្អើរ", provinceId: 11 },
  // Kampot (id: 12)
  { id: 1201, name: "ក្រុងកំពត", provinceId: 12 },
  { id: 1202, name: "ស្រុកដងទង់", provinceId: 12 },
  { id: 1203, name: "ស្រុកទឹកឈូ", provinceId: 12 },
  { id: 1204, name: "ស្រុកឈូក", provinceId: 12 },
  { id: 1205, name: "ស្រុកជុំគិរី", provinceId: 12 },
  { id: 1206, name: "ស្រុកបន្ទាយមាស", provinceId: 12 },
  { id: 1207, name: "ស្រុកឈូក", provinceId: 12 },
  // Preah Vihear (id: 13)
  { id: 1301, name: "ក្រុងព្រះវិហារ", provinceId: 13 },
  { id: 1302, name: "ស្រុកជ័យសែន", provinceId: 13 },
  { id: 1303, name: "ស្រុកឆែប", provinceId: 13 },
  { id: 1304, name: "ស្រុកជាំក្សាន្ត", provinceId: 13 },
  { id: 1305, name: "ស្រុកគូលែន", provinceId: 13 },
  { id: 1306, name: "ស្រុករវៀង", provinceId: 13 },
  { id: 1307, name: "ស្រុកសង្គមថ្មី", provinceId: 13 },
  // Pursat (id: 14)
  { id: 1401, name: "ក្រុងពោធិ៍សាត់", provinceId: 14 },
  { id: 1402, name: "ស្រុកបាកាន", provinceId: 14 },
  { id: 1403, name: "ស្រុកកណ្តៀង", provinceId: 14 },
  { id: 1404, name: "ស្រុកក្រគរ", provinceId: 14 },
  { id: 1405, name: "ស្រុកវាលវែង", provinceId: 14 },
  { id: 1406, name: "ស្រុកភ្នំក្រវាញ", provinceId: 14 },
  { id: 1407, name: "ស្រុកតាលោសែនជ័យ", provinceId: 14 },
  // Prey Veng (id: 15)
  { id: 1501, name: "ក្រុងព្រៃវែង", provinceId: 15 },
  { id: 1502, name: "ស្រុកពោធិ៍រៀង", provinceId: 15 },
  { id: 1503, name: "ស្រុកកំចាយមារ", provinceId: 15 },
  { id: 1504, name: "ស្រុកពារាំង", provinceId: 15 },
  { id: 1505, name: "ស្រុកកំរៀង", provinceId: 15 },
  { id: 1506, name: "ស្រុកមេសាង", provinceId: 15 },
  { id: 1507, name: "ស្រុកពាមរ", provinceId: 15 },
  { id: 1508, name: "ស្រុកពាមជរ", provinceId: 15 },
  { id: 1509, name: "ស្រុកព្រះស្តេច", provinceId: 15 },
  { id: 1510, name: "ស្រុកស្វាយអន្ទរ", provinceId: 15 },
  { id: 1511, name: "ស្រុកកោះអណ្ដែត", provinceId: 15 },
  // Ratanakiri (id: 16)
  { id: 1601, name: "ក្រុងបានលុង", provinceId: 16 },
  { id: 1602, name: "ស្រុកអណ្ដូងមាស", provinceId: 16 },
  { id: 1603, name: "ស្រុកកូនមុំ", provinceId: 16 },
  { id: 1604, name: "ស្រុកអូរជុំ", provinceId: 16 },
  { id: 1605, name: "ស្រុកអូរយ៉ាដាវ", provinceId: 16 },
  { id: 1606, name: "ស្រុកលំផាត់", provinceId: 16 },
  { id: 1607, name: "ស្រុកវើនសៃ", provinceId: 16 },
  { id: 1608, name: "ស្រុកបក្សី", provinceId: 16 },
  { id: 1609, name: "ស្រុកតាវែង", provinceId: 16 },
  // Stung Treng (id: 17)
  { id: 1701, name: "ក្រុងស្ទឹងត្រែង", provinceId: 17 },
  { id: 1702, name: "ស្រុកស្ទឹងត្រែង", provinceId: 17 },
  { id: 1703, name: "ស្រុកសេសាន", provinceId: 17 },
  { id: 1704, name: "ស្រុកសៀមបូក", provinceId: 17 },
  { id: 1705, name: "ស្រុកបន្ទាយស្រី", provinceId: 17 },
  { id: 1706, name: "ស្រុកថាឡាបរិវ៉ាត់", provinceId: 17 },
  // Svay Rieng (id: 18)
  { id: 1801, name: "ក្រុងស្វាយរៀង", provinceId: 18 },
  { id: 1802, name: "ស្រុកចន្ទ្រា", provinceId: 18 },
  { id: 1803, name: "ស្រុកស្វាយជ្រុំ", provinceId: 18 },
  { id: 1804, name: "ស្រុកស្វាយរៀង", provinceId: 18 },
  { id: 1805, name: "ស្រុករំដួល", provinceId: 18 },
  { id: 1806, name: "ស្រុកកំពង់រោទិ៍", provinceId: 18 },
  { id: 1807, name: "ស្រុករមាសហែក", provinceId: 18 },
  // Takeo (id: 19)
  { id: 1901, name: "ក្រុងដូនកែវ", provinceId: 19 },
  { id: 1902, name: "ស្រុកបាទី", provinceId: 19 },
  { id: 1903, name: "ស្រុកព្រៃកប្បាស", provinceId: 19 },
  { id: 1904, name: "ស្រុកសំរោង", provinceId: 19 },
  { id: 1905, name: "ស្រុកអង្គរបុរី", provinceId: 19 },
  { id: 1906, name: "ស្រុកគីរីវង់", provinceId: 19 },
  { id: 1907, name: "ស្រុកត្រាំកក់", provinceId: 19 },
  { id: 1908, name: "ស្រុកបូរីជលសារ", provinceId: 19 },
  { id: 1909, name: "ស្រុកកោះអណ្ដែត", provinceId: 19 },
  // Oddar Meanchey (id: 20)
  { id: 2001, name: "ក្រុងសំរោង", provinceId: 20 },
  { id: 2002, name: "ស្រុកត្រពាំងប្រាសាទ", provinceId: 20 },
  { id: 2003, name: "ស្រុកអន្លង់វែង", provinceId: 20 },
  { id: 2004, name: "ស្រុកចុងកាល់", provinceId: 20 },
  { id: 2005, name: "ស្រុកបន្ទាយអំពិល", provinceId: 20 },
  // Pailin (id: 21)
  { id: 2101, name: "ក្រុងប៉ៃលិន", provinceId: 21 },
  { id: 2102, name: "ស្រុកសាលាក្រៅ", provinceId: 21 },
  // Banteay Meanchey (id: 22)
  { id: 2201, name: "ក្រុងសិរីសោភ័ណ", provinceId: 22 },
  { id: 2202, name: "ស្រុកម៉ាឡៃ", provinceId: 22 },
  { id: 2203, name: "ស្រុកមង្គលបូរី", provinceId: 22 },
  { id: 2204, name: "ស្រុកអូរជិញ្ជៀន", provinceId: 22 },
  { id: 2205, name: "ស្រុកស្វាយចេក", provinceId: 22 },
  { id: 2206, name: "ស្រុកភ្នំស្រុក", provinceId: 22 },
  { id: 2207, name: "ស្រុកថ្មពួក", provinceId: 22 },
  { id: 2208, name: "ស្រុកបន្ទាយអំពិល", provinceId: 22 },
  { id: 2209, name: "ស្រុកព្រះនេត្រព្រះ", provinceId: 22 },
  // Mondulkiri (id: 23)
  { id: 2301, name: "ស្រុកកែវសីមា", provinceId: 23 },
  { id: 2302, name: "ស្រុកកោះញែក", provinceId: 23 },
  { id: 2303, name: "ក្រុងសែនមនោរម្យ", provinceId: 23 },
  { id: 2304, name: "ស្រុកពេជ្រាដា", provinceId: 23 },
  { id: 2305, name: "ស្រុកអូររាំង", provinceId: 23 },
  // Kratie (id: 24)
  { id: 2401, name: "ស្រុកក្រចេះ", provinceId: 24 },
  { id: 2402, name: "ស្រុកព្រែកប្រសព្វ", provinceId: 24 },
  { id: 2403, name: "ស្រុកសំបូរ", provinceId: 24 },
  { id: 2404, name: "ក្រុងក្រចេះ", provinceId: 24 },
  { id: 2405, name: "ស្រុកឆ្លូង", provinceId: 24 },
  { id: 2406, name: "ស្រុកសំបូរ", provinceId: 24 },
  { id: 2407, name: "ស្រុកព្រែកប្រសព្វ", provinceId: 24 },
  // Tboung Khmum (id: 25)
  { id: 2501, name: "ស្រុកត្បូងឃ្មុំ", provinceId: 25 },
  { id: 2502, name: "ស្រុកអូររាំងឪ", provinceId: 25 },
  { id: 2503, name: "ស្រុកក្រូចឆ្មារ", provinceId: 25 },
  { id: 2504, name: "ស្រុកដំបែ", provinceId: 25 },
  { id: 2505, name: "ស្រុកពញាក្រែក", provinceId: 25 },
  { id: 2506, name: "ស្រុកមេមត់", provinceId: 25 },
  { id: 2507, name: "ស្រុកគងគង់", provinceId: 25 },
  { id: 2508, name: "ស្រុកពញាក្រែក", provinceId: 25 },
];

// List of communes/sangkats linked by districtId
const communes = [
  // Khn Daun Penh (id: 101)
  { id: 10101, name: "សង្កាត់វត្តភ្នំ", districtId: 101 },
  { id: 10102, name: "សង្កាត់ផ្សារកណ្ដាល១", districtId: 101 },
  { id: 10103, name: "សង្កាត់ផ្សារកណ្ដាល២", districtId: 101 },
  { id: 10104, name: "សង្កាត់ផ្សារថ្មី១", districtId: 101 },
  { id: 10105, name: "សង្កាត់ផ្សារថ្មី២", districtId: 101 },
  { id: 10106, name: "សង្កាត់ផ្សារថ្មី៣", districtId: 101 },
  { id: 10107, name: "សង្កាត់ស្រះចក", districtId: 101 },
  { id: 10108, name: "សង្កាត់បាងកក", districtId: 101 },
  { id: 10109, name: "សង្កាត់ស្ទឹងមានជ័យ", districtId: 101 },
  { id: 10110, name: "សង្កាត់បឹងកក់២", districtId: 101 },
  // Khn Chamkarmon (id: 102)
  { id: 10201, name: "សង្កាត់ទន្លេបាសាក់", districtId: 102 },
  { id: 10202, name: "សង្កាត់បឹងកេងកង១", districtId: 102 },
  { id: 10203, name: "សង្កាត់បឹងកេងកង២", districtId: 102 },
  { id: 10204, name: "សង្កាត់បឹងកេងកង៣", districtId: 102 },
  { id: 10205, name: "សង្កាត់ផ្សារដើមថ្កូវ", districtId: 102 },
  { id: 10206, name: "សង្កាត់ផ្សារដើមថ្កូវ", districtId: 102 },
  { id: 10207, name: "សង្កាត់ទំនប់ទឹក", districtId: 102 },
  { id: 10208, name: "សង្កាត់ស្វាយផ្ដៅ", districtId: 102 },
  // Khn 7 Makara (id: 103)
  { id: 10301, name: "សង្កាត់វាំងចាស់", districtId: 103 },
  { id: 10302, name: "សង្កាត់មេត្តាភាព", districtId: 103 },
  { id: 10303, name: "សង្កាត់ផ្សារដេប៉ូ១", districtId: 103 },
  { id: 10304, name: "សង្កាត់ផ្សារដេប៉ូ២", districtId: 103 },
  { id: 10305, name: "សង្កាត់ផ្សារដេប៉ូ៣", districtId: 103 },
  { id: 10306, name: "សង្កាត់ស្រះចក", districtId: 103 },
  { id: 10307, name: "សង្កាត់ទឹកល្អក់១", districtId: 103 },
  // Khn Tuol Kouk (id: 104)
  { id: 10401, name: "សង្កាត់ទឹកល្អក់១", districtId: 104 },
  { id: 10402, name: "សង្កាត់ទឹកល្អក់២", districtId: 104 },
  { id: 10403, name: "សង្កាត់ទឹកល្អក់៣", districtId: 104 },
  { id: 10404, name: "សង្កាត់គីឡូម៉ែត្រលេខ៦", districtId: 104 },
  { id: 10405, name: "សង្កាត់គីឡូម៉ែត្រលេខ៧", districtId: 104 },
  { id: 10406, name: "សង្កាត់ភ្នំពេញថ្មី", districtId: 104 },
  { id: 10407, name: "សង្កាត់ក្រាំងថ្កូវ", districtId: 104 },
  { id: 10408, name: "សង្កាត់ក្រាំងដូង", districtId: 104 },
  // Khn Dangkao (id: 105)
  { id: 10501, name: "សង្កាត់ដង្កោ", districtId: 105 },
  { id: 10502, name: "សង្កាត់ព្រៃស", districtId: 105 },
  { id: 10503, name: "សង្កាត់ព្រៃវែង", districtId: 105 },
  { id: 10504, name: "សង្កាត់ជើងឯក", districtId: 105 },
  { id: 10505, name: "សង្កាត់ពងទឹក", districtId: 105 },
  { id: 10506, name: "សង្កាត់គងពិសី", districtId: 105 },
  { id: 10507, name: "សង្កាត់សាក់សំរោង", districtId: 105 },
  // Khn Mean Chey (id: 106)
  { id: 10601, name: "សង្កាត់ស្ទឹងមានជ័យ", districtId: 106 },
  { id: 10602, name: "សង្កាត់ស្ទឹងមានជ័យ១", districtId: 106 },
  { id: 10603, name: "សង្កាត់ស្ទឹងមានជ័យ២", districtId: 106 },
  { id: 10604, name: "សង្កាត់ស្ទឹងមានជ័យ៣", districtId: 106 },
  // Khn Pou Senchey (id: 107)
  { id: 10701, name: "សង្កាត់កាកាប", districtId: 107 },
  { id: 10702, name: "សង្កាត់ចោមចៅ", districtId: 107 },
  { id: 10703, name: "សង្កាត់ត្រពាំងក្រសាំង", districtId: 107 },
  { id: 10704, name: "សង្កាត់ត្រពាំងក្រសាំង១", districtId: 107 },
  { id: 10705, name: "សង្កាត់ត្រពាំងក្រសាំង២", districtId: 107 },
  // Khn Russey Keo (id: 108)
  { id: 10801, name: "សង្កាត់ស្វាយប៉ាក", districtId: 108 },
  { id: 10802, name: "សង្កាត់គីឡូម៉ែត្រលេខ៦", districtId: 108 },
  { id: 10803, name: "សង្កាត់គីឡូម៉ែត្រលេខ៧", districtId: 108 },
  { id: 10804, name: "សង្កាត់គីឡូម៉ែត្រលេខ៨", districtId: 108 },
  { id: 10805, name: "សង្កាត់ព្រែកលៀប", districtId: 108 },
  // Khn Sen Sok (id: 109)
  { id: 10901, name: "សង្កាត់ទឹកថ្លា", districtId: 109 },
  { id: 10902, name: "សង្កាត់ភ្នំពេញថ្មី", districtId: 109 },
  { id: 10903, name: "សង្កាត់ក្រាំងថ្កូវ", districtId: 109 },
  // Khn Prek Pnov (id: 110)
  { id: 11001, name: "សង្កាត់ព្រែកព្នៅ", districtId: 110 },
  { id: 11002, name: "សង្កាត់ពញាព្នៅ", districtId: 110 },
  // Khn Chroy Changvar (id: 111)
  { id: 11101, name: "សង្កាត់ជ្រោយចង្វារ", districtId: 111 },
  { id: 11102, name: "សង្កាត់ព្រែកលៀប", districtId: 111 },
  // Khn Steung Meanchey (id: 112)
  { id: 11201, name: "សង្កាត់ស្ទឹងមានជ័យ", districtId: 112 },
  { id: 11202, name: "សង្កាត់ស្ទឹងមានជ័យ១", districtId: 112 },
  // Srok Banan (id: 201)
  { id: 20101, name: "ឃុំជើងគោ", districtId: 201 },
  { id: 20102, name: "ឃុំសំរោងក្នុង", districtId: 201 },
  { id: 20103, name: "ឃុំគោកឃ្មុំ", districtId: 201 },
  { id: 20104, name: "ឃុំបាណន់", districtId: 201 },
  { id: 20105, name: "ឃុំជីផុច", districtId: 201 },
  { id: 20106, name: "ឃុំព្រែកព្រះស្តេច", districtId: 201 },
  { id: 20107, name: "ឃុំបន្ទាយមាស", districtId: 201 },
  { id: 20108, name: "ឃុំខ្នងភ្នំ", districtId: 201 },
  { id: 20109, name: "ឃុំភ្នំដី", districtId: 201 },
  // Srok Thma Puok (id: 202)
  { id: 20201, name: "ឃុំថ្មពួក", districtId: 202 },
  { id: 20202, name: "ឃុំភ្នំកូន", districtId: 202 },
  { id: 20203, name: "ឃុំគោគ", districtId: 202 },
  // Srok Bavel (id: 203)
  { id: 20301, name: "ឃុំបវេល", districtId: 203 },
  { id: 20302, name: "ឃុំល្វា", districtId: 203 },
  { id: 20303, name: "ឃុំកន្ទឺ១", districtId: 203 },
  { id: 20304, name: "ឃុំកន្ទឺ២", districtId: 203 },
  // Srok Moung Ruessei (id: 204)
  { id: 20401, name: "ឃុំឫស្សីក្រាំង", districtId: 204 },
  { id: 20402, name: "ឃុំឫស្សីសាញ់", districtId: 204 },
  { id: 20403, name: "ឃុំសំរោងក្នុង", districtId: 204 },
  { id: 20404, name: "ឃុំព្រៃទទឹង", districtId: 204 },
  // Srok Battambang (id: 205)
  { id: 20501, name: "សង្កាត់ស្វាយប៉ោ", districtId: 205 },
  { id: 20502, name: "សង្កាត់កំពង់ព្រះ", districtId: 205 },
  { id: 20503, name: "សង្កាត់ជ្រោយថ្ម", districtId: 205 },
  { id: 20504, name: "សង្កាត់សំរោង", districtId: 205 },
  { id: 20505, name: "សង្កាត់រាំង", districtId: 205 },
  // Srok Sampov Loun (id: 206)
  { id: 20601, name: "ឃុំសំពៅលូន", districtId: 206 },
  { id: 20602, name: "ឃុំថ្មគោល", districtId: 206 },
  // Srok Ek Phnom (id: 207)
  { id: 20701, name: "ឃុំព្រែកទាល់", districtId: 207 },
  { id: 20702, name: "ឃុំព្រែកលៀប", districtId: 207 },
  { id: 20703, name: "ឃុំព្រែកទា", districtId: 207 },
  // Srok Rotanak Mondul (id: 208)
  { id: 20801, name: "ឃុំរតនមណ្ឌល", districtId: 208 },
  { id: 20802, name: "ឃុំភ្នំល្ហុង", districtId: 208 },
  { id: 20803, name: "ឃុំភ្នំកូន", districtId: 208 },
  // Srok Sangkae (id: 209)
  { id: 20901, name: "ឃុំសង្កែ", districtId: 209 },
  { id: 20902, name: "ឃុំព្រែកដំបង", districtId: 209 },
  { id: 20903, name: "ឃុំព្រែកដំបង១", districtId: 209 },
  // Srok Kamrieng (id: 210)
  { id: 21001, name: "ឃុំកំរៀង", districtId: 210 },
  { id: 21002, name: "ឃុំថ្មដារ", districtId: 210 },
  { id: 21003, name: "ឃុំអូររំដួល", districtId: 210 },
  // Srok Koas Krala (id: 211)
  { id: 21101, name: "ឃុំក្រឡា", districtId: 211 },
  { id: 21102, name: "ឃុំតាគោក", districtId: 211 },
  { id: 21103, name: "ឃុំតាជោ", districtId: 211 },
  // Srok Phnom Proek (id: 212)
  { id: 21201, name: "ឃុំភ្នំព្រឹក", districtId: 212 },
  { id: 21202, name: "ឃុំដីក្រហម", districtId: 212 },
  { id: 21203, name: "ឃុំដីក្រហម១", districtId: 212 },
  // Srok Sampov Loun (id: 213)
  { id: 21301, name: "ឃុំសំពៅលូន", districtId: 213 },
  { id: 21302, name: "ឃុំថ្មគោល", districtId: 213 },
  // Srok Sok San (id: 214)
  { id: 21401, name: "ឃុំសុខសាន្ត", districtId: 214 },
  { id: 21402, name: "ឃុំដីក្រហម", districtId: 214 },
  // Srok Angkor Chum (id: 301)
  { id: 30101, name: "ឃុំអង្គរជុំ", districtId: 301 },
  { id: 30102, name: "ឃុំកន្ទឺ១", districtId: 301 },
  { id: 30103, name: "ឃុំកន្ទឺ២", districtId: 301 },
  // Srok Angkor Thom (id: 302)
  { id: 30201, name: "ឃុំអង្គរធំ", districtId: 302 },
  { id: 30202, name: "ឃុំគោកថ្កូវ", districtId: 302 },
  { id: 30203, name: "ឃុំភ្នំល្ហុង", districtId: 302 },
  // Srok Banteay Srei (id: 303)
  { id: 30301, name: "ឃុំបន្ទាយស្រី", districtId: 303 },
  { id: 30302, name: "ឃុំខ្នងភ្នំ", districtId: 303 },
  { id: 30303, name: "ឃុំភ្នំល្ហុង", districtId: 303 },
  // Krong Siem Reap (id: 304)
  { id: 30401, name: "សង្កាត់សៀមរាប", districtId: 304 },
  { id: 30402, name: "សង្កាត់អង្គរធំ", districtId: 304 },
  { id: 30403, name: "សង្កាត់គោកថ្កូវ", districtId: 304 },
  { id: 30404, name: "សង្កាត់ភ្នំល្ហុង", districtId: 304 },
  // Srok Chi Kraeng (id: 305)
  { id: 30501, name: "ឃុំជីក្រែង", districtId: 305 },
  { id: 30502, name: "ឃុំល្វា", districtId: 305 },
  { id: 30503, name: "ឃុំត្បូង", districtId: 305 },
  // Srok Puok (id: 306)
  { id: 30601, name: "ឃុំពួក", districtId: 306 },
  { id: 30602, name: "ឃុំល្វា", districtId: 306 },
  { id: 30603, name: "ឃុំត្បូង", districtId: 306 },
  // Srok Kralanh (id: 307)
  { id: 30701, name: "ឃុំក្រឡាញ់", districtId: 307 },
  { id: 30702, name: "ឃុំព្រៃរលួស", districtId: 307 },
  // Srok Prasat Bakong (id: 308)
  { id: 30801, name: "ឃុំប្រាសាទបាគង", districtId: 308 },
  { id: 30802, name: "ឃុំគោកត្រាច", districtId: 308 },
  // Srok Sout Nikom (id: 309)
  { id: 30901, name: "ឃុំសូត្រនិគម", districtId: 309 },
  { id: 30902, name: "ឃុំគោកត្រាច", districtId: 309 },
  // Srok Varin (id: 310)
  { id: 31001, name: "ឃុំវ៉ារិន", districtId: 310 },
  { id: 31002, name: "ឃុំតាត្រាវ", districtId: 310 },
  // Srok Srei Snam (id: 311)
  { id: 31101, name: "ឃុំស្រីស្នំ", districtId: 311 },
  { id: 31102, name: "ឃុំតាត្រាវ", districtId: 311 },
  // Srok Svay Leu (id: 312)
  { id: 31201, name: "ឃុំស្វាយលើ", districtId: 312 },
  { id: 31202, name: "ឃុំឃុនរាម", districtId: 312 },
  // Krong Preah Sihanouk (id: 401)
  { id: 40101, name: "សង្កាត់លេខ១", districtId: 401 },
  { id: 40102, name: "សង្កាត់លេខ២", districtId: 401 },
  { id: 40103, name: "សង្កាត់លេខ៣", districtId: 401 },
  { id: 40104, name: "សង្កាត់លេខ៤", districtId: 401 },
  // Srok Prey Nob (id: 402)
  { id: 40201, name: "ឃុំព្រៃនប់", districtId: 402 },
  { id: 40202, name: "ឃុំអណ្ដូងថ្ម", districtId: 402 },
  { id: 40203, name: "ឃុំជើងគោ", districtId: 402 },
  // Srok Kampong Seila (id: 403)
  { id: 40301, name: "ឃុំកំពង់សីលា", districtId: 403 },
  { id: 40302, name: "ឃុំសុវណ្ណជ័យ", districtId: 403 },
  // Srok Stueng Hav (id: 404)
  { id: 40401, name: "ឃុំស្ទឹងហាវ", districtId: 404 },
  { id: 40402, name: "ឃុំអូរត្រេះ", districtId: 404 },
  // Srok Batheay (id: 501)
  { id: 50101, name: "ឃុំបាធាយ", districtId: 501 },
  { id: 50102, name: "ឃុំជ្រោយថ្ម", districtId: 501 },
  { id: 50103, name: "ឃុំតាអោង", districtId: 501 },
  // Srok Kang Meas (id: 502)
  { id: 50201, name: "ឃុំកងមាស", districtId: 502 },
  { id: 50202, name: "ឃុំត្បូង", districtId: 502 },
  // Srok Koh Soutin (id: 503)
  { id: 50301, name: "ឃុំកោះសូទិន", districtId: 503 },
  { id: 50302, name: "ឃុំកោះ", districtId: 503 },
  // Krong Kampong Cham (id: 504)
  { id: 50401, name: "សង្កាត់កំពង់ចាម", districtId: 504 },
  { id: 50402, name: "សង្កាត់កំពង់ប្រាំ", districtId: 504 },
  { id: 50403, name: "សង្កាត់ជម្ពូវ័ន្ត", districtId: 504 },
  // Srok Cheung Prey (id: 505)
  { id: 50501, name: "ឃុំជើងព្រៃ", districtId: 505 },
  { id: 50502, name: "ឃុំត្បូងឃ្មុំ", districtId: 505 },
  // Srok Srei Santhor (id: 506)
  { id: 50601, name: "ឃុំស្រីសន្ធរ", districtId: 506 },
  { id: 50602, name: "ឃុំព្រែកដំបង", districtId: 506 },
  // Srok Kampong Siem (id: 507)
  { id: 50701, name: "ឃុំកំពង់សៀម", districtId: 507 },
  { id: 50702, name: "ឃុំគគរ", districtId: 507 },
  { id: 50703, name: "ឃុំកោះប៉ែន", districtId: 507 },
  // Srok Ou Reang Ov (id: 508)
  { id: 50801, name: "ឃុំអូរាំងឪ", districtId: 508 },
  { id: 50802, name: "ឃុំគគរ", districtId: 508 },
  // Krong Kampong Chhnang (id: 601)
  { id: 60101, name: "សង្កាត់ក្រសាំង", districtId: 601 },
  { id: 60102, name: "សង្កាត់ភ្នំក្រាំង", districtId: 601 },
  { id: 60103, name: "សង្កាត់ពញា", districtId: 601 },
  { id: 60104, name: "សង្កាត់ពញាក្រែង", districtId: 601 },
  // Srok Kampong Leng (id: 602)
  { id: 60201, name: "ឃុំកំពង់លែង", districtId: 602 },
  { id: 60202, name: "ឃុំពាម", districtId: 602 },
  // Srok Chol Kiri (id: 603)
  { id: 60301, name: "ឃុំជលគិរី", districtId: 603 },
  { id: 60302, name: "ឃុំពាម", districtId: 603 },
  // Srok Rolang Bea (id: 604)
  { id: 60401, name: "ឃុំរលាប្អៀរ", districtId: 604 },
  { id: 60402, name: "ឃុំអណ្តូងស្នួល", districtId: 604 },
  { id: 60403, name: "ឃុំត្រពាំងក្រសាំង", districtId: 604 },
  // Srok Teuk Phos (id: 605)
  { id: 60501, name: "ឃុំទឹកផុស", districtId: 605 },
  { id: 60502, name: "ឃុំត្រពាំងក្រសាំង", districtId: 605 },
  // Srok Borey Bo (id: 606)
  { id: 60601, name: "ឃុំបរិបូណ៌", districtId: 606 },
  { id: 60602, name: "ឃុំអណ្តូងស្នួល", districtId: 606 },
  // Srok Kampong Tralach (id: 607)
  { id: 60701, name: "ឃុំកំពង់ត្រឡាច", districtId: 607 },
  { id: 60702, name: "ឃុំកំពង់ត្រឡាចក្រោម", districtId: 607 },
  // Srok Samaki Mean Chey (id: 608)
  { id: 60801, name: "ឃុំសាមគ្គីមានជ័យ", districtId: 608 },
  { id: 60802, name: "ឃុំពញាឭ", districtId: 608 },
  // Krong Chbar Mon (id: 701)
  { id: 70101, name: "សង្កាត់ច្បារមន", districtId: 701 },
  { id: 70102, name: "សង្កាត់កោះស្រឡៅ", districtId: 701 },
  // Srok Baseat (id: 702)
  { id: 70201, name: "ឃុំបសេដ្ឋ", districtId: 702 },
  { id: 70202, name: "ឃុំឫស្សីជ្រុំ", districtId: 702 },
  // Srok Oral (id: 703)
  { id: 70301, name: "ឃុំឱរ៉ាល់", districtId: 703 },
  { id: 70302, name: "ឃុំត្រែងត្រយឹង", districtId: 703 },
  // Srok Thpong (id: 704)
  { id: 70401, name: "ឃុំថ្ពង", districtId: 704 },
  { id: 70402, name: "ឃុំត្រែងត្រយឹង", districtId: 704 },
  // Srok Phnom Sruoch (id: 705)
  { id: 70501, name: "ឃុំភ្នំស្រួច", districtId: 705 },
  { id: 70502, name: "ឃុំត្រពាំងគង", districtId: 705 },
  // Srok Oudong (id: 706)
  { id: 70601, name: "ឃុំឧត្តុង្គ", districtId: 706 },
  { id: 70602, name: "ឃុំវាំងចាស់", districtId: 706 },
  // Srok Samaki Monirom (id: 707)
  { id: 70701, name: "ឃុំសាមគ្គីមុនីរម្យ", districtId: 707 },
  { id: 70702, name: "ឃុំកន្ទឺ១", districtId: 707 },
  // Srok Kong Pisei (id: 708)
  { id: 70801, name: "ឃុំគងពិសី", districtId: 708 },
  { id: 70802, name: "ឃុំកំពង់ត្រឡាច", districtId: 708 },
  // Srok Baray (id: 801)
  { id: 80101, name: "ឃុំបារាយណ៍", districtId: 801 },
  { id: 80102, name: "ឃុំស្នួល", districtId: 801 },
  { id: 80103, name: "ឃុំជ្រោយថ្ម", districtId: 801 },
  // Srok Kampong Svay (id: 802)
  { id: 80201, name: "ឃុំកំពង់ស្វាយ", districtId: 802 },
  { id: 80202, name: "ឃុំកំពង់", districtId: 802 },
  // Krong Steung Saen (id: 803)
  { id: 80301, name: "សង្កាត់ស្ទឹងសែន", districtId: 803 },
  { id: 80302, name: "សង្កាត់ព្រះសីហនុ", districtId: 803 },
  // Srok Santuk (id: 804)
  { id: 80401, name: "ឃុំសន្ទុក", districtId: 804 },
  { id: 80402, name: "ឃុំស្ទោង", districtId: 804 },
  // Srok Stoung (id: 805)
  { id: 80501, name: "ឃុំស្ទោង", districtId: 805 },
  { id: 80502, name: "ឃុំប្រាសាទបល្ល័ង្ក", districtId: 805 },
  // Srok Prasat Sambour (id: 806)
  { id: 80601, name: "ឃុំប្រាសាទសំបូរ", districtId: 806 },
  { id: 80602, name: "ឃុំសំរោង", districtId: 806 },
  // Srok Prasat Ballangk (id: 807)
  { id: 80701, name: "ឃុំប្រាសាទបល្ល័ង្ក", districtId: 807 },
  { id: 80702, name: "ឃុំសំរោង", districtId: 807 },
  // Srok Sandan (id: 808)
  { id: 80801, name: "ឃុំសណ្ដាន់", districtId: 808 },
  { id: 80802, name: "ឃុំកំពង់ស្វាយ", districtId: 808 },
  // Kandal (id: 9)
  { id: 90101, name: "ឃុំកោះធំ", districtId: 901 },
  { id: 90102, name: "ឃុំព្រែកស្តី", districtId: 901 },
  { id: 90201, name: "ឃុំកណ្តាលស្ទឹង", districtId: 902 },
  { id: 90202, name: "ឃុំកៀនស្វាយ", districtId: 902 },
  { id: 90301, name: "ឃុំកៀនស្វាយ", districtId: 903 },
  { id: 90302, name: "ឃុំតាខ្មៅ", districtId: 903 },
  { id: 90401, name: "ឃុំស្អាង", districtId: 904 },
  { id: 90402, name: "ឃុំព្រែក", districtId: 904 },
  { id: 90501, name: "សង្កាត់តាខ្មៅ", districtId: 905 },
  { id: 90502, name: "សង្កាត់កំពង់", districtId: 905 },
  { id: 90601, name: "ឃុំអង្គស្នួល", districtId: 906 },
  { id: 90602, name: "ឃុំគគរ", districtId: 906 },
  { id: 90701, name: "ឃុំខ្សាច់កណ្ដាល", districtId: 907 },
  { id: 90702, name: "ឃុំកោះ", districtId: 907 },
  { id: 90801, name: "ឃុំលើកដែក", districtId: 908 },
  { id: 90802, name: "ឃុំព្រែកអណ្ដូង", districtId: 908 },
  { id: 90901, name: "ឃុំពញាឭ", districtId: 909 },
  { id: 90902, name: "ឃុំកោះអណ្ដែត", districtId: 909 },
  { id: 91001, name: "ឃុំស្អាង", districtId: 910 },
  { id: 91002, name: "ឃុំកោះ", districtId: 910 },
  { id: 91101, name: "ឃុំមុខកំពូល", districtId: 911 },
  { id: 91102, name: "ឃុំព្រែកអណ្ដូង", districtId: 911 },
  // Koh Kong (id: 1000 series)
  { id: 100101, name: "ឃុំកោះកុង", districtId: 1001 },
  { id: 100102, name: "ឃុំថ្មបាំង", districtId: 1001 },
  // Srae Ambel
  { id: 100201, name: "ឃុំស្រែអំបិល", districtId: 1002 },
  { id: 100202, name: "ឃុំដីក្រហម", districtId: 1002 },
  // Krong Khemarak Phoumin
  { id: 100401, name: "សង្កាត់ដងទង់", districtId: 1004 },
  { id: 100402, name: "សង្កាត់ព្រែក", districtId: 1004 },
  // Kep (id: 1100 series)
  { id: 110101, name: "សង្កាត់កែប", districtId: 1101 },
  { id: 110102, name: "សង្កាត់ព្រែក", districtId: 1101 },
  // Damnak Changaeur
  { id: 110201, name: "ឃុំដំណាក់ចង្អើរ", districtId: 1102 },
  { id: 110202, name: "ឃុំជើងឯក", districtId: 1102 },
  // Kampot (id: 1200 series)
  { id: 120101, name: "សង្កាត់កំពត", districtId: 1201 },
  { id: 120102, name: "សង្កាត់កំពង់", districtId: 1201 },
  // Preah Vihear (id: 1300 series)
  { id: 130101, name: "សង្កាត់ព្រះវិហារ", districtId: 1301 },
  { id: 130102, name: "សង្កាត់កោះ", districtId: 1301 },
  // Pursat (id: 1400 series)
  { id: 140101, name: "សង្កាត់ពោធិ៍សាត់", districtId: 1401 },
  { id: 140102, name: "សង្កាត់កោះ", districtId: 1401 },
  // Prey Veng (id: 1500 series)
  { id: 150101, name: "សង្កាត់ព្រៃវែង", districtId: 1501 },
  { id: 150102, name: "សង្កាត់ព្រែក", districtId: 1501 },
  // Ratanakiri (id: 1600 series)
  { id: 160101, name: "សង្កាត់បានលុង", districtId: 1601 },
  { id: 160102, name: "សង្កាត់បាងកក", districtId: 1601 },
  // Stung Treng (id: 1700 series)
  { id: 170101, name: "សង្កាត់ស្ទឹងត្រែង", districtId: 1701 },
  { id: 170102, name: "សង្កាត់ព្រែក", districtId: 1701 },
  // Svay Rieng (id: 1800 series)
  { id: 180101, name: "សង្កាត់ស្វាយរៀង", districtId: 1801 },
  { id: 180102, name: "សង្កាត់ព្រែក", districtId: 1801 },
  // Takeo (id: 1900 series)
  { id: 190101, name: "សង្កាត់ដូនកែវ", districtId: 1901 },
  { id: 190102, name: "សង្កាត់ព្រែក", districtId: 1901 },
  // Oddar Meanchey (id: 2000 series)
  { id: 200101, name: "សង្កាត់សំរោង", districtId: 2001 },
  { id: 200102, name: "សង្កាត់ព្រែក", districtId: 2001 },
  // Pailin (id: 2100 series)
  { id: 210101, name: "សង្កាត់ប៉ៃលិន", districtId: 2101 },
  { id: 210102, name: "សង្កាត់ព្រែក", districtId: 2101 },
  // Banteay Meanchey (id: 2200 series)
  { id: 220101, name: "សង្កាត់សិរីសោភ័ណ", districtId: 2201 },
  { id: 220102, name: "សង្កាត់ព្រែក", districtId: 2201 },
  // Mondulkiri (id: 2300 series)
  { id: 230301, name: "សង្កាត់សែនមនោរម្យ", districtId: 2303 },
  { id: 230302, name: "សង្កាត់ព្រែក", districtId: 2303 },
  // Kratie (id: 2400 series)
  { id: 240401, name: "សង្កាត់ក្រចេះ", districtId: 2404 },
  { id: 240402, name: "សង្កាត់ព្រែក", districtId: 2404 },
  // Tboung Khmum (id: 2500 series)
  { id: 250101, name: "ឃុំត្បូងឃ្មុំ", districtId: 2501 },
  { id: 250102, name: "ឃុំព្រែក", districtId: 2501 },
];