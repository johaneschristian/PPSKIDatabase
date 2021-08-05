from flask import Blueprint, render_template, request, flash, redirect, url_for
from . import db
from .models import User, TemporaryUser
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user
import sqlalchemy
import csv

auth = Blueprint('auth', __name__)
provinsi = \
    ["AC NANGRO ACEH DARUSSALAM",
     "SU Sumatera Utara",
     "SB Sumatera Barat",
     "RI Riau",
     "JA Jambi",
     "SS Sumatera Selatan",
     "BE Bengkulu",
     "LA Lampung",
     "BB Kepulauan Bangka Belitung",
     "KR Kepulauan Riau",
     "JK D.K.I. JAKARTA",
     "JB Jawa Barat",
     "JT Jawa Tengah",
     "YO D.I. YOGYAKARTA",
     "JI Jawa Timur",
     "BT Banten",
     "BA Bali",
     "NB Nusa Tenggara Barat",
     "NT Nusa Tenggara Timur",
     "KB Kalimantan Barat",
     "KT Kalimantan Tengah",
     "KS Kalimantan Selatan",
     "KI Kalimantan Timur",
     "SA Sulawesi Utara",
     "ST Sulawesi Tengah",
     "KI Kalimantan Timur",
     "SG Sulawesi Tenggara",
     "GO Gorontalo",
     "SR Sulawesi Barat",
     "MA Maluku",
     "MU Maluku Utara",
     "PA Papua",
     "PB Papua Barat"]

kumpulankabkota = \
    ["TTN Kabupaten Aceh Selatan",
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
    "SUS Kota Subulussalam",
    "SBG Kabupaten Tapanuli Tengah",
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
    "GST Kota Gunungsitoli",
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
    "PMN Kota Pariaman",
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
    "DUM Kota Dumai",
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
    "SPN Kota Sungai Penuh",
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
    "PBM Kota Prabumulih",
    "MNA Kabupaten Bengkulu Selatan",
    "CRP Kabupaten Rejang Lebong",
    "AGM Kabupaten Bengkulu Utara",
    "BHN Kabupaten Kaur",
    "TAS Kabupaten Seluma",
    "MKM Kabupaten Muko Muko",
    "TUB Kabupaten Lebong",
    "KPH Kabupaten Kepahiang",
    "KRT Kabupaten Bengkulu Tengah",
    "BGL Kota Bengkulu",
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
    "MET Kota Metro",
    "SGL Kabupaten Bangka",
    "TDN Kabupaten Belitung",
    "TBL Kabupaten Bangka Selatan",
    "KBA Kabupaten Bangka Tengah",
    "MTK Kabupaten Bangka Barat",
    "MGR Kabupaten Belitung Timur",
    "PGP Kota Pangkal Pinang",
    "BSB Kabupaten Bintan",
    "TBK Kabupaten Karimun",
    "RAN Kabupaten Natuna",
    "DKL Kabupaten Lingga",
    "TRP Kabupaten Kepulauan Anambas",
    "BTM Kota Batam",
    "TPG Kota Tanjung Pinang",
    "KSU Kabupaten Adm. Kepulauan Seribu",
    "TNA Kota Administrasi Jakarta Pusat",
    "TJP Kota Administrasi Jakarta Utara",
    "GGP Kota Administrasi Jakarta Barat",
    "KYB Kota Administrasi Jakarta Selatan",
    "CKG Kota Administrasi Jakarta Timur",
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
    "BJR Kota Banjar",
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
    "TGL Kota Tegal",
    "WAT Kabupaten Kulon Progo",
    "BTL Kabupaten Bantul",
    "WNO Kabupaten Gunungkidul",
    "SMN Kabupaten Sleman",
    "YYK Kota Yogyakarta",
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
    "BTU Kota Batu",
    "PDG Kabupaten Pandeglang",
    "RKB Kabupaten Lebak",
    "TGR Kabupaten Tangerang",
    "SRG Kabupaten Serang",
    "TNG Kota Tangerang",
    "CLG Kota Cilegon",
    "SRG Kota Serang",
    "CPT Kota Tangerang Selatan",
    "NGA Kabupaten Jembrana",
    "TAB Kabupaten Tabanan",
    "MGW Kabupaten Badung",
    "GIN Kabupaten Gianyar",
    "SRP Kabupaten Klungkung",
    "BLI Kabupaten Bangli",
    "KRA Kabupaten Karangasem",
    "SGR Kabupaten Buleleng",
    "DPR Kota Denpasar",
    "GRG Kabupaten Lombok Barat",
    "PYA Kabupaten Lombok Tengah",
    "SEL Kabupaten Lombok Timur",
    "SBW Kabupaten Sumbawa",
    "DPU Kabupaten Dompu",
    "WHO Kabupaten Bima",
    "TLW Kabupaten Sumbawa Barat",
    "TJN Kabupaten Lombok Utara",
    "MTR Kota Mataram",
    "BIM Kota Bima",
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
    "KPG Kota Kupang",
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
    "SKW Kota Singkawang",
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
    "PLK Kota Palangka Raya",
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
    "BJB Kota Banjarbaru",
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
    "BON Kota Bontang",
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
    "KTG Kota Kotamobagu",
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
    "PLP Kota Palopo",
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
    "BAU Kota Bau Bau",
    "GTO Kabupaten Gorontalo",
    "TMT Kabupaten Boalemo",
    "SWW Kabupaten Bone Bolango",
    "MAR Kabupaten Pahuwato",
    "KWD Kabupaten Gorontalo Utara",
    "GTO Kota Gorontalo",
    "PKY Kabupaten Mamuju Utara",
    "MAM Kabupaten Mamuju",
    "MMS Kabupaten Mamasa",
    "PLW Kabupaten Polewali Mandar",
    "MJN Kabupaten Majene",
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
    "TUL Kota Tual",
    "JLL Kabupaten Halmahera Barat",
    "WED Kabupaten Halmahera Tengah",
    "TOB Kabupaten Halmahera Utara",
    "LBA Kabupaten Halmahera Selatan",
    "SNN Kabupaten Kepulauan Sula",
    "MAB Kabupaten Halmahera Timur",
    "MTS Kabupaten Pulau Morotai",
    "TTE Kota Ternate",
    "TDR Kota Tidore Kepulauan",
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
    "JAP Kota Jayapura",
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
    "SON Kota Sorong",
]


@auth.route('/reset-password/<int:id>', methods=["GET"])
def resetPassword(id):
    if request.method == "GET":
        if current_user.status != "admin":
            return "<p>Access Denied</p>"
        else:
            user = User.query.get(id)
            user.password = generate_password_hash(f"ppski2021{id}")
            db.session.commit()
            print(f"ppski2021{id}")
            return redirect(url_for('views.displayTable'))

@auth.route("/masuk", methods=["GET", "POST"])
def masuk():
    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            # flash("Successful login. Redirecting to Homepage.", category="successful")
            login_user(user, remember=True)

            if user.status != "admin":
                return redirect(url_for("views.userDashboard"))
            else:
                return redirect(url_for("views.adminDashboard"))

        else:
            flash("Username atau password salah.",
            category="error")

    return render_template("masuk.html", accessing_user=current_user)

@auth.route('/migrate-user')
def migrateUser():
    with open('/Users/johanestarigan/Downloads/tb_anggota_2021-Jul-12_0928/tb_anggota_2021-Jul-12_0928.csv') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for cleaned in spamreader:
            id_ppski = cleaned[15][1:-1]
            kabupaten_kota = cleaned[13][1:-1]
            provinsi = cleaned[12][1:-1]
            nomor_telepon = '0'+ cleaned[7][1:-1]
            nama_lengkap = cleaned[1][1:-1]
            email = cleaned[5][1:-1]
            nama_tempat = cleaned[4][1:-1]
            tempat_mengajar = cleaned[3][1:-1]
            akun_facebook = cleaned[6][1:-1]
            try:
                tempUser = User(status="permanen", nama_lengkap=nama_lengkap, id_ppski=id_ppski, email=email,
                                password=generate_password_hash('ppski2021'), pendidikan=None,
                                tempat_mengajar=tempat_mengajar, nama_tempat=nama_tempat, akun_facebook=akun_facebook,
                                nomor_telepon=nomor_telepon, provinsi=provinsi,
                                kabupaten_kota=kabupaten_kota
                                )
                db.session.add(tempUser)
                db.session.commit()
            except sqlalchemy.exc.IntegrityError:
                db.session.rollback()

    return redirect(url_for("views.home"))

@auth.route('/make-admin/<int:id>')
@login_required
def makeAdmin(id):
    if current_user.id != 1:
        return "<p>Access Denied</p>"

    user = User.query.get(id)
    if user and user.status != 'admin':
        user.status = 'admin'
        db.session.commit()

    return redirect(url_for("views.displayTable"))


@auth.route('/revoke-admin/<int:id>')
@login_required
def revokeAdmin(id):
    if current_user.id != 1:
        return "<p>Access Denied</p>"

    user = User.query.get(id)
    if user and user.status != 'permanen':
        user.status = 'permanen'
        db.session.commit()

    return redirect(url_for("views.displayTable"))

@auth.route('/generate-admin')
def generateAdmin():
    admin = User(status="admin", email="admin@admin.com",password=generate_password_hash("admin"))
    db.session.add(admin)
    db.session.commit()
    flash("Admin user-created")
    return redirect(url_for("views.home"))


@auth.route("/daftar-anggota", methods=["GET", "POST"])
def daftarAnggota():
    if request.method == "POST":
        status = "temporer"
        email = request.form.get('email')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        nama_lengkap = request.form.get('nama')
        pendidikan = request.form.get('pendidikan')
        tempat_mengajar = request.form.get('sekolah_tempat_mengajar')
        nama_tempat = request.form.get('nama-sekolah-lembaga')
        akun_facebook = request.form.get('akun-facebook')
        nomor_telepon = request.form.get('nomortelepon')
        provinsiInput = request.form.get('provinsi')
        kabupaten_kota = request.form.get('kabkota')
        esai_singkat = request.form.get('esai')
        print(status, email, password1, password2, nama_lengkap, pendidikan,
              tempat_mengajar, akun_facebook, nomor_telepon,
              provinsiInput, kabupaten_kota, esai_singkat)
        try:
            newUser = TemporaryUser(status=status, email=email,
                           password=generate_password_hash(password1), nama_lengkap=nama_lengkap,
                           pendidikan=pendidikan, tempat_mengajar=tempat_mengajar,
                           akun_facebook=akun_facebook, nomor_telepon=nomor_telepon,
                           nama_tempat=nama_tempat,
                           provinsi=provinsiInput, kabupaten_kota=kabupaten_kota,
                           esai_singkat=esai_singkat)

            db.session.add(newUser)
            db.session.commit()
            flash("Berhasil Mendaftar!", category="success")
            return redirect(url_for("auth.telahMendaftar"))

        except sqlalchemy.exc.IntegrityError:
            flash("Akun surel sudah terdaftar di dalam database", category="error")
            return redirect('auth.telahMendaftar')

    return render_template("beranda.html", provinsi=provinsi, kumpulankabkota=kumpulankabkota,
                           accessing_user=current_user)


@auth.route('/telah-mendaftar', methods=["GET"])
def telahMendaftar():
    return render_template("telah-mendaftar.html", accessing_user=current_user)


@auth.route('/keluar', methods=["GET"])
@login_required
def keluar():
    logout_user()
    return redirect(url_for("auth.masuk"))