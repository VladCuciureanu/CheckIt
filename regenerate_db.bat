CHOICE /C Y /M "Press Y to continue."

Echo Starting to regenerate database!
cmd /c "dotnet ef database drop -f -v --project CheckIt.Infrastructure --startup-project CheckIt.Api --context IdentityContext"
cmd /c "dotnet ef database drop -f -v --project CheckIt.Infrastructure --startup-project CheckIt.Api --context IdentityContext"
cmd /c "dotnet ef migrations remove --project CheckIt.Infrastructure --startup-project CheckIt.Api --context IdentityContext"
cmd /c "dotnet ef migrations remove --project CheckIt.Infrastructure --startup-project CheckIt.Api --context ApplicationDbContext"
cmd /c "dotnet ef migrations add Initial --project CheckIt.Infrastructure --startup-project CheckIt.Api --context IdentityContext"
cmd /c "dotnet ef migrations add Initial --project CheckIt.Infrastructure --startup-project CheckIt.Api --context ApplicationDbContext"
cmd /c "dotnet ef database update --project CheckIt.Infrastructure --startup-project CheckIt.Api --context IdentityContext"
cmd /c "dotnet ef database update --project CheckIt.Infrastructure --startup-project CheckIt.Api --context ApplicationDbContext"
Echo Database regeneration finished! Please check for errors.
