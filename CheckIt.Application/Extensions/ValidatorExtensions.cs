using System.Collections.Generic;
using FluentValidation;

namespace FluentValidation
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilderOptions<T, string> IsAlphanumeric<T>(
            this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder
                .Matches(@"^[0-9a-zA-Z ]+$")
                .WithMessage("{PropertyName} can only contain alphanumeric characters.");
        }
    }
}