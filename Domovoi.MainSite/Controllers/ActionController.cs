using Domovoi.DAL.Data;
using Microsoft.AspNetCore.Mvc;

namespace Domovoi.MainSite.Controllers
{
    [Produces("application/json")]
    [Route("api/Actions")]
    public class ActionController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public ActionController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}