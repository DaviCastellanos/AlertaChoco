﻿using System;
using System.Collections.Generic;
using System.Timers;

namespace whats_app_rest
{
    public class AlertsManager
    {
        private List<Alert> alerts;
        private AlertResponses responses;
        private TwilioManager twilio;
        private DatabaseManager database;

        private Timer trashTimer;
        private int trashCollectionTime = 3600000;

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
            ScheduleTrashCollector();
        }

        public async void SaveAlert(Alert alert)
        {
            twilio.DeleteMedia();

            alert.localTime = DateTime.UtcNow.AddHours(-5);

            bool saved = await database.SaveToDB(alert);

            if (saved)
            {
                alerts[GetAlertIndexByPhoneNumber(alert.phoneNumber)].isTrash = true;
                alert.KillTimer();
            }
            else
            {
                Console.WriteLine("Error saving alert");
            }
        }

        private void ScheduleTrashCollector()
        {
            if (trashTimer != null)
                KillTimer();

            trashTimer = new Timer(trashCollectionTime);
            trashTimer.Elapsed += CollectTrash;
            trashTimer.AutoReset = true;
            trashTimer.Enabled = true;
        }

        private void KillTimer()
        {
            trashTimer.Stop();
            trashTimer.Dispose();
            trashTimer = null;
        }

        private void CollectTrash(Object source, ElapsedEventArgs e)
        {
            if (alerts == null || alerts.Count == 0)
                return;

            for (int i = 0; i < alerts.Count; i++)
            {
                string id = alerts[i].id.ToString();

                if (alerts[i].isTrash)
                {
                    if (!alerts.Remove(alerts[i]))
                        Console.WriteLine("Error: failed to remove alert " + id);
                    else
                    {
                        Console.WriteLine("Succesfully removed alert " + id);
                        KillTimer();
                    }
                }
            }

            alerts.TrimExcess();
        }
    }
}
