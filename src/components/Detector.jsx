import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
const { FiUploadCloud, FiSearch, FiCheckCircle, FiAlertCircle, FiActivity } = FiIcons;
import SafeIcon from '../common/SafeIcon';
import { analyzeImage } from '../lib/gemini';

const Detector = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeImage(file);
      setResult(data);
    } catch (err) {
      setError("Failed to analyze image. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="detector" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Upload Container */}
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-emerald-200 rounded-3xl p-12 bg-emerald-50/50 hover:bg-emerald-50 transition-all cursor-pointer group relative overflow-hidden"
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept="image/*"
            />
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-80 object-cover rounded-2xl shadow-lg" />
            ) : (
              <div className="flex flex-col items-center gap-4 py-12">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <SafeIcon icon={FiUploadCloud} className="text-3xl text-emerald-600" />
                </div>
                <div className="text-center">
                  <p className="text-emerald-900 font-bold text-lg">Upload Crop Photo</p>
                  <p className="text-emerald-700/60 text-sm">Drag and drop or click to browse</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-emerald-100"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <SafeIcon icon={FiSearch} />
                Analyze Health
              </>
            )}
          </button>
        </div>

        {/* Results Container */}
        <div className="bg-white border border-emerald-100 rounded-3xl p-8 shadow-xl min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            {!result && !loading && !error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <SafeIcon icon={FiActivity} className="text-2xl text-emerald-400" />
                </div>
                <h3 className="text-emerald-900 font-bold text-xl mb-2">Ready for Diagnosis</h3>
                <p className="text-emerald-700/60">Upload a clear photo of your plant leaves or crops to begin analysis.</p>
              </motion.div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      className="w-3 h-3 bg-emerald-500 rounded-full"
                    />
                  ))}
                </div>
                <p className="text-emerald-700 font-medium">Gemini AI is scanning tissues...</p>
              </div>
            )}

            {error && (
              <div className="flex-1 flex flex-col items-center justify-center text-red-500">
                <SafeIcon icon={FiAlertCircle} className="text-4xl mb-4" />
                <p className="font-bold">{error}</p>
                <p className="text-sm mt-2 text-red-400">Please remind the user to connect to the Gemini API.</p>
              </div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-emerald-900">{result.plantName}</h2>
                    <div className="flex items-center gap-2 mt-2">
                       <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                         result.healthStatus === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                       }`}>
                         {result.healthStatus}
                       </span>
                       <span className="text-emerald-600 font-bold text-sm">{result.confidence} Confidence</span>
                    </div>
                  </div>
                  <SafeIcon icon={FiCheckCircle} className="text-3xl text-emerald-500" />
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <h4 className="text-emerald-900 font-bold mb-1">Diagnosis</h4>
                  <p className="text-emerald-800/80 text-sm leading-relaxed">{result.diagnosis}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-emerald-900 font-bold text-sm">Treatment Plan</h4>
                    <ul className="space-y-1">
                      {result.treatment.map((step, i) => (
                        <li key={i} className="text-xs text-emerald-700 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-emerald-900 font-bold text-sm">Prevention</h4>
                    <ul className="space-y-1">
                      {result.prevention.map((tip, i) => (
                        <li key={i} className="text-xs text-emerald-700 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Detector;