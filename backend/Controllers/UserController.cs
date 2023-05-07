using backend.Context;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

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

        public static string GetRandomAlphaNumeric(int length)
        {
            return Path.GetRandomFileName().Replace(".", "").Substring(0, length);
        }

        [HttpPost]
        public async Task<ActionResult> Post(UserCreationDto userCreationDto)
        {
            var usernameConflict = await context.Users.Where(u => u.UserName == userCreationDto.UserName).FirstOrDefaultAsync();
            if (usernameConflict != null)
            {
                return BadRequest("username taken");
            }

            var prompt = new Prompt
            {
                prompt = GetRandomAlphaNumeric(10)
            };

            var newUser = new User
            {
                UserName = userCreationDto.UserName,
                Password = EncryptionHelper.Hash(userCreationDto.Password),
                FixedPrompt = prompt
            };
            await context.AddAsync(prompt);
            await context.AddAsync(newUser);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("auth")]
        public async Task<ActionResult> Auth(UserCreationDto userCreationDto)
        {
            context.accessTokens.RemoveRange(context.accessTokens.Where(token => token.ExpirationDate < DateTime.UtcNow.AddSeconds(30)));
            await context.SaveChangesAsync();

            var user = await context.Users.Where(x => x.UserName == userCreationDto.UserName).FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }
            if(!EncryptionHelper.Verify(userCreationDto.Password, user.Password))
            {
                return Unauthorized();
            }

            var newToken = new AccessTokens { CreationDate = DateTime.UtcNow, ExpirationDate = DateTime.UtcNow.AddMinutes(15), user = user };
            await context.AddAsync(newToken);
            await context.SaveChangesAsync();
            return Ok(newToken.Id);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var token = Request.Headers.Authorization;
            context.accessTokens.RemoveRange(context.accessTokens.Where(token => token.ExpirationDate < DateTime.UtcNow.AddSeconds(30)));
            await context.SaveChangesAsync();
            var usersDtos = await context.Users.Select(u => new UserDto { UserName = u.UserName, Id = u.Id }).ToListAsync();
            return Ok(usersDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int? id)
        {
            var userQuery = await context.Users.Where(x => x.Id == id).FirstAsync();
            return Ok(new UserDto { UserName = userQuery.UserName, Id = userQuery.Id });
        }

        [HttpGet("{id}/prompt")]
        public async Task<ActionResult> GetPrompt(int? id)
        {
            var userQuery = await context.Users.Where(x => x.Id == id).Include(u => u.FixedPrompt).FirstAsync();
            return Ok(userQuery.FixedPrompt.prompt);
        }

        [HttpPost("{id}/fixed")]
        public async Task<ActionResult> fixedAuthentication(int? userId)
        {
            return Ok(true);
        }

        [HttpPost("{id}/flex")]
        public async Task<ActionResult> flexAuthentication(int? userId)
        {
            return Ok(true);
        }

        [HttpGet("current")]
        public async Task<ActionResult> GetCurrent()
        {
            var requestToken = new Guid(Request.Headers.Authorization.ToString());
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
            return Ok();
        }
    }
}
