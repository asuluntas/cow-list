import VideoListEntry from "./VideoListEntry.js";


var VideoList = ({videos, handleVideoListEntryTitleClick}) => (
  <div className="video-list">
    {
      videos.map(video =>
        <VideoListEntry video = {video} key={video.id.videoId} handleVideoListEntryTitleClick={handleVideoListEntryTitleClick}/>)
    }
  </div>
);

VideoList.propTypes = {
  videos: React.PropTypes.array.isRequired
};

export default VideoList;
