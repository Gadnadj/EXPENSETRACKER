const Loading = () => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
                <p className="mt-4 text-gray-600">Chargement en cours...</p>
            </div>
        </div>
    );
};

export default Loading; 