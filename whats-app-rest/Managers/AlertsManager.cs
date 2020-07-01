using System;
using System.Collections.Generic;

namespace whats_app_rest
{
    public class AlertsManager
    {
        private List<Alert> alerts;
        private AlertResponses responses;
        private TwilioManager twilio;
        private DatabaseManager database;

        public AlertsManager(TwilioManager twilioManager, DatabaseManager databaseManager)
        {
            alerts = new List<Alert>();
            responses = new AlertResponses();
            twilio = twilioManager;
            database = databaseManager;
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

        public string SaveIncomingMessage(string phoneNumber, string message, string latitude, string longitude)
        {
            database.SaveToDB();

            int i = GetAlertIndexByPhoneNumber(phoneNumber);

            string response = responses.messages[alerts[i].alertProgress];

            if (latitude != null && longitude != null)
            {
                alerts[i].longitude = longitude;
                alerts[i].latitude = latitude;
            }

            switch (alerts[i].alertProgress)
            {
                case 1:
                    alerts[i].anansiCode = message.FormatForDB();
                    break;
                case 2:
                    alerts[i].canReport = message.FormatForDB();
                    break;
                case 3:
                    alerts[i].storyWhat = message.FormatForDB();
                    break;
                case 4:
                    alerts[i].storyHow = message.FormatForDB();
                    break;
                case 5:
                    alerts[i].storyWhere = message.FormatForDB();
                    break;
                case 6:
                    alerts[i].storyWho = message.FormatForDB();
                    break;
                case 7:
                    alerts[i].storyWhen = message.FormatForDB();
                    break;
                case 8:
                    alerts[i].currentSituation = message.FormatForDB();
                    break;
                case 9:
                    alerts[i].canCall = message.FormatForDB();
                    alerts[i].completed = true;
                    SaveAlert(alerts[i]);
                    break;
                default:
                    break;
            }

            alerts[i].alertProgress++;

            return response;
        }

        public void TryToCreateNewAlert(string phoneNumber, string message)
        {
            if (GetAlertByPhoneNumber(phoneNumber) != null)
                return;

            Alert alert = new Alert(phoneNumber, message, SaveAlert);
            alerts.Add(alert);
        }

        public void SaveAlert(Alert alert)
        {
            alert.systemDate = DateTime.UtcNow;

            twilio.DeleteMedia();
            //Destroy Alert

            //LogAlertData(alert);
            alert.KillTimer();
        }

        private void LogAlertData(Alert alert)
        {
            Console.WriteLine("Teléfono: " + alert.phoneNumber);
            Console.WriteLine("Primer mensaje: " + alert.firstMessage);
            Console.WriteLine("Código Anansi: " + alert.anansiCode);
            Console.WriteLine("Puede reportar: " + alert.canReport);
            Console.WriteLine("Qué pasó: " + alert.storyWhat);
            Console.WriteLine("Cómo pasó: " + alert.storyHow);
            Console.WriteLine("A quiénes o a quién afecta: " + alert.storyWho);
            Console.WriteLine("Cuándo pasó: " + alert.storyWhen);
            Console.WriteLine("Dónde pasó: " + alert.storyWhere);
            Console.WriteLine("Cuál es la situación actual: " + alert.currentSituation);
            Console.WriteLine("Puede recibir llamada: " + alert.canCall);
            Console.WriteLine("Latitud: " + alert.latitude);
            Console.WriteLine("Longitud: " + alert.longitude);
            Console.WriteLine("id: " + alert.id.ToString());
            Console.WriteLine("Fecha del sistema: " + alert.systemDate.ToString());
        }
    }
}
