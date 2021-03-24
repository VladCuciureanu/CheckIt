using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CheckIt.Application.Constants;
using CheckIt.Application.Enums;
using CheckIt.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace CheckIt.Infrastructure.Identity.Seeds
{
    public static class DefaultModeratorUser
    {
        public static async Task AddPermissionClaim(this RoleManager<IdentityRole> roleManager, IdentityRole role,
            string module)
        {
            var allClaims = await roleManager.GetClaimsAsync(role);
            var allPermissions = Permissions.GeneratePermissionsForModule(module);
            foreach (var permission in allPermissions)
                if (!allClaims.Any(a => a.Type == "Permission" && a.Value == permission))
                    await roleManager.AddClaimAsync(role, new Claim(CustomClaimTypes.Permission, permission));
        }

        private static async Task SeedClaimsForModerator(this RoleManager<IdentityRole> roleManager)
        {
            var moderatorRole = await roleManager.FindByNameAsync("Moderator");
            await roleManager.AddPermissionClaim(moderatorRole, "Users");
            await roleManager.AddPermissionClaim(moderatorRole, "Todos");
            await roleManager.AddPermissionClaim(moderatorRole, "TodoLists");
        }

        public static async Task SeedAsync(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            //Seed Default Moderator User
            var defaultUser = new ApplicationUser
            {
                UserName = "moderator",
                Email = "moderator@gmail.com",
                FirstName = "Vlad",
                LastName = "Cuciureanu",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                IsActive = true
            };
            if (userManager.Users.All(u => u.Id != defaultUser.Id))
            {
                var user = await userManager.FindByEmailAsync(defaultUser.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(defaultUser, "123Pa$$word!");
                    await userManager.AddToRoleAsync(defaultUser, Roles.Basic.ToString());
                    await userManager.AddToRoleAsync(defaultUser, Roles.Moderator.ToString());
                }

                await roleManager.SeedClaimsForModerator();
            }
        }
    }
}