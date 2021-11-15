using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BuggyController : BaseApiController {
        private readonly DataContext _context;

        public BuggyController(DataContext context) {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> getSecret() {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<string> getNotFound() {
            var thing = _context.Users.Find(-1);
            if (thing == null) return NotFound();
            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<string> getServerError() {
            var thing = _context.Users.Find(-1);
            var thingToReturn = thing.ToString();
            return thingToReturn;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> getBadRequest() {
            return BadRequest("This was not a good request");
        }

    }
}