const Loading = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50">
            <div className="w-8 h-8 border-2 border-zinc-700 border-t-primary rounded-full animate-spin"></div>
        </div>
    );
}

export default Loading;
