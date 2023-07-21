// Helper method to convert the extracted text from duration label to seconds
function durationStringToSeconds(durationString) {
    const parts = durationString.split(":");
    let seconds = 0;
    if (parts.length === 3) {                 // Format: hh:mm:ss
        seconds += parseInt(parts[0]) * 3600; // Hours -> seconds
        seconds += parseInt(parts[1]) * 60;   // Minutes -> seconds
        seconds += parseInt(parts[2]);        // Seconds
    } else if (parts.length === 2) {          // Format: mm:ss
        seconds += parseInt(parts[0]) * 60;   // Minutes -> seconds
        seconds += parseInt(parts[1]);        // Seconds
    }
    return seconds;
};

// Selector for container with all currently displayed videos in Watch Later / Playlist
const vidList = document.querySelector('div#contents.ytd-playlist-video-list-renderer');

// Selector for duration label in thumbnails, used to extract video length
// Also avoids non-video child elements, such as loading spinners for infinite scrolling
const durLabels = vidList.querySelectorAll('ytd-thumbnail-overlay-time-status-renderer span#text');

let totalSeconds = 0;

// Sums all durations
durLabels.forEach(label => {
    const durationText = label.innerHTML;
    const seconds = durationStringToSeconds(durationText);
    totalSeconds += seconds;
});

// Converts total seconds back to days, hours, minutes, seconds
const days = Math.floor(totalSeconds / (3600 * 24));
const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;

console.log(`Videos checked: ${durLabels.length}
Total duration: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);