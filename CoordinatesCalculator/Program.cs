using System;
using System.Collections.Generic;
using CoordinatesCalculator.Models;

namespace CoordinatesCalculator
{
    class Program
    {
        static void Main(string[] args)
        {
            Alert alert = new Alert();
            alert.originName = "Medio Atrato";
            alert.originCoordinates = new KeyValuePair<double, double>(-76.781506677246, 5.9944065844109957);
            alert.direction = Direction.Oriente;
            alert.kms = 8;
            alert.level = AlertLevel.Alto;
            alert.threat = "Deforestación massiva";

            new CoordinateCalculator(alert);
        }
    }
}
