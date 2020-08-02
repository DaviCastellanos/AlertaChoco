using System;
using System.Collections.Generic;
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
        private AlertResponses responses;

        public AlertController(
            AlertsManager alertsManager,
            TwilioManager twilioManager,
            MultimediaManager multimediaManager,
            AlertResponses alertResponses
            )
        {
            alerts = alertsManager;
            twilio = twilioManager;
            multimedia = multimediaManager;
            responses = alertResponses;
        }

        [HttpGet]
        public string Get()
        {
            return "OK";
        }

        [HttpPost]
        [Consumes("application/x-www-form-urlencoded")]
        public async Task<ActionResult> Post(
            [FromForm] string body,
            [FromForm] string from,
            [FromForm]string mediaUrl0,
            [FromForm] string latitude,
            [FromForm] string longitude
            )
        {
            if (body != null && body.Length > 255)
                return SendTwilioMessage(from, responses.validations["LENGTH_RESPONSE"]);

            if (!alerts.TryToCreateNewAlert(from, body))
                return SendTwilioMessage(from, responses.validations["ALERT_SUCCESFUL"]);

            KeyValuePair<bool, string> result = alerts.ValidateIncomingMessage(body, from);

            if (!result.Key)
                return SendTwilioMessage(from, responses.validations[result.Value]);

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

            string response = alerts.SaveIncomingMessage(from, body, latitude, longitude);

            if (response != null)
                return SendTwilioMessage(from, response);
            else
                return NotFound("Could not parse reponse");
        }

        private ActionResult SendTwilioMessage(string to, string message)
        {
            if (twilio.SendMessage(to, message))
                return Ok();

            return NotFound("Twilio message failed");
        }
    }
}
