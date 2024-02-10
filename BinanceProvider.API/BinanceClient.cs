using Binance.Spot;
using Newtonsoft.Json;

namespace BinanceProvider.API
{
    public class Symbol
    {
        public string symbol { get; set; }
    }
    public class ExchangeInfoResult
    {
        public List<Symbol> symbols { get; set; }
    }

    public class BinanceClient : IBinanceClient
    {

        public async Task<IEnumerable<String>> GetSymbols()
        {
            HttpClient httpClient = new HttpClient();

            var market = new Market(httpClient);

            var result = await market.ExchangeInformation();

            var info = JsonConvert.DeserializeObject<ExchangeInfoResult>(result);

            var symbols = info.symbols.Select(x => x.symbol);
            return symbols;
        }
    }
}
