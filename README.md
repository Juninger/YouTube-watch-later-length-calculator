# YouTube-watch-later-length-calculator
A quick and free browser-script that can be used to check the total duration of your 'Watch Later' list on YouTube

## How do I use it?
1. Open your web browser (Google Chrome, Mozilla Firefox, etc.).
2. Go to YouTube and navigate to your ['Watch Later' playlist.](https://www.youtube.com/playlist?list=WL)
3. Open the developer console in your browser. You can usually do this by pressing F12 or right-clicking on the page and selecting "Inspect" / "Inspect Element," and then navigating to the "Console" tab. 
4. Copy and paste the provided JavaScript code (script) into the console.
5. Press "Enter" to run the script.

## What does it do?

The script extracts the video durations from the 'Watch Later' playlist's HTML and calculates the total duration in days, hours, minutes, and seconds. It then logs the result to the console. No data about your account or playlist is stored or sent anywhere outside of your browser. 

## Script
```JavaScript
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
const videosContainer = document.querySelector('div#contents.ytd-playlist-video-list-renderer');

// Selector for duration label in thumbnails, used to extract video length
// Also avoids non-video child elements, such as loading spinners for infinite scrolling
const durationLabels = videosContainer.querySelectorAll('ytd-thumbnail-overlay-time-status-renderer span#text');

let totalSeconds = 0;

// Sums all durations
durationLabels.forEach(label => {
    const durationText = label.innerHTML;
    const seconds = durationStringToSeconds(durationText);
    totalSeconds += seconds;
});

// Converts total seconds back to days, hours, minutes, seconds
const days = Math.floor(totalSeconds / (3600 * 24));
const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;

console.log(`Videos checked: ${durationLabels.length}
Total duration: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
```

### Example output
```yaml
Videos checked: 118
Total duration: 0 days, 7 hours, 44 minutes, 40 seconds
```

## Notes
* This script is provided as-is and may require updates if YouTube's HTML structure or class names change in the future.
* The script only calculates the duration for videos currently displayed on the 'Watch Later' playlist page. 
* If you have a long list, you need to scroll down to load more videos and then run the script again to get an accurate total duration.



