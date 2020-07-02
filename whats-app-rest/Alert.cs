using System;
using System.Timers;

namespace whats_app_rest
{
    public class Alert
    {
        public Alert(string phoneNumber, string firstMessage, Action<Alert>timerCallback)
        {
            this.phoneNumber = phoneNumber;
            this.timerCallback = timerCallback;
            this.firstMessage = firstMessage.FormatForDB();
            id = Guid.NewGuid();

            timer = new Timer(autoSaveTime);
            timer.Elapsed += OnTimedEvent;
            timer.AutoReset = true;
            timer.Enabled = true;
        }

        public string phoneNumber;
        public string firstMessage;
        public string anansiCode;
        public string canReport;
        public string storyWhat;
        public string storyHow;
        public string storyWho;
        public string storyWhen;
        public string storyWhere;
        public string currentSituation;
        public string canCall;
        private string latitude;
        private string longitude;

        public DateTime localTime;
        public bool verified;
        public bool completed;
        public int alertProgress;
        public Guid id;
        public bool isTrash;

        private Timer timer;
        private Action<Alert> timerCallback;
        private int autoSaveTime = 120000; 

        public string Latitude
        {
            get
            {
                if (latitude != null)
                    return latitude;
                else
                    return "4.624335";
            }
            set { latitude = value; }
        }

        public string Longitude
        {
            get
            {
                if (longitude != null)
                    return longitude;
                else
                    return "-74.063644";
            }
            set { longitude = value; }
        }

        private void OnTimedEvent(Object source, ElapsedEventArgs e)
        {
            timerCallback(this);
        }

        public void KillTimer()
        {
            timerCallback = null;
            timer.Stop();
            timer.Dispose();
        }
    }
}
