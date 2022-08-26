from email.message import EmailMessage
from . import config
import time
import threading
import smtplib
import ssl


SMTP_HOST = 'smtp.gmail.com'
SMTP_PORT = 465
SENDER_ADDRESS = config.EMAIL_ACCOUNT
SENDER_PASSWORD = config.EMAIL_PASSWORD

def setup_smtp_connection():
    ssl_context = ssl.create_default_context()
    smtp_server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=ssl_context)
    return smtp_server


def send_email(sender_address: str, sender_password: str, receiver_address: str, subject: str, message: str):
    smtp_server = setup_smtp_connection()
    email = EmailMessage()
    email['From'] = sender_address
    email['To'] = receiver_address
    email['Subject'] = subject
    email.set_content(message)

    print(f'Sending email to {receiver_address}')
    smtp_server.login(sender_address, sender_password)
    smtp_server.sendmail(sender_address, receiver_address, msg=email.as_string())
    smtp_server.close()


def get_send_email_task(accepted_receivers, rejected_receivers):
    subject = "Pendaftaran Anggota Baru PPSKI"
    accepted_message = """\
            Anda diterima sebagai anggota dan data Anda sudah\n
            tercantum dalam database kami. Silakan melakukan\n
            pengecekan dan pembaharuan 
            """
    rejected_message = "Anda belum diterima sebagai anggota PPSKI"

    sending_tasks = []
    for accepted_receiver in accepted_receivers:
        task = threading.Thread(target=send_email, args=(SENDER_ADDRESS, SENDER_PASSWORD, accepted_receiver, subject, accepted_message))
        sending_tasks.append(task)

        
    for rejected_receiver in rejected_receivers:
        task = threading.Thread(target=send_email, args=(SENDER_ADDRESS, SENDER_PASSWORD, rejected_receiver, subject, rejected_message))
        sending_tasks.append(task)
    
    return sending_tasks


def process_message(accepted_receivers, rejected_receivers):
    start = time.time()
    sending_tasks = get_send_email_task(accepted_receivers, rejected_receivers)
    
    for task in sending_tasks:
        task.start()
    
    for task in sending_tasks:
        task.join()

    print(time.time() - start)

