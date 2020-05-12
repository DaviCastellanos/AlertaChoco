using System;
using System.Collections.Generic;
using CoordinatesCalculator.Models;

namespace CoordinatesCalculator
{
    public class CoordinateCalculator
    {
        public CoordinateCalculator(Alert alert)
        {
            KeyValuePair<double, double> location = GetGPSCoordinates(alert.originCoordinates, alert.kms, alert.direction);

            Console.WriteLine("[");
            Console.WriteLine("{");
            Console.WriteLine("\"geometry\" : {");
            Console.WriteLine($"\"x\" : \"{location.Key}\",");
            Console.WriteLine($"\"y\" : \"{location.Value}\",");
            Console.WriteLine("\"spatialReference\" : {");
            Console.WriteLine("\"wkid\" : 4326");
            Console.WriteLine("}");
            Console.WriteLine("},");
            Console.WriteLine("\"attributes\" : {");
            Console.WriteLine("\"ID\" : \"100\",");
            Console.WriteLine($"\"location\" : \"{alert.relativeLocation}\",");
            Console.WriteLine($"\"level\" : \"{alert.level}\",");
            Console.WriteLine($"\"threat\" : \"{alert.threat}\",");
            Console.WriteLine($"\"date\" : \"{alert.date}\"");
            Console.WriteLine("}");
            Console.WriteLine("}");
            Console.WriteLine("]");

            Console.WriteLine($"Distance is {Haversine.calculate(alert.originCoordinates.Key, alert.originCoordinates.Value, location.Key, location.Value)}");
        }

        private KeyValuePair<double, double> GetGPSCoordinates(KeyValuePair<double, double> origin, double kms, Direction direction)
        {
            switch (direction)
            {
                case Direction.Norte:
                    return new KeyValuePair<double, double>(origin.Key, origin.Value + ToGPS(kms, Axis.Y));
                case Direction.Sur:
                    return new KeyValuePair<double, double>(origin.Key, origin.Value - ToGPS(kms, Axis.Y));
                case Direction.Oriente:
                    return new KeyValuePair<double, double>(origin.Key + ToGPS(kms, Axis.X), origin.Value);
                case Direction.Occidente:
                    return new KeyValuePair<double, double>(origin.Key - ToGPS(kms, Axis.X), origin.Value);
                case Direction.NorOriente:
                    return new KeyValuePair<double, double>(origin.Key - ToGPS(ThirtyLeg(kms), Axis.X), origin.Value - ToGPS(SixtyLeg(kms), Axis.Y));
                case Direction.NorOccidente:
                    return new KeyValuePair<double, double>(origin.Key + ToGPS(ThirtyLeg(kms), Axis.X), origin.Value - ToGPS(SixtyLeg(kms), Axis.Y));
                case Direction.SurOriente:
                    return new KeyValuePair<double, double>(origin.Key - ToGPS(ThirtyLeg(kms), Axis.X), origin.Value + ToGPS(SixtyLeg(kms), Axis.Y));
                case Direction.SurOccidente:
                    return new KeyValuePair<double, double>(origin.Key + ToGPS(ThirtyLeg(kms), Axis.X), origin.Value + ToGPS(SixtyLeg(kms), Axis.Y));
                default:
                    Console.WriteLine("Error: No direction given");
                    return new KeyValuePair<double, double>(0, 0);
            }

        }

        private double ThirtyLeg(double kms)
        {
            return kms * Math.Sin(30);
        }

        private double SixtyLeg(double kms)
        {
            return kms * Math.Sin(60);
        }

        private double ToGPS(double kms, Axis axis)
        {
            if (axis == Axis.Y)
                return (kms * 100 / 25) / 100;
            if (axis == Axis.X)
                return (kms * 100 / 111) / 100;

            Console.WriteLine("Error: No Axis given");
            return -1;
        }
    }
}
