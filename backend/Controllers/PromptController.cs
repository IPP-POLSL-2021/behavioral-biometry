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
        private readonly ApplicationDbContext context;
        public PromptController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet("default")]
        public async Task<ActionResult> defaultPrompt()
        {
            return Ok(Prompt1.prompt);
        }

        [HttpPost]
        public async Task<ActionResult> post(Prompt1Dto prompt)
        {
            context.accessTokens.RemoveRange(context.accessTokens.Where(token => token.ExpirationDate < DateTime.UtcNow.AddSeconds(30)));
            await context.SaveChangesAsync();

            var requestToken = new Guid(Request.Headers.Authorization.ToString());
            var accesstoken = await context.accessTokens.Include(t => t.user).Where(t => t.Id == requestToken).FirstOrDefaultAsync();
            if (accesstoken == null)
            {
                return Unauthorized();
            }

            var newPrompt1 = new Prompt1
            {
                user = accesstoken.user,

                H_period = prompt.H_period,

                DD_period_t = prompt.DD_period_t,
                DU_period_t = prompt.DU_period_t,
                H_t = prompt.H_t,

                DD_t_i = prompt.DD_t_i,
                DU_t_i = prompt.DU_t_i,
                H_i = prompt.H_i,

                DD_i_e = prompt.DD_i_e,
                DU_i_e = prompt.DU_i_e,
                H_e = prompt.H_e,

                DD_e_five = prompt.DD_e_five,
                DU_e_five = prompt.DU_e_five,
                H_five = prompt.H_five,

                DD_five_r = prompt.DD_five_r,
                DU_five_r = prompt.DU_five_r,
                H_r = prompt.H_r,

                DD_r_o = prompt.DD_r_o,
                DU_r_o = prompt.DU_r_o,
                H_o = prompt.H_o,

                DD_o_n = prompt.DD_o_n,
                DU_o_n = prompt.DU_o_n,
                H_n = prompt.H_n,

                DD_n_a = prompt.DD_n_a,
                DU_n_a = prompt.DU_n_a,
                H_a = prompt.H_a,

                DD_a_l = prompt.DD_a_l,
                DU_a_l = prompt.DU_a_l,
                H_l = prompt.H_l,
            };

            context.Add(newPrompt1);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}