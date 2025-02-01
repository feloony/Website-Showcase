// Luhn Algorithm for validation
function luhnCheck(cardNumber) {
    let sum = 0;
    let alternate = false;
    let digits = cardNumber.split("").reverse();
    
    for (let i = 0; i < digits.length; i++) {
        let num = parseInt(digits[i]);
        
        if (alternate) {
            num *= 2;
            if (num > 9) num -= 9;
        }

        sum += num;
        alternate = !alternate;
    }
    
    return sum % 10 === 0;
}

// Generate a random valid card number
function generateCard() {
    let prefix = "4";  // Visa starts with 4, can be changed
    let number = prefix + Math.floor(Math.random() * 1e12).toString().padStart(15, "0");

    // Make sure the generated number is valid
    if (!luhnCheck(number)) {
        return generateCard();
    }

    document.getElementById("generatedCard").textContent = "Generated Card: " + number;
}

// Validate card number
function validateCard() {
    let cardNumber = document.getElementById("cardInput").value.replace(/\s+/g, '');
    let result = luhnCheck(cardNumber) ? "Valid Card ✅" : "Invalid Card ❌";
    document.getElementById("validationResult").textContent = result;
}

// BIN Lookup
function lookupBIN() {
    let bin = document.getElementById("binInput").value;
    if (bin.length < 6) {
        document.getElementById("binResult").textContent = "Enter at least 6 digits!";
        return;
    }

    fetch(`https://lookup.binlist.net/${bin}`)
        .then(response => response.json())
        .then(data => {
            let result = `Bank: ${data.bank.name || "Unknown"} | Country: ${data.country.name || "Unknown"} | Type: ${data.type || "Unknown"}`;
            document.getElementById("binResult").textContent = result;
        })
        .catch(error => {
            document.getElementById("binResult").textContent = "BIN lookup failed!";
        });
}
