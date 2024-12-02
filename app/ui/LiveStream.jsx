export default function LiveStream() {
    const streamUrl = "http://192.168.178.23:5001/video_feed";

    return (
        <div id="liveStream">
            <h2>Live Camera Feed</h2>
            <img
                id="cameraStream"
                src={streamUrl}
                alt="Live stream"
                width="640"
                height="480"
            />
        </div>
    );
}
