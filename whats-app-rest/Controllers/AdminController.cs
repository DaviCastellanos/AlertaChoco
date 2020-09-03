using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Cors;

namespace whats_app_rest.Controllers
{

    [ApiController]
    [Route("admin")]
    public class AdminController : ControllerBase
    {
        private FirebaseAdminManager firebaseAdminManager;
        private DatabaseManager databaseManager;

        public AdminController(FirebaseAdminManager firebaseAdminManager, DatabaseManager databaseManager)
        {
            this.firebaseAdminManager = firebaseAdminManager;
            this.databaseManager = databaseManager;
        }

        [HttpGet]
        public string Get()
        {
            return "OK";
        }

        [HttpPost]
        [Consumes("application/x-www-form-urlencoded")]
        [EnableCors(origins: "http://alertachoco.web.app", headers: "*", methods: "*")]
        public async Task<ActionResult> Post([FromForm] string action, [FromForm] string user)
        {
            if (action == null || user == null)
                return BadRequest("Action or user can not be null");

            if (action.Equals("deleteUser"))
            {
                if (await firebaseAdminManager.DeleteUserByEmail(user))
                    return Ok();

                return NotFound();
            }

            if (action.Equals("addAnansiCode"))
            {
                databaseManager.AddAnansiCode(user);
                return Ok();
            }

            return BadRequest("Action did not match any method: deleteUser or addAnansiCode");
        }

    }
}
