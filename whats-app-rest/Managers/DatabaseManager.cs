using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace whats_app_rest
{
    public class DatabaseManager
    {
        private string databaseAccesToken;
        private DateTime expiration;
        private List<string> anansiCodes;

        public bool CheckAnansiCode(string code)
        {
            if (anansiCodes != null && anansiCodes.Contains(code.ToLower()))
                return true;

            return false;
        }

        public async Task UpdateAnansiCodes()
        {
            string token = await GetDatabaseAccessToken();

            if (token == null)
                return;

            using (HttpClient client = new HttpClient())
            {
                var dict = new Dictionary<string, string>();
                dict.Add("f", "json");
                dict.Add("token", token);
                dict.Add("where", "1=1");
                dict.Add("outSr", "4326");
                dict.Add("outFields", "code");

                HttpResponseMessage response = await client.PostAsync(new Uri("https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/anansi_codes/FeatureServer/0/query"), new FormUrlEncodedContent(dict));

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    anansiCodes = new List<string>();
                    string data = await response.Content.ReadAsStringAsync();

                    string[] codes = data.Split("features")[1].Split("attributes");

                    foreach (string str in codes)
                        if (str.Contains("code"))
                        {
                            string code = str.Split(',')[0].Substring(2).Split(':')[1].Replace("\"", "").Replace("}", "");
                            anansiCodes.Add(code);
                        }
                }
            }
        }

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
                dict.Add("adds", alert.AsJSON());

                HttpResponseMessage response = await client.PostAsync(new Uri("https://services7.arcgis.com/AGOpm0AOkNTcqxqa/arcgis/rest/services/alertas/FeatureServer/0/applyEdits"), new FormUrlEncodedContent(dict));

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    return true;
                else
                    return false;
            }
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
    public class AnansiCode
    {
        [JsonProperty("code")]
        public string code;
    }
    public class DatabaseAccess
    {
        public string access_token;
        public int expires_in;
    }
}
