import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Coin = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => getData(), []);

  const getData = async () => {
    const url =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false';
    const { data } = await axios.get(url);
    setCoins(data);
  };

  const lowerCase = (coinName) => {
    return coinName.toLowerCase();
  };

  const filtros = coins.filter(
    (coin) =>
      lowerCase(coin.name).includes(lowerCase(search)) ||
      lowerCase(coin.symbol).includes(lowerCase(search))
  );

  return (
    <div>
      <div className='container'>
        <h1 className='text-center fw-bold mt-2'>SEARCH</h1>
        <div className='mt-5 d-flex justify-content-center align-items-center'>
          <div className='col-6'>
            <form>
              <div className='mb-3'>
                <input
                  type='text'
                  placeholder='SEARCH'
                  className='form-control'
                  autoFocus
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <table className='table'>
          <thead className='table-dark'>
            <tr>
              <th>Logo:</th>
              <th>Name:</th>
              <th>Symbol:</th>
              <th>Price:</th>
              <th>Price Change:</th>
            </tr>
          </thead>
          <tbody>
            {filtros.map((coin) => {
              return (
                <tr key={coin.id}>
                  <td>
                    <img
                      src={coin.image}
                      alt='img'
                      className='img-fluid'
                      style={{ width: '30px', height: '30px' }}
                    />
                  </td>
                  <td>{coin.name}</td>
                  <td>{coin.symbol}</td>
                  <td>${coin.current_price}</td>
                  <td
                    className={
                      coin.price_change_percentage_24h < 0
                        ? 'text-danger'
                        : 'text-success'
                    }
                  >
                    {Math.round(coin.price_change_percentage_24h * 100) / 100} %
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
