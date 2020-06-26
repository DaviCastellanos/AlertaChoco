using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Firebase.Storage;
using Microsoft.AspNetCore.Mvc;

namespace whats_app_rest.Controllers
{
    [ApiController]
    [Route("alert")]
    public class AlertController : ControllerBase
    {
        private AlertsManager alertsManager;
        private TwilioManager twilioManager;

        public AlertController(AlertsManager alertsManager, TwilioManager twilioManager)
        {
            this.alertsManager = alertsManager;
            this.twilioManager = twilioManager;
        }

        [HttpGet]
        public string Get()
        {
            return "OK";
        }

        [HttpPost]
        [Consumes("application/x-www-form-urlencoded")]
        public async Task<ActionResult> Post([FromForm] string body, [FromForm] string from, [FromForm]string mediaUrl0)
        {
            if (alertsManager.GetAlertByPhoneNumber(from) == null)
                alertsManager.CreateNewAlert(from, body);

            if (mediaUrl0 != null)
            {
                try
                {
                    using (HttpClient client = new HttpClient())
                    {
                        HttpResponseMessage twResponse = await client.GetAsync(mediaUrl0);
                        Stream httpStream = await twResponse.Content.ReadAsStreamAsync();

                        var task = new FirebaseStorage("alertachoco.appspot.com")
                         .Child("alertas")
                         .Child(alertsManager.GetAlertIdByPhoneNumber(from).ToString())
                         .Child(alertsManager.GetProgressResponseByPhoneNumber(from))
                         .PutAsync(httpStream);

                        //TODO Delete Twilio multimedia file

                        body = await task;
                    }
                }
                catch (Exception e)
                {
                    return NotFound("Multimedia failed " + e.Message + " - " + e.StackTrace);
                }
            }

            string response = alertsManager.SaveIncomingMessage(from, body);

            if(twilioManager.SendMessage(from, response))
                return Ok();

            return NotFound("Twilio message failed");
        }
    }
}
