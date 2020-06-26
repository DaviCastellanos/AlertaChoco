using System;
using System.Timers;

namespace whats_app_rest
{
    public class Alert
    { 
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

        public DateTime systemDate;
        public bool verified;
        public int alertProgress;
        public Guid id;

        private Timer timer;
        private Action<Alert> timerCallback;
        private int autoSaveTime = 120000; 

        public Alert(string phoneNumber, string firstMessage, Action<Alert>timerCallback)
        {
            this.phoneNumber = phoneNumber;
            this.timerCallback = timerCallback;
            this.firstMessage = firstMessage;
            id = Guid.NewGuid();

            timer = new Timer(autoSaveTime);
            timer.Elapsed += OnTimedEvent;
            timer.AutoReset = true;
            timer.Enabled = true;
        }

        private void OnTimedEvent(Object source, ElapsedEventArgs e)
        {
            timerCallback(this);
            timer.Stop();
            timer.Dispose();
        }
    }
}
