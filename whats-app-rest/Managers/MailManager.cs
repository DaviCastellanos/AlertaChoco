using System;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace whats_app_rest
{
    public class MailManager
    {
        public async void SendAsync(string subject, string body)
        {
            MimeMessage msg = new MimeMessage();
            msg.Sender = new MailboxAddress("Alerta Choco", "alertachoco@gmail.com");
            msg.Subject = subject;

            msg.From.Add(new MailboxAddress("Alerta Choco", "alertachoco@gmail.com"));

            msg.Body = new TextPart(TextFormat.Plain) { Text = body };

            msg.To.Add(new MailboxAddress("David","davicaste@gmail.com"));
            msg.To.Add(new MailboxAddress("Alerta Choco", "alertachoco@gmail.com"));

            using (var smtp = new MailKit.Net.Smtp.SmtpClient())
            {
                smtp.MessageSent += (sender, args) => { };
                smtp.ServerCertificateValidationCallback = (s, c, h, e) => true;

                await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync("alertachoco", Environment.GetEnvironmentVariable("MAIL_PASSWORD"));
                await smtp.SendAsync(msg);
                await smtp.DisconnectAsync(true);
            }
        }

    }
}
