using System;
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
        public ActionResult Post([FromForm] string body, [FromForm] string from)
        {
            if (alertsManager.GetAlertByPhoneNumber(from) == null)
                alertsManager.CreateNewAlert(from, body);

            string response = alertsManager.SaveIncomingMessage(from, body);

            if(twilioManager.SendMessage(from, response))
                return Ok();

            return NotFound();
        }
    }
}
