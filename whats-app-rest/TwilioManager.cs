using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace whats_app_rest
{
    public class TwilioManager
    {
        public TwilioManager()
        {
            TwilioClient.Init(Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID"),
                              Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN"));
        }

        public bool SendMessage(string originNumber, string message)
        {
            try
            {
                var messageOptions = new CreateMessageOptions(new PhoneNumber(originNumber));
                messageOptions.From = new PhoneNumber("whatsapp:+14155238886");
                messageOptions.Body = message;

                MessageResource.Create(messageOptions);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message + " - " + e.StackTrace);
                return false;
            }
        }
    }
}
