using FluentValidation;

namespace CheckIt.Application.DTOs.Identity
{
    public class TokenRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    
    public class TokenRequestValidator : AbstractValidator<TokenRequest>
    {
        public TokenRequestValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
        }
    }
}