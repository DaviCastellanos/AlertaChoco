using System;
using System.Collections.Generic;

namespace CoordinatesCalculator.Models
{
    public class Alert
    {
        public Alert()
        {
            date = DateTime.Now.AddHours(5);
        }

        public DateTime date;
        public double kms;
        public string relativeLocation { get { return $"{kms} kms al {direction.ToString()} de {originName}"; } }
        public string originName;
        public KeyValuePair<double, double> originCoordinates;
        public Direction direction;
        public AlertLevel level;
        public string threat;
    }
}
