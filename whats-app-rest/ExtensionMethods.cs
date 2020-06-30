namespace whats_app_rest
{
    public static class ExtensionMethods
    {
        public static string FormatForDB(this string str)
        {
            if (str.Contains("firebasestorage"))
                return str;

            return str != null ? str.ToLower().Replace(' ', '_') : "";
        }
    }
}
