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
            int i = GetAlertIndexByPhoneNumber(phoneNumber);

            string response = responses.messages[alerts[i].alertProgress];

            if (latitude != null && longitude != null)
            {
                alerts[i].Longitude = longitude;
                alerts[i].Latitude = latitude;
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

        public async void SaveAlert(Alert alert)
        {
            //LogAlertData(alert);
            twilio.DeleteMedia();

            alert.localTime = DateTime.UtcNow.AddHours(-5);

            bool saved = await database.SaveToDB(alert);

            if (saved)
            {
                //Destroy Alert
                alert.KillTimer();
            }

            Console.WriteLine(">>> Finished saving. Was saved: " + saved);
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
            Console.WriteLine("Latitud: " + alert.Latitude);
            Console.WriteLine("Longitud: " + alert.Longitude);
            Console.WriteLine("id: " + alert.id.ToString());
            Console.WriteLine("Fecha del sistema: " + alert.localTime.ToString());
        }
    }
}
