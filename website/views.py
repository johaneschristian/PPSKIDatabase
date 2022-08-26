from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_required, current_user
from werkzeug.security import check_password_hash, generate_password_hash
from website.send_email import process_message
from .auth import provinsi, db, kumpulankabkota
from .models import User, TemporaryUser
import sqlalchemy
import datetime


views = Blueprint('views', __name__)
calon_ditolak = set()
calon_diterima = set()

@views.route('/ringkasan-anggota', methods=["GET", "POST"])
def ringkasanAngggota():
    jenis_pendidikan_terakhir = ['S1 Pendidikan Kimia',
                                 'S1 Kimia Sains',
                                 'S1 Teknik Kimia',
                                 'S2 Pendidikan Kimia',
                                 'S2 Kimia Sains',
                                 'S2 Teknik Kimia',
                                 'S3 Pendidikan Kimia',
                                 'S3 Kimia Sains',
                                 'S3 Teknik Kimia']

    jenis_tempat_mengajar = [
        'SMA/MA',
        'SMK/MAK',
        'Perguruan Tinggi',
        'Pend. nonformal jenjang SMA atau lebih tinggi'
    ]

    jumlah_per_provinsi = []
    jenjang_tempat_mengajar = []
    pendidikan_terakhir = []
    jumlah_anggota = db.session.query(User).count()

    for p in provinsi:
        jumlah_per_provinsi.append((p, db.session.query(User).filter(User.provinsi.like(f'%{p}%')).count()))

    for j in jenis_pendidikan_terakhir:
        pendidikan_terakhir.append((j, db.session.query(User).filter(User.pendidikan.like(f'{j}')).count()))

    for i in jenis_tempat_mengajar:
        jenjang_tempat_mengajar.append((i, db.session.query(User).filter(User.tempat_mengajar.like(f'{i}')).count()))

    return render_template('ringkasan-anggota.html', jumlah_per_provinsi=jumlah_per_provinsi,
                           pendidikan_terakhir=pendidikan_terakhir,
                           jenjang_tempat_mengajar=jenjang_tempat_mengajar,
                           accessing_user=current_user,
                           jumlah_anggota=jumlah_anggota)


def generateID(paramProvinsi, tahunRegistrasi, nomorUrut, kabkota):
    provinsiKey = paramProvinsi.split()[0]
    kabkota = kabkota.split()[0]
    tahunEmbed = tahunRegistrasi % 100
    nomorEmbed = nomorUrut % 10000
    return provinsiKey + str(tahunEmbed) + str(nomorEmbed).zfill(4) + \
           kabkota


@views.route('/', methods=["GET", "POST"])
def home():
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
        
        try:
            if not (email and password1 and password2 and nama_lengkap and
                    pendidikan and tempat_mengajar and nama_tempat
                    and nomor_telepon and provinsiInput and kabupaten_kota and esai_singkat):
                flash("Terdapat bagian kosong. Harap mengisi seluruh komponen isian.", category="error")

            elif not nomor_telepon.isnumeric():
                flash("Nomor telepon tidak valid", category="error")

            elif (password1 != password2):
                flash("Password dan konfirmasi password berbeda", category="error")

            elif not 7 <= len(password1) <= 36:
                flash("Panjang password tidak 7 sampai 12 karakter, harap mencoba lagi.", category="error")

            elif not any(char.isupper() for char in password1):
                flash("Password tidak mengandung huruf kapital, harap mencoba lagi.", category="error")

            elif not any(char.islower() for char in password1):
                flash("Password tidak mengandung huruf kecil, harap mencoba lagi.", category="error")

            elif not any(char.isalpha() for char in password1):
                flash("Password tidak mengandung karakter huruf, harap mencoba lagi.", category="error")

            elif not any(char.isnumeric() for char in password1):
                flash("Password tidak mengandung karakter angka, harap mencoba lagi.", category="error")

            else:
                newUser = TemporaryUser(status=status, email=email,
                                        password=generate_password_hash(password1), nama_lengkap=nama_lengkap,
                                        pendidikan=pendidikan, tempat_mengajar=tempat_mengajar,
                                        akun_facebook=akun_facebook, nomor_telepon=nomor_telepon,
                                        nama_tempat=nama_tempat,
                                        provinsi=provinsiInput, kabupaten_kota=kabupaten_kota,
                                        esai_singkat=esai_singkat)

                db.session.add(newUser)
                db.session.commit()

                return redirect(url_for("auth.telahMendaftar"))

        except sqlalchemy.exc.IntegrityError:
            flash("Akun surel sudah terdaftar di dalam database", category="error")

    return render_template("beranda.html", provinsi=provinsi, accessing_user=current_user,
                           kumpulankabkota=kumpulankabkota)


@views.route('/cek-data-anggota', methods=["GET", "POST"])
def cekAnggota():
    matching_array = []
    cari_nama = ""
    if request.method == "POST":
        keyword = request.form.get('nama').strip()
        if not len(keyword) < 2:
            matching_array = db.session.query(User).filter(User.nama_lengkap.like(f'%{keyword}%'))
            cari_nama = keyword

    return render_template("cek-data-anggota.html", matching_array=matching_array, accessing_user=current_user,
                           cari_nama=cari_nama)


@views.route('/dashboard-navigator')
@login_required
def dashboardNavigator():
    if current_user.status == "admin":
        return redirect(url_for("views.adminDashboard"))
    else:
        return redirect(url_for("views.userDashboard"))


@views.route('/user-dashboard', methods=["GET", "POST"])
@login_required
def userDashboard():
    return render_template("user-dashboard.html", accessing_user=current_user)


@views.route('/edit-profil', methods=["GET", "POST"])
@login_required
def userEdit():
    if request.method == "POST":
        pendidikan = request.form.get("pendidikan")
        tempat_mengajar = request.form.get("sekolah_tempat_mengajar")
        nama_tempat = request.form.get("nama-sekolah-lembaga")
        akun_facebook = request.form.get("akun-facebook")
        nomor_telepon = request.form.get("nomortelepon")
        provinsiParam = request.form.get("provinsi")
        kabupaten_kota = request.form.get("kabkota")
        esai_singkat = request.form.get("esai")

        if not (pendidikan and tempat_mengajar and nama_tempat
                and nomor_telepon and provinsiParam and kabupaten_kota):
            flash("Terdapat bagian kosong. Harap mengisi seluruh komponen isian.", category="error")

        else:
            current_user.pendidikan = pendidikan
            current_user.tempat_mengajar = tempat_mengajar
            current_user.nama_tempat = nama_tempat
            current_user.akun_facebook = akun_facebook
            current_user.nomor_telepon = nomor_telepon
            current_user.provinsi = provinsiParam
            current_user.kabupaten_kota = kabupaten_kota
            current_user.esai_singkat = esai_singkat
            db.session.commit()
            flash("Data Anda berhasil di update.")
            return redirect(url_for("views.userDashboard"))
    global provinsi
    return render_template("user-edit.html", paramUser=current_user, provinsi=provinsi, kumpulankabkota=kumpulankabkota,
                           accessing_user=current_user)


@views.route('/admin-dashboard', methods=["GET", "POST"])
@login_required
def adminDashboard():
    if current_user.status != "admin":
        return "<p>Access Denied</p>"

    if request.method == "POST":
        pass

    return render_template("admin-dashboard.html", accessing_user=current_user)


@views.route('/table-display', methods=["GET", "POST"])
@login_required
def displayTable():
    
    if current_user.status != "admin":
        return "<p>Access Denied</p>"
    else:
        global provinsi

        page = request.args.get('page', 1, type=int)

        # Request method is GET when the user access table for the first time or traversing pagination (in this case,
        # the query filter is the previous or empty)
        if request.method == 'GET':
            previous_nama = request.args.get('nama', '', type=str)
            previous_provinsi = request.args.get('provinsi', '', type=str)
            previous_kota = request.args.get('kabupaten_kota', '', type=str)
            keyword = previous_nama
            provinsifilter = previous_provinsi
            kotafilter = previous_kota

        # Request method is POST when the user access the table with new queries, the page is restarted to 1
        else:
            # Set keyword to empty string if there exist no keyword filter
            if not request.form.get('keyword'):
                keyword = ''
            else:
                keyword = request.form.get('keyword').strip()

            if not request.form.get('provinsifilter'):
                provinsifilter = ''
            else:
                provinsifilter = request.form.get('provinsifilter').strip()

            if not request.form.get('kotafilter'):
                kotafilter = ''
            else:
                kotafilter = request.form.get('kotafilter').strip()

            page = 1

        matching_array = db.session.query(User).filter(User.nama_lengkap.like(f'%{keyword}%'),
                                                       User.provinsi.like(f'%{provinsifilter}%'),
                                                       User.kabupaten_kota.like(f'%{kotafilter}%')).paginate(page=page,
                                                                                                             per_page=20)

        hasilPagination = matching_array
        permanen = hasilPagination.items
        count = len(permanen)

        # permanen = db.session.query(User)

        return render_template("table.html", permanen=permanen, accessing_user=current_user, provinsi=provinsi,
                               kumpulankabkota=kumpulankabkota,
                               count=count, hasilPagination=hasilPagination, previous_nama=keyword,
                               previous_provinsi=provinsifilter, previous_kota=kotafilter)


@views.route('/registration-queue', methods=["GET", "POST"])
@login_required
def registrationQueue():
    if current_user.status != "admin":
        return "<p>Access Denied</p>"

    if request.method == "GET":
        temporer = db.session.query(TemporaryUser)
        return render_template("registration-queue.html", temporer=temporer, accessing_user=current_user)

    return render_template("registration-queue.html", accessing_user=current_user)


@views.route('/review-calon/<int:id>', methods=["GET", "POST"])
@login_required
def reviewCalon(id):
    if current_user.status != "admin":
        return "<p>Access Denied</p>"

    paramUser = TemporaryUser.query.get(id)
    return render_template("review-calon.html", paramUser=paramUser, accessing_user=current_user)


@views.route('/delete-user/<int:id>', methods=["GET"])
@login_required
def deleteUser(id):
    if current_user.status != 'admin':
        return "<p>Access Denied</p>"

    user = User.query.get(id)
    matching_array = db.session.query(User).filter(User.nama_lengkap.like(f'%{user.nama_lengkap}%'))
    temp = matching_array[0]
    if user:
        db.session.delete(user)
        db.session.delete(temp)
        db.session.commit()

    return redirect(url_for('views.displayTable'))


@views.route('/tolak-calon/<int:id_number>', methods=["GET"])
@login_required
def tolakCalon(id_number):
    if current_user.status != "admin":
        return "<p>Access Denied</p>"
    user = TemporaryUser.query.get(id_number)
    calon_ditolak.add(user.email)
    if user:
        db.session.delete(user)
        db.session.commit()

    return redirect(url_for("views.registrationQueue"))


@views.route('/terima-calon/<int:id_number>', methods=["GET"])
@login_required
def terimaAnggota(id_number):
    if current_user.status != "admin":
        return "<p>Access Denied</p>"
    user = TemporaryUser.query.get(id_number)
    calon_diterima.add(user.email)

    if user:
        user.status = "direview"
        accepted = User(status="permanen", email=user.email,
                        password=user.password, nama_lengkap=user.nama_lengkap,
                        pendidikan=user.pendidikan, tempat_mengajar=user.tempat_mengajar,
                        akun_facebook=user.akun_facebook, nomor_telepon=user.nomor_telepon,
                        nama_tempat=user.nama_tempat,
                        provinsi=user.provinsi, kabupaten_kota=user.kabupaten_kota,
                        esai_singkat=user.esai_singkat, id_ppski=user.id_ppski)
        db.session.add(accepted)
        db.session.commit()
        year = datetime.datetime.now().year
        id_ppski = generateID(accepted.provinsi, year, accepted.id, accepted.kabupaten_kota)
        accepted.id_ppski = id_ppski
        db.session.commit()
        flash("Penerimaan berhasil", category="success")

    return redirect(url_for("views.registrationQueue"))


def addtoSet(email):
    calon_diterima.add(email)


@views.route('/temporary-redirect', methods=["GET"])
def temp():
    return redirect(url_for("views.registrationQueue"))


@views.route('/kirim-hasil-review', methods=["GET"])
@login_required
def bundleSend():
    global calon_diterima, calon_ditolak
    if current_user.status != "admin":
        return "<p>Access Denied</p>"

    process_message(calon_diterima, calon_ditolak)

    calon_diterima = set()
    calon_ditolak = set()

    flash("Pesan telah terkirim", category="success")
    return redirect(url_for("views.adminDashboard"))


@views.route('/ganti-password', methods=["GET", "POST"])
@login_required
def gantiPassword():
    if request.method == "POST":
        oldpassword = request.form.get("oldpassword")
        newpassword = request.form.get("newpassword")
        confirmedpassword = request.form.get("confirmedpassword")

        # Check oldpassword
        if not (oldpassword and newpassword and confirmedpassword):
            flash("Terdapat bagian kosong. Harap mengisi seluruh komponen isian.", category="error")

        elif not check_password_hash(current_user.password, oldpassword):
            flash("Password lama salah.", category="error")

        elif newpassword != confirmedpassword:
            flash("Konfirmasi password tidak sesuai", category="error")

        elif not 7 <= len(newpassword) <= 36:
            flash("Panjang password tidak 7 sampai 12 karakter, harap mencoba lagi.", category="error")

        elif not any(char.isupper() for char in newpassword):
            flash("Password tidak mengandung huruf kapital, harap mencoba lagi.", category="error")

        elif not any(char.islower() for char in newpassword):
            flash("Password tidak mengandung huruf kecil, harap mencoba lagi.", category="error")

        elif not any(char.isalpha() for char in newpassword):
            flash("Password tidak mengandung karakter huruf, harap mencoba lagi.", category="error")

        elif not any(char.isnumeric() for char in newpassword):
            flash("Password tidak mengandung karakter angka, harap mencoba lagi.", category="error")

        else:
            current_user.password = generate_password_hash(newpassword)
            db.session.commit()
            flash("Password berhasil diganti!", category="success")
            return redirect(url_for("views.userDashboard"))

    return render_template("ganti-password.html", paramUser=current_user, accessing_user=current_user)


@views.route('/admin-edit-user/<int:id>', methods=["GET", "POST"])
@login_required
def adminEditUser(id):
    if current_user.status != "admin":
        return "<p>Access Denied</p>"

    paramUser = User.query.get(id)

    if request.method == "GET":
        return render_template(f"admin-user-edit.html", paramUser=paramUser, provinsi=provinsi,
                               kumpulankabkota=kumpulankabkota,
                               accessing_user=current_user)

    elif request.method == "POST":
        pendidikan = request.form.get("pendidikan")
        tempat_mengajar = request.form.get("sekolah_tempat_mengajar")
        nama_tempat = request.form.get("nama-sekolah-lembaga")
        akun_facebook = request.form.get("akun-facebook")
        nomor_telepon = request.form.get("nomortelepon")
        provinsiParam = request.form.get("provinsi")
        kabupaten_kota = request.form.get("kabkota")
        esai_singkat = request.form.get("esai")

        if not (pendidikan and tempat_mengajar and nama_tempat
                and nomor_telepon and provinsiParam and kabupaten_kota):
            flash("Terdapat bagian kosong. Harap mengisi seluruh komponen isian.", category="error")

        else:
            paramUser.pendidikan = pendidikan
            paramUser.tempat_mengajar = tempat_mengajar
            paramUser.nama_tempat = nama_tempat
            paramUser.akun_facebook = akun_facebook
            paramUser.nomor_telepon = nomor_telepon
            paramUser.provinsi = provinsiParam
            paramUser.kabupaten_kota = kabupaten_kota
            paramUser.esai_singkat = esai_singkat
            db.session.commit()
            flash("Data Anda berhasil di update.")
            return redirect(url_for("views.displayTable"))

    return render_template("admin-user-edit.html", paramUser=paramUser, provinsi=provinsi,
                           kumpulankabkota=kumpulankabkota,
                           accessing_user=current_user)


@views.route('/id-cek-data/<int:id>')
def id_cek_data(id):
    user = User.query.get(id)
    return render_template("id-cek-data.html", user=user, accessing_user=current_user)
