using backend.Context;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public UserController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public async Task<ActionResult> Post(UserCreationDto userCreationDto)
        {
            var newUser = new User
            {
                UserName = userCreationDto.UserName,
                Password = userCreationDto.Password
            };
            context.Add(newUser);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("auth")]
        public async Task<ActionResult> Auth(UserCreationDto userCreationDto)
        {
            context.accessTokens.RemoveRange(context.accessTokens.Where(token => token.ExpirationDate < DateTime.UtcNow.AddSeconds(30)));
            await context.SaveChangesAsync();

            var user = await context.Users.Where(x => x.UserName == userCreationDto.UserName).Where(x => x.Password == userCreationDto.Password).FirstAsync();

            if (user == null)
            {
                return Unauthorized();
            }

            var newToken = new AccessTokens { CreationDate = DateTime.UtcNow, ExpirationDate = DateTime.UtcNow.AddMinutes(15), user = user };
            context.Add(newToken);
            await context.SaveChangesAsync();
            return Ok(newToken.Id);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var token = Request.Headers.Authorization;
            context.accessTokens.RemoveRange(context.accessTokens.Where(token => token.ExpirationDate < DateTime.UtcNow.AddSeconds(30)));
            await context.SaveChangesAsync();
            var usersDto = await context.Users.Select(u => new UserDto { UserName = u.UserName, Id = u.Id }).ToListAsync();
            return Ok(usersDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int? id)
        {
            var userQuery = await context.Users.Where(x => x.Id == id).FirstAsync();
            return Ok(new UserDto { UserName = userQuery.UserName, Id = userQuery.Id });
        }

        [HttpGet("current")]
        public async Task<ActionResult> GetCurrent()
        {
            var requestToken = new Guid(Request.Headers.Authorization);
            context.accessTokens.RemoveRange(context.accessTokens.Where(token => token.ExpirationDate < DateTime.UtcNow.AddSeconds(30)));
            await context.SaveChangesAsync();
            var accesstoken = await context.accessTokens.Include(t => t.user).Where(t => t.Id == requestToken).FirstOrDefaultAsync();
            
            if (accesstoken == null)
            {
                return NotFound();
            }

            var user = new UserDto { Id = accesstoken.user.Id, UserName = accesstoken.user.UserName };
            await context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpGet("current/logout")]
        public async Task<ActionResult> getActionResult()
        {
            var requestToken = new Guid(Request.Headers.Authorization.ToString());

            var token = await context.accessTokens.Where(token => token.Id == requestToken).FirstOrDefaultAsync();

            if (token == null)
            {
                return NotFound();
            }
            context.accessTokens.Remove(token);
            await context.SaveChangesAsync();
            return Ok(token);
        }
    }
}
