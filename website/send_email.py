from email.message import EmailMessage
from dotenv import load_dotenv
import time
import smtplib
import ssl
import os

load_dotenv()

SMTP_HOST = 'smtp.gmail.com'
SMTP_PORT = 465
SENDER_ADDRESS = os.getenv('EMAIL_ACCOUNT')
SENDER_PASSWORD = os.getenv('EMAIL_PASSWORD')

def setup_smtp_connection():
    ssl_context = ssl.create_default_context()
    smtp_server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=ssl_context)
    return smtp_server


def send_email(smtp_server: smtplib.SMTP_SSL, sender_address: str, sender_password: str, receiver_address: str, subject: str, message: str):
    email = EmailMessage()
    email['From'] = sender_address
    email['To'] = receiver_address
    email['Subject'] = subject
    email.set_content(message)

    print(f'Sending email to {receiver_address}')
    smtp_server.login(sender_address, sender_password)
    smtp_server.sendmail(sender_address, receiver_address, msg=email.as_string())


def perform_send_email_task(smtp_server, accepted_receivers, rejected_receivers):
    subject = "Pendaftaran Anggota Baru PPSKI"
    accepted_message = """\
            Anda diterima sebagai anggota dan data Anda sudah\n
            tercantum dalam database kami. Silakan melakukan\n
            pengecekan dan pembaharuan 
            """
    rejected_message = "Anda belum diterima sebagai anggota PPSKI"

    for accepted_receiver in accepted_receivers:
        send_email(smtp_server, SENDER_ADDRESS, SENDER_PASSWORD, accepted_receiver, subject, accepted_message)

        
    for rejected_receiver in rejected_receivers:
        send_email(smtp_server, SENDER_ADDRESS, SENDER_PASSWORD, rejected_receiver, subject, rejected_message)


def process_message(accepted_receivers, rejected_receivers):
    start = time.time()
    smtp_server = setup_smtp_connection()
    perform_send_email_task(smtp_server, accepted_receivers, rejected_receivers)
    smtp_server.close()
    print(time.time() - start)

