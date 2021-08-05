function editSelected(userID) {
    alert("Editing " + userID)
    fetch("/admin-select-user", {
        method: "POST",
        body: JSON.stringify({ userID: userID })

    }).then((_res) => {
        window.location.href = "/admin-edit-user"
    })
}

function reviewSelected(userID) {
    alert("Reviewing " + userID)
    fetch("/select-user", {
        method: "POST",
        body: JSON.stringify({ userID: userID })
    }).then((_res) => {
        window.location.href = "/review-calon"
    });
}

function tolakCalon(userID) {
  alert("Menolak " + userID)

  fetch("/tolak-calon", {
    method: "POST",
    body: JSON.stringify({ userID: userID })
  }).then((_res) => {
    window.location.href = '/registration-queue'
  });
}

function terimaCalon(userID) {
    alert("Menerima " + userID)

    fetch("/terima-calon", {
    method: "POST",
    body: JSON.stringify({ userID: userID })
    }).then((_res) => {
    alert("Auto Fetch")
    window.location.href = '/registration-queue'
    });
}

function adjustKota() {
    var provinsi = document.getElementById("provinsifilter").value;
    var NANGRO_ACEH_DARUSSALAM = ["TTN Kabupaten Aceh Selatan",
    "KTN Kabupaten Aceh Tenggara",
    "LGS Kabupaten Aceh Timur",
    "TKN Kabupaten Aceh Tengah",
    "MBO Kabupaten Aceh Barat",
    "JTH Kabupaten Aceh Besar",
    "SGI Kabupaten Pidie",
    "LSK Kabupaten Aceh Utara",
    "SNB Kabupaten Simeulue",
    "SKL Kabupaten Aceh Singkil",
    "BIR Kabupaten Bireuen",
    "BPD Kabupaten Aceh Barat Daya",
    "BKJ Kabupaten Gayo Lues",
    "CAG Kabupaten Aceh Jaya",
    "SKM Kabupaten Nagan Raya",
    "KRB Kabupaten Aceh Tamiang",
    "STR Kabupaten Bener Meriah",
    "MRN Kabupaten Pidie Jaya",
    "BNA Kota Banda Aceh",
    "SAB Kota Sabang",
    "LSM Kota Lhokseumawe",
    "LGS Kota Langsa",
    "SUS Kota Subulussalam"];

    var SUMATERA_UTARA = ["SBG Kabupaten Tapanuli Tengah",
    "TRT Kabupaten Tapanuli Utara",
    "PSP Kabupaten Tapanuli Selatan",
    "GST Kabupaten Nias",
    "STB Kabupaten Langkat",
    "KBJ Kabupaten Karo",
    "LBP Kabupaten Deli Serdang",
    "PMS Kabupaten Simalungun",
    "KIS Kabupaten Asahan",
    "RAP Kabupaten Labuhanbatu",
    "SDK Kabupaten Dairi",
    "BLG Kabupaten Toba Samosir",
    "PYB Kabupaten Mandailing Natal",
    "TLD Kabupaten Nias Selatan",
    "SAL Kabupaten Pakpak Bharat",
    "DLS Kabupaten Humbang Hasundutan",
    "PRR Kabupaten Samosir",
    "SRH Kabupaten Serdang Bedagai",
    "LMP Kabupaten Batubara",
    "GNT Kabupaten Padang Lawas Utara",
    "SBH Kabupaten Padang Lawas",
    "KPI Kabupaten Labuhanbatu Selatan",
    "AKK Kabupaten Labuhanbatu Utara",
    "LTU Kabupaten Nias Utara",
    "LHM Kabupaten Nias Barat",
    "MDN Kota Medan",
    "PMS Kota Pematangsiantar",
    "SBG Kota Sibolga",
    "TJB Kota Tanjungbalai",
    "BNJ Kota Binjai",
    "TBT Kota Tebing Tinggi",
    "PSP Kota Padangsidempuan",
    "GST Kota Gunungsitoli"
    ];

    var SUMATERA_BARAT = [
    "PNN Kabupaten Pesisir Selatan",
    "ARS Kabupaten Solok",
    "MRJ Kabupaten Sijunjung",
    "BSK Kabupaten Tanah Datar",
    "NPM Kabupaten Padang Pariaman",
    "LBB Kabupaten Agam",
    "SRK Kabupaten Lima Puluh Kota",
    "LBS Kabupaten Pasaman",
    "TPT Kabupaten Kepulauan Mentawai",
    "PLJ Kabupaten  Dharmasraya",
    "PDA Kabupaten Solok Selatan",
    "SPE Kabupaten Pasaman Barat",
    "PAD Kota Padang",
    "SLK Kota Solok",
    "SWL Kota Sawahlunto",
    "PDP Kota Padangpanjang",
    "BKT Kota Bukittinggi",
    "PYH Kota Payakumbuh",
    "PMN Kota Pariaman"
    ];

    var RIAU = [
        "BKN Kabupaten Kampar",
        "RGT Kabupaten Indragiri Hulu",
        "BLS Kabupaten Bengkalis",
        "TBH Kabupaten Indragiri Hilir",
        "PKK Kabupaten Pelalawan",
        "PRP Kabupaten Rokan Hulu",
        "UJT Kabupaten Rokan Hilir",
        "SAK Kabupaten Siak",
        "TLK Kabupaten Kuantan Singingi",
        "TTG Kabupaten Kepulauan Meranti",
        "PBR Kota Pekanbaru",
        "DUM Kota Dumai"
    ];

    var JAMBI = [
        "SPN Kabupaten Kerinci",
        "BKO Kabupaten Merangin",
        "SRL Kabupaten Sarolangun",
        "MBN Kabupaten Batanghari",
        "SNT Kabupaten Muaro Jambi",
        "KLT Kabupaten Tanjung Jabung Barat",
        "MSK Kabupaten Tanjung Jabung Timur",
        "MRB Kabupaten Bungo",
        "MRT Kabupaten Tebo",
        "JMB Kota Jambi",
        "SPN Kota Sungai Penuh"
    ];

    var SUMATERA_SELATAN = [
        "BTA Kabupaten Ogan Komering Ulu",
        "KAG Kabupaten Ogan Komering Ilir",
        "MRE Kabupaten Muara Enim",
        "LHT Kabupaten Lahat",
        "MBL Kabupaten Musi Rawas",
        "RPT Kabupaten Musi Rawas Utara",
        "SKY Kabupaten Musi Banyuasin",
        "PKB Kabupaten Banyuasin",
        "MPR Kabupaten Oku Timur",
        "MRD Kabupaten Oku Selatan",
        "IDL Kabupaten Ogan Ilir",
        "TBG Kabupaten Empat Lawang",
        "PLG Kota Palembang",
        "PGA Kota Pagar Alam",
        "LLG Kota Lubuklinggau",
        "PBM Kota Prabumulih"
    ];

    var BENGKULU = [
        "MNA Kabupaten Bengkulu Selatan",
        "CRP Kabupaten Rejang Lebong",
        "AGM Kabupaten Bengkulu Utara",
        "BHN Kabupaten Kaur",
        "TAS Kabupaten Seluma",
        "MKM Kabupaten Muko Muko",
        "TUB Kabupaten Lebong",
        "KPH Kabupaten Kepahiang",
        "KRT Kabupaten Bengkulu Tengah",
        "BGL Kota Bengkulu"
    ];

    var LAMPUNG = [
        "KLA Kabupaten Lampung Selatan",
        "GNS Kabupaten Lampung Tengah",
        "KTB Kabupaten Lampung Utara",
        "LIW Kabupaten Lampung Barat",
        "MGL Kabupaten Tulang Bawang",
        "KOT Kabupaten Tanggamus",
        "SDN Kabupaten Lampung Timur",
        "BBU Kabupaten Way Kanan",
        "GDT Kabupaten Pesawaran",
        "PRW Kabupaten Pringsewu",
        "MSJ Kabupaten Mesuji",
        "TWG Kabupaten Tulang Bawang Barat",
        "BDL Kota Bandar Lampung",
        "MET Kota Metro"
    ];

    var KEPUALAN_BANGKA_BELITUNG = [
        "SGL Kabupaten Bangka",
        "TDN Kabupaten Belitung",
        "TBL Kabupaten Bangka Selatan",
        "KBA Kabupaten Bangka Tengah",
        "MTK Kabupaten Bangka Barat",
        "MGR Kabupaten Belitung Timur",
        "PGP Kota Pangkal Pinang"
    ];

    var KEPULAUAN_RIAU = [
        "BSB Kabupaten Bintan",
        "TBK Kabupaten Karimun",
        "RAN Kabupaten Natuna",
        "DKL Kabupaten Lingga",
        "TRP Kabupaten Kepulauan Anambas",
        "BTM Kota Batam",
        "TPG Kota Tanjung Pinang"
    ];

    var DKI_JAKARTA = [
        "KSU Kabupaten Adm. Kepulauan Seribu",
        "TNA Kota Administrasi Jakarta Pusat",
        "TJP Kota Administrasi Jakarta Utara",
        "GGP Kota Administrasi Jakarta Barat",
        "KYB Kota Administrasi Jakarta Selatan",
        "CKG Kota Administrasi Jakarta Timur"
    ];

    var JAWA_BARAT = [
        "CBI Kabupaten Bogor",
        "SBM Kabupaten Sukabumi",
        "CJR Kabupaten Cianjur",
        "SOR Kabupaten Bandung",
        "GRT Kabupaten Garut",
        "SPA Kabupaten Tasikmalaya",
        "CMS Kabupaten Ciamis",
        "KNG Kabupaten Kuningan",
        "SBR Kabupaten Cirebon",
        "MJL Kabupaten Majalengka",
        "SMD Kabupaten Sumedang",
        "IDM Kabupaten Indramayu",
        "SNG Kabupaten Subang",
        "PWK Kabupaten Purwakarta",
        "KWG Kabupaten Karawang",
        "CKR Kabupaten Bekasi",
        "NPH Kabupaten Bandung Barat",
        "BGR Kota Bogor",
        "SKB Kota Sukabumi",
        "BDG Kota Bandung",
        "CBN Kota Cirebon",
        "BKS Kota Bekasi",
        "DPK Kota Depok",
        "CMH Kota Cimahi",
        "TSM Kota Tasikmalaya",
        "BJR Kota Banjar"
    ];

    var JAWA_TENGAH = [
        "CLP Kabupaten Cilacap",
        "PWT Kabupaten Banyumas",
        "PBG Kabupaten Purbalingga",
        "BNR Kabupaten Banjarnegara",
        "KBM Kabupaten Kebumen",
        "PWR Kabupaten Purworejo",
        "WSB Kabupaten Wonosobo",
        "MKD Kabupaten Magelang",
        "BYL Kabupaten Boyolali",
        "KLN Kabupaten Klaten",
        "SKH Kabupaten Sukoharjo",
        "WNG Kabupaten Wonogiri",
        "KRG Kabupaten Karanganyar",
        "SGN Kabupaten Sragen",
        "PWD Kabupaten Grobogan",
        "BLA Kabupaten Blora",
        "RBG Kabupaten Rembang",
        "PTI Kabupaten Pati",
        "KDS Kabupaten Kudus",
        "JPA Kabupaten Jepara",
        "DMK Kabupaten Demak",
        "UNR Kabupaten Semarang",
        "TMG Kabupaten Temanggung",
        "KDL Kabupaten Kendal",
        "BTG Kabupaten Batang",
        "KJN Kabupaten Pekalongan",
        "PML Kabupaten Pemalang",
        "SLW Kabupaten Tegal",
        "BBS Kabupaten Brebes",
        "MGG Kota Magelang",
        "SKT Kota Surakarta",
        "SLT Kota Salatiga",
        "SMG Kota Semarang",
        "PKL Kota Pekalongan",
        "TGL Kota Tegal"
    ];

    var DI_YOGYAKARTA = [
        "WAT Kabupaten Kulon Progo",
        "BTL Kabupaten Bantul",
        "WNO Kabupaten Gunungkidul",
        "SMN Kabupaten Sleman",
        "YYK Kota Yogyakarta"
    ];

    var JAWA_TIMUR = [
        "PCT Kabupaten Pacitan",
        "PNG Kabupaten Ponorogo",
        "TRK Kabupaten Trenggalek",
        "TLG Kabupaten  Tulungagung",
        "KNR Kabupaten Blitar",
        "KDR Kabupaten Kediri",
        "KPN Kabupaten Malang",
        "LMJ Kabupaten Lumajang",
        "JMR Kabupaten Jember",
        "BYW Kabupaten Banyuwangi",
        "BDW Kabupaten Bondowoso",
        "SIT Kabupaten Situbondo",
        "KRS Kabupaten Probolinggo",
        "PSR Kabupaten Pasuruan",
        "SDA Kabupaten Sidoarjo",
        "MJK Kabupaten Mojokerto",
        "JBG Kabupaten Jombang",
        "NJK Kabupaten Nganjuk",
        "MJY Kabupaten Madiun",
        "MGT Kabupaten Magetan",
        "NGW Kabupaten Ngawi",
        "BJN Kabupaten Bojonegoro",
        "TBN Kabupaten Tuban",
        "LMG Kabupaten Lamongan",
        "GSK Kabupaten Gresik",
        "BKL Kabupaten Bangkalan",
        "SPG Kabupaten Sampang",
        "PMK Kabupaten  Pamekasan",
        "SMP Kabupaten Sumenep",
        "KDR Kota Kediri",
        "BLT Kota Blitar",
        "MLG Kota Malang",
        "PBL Kota Probolinggo",
        "PSN Kota Pasuruan",
        "MJK Kota Mojokerto",
        "MAD Kota Madiun",
        "SBY Kota Surabaya",
        "BTU Kota Batu"
    ];

    var BANTEN = [
        "PDG Kabupaten Pandeglang",
        "RKB Kabupaten Lebak",
        "TGR Kabupaten Tangerang",
        "SRG Kabupaten Serang",
        "TNG Kota Tangerang",
        "CLG Kota Cilegon",
        "SRG Kota Serang",
        "CPT Kota Tangerang Selatan"
    ];

    var BALI = [
        "NGA Kabupaten Jembrana",
        "TAB Kabupaten Tabanan",
        "MGW Kabupaten Badung",
        "GIN Kabupaten Gianyar",
        "SRP Kabupaten Klungkung",
        "BLI Kabupaten Bangli",
        "KRA Kabupaten Karangasem",
        "SGR Kabupaten Buleleng",
        "DPR Kota Denpasar"
    ];

    var NUSA_TENGGARA_BARAT = [
        "GRG Kabupaten Lombok Barat",
        "PYA Kabupaten Lombok Tengah",
        "SEL Kabupaten Lombok Timur",
        "SBW Kabupaten Sumbawa",
        "DPU Kabupaten Dompu",
        "WHO Kabupaten Bima",
        "TLW Kabupaten Sumbawa Barat",
        "TJN Kabupaten Lombok Utara",
        "MTR Kota Mataram",
        "BIM Kota Bima"
    ];

    var NUSA_TENGGARA_TIMUR = [
        "KPG Kabupaten Kupang",
        "SOE Kabupaten Timor Tengah Selatan",
        "KFM Kabupaten Timor Tengah Utara",
        "ATB Kabupaten Belu",
        "KLB Kabupaten Alor",
        "LRT Kabupaten Flores Timur",
        "MME Kabupaten Sikka",
        "END Kabupaten Ende",
        "BJW Kabupaten Ngada",
        "RTG Kabupaten Manggarai",
        "WGP Kabupaten Sumba Timur",
        "WKB Kabupaten Sumba Barat",
        "LWL Kabupaten Lembata",
        "BAA Kabupaten Rote Ndao",
        "LBJ Kabupaten Manggarai Barat",
        "MBY Kabupaten Nagekeo",
        "WBL Kabupaten Sumba Tengah",
        "TAM Kabupaten Sumba Barat Daya",
        "BRG Kabupaten Manggarai Timur",
        "SBB Kabupaten Sabu Raijua",
        "KPG Kota Kupang"
    ];

    var KALIMANTAN_BARAT = [
        "SBS Kabupaten Sambas",
        "MPW Kabupaten Pontianak",
        "SAG Kabupaten Sanggau",
        "KTP Kabupaten Ketapang",
        "STG Kabupaten Sintang",
        "PTS Kabupaten Kapuas Hulu",
        "BEK Kabupaten  Bengkayang",
        "NBA Kabupaten Landak",
        "SED Kabupaten Sekadau",
        "NGP Kabupaten Melawi",
        "SKD Kabupaten Kayong Utara",
        "SRY Kabupaten Kubu Raya",
        "PTK Kota Pontianak",
        "SKW Kota Singkawang"
    ];

    var KALIMANTAN_TENGAH = [
        "PBU Kabupaten Kotawaringin Barat",
        "SPT Kabupaten Kotawaringin Timur",
        "KLK Kabupaten Kapuas",
        "BNT Kabupaten Barito Selatan",
        "MTW Kabupaten Barito Utara",
        "KSN Kabupaten Katingan",
        "KLP Kabupaten Seruyan",
        "SKR Kabupaten Sukamara",
        "NGB Kabupaten Lamandau",
        "KKN Kabupaten Gunung Mas",
        "PPS Kabupaten Pulang Pisau",
        "PRC Kabupaten Murung Raya",
        "TML Kabupaten Barito Timur",
        "PLK Kota Palangka Raya"
    ];

    var KALIMANTAN_SELATAN = [
        "PLI Kabupaten Tanah Laut",
        "KBR Kabupaten Kotabaru",
        "MTP Kabupaten Banjar",
        "MRH Kabupaten Barito Kuala",
        "RTA Kabupaten Tapin",
        "KGN Kabupaten Hulu Sungai Selatan",
        "BRB Kabupaten Hulu Sungai Tengah",
        "AMT Kabupaten Hulu Sungai Utara",
        "TJG Kabupaten Tabalong",
        "BLN Kabupaten Tanah Bumbu",
        "PRN Kabupaten Balangan",
        "BJM Kota Banjarmasin",
        "BJB Kota Banjarbaru"
    ];

    var KALIMANTAN_TIMUR = [
        "TGT Kabupaten Paser",
        "TRG Kabupaten Kutai Kartanegara",
        "TNR Kabupaten Berau",
        "TJS Kabupaten Bulungan",
        "NNK Kabupaten Nunukan",
        "MLN Kabupaten Malinau",
        "SDW Kabupaten Kutai Barat",
        "SGT Kabupaten Kutai Timur",
        "PNJ Kabupaten Penajam Paser Utara",
        "TDP Kabupaten Tana Tidung",
        "BPP Kota Balikpapan",
        "SMR Kota Samarinda",
        "TAR Kota Tarakan",
        "BON Kota Bontang"
    ];

    var SULAWESI_UTARA = [
        "LLK Kabupaten Bolaang Mongondow",
        "TNN Kabupaten Minahasa",
        "THN Kabupaten Kepulauan Sangihe",
        "MGN Kabupaten Kepulauan Talaud",
        "AMR Kabupaten Minahasa Selatan",
        "ARM Kabupaten Minahasa Utara",
        "RTN Kabupaten Minahasa Tenggara",
        "BRK Kabupaten Bolaang Mongondow Utara",
        "ODS Kabupaten Kepulauan Siau Tagulandang Biaro",
        "TTY Kabupaten Bolaang Mongondow Timur",
        "BLU Kabupaten Bolaang Mongondow Selatan",
        "MND Kota Manado",
        "BIT Kota Bitung",
        "TMH Kota Tomohon",
        "KTG Kota Kotamobagu"
    ];

    var SULAWESI_TENGAH = [
        "LWK Kabupaten Banggai",
        "PSO Kabupaten Poso",
        "DGL Kabupaten Donggala",
        "TLI Kabupaten Toli Toli",
        "BUL Kabupaten Buol",
        "BGK Kabupaten Morowali",
        "SKN Kabupaten Banggai Kepulauan",
        "PRG Kabupaten Parigi Moutong",
        "APN Kabupaten Tojo Una Una",
        "SGB Kabupaten Sigi",
        "PAL Kota Palu",
        "BEN Kabupaten Kepulauan Selayar",
        "BLK Kabupaten Bulukumba",
        "BAN Kabupaten Bantaeng",
        "JNP Kabupaten Jeneponto",
        "TKA Kabupaten Takalar",
        "SGM Kabupaten Gowa",
        "SNJ Kabupaten Sinjai",
        "WTP Kabupaten Bone",
        "MRS Kabupaten Maros",
        "PKJ Kabupaten Pangkajene Kepulauan",
        "BAR Kabupaten Barru",
        "WNS Kabupaten Soppeng",
        "SKG Kabupaten Wajo",
        "SDR Kabupaten Sidenreng Rappang",
        "PIN Kabupaten Pinrang",
        "ENR Kabupaten Enrekang",
        "PLP Kabupaten Luwu",
        "MAK Kabupaten Tana Toraja",
        "MSB Kabupaten Luwu Utara",
        "MLL Kabupaten Luwu Timur",
        "RTP Kabupaten Toraja Utara",
        "MKS Kota Makassar",
        "PRE Kota Pare Pare",
        "PLP Kota Palopo"
    ];

    var SULAWESI_TENGGARA = [
        "KKA Kabupaten Kolaka",
        "UNH Kabupaten Konawe",
        "RAH Kabupaten Muna",
        "PSW Kabupaten Buton",
        "ADL Kabupaten Konawe Selatan",
        "RMB Kabupaten Bombana",
        "WGW Kabupaten Wakatobi",
        "LSS Kabupaten Kolaka Utara",
        "WGD Kabupaten Konawe Utara",
        "BNG Kabupaten Buton Utara",
        "KDI Kota Kendari",
        "BAU Kota Bau Bau"
    ];

    var GORONTALO = [
        "GTO Kabupaten Gorontalo",
        "TMT Kabupaten Boalemo",
        "SWW Kabupaten Bone Bolango",
        "MAR Kabupaten Pahuwato",
        "KWD Kabupaten Gorontalo Utara",
        "GTO Kota Gorontalo"
    ];

    var SULAWESI_BARAT = [
        "PKY Kabupaten Mamuju Utara",
        "MAM Kabupaten Mamuju",
        "MMS Kabupaten Mamasa",
        "PLW Kabupaten Polewali Mandar",
        "MJN Kabupaten Majene"
    ];

    var MALUKU = [
        "MSH Kabupaten Maluku Tengah",
        "TUL Kabupaten Maluku Tenggara",
        "SML Kabupaten Maluku Tenggara Barat",
        "NLA Kabupaten Buru",
        "DTH Kabupaten Seram Bagian Timur",
        "DRH Kabupaten Seram Bagian Barat",
        "DOB Kabupaten Kepulauan Aru",
        "TKR Kabupaten Maluku Barat Daya",
        "NMR Kabupaten Buru Selatan",
        "AMB Kota Ambon",
        "TUL Kota Tual"
    ];

    var MALUKU_UTARA = [
        "JLL Kabupaten Halmahera Barat",
        "WED Kabupaten Halmahera Tengah",
        "TOB Kabupaten Halmahera Utara",
        "LBA Kabupaten Halmahera Selatan",
        "SNN Kabupaten Kepulauan Sula",
        "MAB Kabupaten Halmahera Timur",
        "MTS Kabupaten Pulau Morotai",
        "TTE Kota Ternate",
        "TDR Kota Tidore Kepulauan"
    ];

    var PAPUA = [
        "MRK Kabupaten Merauke",
        "WAM Kabupaten Jayawijaya",
        "JAP Kabupaten Jayapura",
        "NAB Kabupaten Nabire",
        "SRU Kabupaten Kepulauan Yapen",
        "BIK Kabupaten Biak Numfor",
        "MUL Kabupaten Puncak Jaya",
        "ERT Kabupaten Paniai",
        "TIM Kabupaten Mimika",
        "SMI Kabupaten Sarmi",
        "WRS Kabupaten Keerom",
        "OSB Kabupaten Pegunungan Bintang",
        "SMH Kabupaten Yahukimo",
        "KBG Kabupaten Tolikara",
        "BTW Kabupaten Waropen",
        "TMR Kabupaten Boven Digoel",
        "KEP Kabupaten Mappi",
        "AGT Kabupaten Asmat",
        "SRW Kabupaten Supiori",
        "BRM Kabupaten Mamberamo Raya",
        "KBK Kabupaten Mamberamo Tengah",
        "ELL Kabupaten Yalimo",
        "TOM Kabupaten Lanny Jaya",
        "KYM Kabupaten Nduga",
        "ILG Kabupaten Puncak",
        "KGM Kabupaten Dogiyai",
        "SGP Kabupaten Intan Jaya",
        "TIG Kabupaten Deiyai",
        "JAP Kota Jayapura"
    ];

    var PAPUA_BARAT = [
        "AMS Kabupaten Sorong",
        "MNK Kabupaten Manokwari",
        "FFK Kabupaten Fak Fak",
        "TMB Kabupaten Sorong Selatan",
        "WAS Kabupaten Raja Ampat",
        "BTI Kabupaten Teluk Bintuni",
        "RAS Kabupaten Teluk Wondama",
        "KMN Kabupaten Kaimana",
        "FEF Kabupaten Tambrauw",
        "AFT Kabupaten Maybrat",
        "SON Kota Sorong"
    ]
    var items;
    if (provinsi == "AC NANGRO ACEH DARUSSALAM") {
        items = NANGRO_ACEH_DARUSSALAM;

    } else if (provinsi == "SU Sumatera Utara") {
        items = SUMATERA_UTARA;

    } else if (provinsi == "SB Sumatera Barat") {
        items = SUMATERA_BARAT;

    } else if (provinsi == "RI Riau") {
        items = RIAU;

    } else if (provinsi == "JA Jambi") {
        items = JAMBI;

    } else if (provinsi == "SS Sumatera Selatan") {
        items = SUMATERA_SELATAN;

    } else if (provinsi == "BE Bengkulu") {
        items = BENGKULU;

    } else if (provinsi == "LA Lampung") {
        items = LAMPUNG;

    } else if (provinsi == "BB Kepulauan Bangka Belitung") {
        items = KEPUALAN_BANGKA_BELITUNG;

    } else if (provinsi == "KR Kepulauan Riau") {
        items = KEPULAUAN_RIAU;

    } else if (provinsi == "JK D.K.I. Jakarta") {
        items = DKI_JAKARTA;

    } else if (provinsi == "JB Jawa Barat") {
        items = JAWA_BARAT;

    } else if (provinsi == "JT Jawa Tengah") {
        items = JAWA_TENGAH;

    } else if (provinsi == "YO DI Yogyakarta") {
        items = DI_YOGYAKARTA;

    } else if (provinsi == "JI Jawa Timur") {
        items = JAWA_TIMUR;

    } else if (provinsi == "BT Banten") {
        items = BANTEN;

    } else if (provinsi == "BA Bali") {
        items = BALI;

    } else if (provinsi == "NB Nusa Tenggara Barat") {
        items = NUSA_TENGGARA_BARAT;

    } else if (provinsi == "NT Nusa Tenggara Timur") {
        items = NUSA_TENGGARA_TIMUR;

    } else if (provinsi == "KB Kalimantan Barat") {
        items = KALIMANTAN_BARAT;

    } else if (provinsi == "KT Kalimantan Tengah") {
        items = KALIMANTAN_TENGAH;

    } else if (provinsi == "KS Kalimantan Selatan") {
        items = KALIMANTAN_SELATAN;

    } else if (provinsi == "KI Kalimantan Timur") {
        items = KALIMANTAN_TIMUR;

    } else if (provinsi == "SA Sulawesi Utara") {
        items = SULAWESI_UTARA;

    } else if (provinsi == "ST Sulawesi TENGAH") {
        items = SULAWESI_TENGAH;

    } else if (provinsi == "SG Sulawesi Tenggara") {
        items = SULAWESI_TENGGARA;

    } else if (provinsi == "GO Gorontalo") {
        items = GORONTALO;

    } else if (provinsi == "SR Sulawesi Barat") {
        items = SULAWESI_BARAT;

    } else if (provinsi == "MA Maluku") {
        items = MALUKU;

    } else if (provinsi == "MU Maluku Utara") {
        items = MALUKU_UTARA;

    } else if (provinsi == "PA Papua") {
        items = PAPUA;

    } else if (provinsi == "PB Papua Barat") {
        items = PAPUA_BARAT;

    } else {
        items = [];
    }

    var str = "<option value=\"\" selected>Kabupaten/Kota</option>"
    for (var item of items) {
        str += "<option value=" + "\"" + item + "\"" + ">" + item.split(" ").slice(1,).join(" ") + "</option>"
    }
    document.getElementById("kotafilter").innerHTML = str;
}


function adjustKotaNonAdmin() {
    var provinsi = document.getElementById("provinsi").value;
    var NANGRO_ACEH_DARUSSALAM = ["TTN Kabupaten Aceh Selatan",
    "KTN Kabupaten Aceh Tenggara",
    "LGS Kabupaten Aceh Timur",
    "TKN Kabupaten Aceh Tengah",
    "MBO Kabupaten Aceh Barat",
    "JTH Kabupaten Aceh Besar",
    "SGI Kabupaten Pidie",
    "LSK Kabupaten Aceh Utara",
    "SNB Kabupaten Simeulue",
    "SKL Kabupaten Aceh Singkil",
    "BIR Kabupaten Bireuen",
    "BPD Kabupaten Aceh Barat Daya",
    "BKJ Kabupaten Gayo Lues",
    "CAG Kabupaten Aceh Jaya",
    "SKM Kabupaten Nagan Raya",
    "KRB Kabupaten Aceh Tamiang",
    "STR Kabupaten Bener Meriah",
    "MRN Kabupaten Pidie Jaya",
    "BNA Kota Banda Aceh",
    "SAB Kota Sabang",
    "LSM Kota Lhokseumawe",
    "LGS Kota Langsa",
    "SUS Kota Subulussalam"];

    var SUMATERA_UTARA = ["SBG Kabupaten Tapanuli Tengah",
    "TRT Kabupaten Tapanuli Utara",
    "PSP Kabupaten Tapanuli Selatan",
    "GST Kabupaten Nias",
    "STB Kabupaten Langkat",
    "KBJ Kabupaten Karo",
    "LBP Kabupaten Deli Serdang",
    "PMS Kabupaten Simalungun",
    "KIS Kabupaten Asahan",
    "RAP Kabupaten Labuhanbatu",
    "SDK Kabupaten Dairi",
    "BLG Kabupaten Toba Samosir",
    "PYB Kabupaten Mandailing Natal",
    "TLD Kabupaten Nias Selatan",
    "SAL Kabupaten Pakpak Bharat",
    "DLS Kabupaten Humbang Hasundutan",
    "PRR Kabupaten Samosir",
    "SRH Kabupaten Serdang Bedagai",
    "LMP Kabupaten Batubara",
    "GNT Kabupaten Padang Lawas Utara",
    "SBH Kabupaten Padang Lawas",
    "KPI Kabupaten Labuhanbatu Selatan",
    "AKK Kabupaten Labuhanbatu Utara",
    "LTU Kabupaten Nias Utara",
    "LHM Kabupaten Nias Barat",
    "MDN Kota Medan",
    "PMS Kota Pematangsiantar",
    "SBG Kota Sibolga",
    "TJB Kota Tanjungbalai",
    "BNJ Kota Binjai",
    "TBT Kota Tebing Tinggi",
    "PSP Kota Padangsidempuan",
    "GST Kota Gunungsitoli"
    ];

    var SUMATERA_BARAT = [
    "PNN Kabupaten Pesisir Selatan",
    "ARS Kabupaten Solok",
    "MRJ Kabupaten Sijunjung",
    "BSK Kabupaten Tanah Datar",
    "NPM Kabupaten Padang Pariaman",
    "LBB Kabupaten Agam",
    "SRK Kabupaten Lima Puluh Kota",
    "LBS Kabupaten Pasaman",
    "TPT Kabupaten Kepulauan Mentawai",
    "PLJ Kabupaten  Dharmasraya",
    "PDA Kabupaten Solok Selatan",
    "SPE Kabupaten Pasaman Barat",
    "PAD Kota Padang",
    "SLK Kota Solok",
    "SWL Kota Sawahlunto",
    "PDP Kota Padangpanjang",
    "BKT Kota Bukittinggi",
    "PYH Kota Payakumbuh",
    "PMN Kota Pariaman"
    ];

    var RIAU = [
        "BKN Kabupaten Kampar",
        "RGT Kabupaten Indragiri Hulu",
        "BLS Kabupaten Bengkalis",
        "TBH Kabupaten Indragiri Hilir",
        "PKK Kabupaten Pelalawan",
        "PRP Kabupaten Rokan Hulu",
        "UJT Kabupaten Rokan Hilir",
        "SAK Kabupaten Siak",
        "TLK Kabupaten Kuantan Singingi",
        "TTG Kabupaten Kepulauan Meranti",
        "PBR Kota Pekanbaru",
        "DUM Kota Dumai"
    ];

    var JAMBI = [
        "SPN Kabupaten Kerinci",
        "BKO Kabupaten Merangin",
        "SRL Kabupaten Sarolangun",
        "MBN Kabupaten Batanghari",
        "SNT Kabupaten Muaro Jambi",
        "KLT Kabupaten Tanjung Jabung Barat",
        "MSK Kabupaten Tanjung Jabung Timur",
        "MRB Kabupaten Bungo",
        "MRT Kabupaten Tebo",
        "JMB Kota Jambi",
        "SPN Kota Sungai Penuh"
    ];

    var SUMATERA_SELATAN = [
        "BTA Kabupaten Ogan Komering Ulu",
        "KAG Kabupaten Ogan Komering Ilir",
        "MRE Kabupaten Muara Enim",
        "LHT Kabupaten Lahat",
        "MBL Kabupaten Musi Rawas",
        "RPT Kabupaten Musi Rawas Utara",
        "SKY Kabupaten Musi Banyuasin",
        "PKB Kabupaten Banyuasin",
        "MPR Kabupaten Oku Timur",
        "MRD Kabupaten Oku Selatan",
        "IDL Kabupaten Ogan Ilir",
        "TBG Kabupaten Empat Lawang",
        "PLG Kota Palembang",
        "PGA Kota Pagar Alam",
        "LLG Kota Lubuklinggau",
        "PBM Kota Prabumulih"
    ];

    var BENGKULU = [
        "MNA Kabupaten Bengkulu Selatan",
        "CRP Kabupaten Rejang Lebong",
        "AGM Kabupaten Bengkulu Utara",
        "BHN Kabupaten Kaur",
        "TAS Kabupaten Seluma",
        "MKM Kabupaten Muko Muko",
        "TUB Kabupaten Lebong",
        "KPH Kabupaten Kepahiang",
        "KRT Kabupaten Bengkulu Tengah",
        "BGL Kota Bengkulu"
    ];

    var LAMPUNG = [
        "KLA Kabupaten Lampung Selatan",
        "GNS Kabupaten Lampung Tengah",
        "KTB Kabupaten Lampung Utara",
        "LIW Kabupaten Lampung Barat",
        "MGL Kabupaten Tulang Bawang",
        "KOT Kabupaten Tanggamus",
        "SDN Kabupaten Lampung Timur",
        "BBU Kabupaten Way Kanan",
        "GDT Kabupaten Pesawaran",
        "PRW Kabupaten Pringsewu",
        "MSJ Kabupaten Mesuji",
        "TWG Kabupaten Tulang Bawang Barat",
        "BDL Kota Bandar Lampung",
        "MET Kota Metro"
    ];

    var KEPUALAN_BANGKA_BELITUNG = [
        "SGL Kabupaten Bangka",
        "TDN Kabupaten Belitung",
        "TBL Kabupaten Bangka Selatan",
        "KBA Kabupaten Bangka Tengah",
        "MTK Kabupaten Bangka Barat",
        "MGR Kabupaten Belitung Timur",
        "PGP Kota Pangkal Pinang"
    ];

    var KEPULAUAN_RIAU = [
        "BSB Kabupaten Bintan",
        "TBK Kabupaten Karimun",
        "RAN Kabupaten Natuna",
        "DKL Kabupaten Lingga",
        "TRP Kabupaten Kepulauan Anambas",
        "BTM Kota Batam",
        "TPG Kota Tanjung Pinang"
    ];

    var DKI_JAKARTA = [
        "KSU Kabupaten Adm. Kepulauan Seribu",
        "TNA Kota Administrasi Jakarta Pusat",
        "TJP Kota Administrasi Jakarta Utara",
        "GGP Kota Administrasi Jakarta Barat",
        "KYB Kota Administrasi Jakarta Selatan",
        "CKG Kota Administrasi Jakarta Timur"
    ];

    var JAWA_BARAT = [
        "CBI Kabupaten Bogor",
        "SBM Kabupaten Sukabumi",
        "CJR Kabupaten Cianjur",
        "SOR Kabupaten Bandung",
        "GRT Kabupaten Garut",
        "SPA Kabupaten Tasikmalaya",
        "CMS Kabupaten Ciamis",
        "KNG Kabupaten Kuningan",
        "SBR Kabupaten Cirebon",
        "MJL Kabupaten Majalengka",
        "SMD Kabupaten Sumedang",
        "IDM Kabupaten Indramayu",
        "SNG Kabupaten Subang",
        "PWK Kabupaten Purwakarta",
        "KWG Kabupaten Karawang",
        "CKR Kabupaten Bekasi",
        "NPH Kabupaten Bandung Barat",
        "BGR Kota Bogor",
        "SKB Kota Sukabumi",
        "BDG Kota Bandung",
        "CBN Kota Cirebon",
        "BKS Kota Bekasi",
        "DPK Kota Depok",
        "CMH Kota Cimahi",
        "TSM Kota Tasikmalaya",
        "BJR Kota Banjar"
    ];

    var JAWA_TENGAH = [
        "CLP Kabupaten Cilacap",
        "PWT Kabupaten Banyumas",
        "PBG Kabupaten Purbalingga",
        "BNR Kabupaten Banjarnegara",
        "KBM Kabupaten Kebumen",
        "PWR Kabupaten Purworejo",
        "WSB Kabupaten Wonosobo",
        "MKD Kabupaten Magelang",
        "BYL Kabupaten Boyolali",
        "KLN Kabupaten Klaten",
        "SKH Kabupaten Sukoharjo",
        "WNG Kabupaten Wonogiri",
        "KRG Kabupaten Karanganyar",
        "SGN Kabupaten Sragen",
        "PWD Kabupaten Grobogan",
        "BLA Kabupaten Blora",
        "RBG Kabupaten Rembang",
        "PTI Kabupaten Pati",
        "KDS Kabupaten Kudus",
        "JPA Kabupaten Jepara",
        "DMK Kabupaten Demak",
        "UNR Kabupaten Semarang",
        "TMG Kabupaten Temanggung",
        "KDL Kabupaten Kendal",
        "BTG Kabupaten Batang",
        "KJN Kabupaten Pekalongan",
        "PML Kabupaten Pemalang",
        "SLW Kabupaten Tegal",
        "BBS Kabupaten Brebes",
        "MGG Kota Magelang",
        "SKT Kota Surakarta",
        "SLT Kota Salatiga",
        "SMG Kota Semarang",
        "PKL Kota Pekalongan",
        "TGL Kota Tegal"
    ];

    var DI_YOGYAKARTA = [
        "WAT Kabupaten Kulon Progo",
        "BTL Kabupaten Bantul",
        "WNO Kabupaten Gunungkidul",
        "SMN Kabupaten Sleman",
        "YYK Kota Yogyakarta"
    ];

    var JAWA_TIMUR = [
        "PCT Kabupaten Pacitan",
        "PNG Kabupaten Ponorogo",
        "TRK Kabupaten Trenggalek",
        "TLG Kabupaten  Tulungagung",
        "KNR Kabupaten Blitar",
        "KDR Kabupaten Kediri",
        "KPN Kabupaten Malang",
        "LMJ Kabupaten Lumajang",
        "JMR Kabupaten Jember",
        "BYW Kabupaten Banyuwangi",
        "BDW Kabupaten Bondowoso",
        "SIT Kabupaten Situbondo",
        "KRS Kabupaten Probolinggo",
        "PSR Kabupaten Pasuruan",
        "SDA Kabupaten Sidoarjo",
        "MJK Kabupaten Mojokerto",
        "JBG Kabupaten Jombang",
        "NJK Kabupaten Nganjuk",
        "MJY Kabupaten Madiun",
        "MGT Kabupaten Magetan",
        "NGW Kabupaten Ngawi",
        "BJN Kabupaten Bojonegoro",
        "TBN Kabupaten Tuban",
        "LMG Kabupaten Lamongan",
        "GSK Kabupaten Gresik",
        "BKL Kabupaten Bangkalan",
        "SPG Kabupaten Sampang",
        "PMK Kabupaten  Pamekasan",
        "SMP Kabupaten Sumenep",
        "KDR Kota Kediri",
        "BLT Kota Blitar",
        "MLG Kota Malang",
        "PBL Kota Probolinggo",
        "PSN Kota Pasuruan",
        "MJK Kota Mojokerto",
        "MAD Kota Madiun",
        "SBY Kota Surabaya",
        "BTU Kota Batu"
    ];

    var BANTEN = [
        "PDG Kabupaten Pandeglang",
        "RKB Kabupaten Lebak",
        "TGR Kabupaten Tangerang",
        "SRG Kabupaten Serang",
        "TNG Kota Tangerang",
        "CLG Kota Cilegon",
        "SRG Kota Serang",
        "CPT Kota Tangerang Selatan"
    ];

    var BALI = [
        "NGA Kabupaten Jembrana",
        "TAB Kabupaten Tabanan",
        "MGW Kabupaten Badung",
        "GIN Kabupaten Gianyar",
        "SRP Kabupaten Klungkung",
        "BLI Kabupaten Bangli",
        "KRA Kabupaten Karangasem",
        "SGR Kabupaten Buleleng",
        "DPR Kota Denpasar"
    ];

    var NUSA_TENGGARA_BARAT = [
        "GRG Kabupaten Lombok Barat",
        "PYA Kabupaten Lombok Tengah",
        "SEL Kabupaten Lombok Timur",
        "SBW Kabupaten Sumbawa",
        "DPU Kabupaten Dompu",
        "WHO Kabupaten Bima",
        "TLW Kabupaten Sumbawa Barat",
        "TJN Kabupaten Lombok Utara",
        "MTR Kota Mataram",
        "BIM Kota Bima"
    ];

    var NUSA_TENGGARA_TIMUR = [
        "KPG Kabupaten Kupang",
        "SOE Kabupaten Timor Tengah Selatan",
        "KFM Kabupaten Timor Tengah Utara",
        "ATB Kabupaten Belu",
        "KLB Kabupaten Alor",
        "LRT Kabupaten Flores Timur",
        "MME Kabupaten Sikka",
        "END Kabupaten Ende",
        "BJW Kabupaten Ngada",
        "RTG Kabupaten Manggarai",
        "WGP Kabupaten Sumba Timur",
        "WKB Kabupaten Sumba Barat",
        "LWL Kabupaten Lembata",
        "BAA Kabupaten Rote Ndao",
        "LBJ Kabupaten Manggarai Barat",
        "MBY Kabupaten Nagekeo",
        "WBL Kabupaten Sumba Tengah",
        "TAM Kabupaten Sumba Barat Daya",
        "BRG Kabupaten Manggarai Timur",
        "SBB Kabupaten Sabu Raijua",
        "KPG Kota Kupang"
    ];

    var KALIMANTAN_BARAT = [
        "SBS Kabupaten Sambas",
        "MPW Kabupaten Pontianak",
        "SAG Kabupaten Sanggau",
        "KTP Kabupaten Ketapang",
        "STG Kabupaten Sintang",
        "PTS Kabupaten Kapuas Hulu",
        "BEK Kabupaten  Bengkayang",
        "NBA Kabupaten Landak",
        "SED Kabupaten Sekadau",
        "NGP Kabupaten Melawi",
        "SKD Kabupaten Kayong Utara",
        "SRY Kabupaten Kubu Raya",
        "PTK Kota Pontianak",
        "SKW Kota Singkawang"
    ];

    var KALIMANTAN_TENGAH = [
        "PBU Kabupaten Kotawaringin Barat",
        "SPT Kabupaten Kotawaringin Timur",
        "KLK Kabupaten Kapuas",
        "BNT Kabupaten Barito Selatan",
        "MTW Kabupaten Barito Utara",
        "KSN Kabupaten Katingan",
        "KLP Kabupaten Seruyan",
        "SKR Kabupaten Sukamara",
        "NGB Kabupaten Lamandau",
        "KKN Kabupaten Gunung Mas",
        "PPS Kabupaten Pulang Pisau",
        "PRC Kabupaten Murung Raya",
        "TML Kabupaten Barito Timur",
        "PLK Kota Palangka Raya"
    ];

    var KALIMANTAN_SELATAN = [
        "PLI Kabupaten Tanah Laut",
        "KBR Kabupaten Kotabaru",
        "MTP Kabupaten Banjar",
        "MRH Kabupaten Barito Kuala",
        "RTA Kabupaten Tapin",
        "KGN Kabupaten Hulu Sungai Selatan",
        "BRB Kabupaten Hulu Sungai Tengah",
        "AMT Kabupaten Hulu Sungai Utara",
        "TJG Kabupaten Tabalong",
        "BLN Kabupaten Tanah Bumbu",
        "PRN Kabupaten Balangan",
        "BJM Kota Banjarmasin",
        "BJB Kota Banjarbaru"
    ];

    var KALIMANTAN_TIMUR = [
        "TGT Kabupaten Paser",
        "TRG Kabupaten Kutai Kartanegara",
        "TNR Kabupaten Berau",
        "TJS Kabupaten Bulungan",
        "NNK Kabupaten Nunukan",
        "MLN Kabupaten Malinau",
        "SDW Kabupaten Kutai Barat",
        "SGT Kabupaten Kutai Timur",
        "PNJ Kabupaten Penajam Paser Utara",
        "TDP Kabupaten Tana Tidung",
        "BPP Kota Balikpapan",
        "SMR Kota Samarinda",
        "TAR Kota Tarakan",
        "BON Kota Bontang"
    ];

    var SULAWESI_UTARA = [
        "LLK Kabupaten Bolaang Mongondow",
        "TNN Kabupaten Minahasa",
        "THN Kabupaten Kepulauan Sangihe",
        "MGN Kabupaten Kepulauan Talaud",
        "AMR Kabupaten Minahasa Selatan",
        "ARM Kabupaten Minahasa Utara",
        "RTN Kabupaten Minahasa Tenggara",
        "BRK Kabupaten Bolaang Mongondow Utara",
        "ODS Kabupaten Kepulauan Siau Tagulandang Biaro",
        "TTY Kabupaten Bolaang Mongondow Timur",
        "BLU Kabupaten Bolaang Mongondow Selatan",
        "MND Kota Manado",
        "BIT Kota Bitung",
        "TMH Kota Tomohon",
        "KTG Kota Kotamobagu"
    ];

    var SULAWESI_TENGAH = [
        "LWK Kabupaten Banggai",
        "PSO Kabupaten Poso",
        "DGL Kabupaten Donggala",
        "TLI Kabupaten Toli Toli",
        "BUL Kabupaten Buol",
        "BGK Kabupaten Morowali",
        "SKN Kabupaten Banggai Kepulauan",
        "PRG Kabupaten Parigi Moutong",
        "APN Kabupaten Tojo Una Una",
        "SGB Kabupaten Sigi",
        "PAL Kota Palu",
        "BEN Kabupaten Kepulauan Selayar",
        "BLK Kabupaten Bulukumba",
        "BAN Kabupaten Bantaeng",
        "JNP Kabupaten Jeneponto",
        "TKA Kabupaten Takalar",
        "SGM Kabupaten Gowa",
        "SNJ Kabupaten Sinjai",
        "WTP Kabupaten Bone",
        "MRS Kabupaten Maros",
        "PKJ Kabupaten Pangkajene Kepulauan",
        "BAR Kabupaten Barru",
        "WNS Kabupaten Soppeng",
        "SKG Kabupaten Wajo",
        "SDR Kabupaten Sidenreng Rappang",
        "PIN Kabupaten Pinrang",
        "ENR Kabupaten Enrekang",
        "PLP Kabupaten Luwu",
        "MAK Kabupaten Tana Toraja",
        "MSB Kabupaten Luwu Utara",
        "MLL Kabupaten Luwu Timur",
        "RTP Kabupaten Toraja Utara",
        "MKS Kota Makassar",
        "PRE Kota Pare Pare",
        "PLP Kota Palopo"
    ];

    var SULAWESI_TENGGARA = [
        "KKA Kabupaten Kolaka",
        "UNH Kabupaten Konawe",
        "RAH Kabupaten Muna",
        "PSW Kabupaten Buton",
        "ADL Kabupaten Konawe Selatan",
        "RMB Kabupaten Bombana",
        "WGW Kabupaten Wakatobi",
        "LSS Kabupaten Kolaka Utara",
        "WGD Kabupaten Konawe Utara",
        "BNG Kabupaten Buton Utara",
        "KDI Kota Kendari",
        "BAU Kota Bau Bau"
    ];

    var GORONTALO = [
        "GTO Kabupaten Gorontalo",
        "TMT Kabupaten Boalemo",
        "SWW Kabupaten Bone Bolango",
        "MAR Kabupaten Pahuwato",
        "KWD Kabupaten Gorontalo Utara",
        "GTO Kota Gorontalo"
    ];

    var SULAWESI_BARAT = [
        "PKY Kabupaten Mamuju Utara",
        "MAM Kabupaten Mamuju",
        "MMS Kabupaten Mamasa",
        "PLW Kabupaten Polewali Mandar",
        "MJN Kabupaten Majene"
    ];

    var MALUKU = [
        "MSH Kabupaten Maluku Tengah",
        "TUL Kabupaten Maluku Tenggara",
        "SML Kabupaten Maluku Tenggara Barat",
        "NLA Kabupaten Buru",
        "DTH Kabupaten Seram Bagian Timur",
        "DRH Kabupaten Seram Bagian Barat",
        "DOB Kabupaten Kepulauan Aru",
        "TKR Kabupaten Maluku Barat Daya",
        "NMR Kabupaten Buru Selatan",
        "AMB Kota Ambon",
        "TUL Kota Tual"
    ];

    var MALUKU_UTARA = [
        "JLL Kabupaten Halmahera Barat",
        "WED Kabupaten Halmahera Tengah",
        "TOB Kabupaten Halmahera Utara",
        "LBA Kabupaten Halmahera Selatan",
        "SNN Kabupaten Kepulauan Sula",
        "MAB Kabupaten Halmahera Timur",
        "MTS Kabupaten Pulau Morotai",
        "TTE Kota Ternate",
        "TDR Kota Tidore Kepulauan"
    ];

    var PAPUA = [
        "MRK Kabupaten Merauke",
        "WAM Kabupaten Jayawijaya",
        "JAP Kabupaten Jayapura",
        "NAB Kabupaten Nabire",
        "SRU Kabupaten Kepulauan Yapen",
        "BIK Kabupaten Biak Numfor",
        "MUL Kabupaten Puncak Jaya",
        "ERT Kabupaten Paniai",
        "TIM Kabupaten Mimika",
        "SMI Kabupaten Sarmi",
        "WRS Kabupaten Keerom",
        "OSB Kabupaten Pegunungan Bintang",
        "SMH Kabupaten Yahukimo",
        "KBG Kabupaten Tolikara",
        "BTW Kabupaten Waropen",
        "TMR Kabupaten Boven Digoel",
        "KEP Kabupaten Mappi",
        "AGT Kabupaten Asmat",
        "SRW Kabupaten Supiori",
        "BRM Kabupaten Mamberamo Raya",
        "KBK Kabupaten Mamberamo Tengah",
        "ELL Kabupaten Yalimo",
        "TOM Kabupaten Lanny Jaya",
        "KYM Kabupaten Nduga",
        "ILG Kabupaten Puncak",
        "KGM Kabupaten Dogiyai",
        "SGP Kabupaten Intan Jaya",
        "TIG Kabupaten Deiyai",
        "JAP Kota Jayapura"
    ];

    var PAPUA_BARAT = [
        "AMS Kabupaten Sorong",
        "MNK Kabupaten Manokwari",
        "FFK Kabupaten Fak Fak",
        "TMB Kabupaten Sorong Selatan",
        "WAS Kabupaten Raja Ampat",
        "BTI Kabupaten Teluk Bintuni",
        "RAS Kabupaten Teluk Wondama",
        "KMN Kabupaten Kaimana",
        "FEF Kabupaten Tambrauw",
        "AFT Kabupaten Maybrat",
        "SON Kota Sorong"
    ]
    var items;
    if (provinsi == "AC NANGRO ACEH DARUSSALAM") {
        items = NANGRO_ACEH_DARUSSALAM;

    } else if (provinsi == "SU Sumatera Utara") {
        items = SUMATERA_UTARA;

    } else if (provinsi == "SB Sumatera Barat") {
        items = SUMATERA_BARAT;

    } else if (provinsi == "RI Riau") {
        items = RIAU;

    } else if (provinsi == "JA Jambi") {
        items = JAMBI;

    } else if (provinsi == "SS Sumatera Selatan") {
        items = SUMATERA_SELATAN;

    } else if (provinsi == "BE Bengkulu") {
        items = BENGKULU;

    } else if (provinsi == "LA Lampung") {
        items = LAMPUNG;

    } else if (provinsi == "BB Kepulauan Bangka Belitung") {
        items = KEPUALAN_BANGKA_BELITUNG;

    } else if (provinsi == "KR Kepulauan Riau") {
        items = KEPULAUAN_RIAU;

    } else if (provinsi == "JK D.K.I. Jakarta") {
        items = DKI_JAKARTA;

    } else if (provinsi == "JB Jawa Barat") {
        items = JAWA_BARAT;

    } else if (provinsi == "JT Jawa Tengah") {
        items = JAWA_TENGAH;

    } else if (provinsi == "YO DI Yogyakarta") {
        items = DI_YOGYAKARTA;

    } else if (provinsi == "JI Jawa Timur") {
        items = JAWA_TIMUR;

    } else if (provinsi == "BT Banten") {
        items = BANTEN;

    } else if (provinsi == "BA Bali") {
        items = BALI;

    } else if (provinsi == "NB Nusa Tenggara Barat") {
        items = NUSA_TENGGARA_BARAT;

    } else if (provinsi == "NT Nusa Tenggara Timur") {
        items = NUSA_TENGGARA_TIMUR;

    } else if (provinsi == "KB Kalimantan Barat") {
        items = KALIMANTAN_BARAT;

    } else if (provinsi == "KT Kalimantan Tengah") {
        items = KALIMANTAN_TENGAH;

    } else if (provinsi == "KS Kalimantan Selatan") {
        items = KALIMANTAN_SELATAN;

    } else if (provinsi == "KI Kalimantan Timur") {
        items = KALIMANTAN_TIMUR;

    } else if (provinsi == "SA Sulawesi Utara") {
        items = SULAWESI_UTARA;

    } else if (provinsi == "ST Sulawesi TENGAH") {
        items = SULAWESI_TENGAH;

    } else if (provinsi == "SG Sulawesi Tenggara") {
        items = SULAWESI_TENGGARA;

    } else if (provinsi == "GO Gorontalo") {
        items = GORONTALO;

    } else if (provinsi == "SR Sulawesi Barat") {
        items = SULAWESI_BARAT;

    } else if (provinsi == "MA Maluku") {
        items = MALUKU;

    } else if (provinsi == "MU Maluku Utara") {
        items = MALUKU_UTARA;

    } else if (provinsi == "PA Papua") {
        items = PAPUA;

    } else if (provinsi == "PB Papua Barat") {
        items = PAPUA_BARAT;

    } else {
        items = [];
    }

    var str = "";

    for (var item of items) {
        str += "<option value=" + "\"" + item + "\"" + ">" + item.split(" ").slice(1,).join(" ") + "</option>";
    }

    document.getElementById("kabkota").innerHTML = str;
}
