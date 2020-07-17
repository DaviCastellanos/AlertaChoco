using System;
using System.Collections.Generic;

namespace whats_app_rest
{
    public class AlertResponses
    {
        const string FINAL_MESSAGE = "Mensaje final: Recuerda borrar esta conversación de tu teléfono por tu seguridad.";
        public Dictionary<int, string> messages;
        public Dictionary<string, string> validations;

        public AlertResponses()
        {
            messages = new Dictionary<int, string>();
            messages.Add(-1, "Primer mensaje");
            messages.Add(0, "¿Cuál es tu código?");
            messages.Add(1, "¿Puedes generar el reporte completo?");
            messages.Add(2, "¿Qué pasó?");
            messages.Add(3, "¿Cómo pasó?");
            messages.Add(4, "¿Dónde pasó?");
            messages.Add(5, "¿Quiénes o quién está en riesgo?");
            messages.Add(6, "¿Cuándo pasó?");
            messages.Add(7, "¿Cuál es la situación actual?");
            messages.Add(8, "¿Puede recibir una llamada en este momento?");
            messages.Add(9, FINAL_MESSAGE);

            validations = new Dictionary<string, string>();
            validations.Add("LENGTH_RESPONSE", "Por favor escribe textos más cortos. Máximo 255 carácteres.");
            validations.Add("WRONG_ANANSI_CODE", "Ese código no es correcto. Vuelve a intentar.");
            validations.Add("PROVIDE_TEXT", "Por favor escribe una respuesta para esta pregunta.");
            validations.Add("ALERT_SUCCESFUL", "Alerta reportada exitosamente, para reportar otra alerta espera unas horas.");
            validations.Add("FINAL_MESSAGE", FINAL_MESSAGE);
        }
    }
}
