import React, { useState } from "react";
import UrlForm from "../components/UrlForm";
import PremiumUrlForm from "../components/PremiumUrlForm";

const Homepage = () => {

    return (
        <>
                
                {/* <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                    
                    <div className="w-full max-w-md">
                        
                        <div className="bg-white rounded-lg shadow-xl p-8">
                            
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                    URL Shortener
                                </h1>
                                <p className="text-gray-600">
                                    Make your URLs short and shareable
                                </p>
                            </div>

                            <UrlForm />

                            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-xs text-blue-700 text-center">
                                    🔗 Share your shortened URLs easily and
                                    track clicks
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
            
                <div><PremiumUrlForm /></div>
            
        </>
    );
};

export default Homepage;
