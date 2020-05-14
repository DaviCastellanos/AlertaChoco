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
            alert.originName = "Vigía del Fuerte";
            alert.originCoordinates = new KeyValuePair<double, double>(-76.896253322753893, 6.5886683130826178);
            alert.direction = Direction.Occidente;
            alert.kms = 7.5;
            alert.level = AlertLevel.Alto;
            alert.threat = "Presencia de Grupo Armado";

            new CoordinateCalculator(alert);
        }
    }
}
