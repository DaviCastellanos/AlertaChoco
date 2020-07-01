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

        public async void SaveToDB()
        {
            string token = await GetDatabaseAccessToken();
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
