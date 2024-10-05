import React, { useState } from 'react';
import axios from 'axios';
import { FaHeartbeat, FaStethoscope, FaUserMd } from 'react-icons/fa';

const CKDForm = () => {
  const [formData, setFormData] = useState({
    sg: '',
    al: '',
    sc: '',
    hemo: '',
    pcv: '',
    htn: '0',
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      sg: '',
      al: '',
      sc: '',
      hemo: '',
      pcv: '',
      htn: '0',
    });
    setPrediction(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/ckd/predict`, formData);
      setPrediction(response.data);
      console.log(response.data);
    } catch (err) {
      setError('Error predicting CKD. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="text-white py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <FaHeartbeat className="mx-auto mb-4 text-5xl" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Chronic Kidney Disease Predictor</h1>
          <p className="text-lg md:text-xl">
            Utilize our advanced predictor tool to assess your risk of Chronic Kidney Disease (CKD) based on your medical data.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 px-6 md:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Informative Section */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-6 md:p-10 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <FaStethoscope className="text-teal-500 text-6xl mb-4" />
              <h2 className="text-2xl font-bold mb-2">Why This Matters</h2>
              <p className="text-gray-700">
                Chronic Kidney Disease (CKD) is a progressive condition that affects the kidneys' ability to function effectively.
                Early detection is crucial for managing symptoms and preventing further complications. Our predictor helps you
                understand your risk and take proactive steps towards better kidney health.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4cMiApNtFnuMFZnKTox4eNWOKeW7YK1vGqg&s"
                alt="Kidney Health"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </section>

          {/* Form Section */}
          <section className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Enter Your Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Specific Gravity */}
                <div>
                  <label htmlFor="sg" className="block text-sm font-medium text-gray-700">
                    Specific Gravity (1.0 - 1.1)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="sg"
                    name="sg"
                    value={formData.sg}
                    onChange={handleChange}
                    required
                    min="1.0"
                    max="1.1"
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="e.g., 1.02"
                  />
                </div>

                {/* Albumin */}
                <div>
                  <label htmlFor="al" className="block text-sm font-medium text-gray-700">
                    Albumin (0 - 5)
                  </label>
                  <input
                    type="number"
                    step="1"
                    id="al"
                    name="al"
                    value={formData.al}
                    onChange={handleChange}
                    required
                    min="0"
                    max="5"
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="e.g., 3"
                  />
                </div>

                {/* Serum Creatinine */}
                <div>
                  <label htmlFor="sc" className="block text-sm font-medium text-gray-700">
                    Serum Creatinine (0 - 10)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="sc"
                    name="sc"
                    value={formData.sc}
                    onChange={handleChange}
                    required
                    min="0"
                    max="10"
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="e.g., 1.2"
                  />
                </div>

                {/* Hemoglobin */}
                <div>
                  <label htmlFor="hemo" className="block text-sm font-medium text-gray-700">
                    Hemoglobin (0 - 20)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="hemo"
                    name="hemo"
                    value={formData.hemo}
                    onChange={handleChange}
                    required
                    min="0"
                    max="20"
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="e.g., 13.5"
                  />
                </div>

                {/* Packed Cell Volume */}
                <div>
                  <label htmlFor="pcv" className="block text-sm font-medium text-gray-700">
                    Packed Cell Volume (0 - 100)
                  </label>
                  <input
                    type="number"
                    step="1"
                    id="pcv"
                    name="pcv"
                    value={formData.pcv}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="e.g., 40"
                  />
                </div>

                {/* Hypertension */}
                <div>
                  <label htmlFor="htn" className="block text-sm font-medium text-gray-700">
                    Hypertension
                  </label>
                  <select
                    id="htn"
                    name="htn"
                    value={formData.htn}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
              </div>

              {/* Submit and Reset Buttons */}
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <button
                  type="submit"
                  className="w-full md:w-48 flex items-center justify-center px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition transform hover:-translate-y-0.5"
                >
                  {loading ? 'Predicting...' : 'Predict'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full md:w-48 flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition transform hover:-translate-y-0.5"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Prediction Result */}
            {prediction && (
              <div className="mt-8 p-6 bg-teal-50 border border-teal-200 rounded-lg shadow-md animate-fadeIn">
                <h3 className="text-2xl font-semibold text-teal-700 mb-2 flex items-center">
                  <FaUserMd className="mr-2" /> Prediction Result
                </h3>
                <p className="text-gray-700">
                  {prediction.data.classification === '0'
                    ? (
                      <>
                        The patient <span className="font-bold">has CKD</span> with a probability of{' '}
                        <span className="font-bold text-teal-600">{(prediction.probability * 100).toFixed(2)}%</span>.
                      </>
                    )
                    : (
                      <>
                        The patient <span className="font-bold">does not have CKD</span> with a probability of{' '}
                        <span className="font-bold text-teal-600">{(prediction.probability * 100).toFixed(2)}%</span>.
                      </>
                    )}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-red-700 mb-2">Error</h3>
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-teal-600 text-white py-6 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left">&copy; 2024 Harsh Mahalle. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/" className="hover:text-gray-300 transition">
              Privacy Policy
            </a>
            <a href="/" className="hover:text-gray-300 transition">
              Terms of Service
            </a>
            <a href="/" className="hover:text-gray-300 transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CKDForm;



