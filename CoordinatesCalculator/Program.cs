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
            alert.originName = "Istmina";
            alert.originCoordinates = new KeyValuePair<double, double>(-76.685737084655727, 5.1516697763266253);
            alert.direction = Direction.Norte;
            alert.kms = 0.5;
            alert.level = AlertLevel.Moderado;
            alert.threat = "Panfletos con amenazas en contra de defensores de Derechos Humanos";

            new CoordinateCalculator(alert);
        }
    }
}
