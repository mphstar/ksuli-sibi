import React from 'react';

const MyLoading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
            <p className="mt-4 text-lg text-gray-700">Loading...</p>
        </div>
    );
};

export default MyLoading;