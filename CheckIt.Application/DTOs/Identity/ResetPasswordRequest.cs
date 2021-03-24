using System.ComponentModel.DataAnnotations;
using FluentValidation;

namespace CheckIt.Application.DTOs.Identity
{
    public class ResetPasswordRequest
    {
        public string Email { get; set; }

        public string Token { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
    
    public class ResetPasswordRequestValidator : AbstractValidator<ResetPasswordRequest>
    {
        public ResetPasswordRequestValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Token).NotEmpty();
            RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
            RuleFor(x => x.ConfirmPassword).NotEmpty().Equal(x=>x.Password);
        }
    }
}