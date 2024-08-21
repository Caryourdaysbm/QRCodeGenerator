document.addEventListener('DOMContentLoaded', function() {
    const data = document.getElementById('data');
    const format = document.getElementById('format');
    const result = document.getElementById('result');
    const generate = document.getElementById('generate');

    const apiKey = "4nH+cwJr1kWjhzTryTN7Qw==1eDoB8Jy13vyK5S6";
    const apiUrl = "https://api.api-ninjas.com/v1/qrcode?data=";

    generate.addEventListener('click', () => {
        result.innerHTML = 'generating your qrcode...\nplease wait...'

        const totalData = encodeURIComponent(data.value);
        const totalFormat = format.value;

        const url = apiUrl + totalData + '&format=' + totalFormat.toUpperCase();

        fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': apiKey,
            },
            contentType: 'application/json'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();  // Parse the response as plain text
        })
        .then(data => {
            const imgBase64 = data;  // The response is the base64 image data
            const imgURL = `data:image/${totalFormat.toUpperCase()};base64,${imgBase64}`;

            // Clear previous result
            result.innerHTML = '';

            // Create an image element to display the QR code
            const img = document.createElement('img');
            img.src = imgURL;
            img.alt = 'Generated QR Code';
            result.appendChild(img);

            // Create a download button
            const downloadButton = document.createElement('a');
            downloadButton.href = imgURL;
            downloadButton.download = `qrCodeGeneratedBySBM.${totalFormat.toLowerCase()}`;
            downloadButton.textContent = 'Download QR Code';
            result.appendChild(downloadButton);
        })
        .catch(error => {
            console.error('Request failed:', error);
            result.textContent = 'Error Occurred, Please try later';
        });
    });


    con
});
