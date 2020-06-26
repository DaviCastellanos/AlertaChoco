using System;
using System.Collections.Generic;

namespace whats_app_rest
{
    public class AlertsManager
    {
        List<Alert> alerts;
        AlertResponses responses;

        public AlertsManager()
        {
            alerts = new List<Alert>();
            responses = new AlertResponses();
        }

        public Alert GetAlertByPhoneNumber(string from)
        {
            return alerts.Find(x => x.phoneNumber == from);
        }

        public Guid GetAlertIdByPhoneNumber(string from)
        {
            return alerts.Find(x => x.phoneNumber == from).id;
        }

        public int GetAlertIndexByPhoneNumber(string from)
        {
            return alerts.FindIndex(x => x.phoneNumber == from);
        }

        public string GetProgressResponseByPhoneNumber(string from)
        {
            return responses.messages[alerts.Find(x => x.phoneNumber == from).alertProgress - 1];
        }

        public string SaveIncomingMessage(string phoneNumber, string message)
        {
            int i = GetAlertIndexByPhoneNumber(phoneNumber);

            string response = responses.messages[alerts[i].alertProgress];
            alerts[i].alertProgress++;

            switch (alerts[i].alertProgress)
            {
                case 1:
                    alerts[i].anansiCode = message;
                    break;
                case 2:
                    alerts[i].canReport = message;
                    break;
                case 3:
                    alerts[i].storyWhat = message;
                    break;
                case 4:
                    alerts[i].storyHow = message;
                    break;
                case 5:
                    alerts[i].storyWhere = message;
                    break;
                case 6:
                    alerts[i].storyWho = message;
                    break;
                case 7:
                    alerts[i].storyWhen = message;
                    break;
                case 8:
                    alerts[i].currentSituation = message;
                    break;
                case 9:
                    alerts[i].canCall = message;
                    break;
                case 10:
                    SaveAlert(alerts[i]);
                    break;
                default:
                    break;
            }

            return response;
        }

        public void CreateNewAlert(string phoneNumber, string message)
        {
            Alert alert = new Alert(phoneNumber, message, SavePartialAlert);
            alerts.Add(alert);
        }

        public void SavePartialAlert(Alert alert)
        {
            Console.WriteLine("saving partial alert " + alert.phoneNumber);
            //Destroy Alert
        }

        public void SaveAlert(Alert alert)
        {
            alert.systemDate = DateTime.UtcNow;

            Console.WriteLine("saving alert " + alert.phoneNumber);
            //Destroy Alert
        }
    }
}
