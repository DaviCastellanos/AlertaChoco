using System;
using System.Collections.Generic;

namespace whats_app_rest
{
    public class AlertResponses
    {
        public Dictionary<int, string> messages;

        public AlertResponses()
        {
            messages = new Dictionary<int, string>();
            messages.Add(0, "¿Cuál es tu código?");
            messages.Add(1, "¿Puedes generar el reporte completo?");
            messages.Add(2, "¿Qué pasó?");
            messages.Add(3, "¿Cómo pasó?");
            messages.Add(4, "¿Dónde pasó?");
            messages.Add(5, "¿Quiénes o quién está en riesgo?");
            messages.Add(6, "¿Cuándo pasó?");
            messages.Add(7, "¿Cuál es la situación actual?");
            messages.Add(8, "¿Puede recibir una llamada en este momento?");
            messages.Add(9, "Mensaje final: Recuerda borrar esta conversación de tu teléfono por tu seguridad.");
        }
    }
}
