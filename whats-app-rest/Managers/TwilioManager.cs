using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Rest.Api.V2010.Account.Message;
using Twilio.Types;

namespace whats_app_rest
{
    public class TwilioManager
    {
        private Dictionary<string, string> mediaToDelete;


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
                messageOptions.From = new PhoneNumber("whatsapp:+3197010253940");
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

        public void SignMediaToBeDeleted(string url)
        {
            var array = url.Split('/');

            string mm = array[array.Length - 3];
            string me = array[array.Length - 1];

            if (mediaToDelete == null)
                mediaToDelete = new Dictionary<string, string>();

            mediaToDelete.Add(mm, me);
        }

        public void DeleteMedia()
        {
            if (mediaToDelete != null && mediaToDelete.Count > 0)
            {
                foreach (var entry in mediaToDelete)
                {
                    try
                    {
                        bool delete = MediaResource.Delete(entry.Key, entry.Value);
                        mediaToDelete.Remove(entry.Key);
                        //Console.WriteLine("Deleting " + entry.Key + ". result: " + delete + ". dict size is " + mediaToDelete.Count);
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine("Failed to delete " + entry.Key + " " + e.Message + " - " + e.StackTrace + ". dict size is " + mediaToDelete.Count);
                    }
                }

            }
        }
    }
}
