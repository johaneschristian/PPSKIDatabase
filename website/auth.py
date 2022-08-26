from flask import Blueprint, render_template, request, flash, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user
from . import db
from .models import User, TemporaryUser
from .data.provinsi import provinsi
from .data.kota import kumpulankabkota
import sqlalchemy


auth = Blueprint('auth', __name__)

@auth.route('/reset-password/<int:id>', methods=["GET"])
def resetPassword(id):
    if request.method == "GET":
        if current_user.status != "admin":
            return "<p>Access Denied</p>"
        else:
            user = User.query.get(id)
            user.password = generate_password_hash(f"ppski2021{id}")
            db.session.commit()
            
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