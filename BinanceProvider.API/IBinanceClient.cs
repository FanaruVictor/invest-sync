namespace BinanceProvider.API
{
    public interface IBinanceClient
    {
        Task<IEnumerable<String>> GetSymbols();
    }
}
