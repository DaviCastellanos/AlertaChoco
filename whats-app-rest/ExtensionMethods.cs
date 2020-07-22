using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace whats_app_rest
{
    public static class ExtensionMethods
    {
        public static string FormatForDB(this string str)
        {
            if (str == null)
                return "";

            if (str.Contains("firebasestorage"))
                return str;

            return str.ToLower().Replace(' ', '_');
        }

        public static string Encrypt(this string str)
        {
            if (str == null || str.Length <= 0)
                throw new ArgumentNullException("plainText");
            byte[] encrypted;
            // Create an RijndaelManaged object
            // with the specified key and IV.
            using (RijndaelManaged rij = new RijndaelManaged())
            {
                rij.Key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("ENCRYPT_KEY"));
                rij.IV = Encoding.ASCII.GetBytes("This is for funs");

                // Create an encryptor to perform the stream transform.
                ICryptoTransform encryptor = rij.CreateEncryptor(rij.Key, rij.IV);

                // Create the streams used for encryption.
                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                        {

                            //Write all data to the stream.
                            swEncrypt.Write(str);
                        }
                        encrypted = msEncrypt.ToArray();
                    }
                }
            }
            return Encoding.ASCII.GetString(encrypted);
        }

        public static string AsJSON(this Alert alert)
        {
            string json = "[{\"geometry\":{\"x\":\"";
             
            json += alert.Longitude;
            json += "\", \"y\":\"";
            json += alert.Latitude;
            json += "\",\"spatialReference\":{\"wkid\":4326}},\"attributes\":{";
            json += $"\"telefono\":\"{alert.phoneNumber}\",";
            json += $"\"primerMensaje\":\"{alert.firstMessage}\",";
            json += $"\"codigoAnansi\":\"{alert.anansiCode}\",";
            json += $"\"puedeReportar\":\"{alert.canReport}\",";
            json += $"\"relatoQue\":\"{alert.storyWhat}\",";
            json += $"\"relatoQuien\":\"{alert.storyWho}\",";
            json += $"\"relatoComo\":\"{alert.storyHow}\",";
            json += $"\"relatoCuando\":\"{alert.storyWhen}\",";
            json += $"\"relatoDonde\":\"{alert.storyWhere}\",";
            json += $"\"situacionActual\":\"{alert.currentSituation}\",";
            json += $"\"recibeLlamada\":\"{alert.canCall}\",";
            json += $"\"fechaReporte\":\'{alert.localTime.ToString("MM/dd/yyyy")+" "+alert.localTime.ToString("HH:mm:ss")}\',";
            json += $"\"verificado\":\"{alert.verified}\",";
            json += $"\"completado\":\"{alert.completed}\",";
            json += $"\"idAlerta\":\"{alert.id.ToString()}\"";
            json += "}}]";

            return json;
        }
    }
}
