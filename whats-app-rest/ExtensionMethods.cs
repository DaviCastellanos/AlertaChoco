using System;

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
