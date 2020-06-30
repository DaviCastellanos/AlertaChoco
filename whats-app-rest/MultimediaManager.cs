using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Firebase.Storage;

namespace whats_app_rest
{
    public class MultimediaManager
    {
        private AlertsManager alertsManager;
        private TwilioManager twilioManager;

        public MultimediaManager(AlertsManager alertsManager, TwilioManager twilioManager)
        {
            this.alertsManager = alertsManager;
            this.twilioManager = twilioManager;
        }

        public async Task<string> SaveMultimedia(string mediaUrl, string from)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage twResponse = await client.GetAsync(mediaUrl);
                Stream httpStream = await twResponse.Content.ReadAsStreamAsync();

                var task = new FirebaseStorage("alertachoco.appspot.com")
                    .Child("alertas")
                    .Child(alertsManager.GetAlertIdByPhoneNumber(from).ToString())
                    .Child(alertsManager.GetProgressResponseByPhoneNumber(from))
                    .PutAsync(httpStream);

                return await task; ;
            }
        }

    }
}
