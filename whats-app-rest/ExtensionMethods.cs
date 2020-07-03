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

        public static string FormatForTime(this string str)
        {
            if (str == null)
                return "";

            return str.ToLower().Replace(' ', '/');
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
            json += $"\"localAlertTime\":\"{alert.localTime.DateWithTime()}\",";
            json += $"\"verified\":\"{alert.verified}\",";
            json += $"\"completed\":\"{alert.completed}\",";
            json += $"\"systemId\":\"{alert.id.ToString()}\"";
            json += "}}]";

            return json;
        }

        public static string DateWithTime(this DateTime dateTime)
        {
            return (dateTime.ToShortDateString() + "/" + dateTime.ToShortTimeString()).FormatForTime();
        }
    }
}
