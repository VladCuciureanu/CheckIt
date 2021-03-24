using System.ComponentModel.DataAnnotations;
using FluentValidation;

namespace CheckIt.Application.DTOs.Identity
{
    public class ForgotPasswordRequest
    {
        public string Email { get; set; }
    }
    
    public class ForgotPasswordRequestValidator : AbstractValidator<ForgotPasswordRequest>
    {
        public ForgotPasswordRequestValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
        }
    }
}