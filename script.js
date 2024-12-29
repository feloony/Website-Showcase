window.onload = function() {
    const serverIP = 'example.minecraft.com';  // Replace with your server's IP
    const serverStatusElement = document.getElementById('server-status');

    // Function to check server status using an API
    function checkServerStatus() {
        fetch(`https://mcapi.us/server/status?ip=${serverIP}`)
            .then(response => response.json())
            .then(data => {
                if (data.online) {
                    serverStatusElement.textContent = 'Online';
                    serverStatusElement.style.color = 'green';
                } else {
                    serverStatusElement.textContent = 'Offline';
                    serverStatusElement.style.color = 'red';
                }
            })
            .catch(() => {
                serverStatusElement.textContent = 'Error';
                serverStatusElement.style.color = 'orange';
            });
    }

    // Check server status on load
    checkServerStatus();
};
