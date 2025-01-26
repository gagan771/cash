import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import axios from 'axios';

interface IFSCResponse {
  BANK: string;
  IFSC: string;
  BRANCH: string;
  CENTRE: string;
  DISTRICT: string;
  STATE: string;
  ADDRESS: string;
  CONTACT: string;
  CITY: string;
  [key: string]: string;
}

function App() {
  const [formData, setFormData] = useState({
    CENTRE: 'DELHI',
    DISTRICT: 'DELHI',
    CITY: 'DELHI',
    STATE: 'DELHI',
    BRANCH: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IFSCResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.request({
        method: 'GET',
        url: 'https://ifsc-lookup-api.p.rapidapi.com/BKID0007751',
        headers: {
          'x-rapidapi-key': '3c0631dde9msh2603ba24bf4a233p1531ccjsna1ff069f70ae',
          'x-rapidapi-host': 'ifsc-lookup-api.p.rapidapi.com'
        }
      });
      setResult(response.data);
    } catch (err) {
      setError('Failed to fetch IFSC details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            IFSC Code Lookup
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Search for bank details using location information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  id={key}
                  value={value}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  required
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              'Search'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Bank Details
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {Object.entries(result).map(([key, value], index) => (
                  <div key={key} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;