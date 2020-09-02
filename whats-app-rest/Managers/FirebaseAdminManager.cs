using System.IO;
using System.Threading.Tasks;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Logging;

namespace whats_app_rest
{
    public class FirebaseAdminManager
    {
        private FirebaseAuth instance;
        private ILogger logger;

        public FirebaseAdminManager(ILogger<FirebaseAdminManager> logger)
        {
            this.logger = logger;
            using (Stream stream = new FileStream("alertachoco-firebase-adminsdk-8mvx8-1c8bf68014.json", FileMode.Open, FileAccess.Read))
            {
                ServiceAccountCredential credential = ServiceAccountCredential.FromServiceAccountData(stream);

                instance = FirebaseAuth.GetAuth(FirebaseApp.Create(new AppOptions()
                {
                    Credential = GoogleCredential.FromServiceAccountCredential(credential)
                }));
            }
        }

        public async Task<bool> DeleteUserByEmail(string email)
        {
            UserRecord user = null;

            try
            {
                user = await instance.GetUserByEmailAsync(email);
            }
            catch (FirebaseAuthException e)
            {
                logger.LogError(e.Message);
                return false;
            }


            if (user == null)
            {
                logger.LogError("Null user for " + email);
                return false;
            }

            try
            {
                await instance.DeleteUserAsync(user.Uid);
            }
            catch (FirebaseAuthException e)
            {
                logger.LogError(e.Message);
                return false;
            }

            return true;
        }

    }
}
