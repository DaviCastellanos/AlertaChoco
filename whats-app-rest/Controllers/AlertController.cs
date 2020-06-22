using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace whats_app_rest.Controllers
{
    [ApiController]
    [Route("alert")]
    public class AlertController : ControllerBase
    {
        [HttpGet]
        public void Get()
        {
            var accountSid = "ACa6d64c8f885c4a5d11e5bd40940ed44c";
            var authToken = "b5dcc9cdb05bd541eda90037d2e4e248";
            TwilioClient.Init(accountSid, authToken);

            var messageOptions = new CreateMessageOptions(
                new PhoneNumber("whatsapp:+573107271279"));
            messageOptions.From = new PhoneNumber("whatsapp:+14155238886");
            messageOptions.Body = "Alert 2";

            MessageResource.Create(messageOptions);
        }
    }
}
