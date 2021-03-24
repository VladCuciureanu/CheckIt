using FluentValidation;

namespace CheckIt.Application.DTOs.Mail
{
    public class MailRequest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string From { get; set; }
    }
    
    public class MailRequestValidator : AbstractValidator<MailRequest>
    {
        public MailRequestValidator()
        {
            RuleFor(x => x.To).NotEmpty().EmailAddress();
            RuleFor(x => x.Subject).NotEmpty();
            RuleFor(x => x.Body).NotEmpty();
            RuleFor(x => x.From).NotEmpty().EmailAddress();
        }
    }
}