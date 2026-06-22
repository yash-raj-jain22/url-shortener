import React from 'react'
import { useState } from 'react';
import { createShortUrl } from '../api/shortUrl';

const UrlForm = () => {
    const [longUrl, setlongUrl] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [shortUrl, setShortUrl] = useState('');
    const [copied, setCopied] = useState(false);


    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (!longUrl || !longUrl.trim()) {
                setError('Please enter a URL')
                setLoading(false)
                return
            }

            if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
                setError('URL must start with http:// or https://')
                setLoading(false)
                return
            }

            const shortUrlData = await createShortUrl(longUrl)
            setShortUrl(shortUrlData)
            setlongUrl('')
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to shorten URL')
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <div className="space-y-5">
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                        Enter your URL
                    </label>
                    <input
                        id="url"
                        type="text"
                        value={longUrl}
                        onChange={(e) => { setlongUrl(e.target.value) }}
                        placeholder="https://example.com/very/long/url"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        disabled={false}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Shortening...
                        </span>
                    ) : (
                        'Shorten URL'
                    )}
                </button>
            </div>

            {/* Result */}
            {shortUrl && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-3">Your short URL:</p>
                    <div className="flex gap-2">
                        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <p className="text-sm text-gray-800 break-all font-mono">{shortUrl}</p>
                        </div>
                        <button
                            onClick={handleCopy}
                            className={`px-4 py-3 rounded-lg font-medium transition duration-200 ${copied
                                ? 'bg-green-500 text-white'
                                : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                                }`}
                        >
                            {copied ? '✓ Copied' : 'Copy'}
                        </button>
                    </div>
                </div>
            )}
        </>



    )
}

export default UrlForm
