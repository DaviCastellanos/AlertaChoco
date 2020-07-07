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
            json += $"\"phoneNumber\":\"{alert.phoneNumber}\",";
            json += $"\"firstMessage\":\"{alert.firstMessage}\",";
            json += $"\"anansiCode\":\"{alert.anansiCode}\",";
            json += $"\"canReport\":\"{alert.canReport}\",";
            json += $"\"storyWhat\":\"{alert.storyWhat}\",";
            json += $"\"storyWho\":\"{alert.storyWho}\",";
            json += $"\"storyHow\":\"{alert.storyHow}\",";
            json += $"\"storyWhen\":\"{alert.storyWhen}\",";
            json += $"\"storyWhere\":\"{alert.storyWhere}\",";
            json += $"\"currentSituation\":\"{alert.currentSituation}\",";
            json += $"\"canCall\":\"{alert.canCall}\",";
            json += $"\"localDate\":\'{alert.localTime.ToString("MM/dd/yyyy")}\',";
            json += $"\"localTime\":\'{alert.localTime.ToString("HH:mm:ss")}\',";
            json += $"\"verified\":\"{alert.verified}\",";
            json += $"\"completed\":\"{alert.completed}\",";
            json += $"\"systemId\":\"{alert.id.ToString()}\"";
            json += "}}]";

            return json;
        }
    }
}
