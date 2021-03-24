using System.Threading.Tasks;
using CheckIt.Application.Enums;
using CheckIt.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace CheckIt.Infrastructure.Identity.Seeds
{
    public static class DefaultRoles
    {
        public static async Task SeedAsync(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            //Seed Roles
            await roleManager.CreateAsync(new IdentityRole(Roles.Moderator.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Roles.Basic.ToString()));
        }
    }
}