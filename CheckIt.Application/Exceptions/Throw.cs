namespace CheckIt.Application.Exceptions
{
    public interface IThrow
    {
    }

    public class Throw : IThrow
    {
        private Throw()
        {
        }

        public static IThrow Exception { get; } = new Throw();
    }
}