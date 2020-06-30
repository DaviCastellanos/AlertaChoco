using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace whats_app_rest.Controllers
{
    [ApiController]
    [Route("alert")]
    public class AlertController : ControllerBase
    {
        private AlertsManager alerts;
        private TwilioManager twilio;
        private MultimediaManager multimedia;

        public AlertController(AlertsManager alertsManager, TwilioManager twilioManager, MultimediaManager multimediaManager)
        {
            alerts = alertsManager;
            twilio = twilioManager;
            multimedia = multimediaManager;
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
            if (alerts.GetAlertByPhoneNumber(from) == null)
                alerts.CreateNewAlert(from, body);

            if (mediaUrl0 != null)
            {
                try
                { 
                    body = await multimedia.SaveMultimedia(mediaUrl0, from);
                }
                catch (Exception e)
                {
                    return NotFound("Multimedia failed " + e.Message + " - " + e.StackTrace);
                }

                twilio.SignMediaToBeDeleted(mediaUrl0);
            }

            string response = alerts.SaveIncomingMessage(from, body);

            if (twilio.SendMessage(from, response))
                return Ok();

            return NotFound("Twilio message failed");
        }
    }
}
