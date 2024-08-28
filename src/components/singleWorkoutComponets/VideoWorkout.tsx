import React, { useEffect, useState } from 'react';
import { fetchYouTubeVideo, youtubeOptions } from '@/utils/fetchDataFromOther';

interface VideoWorkoutProps {
    exsoname: string;
}

const VideoWorkout: React.FC<VideoWorkoutProps> = ({ exsoname }) => {
    const [getVideo, setGetVideo] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null);
    const youtubeVideoUrl = 'https://youtube-search-and-download.p.rapidapi.com';

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const dataList = await fetchYouTubeVideo(`${youtubeVideoUrl}/search?query=${exsoname}`, youtubeOptions);
                setGetVideo(dataList.contents);
                setError(null); // Clear any previous errors
            } catch (error) {
                console.error('Error fetching YouTube videos:', error);
                setError("😔 Couldn't load the video.");
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };
        getData();
    }, [exsoname]);

    return (
        <div className='h-full cursor-pointer'>
            {loading ? (
                <div className='w-full h-full bg-[#f0ecff] animate-pulse'></div>
            ) : error ? (
                <div className='w-full h-full flex justify-center items-center text-[15px] font-semibold'>{error}</div>
            ) : (
                getVideo.slice(0, 1).map((item: any, index: any) => (
                    <div key={index} className="exercise-video h-full border">
                        <div className='h-full'>
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${item.video.videoId}`}
                                title={item.video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className='rounded-lg'
                            ></iframe>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default VideoWorkout;
