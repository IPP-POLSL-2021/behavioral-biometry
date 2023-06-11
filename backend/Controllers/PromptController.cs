using backend.Context;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/prompt")]
    public class PromptController : ControllerBase
    {
        static int x = 10;
        private readonly ApplicationDbContext context;
        public PromptController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public static string GetRandomAlphaNumeric(int length)
        {
            return Path.GetRandomFileName().Replace(".", "").Substring(0, length);
        }

        [HttpGet("random")]
        public OkObjectResult getRandom()
        {
            var prompt = context.fixedPrompts.OrderBy(r => EF.Functions.Random()).Take(1).First().prompt;
            return Ok(prompt);
            //return Ok(GetRandomAlphaNumeric(10));
        }

        [HttpGet("fixed")]
        public async Task<ActionResult> getFixedPrompt()
        {
            Guid requestToken;
            if (!Guid.TryParse(Request.Headers.Authorization.ToString(), out requestToken))
            {
                return BadRequest();
            }
            var accesstoken = await context.accessTokens.Include(t => t.user).Include(t => t.user.FixedPrompt).Where(t => t.Id == requestToken).FirstOrDefaultAsync();
            if (accesstoken == null)
            {
                return BadRequest();
            }
            return Ok(accesstoken.user.FixedPrompt.prompt);
        }

        [HttpGet("authenticationProfile")]
        public async Task<ActionResult> getPrompt()
        {
            Guid requestToken;
            if(!Guid.TryParse(Request.Headers.Authorization.ToString(), out requestToken))
            {
                return BadRequest();
            }
            var accesstoken = await context.accessTokens.Include(t => t.user).Include(t => t.user.FixedPrompt).Where(t => t.Id == requestToken).FirstOrDefaultAsync();
            if (accesstoken == null) {
                return BadRequest();
            }
            int fixedPrompts = context.PromptData.Where(p => p.User.Id == accesstoken.user.Id && p.PromptId != null).Count();
            int randomPrompts = context.PromptData.Where(p => p.User.Id == accesstoken.user.Id && p.PromptId == null).Count();

            if(fixedPrompts < x)
            {
                return Ok(accesstoken.user.FixedPrompt.prompt);
            }
            if(randomPrompts < x)
            {
                var prompt = context.fixedPrompts.OrderBy(r => EF.Functions.Random()).Take(1).First().prompt;
                return Ok(prompt);
            }
            return NoContent();
        }

        [HttpPost("create")]
        public async Task<ActionResult> createPrompt(PromptCreationDto data)
        {
            if (data.Data.Length > 10)
            {
                return BadRequest();
            }
            var prompt = new Prompt { prompt = data.Data };

            context.Add(prompt);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("authenticationProfile")]
        public async Task<ActionResult> post(PromptDataDto prompt)
        {
            context.accessTokens.RemoveRange(context.accessTokens.Where(token => token.ExpirationDate < DateTime.UtcNow.AddSeconds(30)));
            await context.SaveChangesAsync();

            var requestToken = new Guid(Request.Headers.Authorization.ToString());
            var accesstoken = await context.accessTokens.Include(t => t.user).Where(t => t.Id == requestToken).FirstOrDefaultAsync();
            if (accesstoken == null)
            {
                return Unauthorized();
            }

            var userPrompt = await context.Users.Include(t => t.FixedPrompt).Where(t => t.Id == accesstoken.user.Id).FirstOrDefaultAsync();

            if (userPrompt == null)
            {
                return BadRequest();
            }
            var p = await context.prompts.Where(p => p.prompt == prompt.Prompt).FirstOrDefaultAsync();
            
            var newPrompt1 = new PromptData
            {
                User = accesstoken.user,
                Prompt = p,
                IsFixedUserPrompt = userPrompt.FixedPrompt.prompt == prompt.Prompt,

                H_k1 = prompt.H_k1,

                DD_k1_k2 = prompt.DD_k1_k2,
                DU_k1_k2 = prompt.DU_k1_k2,
                H_k2 = prompt.H_k2,

                DD_k2_k3 = prompt.DD_k2_k3,
                DU_k2_k3 = prompt.DU_k2_k3,
                H_k3 = prompt.H_k3,

                DD_k3_k4 = prompt.DD_k3_k4,
                DU_k3_k4 = prompt.DU_k3_k4,
                H_k4 = prompt.H_k4,

                DD_k4_k5 = prompt.DD_k4_k5,
                DU_k4_k5 = prompt.DU_k4_k5,
                H_k5 = prompt.H_k5,

                DD_k5_k6 = prompt.DD_k5_k6,
                DU_k5_k6 = prompt.DU_k5_k6,
                H_k6 = prompt.H_k6,

                DD_k6_k7 = prompt.DD_k6_k7,
                DU_k6_k7 = prompt.DU_k6_k7,
                H_k7 = prompt.H_k7,

                DD_k7_k8 = prompt.DD_k7_k8,
                DU_k7_k8 = prompt.DU_k7_k8,
                H_k8 = prompt.H_k8,

                DD_k8_k9 = prompt.DD_k8_k9,
                DU_k8_k9 = prompt.DU_k8_k9,
                H_k9 = prompt.H_k9,

                DD_k9_k10 = prompt.DD_k9_k10,
                DU_k9_k10 = prompt.DU_k9_k10,
                H_k10 = prompt.H_k10,
            };

            context.Add(newPrompt1);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("test")]
        public async Task<ActionResult> test(PromptDataDto prompt)
        {
            return Ok();
        }
    }
}