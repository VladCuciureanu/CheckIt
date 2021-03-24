using System.Threading.Tasks;
using CheckIt.Application.DTOs.Mail;

namespace CheckIt.Application.Interfaces.Shared
{
    public interface IMailService
    {
        Task SendAsync(MailRequest request);
    }
}