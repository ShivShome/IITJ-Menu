// Function to fetch data from ThingSpeak and update the button text temporarily
function fetchData() {
    let channelID = 2893364;  // ThingSpeak Channel ID
    let apiKey = "4VGRKKA7HLR5VZKQ";  // ThingSpeak Read API Key

    let url = `https://api.thingspeak.com/channels/${channelID}/fields/1/last.json?api_key=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let groundFloorButton = document.querySelector(".newfloor0");
            if (groundFloorButton) {
                if (data && data.field1) {
                    let count = data.field1;
                    groundFloorButton.innerHTML = `${count} people`;

                    // Revert back to "Ground Floor" after 3 seconds
                    setTimeout(() => {
                        groundFloorButton.innerHTML = "<span>Ground Floor</span>";
                    }, 2000);
                } else {
                    groundFloorButton.innerHTML = "No data available";
                    setTimeout(() => {
                        groundFloorButton.innerHTML = "<span>Ground Floor</span>";
                    }, 2000);
                }
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Add event listener to the Ground Floor button
document.addEventListener("DOMContentLoaded", function () {
    let groundFloorButton = document.querySelector(".newfloor0");
    if (groundFloorButton) {
        groundFloorButton.addEventListener("click", fetchData);
    }
});
