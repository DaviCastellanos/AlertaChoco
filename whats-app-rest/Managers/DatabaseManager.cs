using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace whats_app_rest
{
    public class DatabaseManager
    {
        public DatabaseManager()
        {

        }

        private string databaseAccesToken;
        private DateTime expiration;

        public async Task<bool> SaveToDB(Alert alert)
        {
            string token = await GetDatabaseAccessToken();

            if (token == null)
                return false;

            using (HttpClient client = new HttpClient())
            {
                var dict = new Dictionary<string, string>();
                dict.Add("f", "json");
                dict.Add("token", token);
                dict.Add("adds", AlertToJson(alert));

                HttpResponseMessage response = await client.PostAsync(new Uri("https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/alertas/FeatureServer/0/applyEdits"), new FormUrlEncodedContent(dict));

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    return true;
                else
                    return false;
            }
        }

        private string AlertToJson(Alert alert)
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
            json += $"\"localAlertTime\":\"{FormatDate(alert.localTime)}\",";
            json += $"\"verified\":\"{alert.verified}\",";
            json += $"\"completed\":\"{alert.completed}\",";
            json += $"\"systemId\":\"{alert.id.ToString()}\"";
            json += "}}]";

            return json;
        }

        private string FormatDate(DateTime systemDate)
        {
            return (systemDate.ToShortDateString() + "_" + systemDate.ToShortTimeString()).FormatForDB();
        }

        private async Task<string> GetDatabaseAccessToken()
        {
            if(databaseAccesToken != null && expiration != null && expiration > DateTime.Now)
                return databaseAccesToken;

            return await UpdateAccessToken();
        }

        private async Task<string> UpdateAccessToken()
        {
            using (HttpClient client = new HttpClient())
            {
                var dict = new Dictionary<string, string>();
                dict.Add("client_id", Environment.GetEnvironmentVariable("ARCGIS_ID"));
                dict.Add("client_secret", Environment.GetEnvironmentVariable("ARCGIS_SECRET"));
                dict.Add("grant_type", "client_credentials");
                dict.Add("expiration", "1440"); //one day is 1440 minutes

                HttpResponseMessage response = await client.PostAsync(new Uri("https://www.arcgis.com/sharing/rest/oauth2/token"), new FormUrlEncodedContent(dict));

                if (response != null)
                {
                    string result = await response.Content.ReadAsStringAsync();

                    DatabaseAccess access = JsonConvert.DeserializeObject<DatabaseAccess>(result);

                    if (access != null)
                    {
                        databaseAccesToken = access.access_token;
                        expiration = DateTime.Now.AddSeconds(access.expires_in);
                        return access.access_token;
                    }
                    else
                    {
                        Console.WriteLine("Error: Access is null");
                    }
                }
                else
                    Console.WriteLine("Error: Response is null");

                return null;
            }
        }
    }

    public class DatabaseAccess
    {
        public string access_token;
        public int expires_in;
    }
}
