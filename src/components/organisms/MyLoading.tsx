import React from 'react';

const MyLoading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="loader"></div>
            <p className="mt-4 text-lg text-gray-700">Loading...</p>
        </div>
    );
};

export default MyLoading;