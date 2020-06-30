namespace whats_app_rest
{
    public static class ExtensionMethods
    {
        public static string FormatForDB(this string str)
        {
            if (str == null)
                return "";

            if (str.Contains("firebasestorage"))
                return str;

            return str.ToLower().Replace(' ', '_');
        }
    }
}
