document.addEventListener('DOMContentLoaded', () => {
    const encryptedMessageElement = document.getElementById('encrypted-message');
    const shiftValueInput = document.getElementById('shift-value');
    const currentShiftDisplay = document.getElementById('current-shift');
    const decryptedInput = document.getElementById('decrypted-input');
    const checkSolutionButton = document.getElementById('check-solution');
    
    // Elementi per il risultato
    const flagDisplay = document.getElementById('flag-display');
    const flagTextElement = flagDisplay.querySelector('.flag-text');
    const feedbackMessage = document.getElementById('feedback-message');
    const giftArea = document.getElementById('gift-area'); // Il bottone regalo

    // --- CONFIGURAZIONE ---
    const originalMessage = "Tanti Auguri! Decifra questo messaggio per il tuo regalo speciale!"; 
    const correctDecryptedAnswer = "TANTI AUGURI! DECIFRA QUESTO MESSAGGIO PER IL TUO REGALO SPECIALE!"; 
    const actualFlag = "AUGUR1_1CI4_L0V3U"; 

    // Shift casuale all'avvio
    const initialShift = Math.floor(Math.random() * 10) + 5; 
    let currentShift = initialShift; 

    // Funzione Cesare
    function caesarCipher(str, shift, decrypt = false) {
        let result = '';
        shift = shift % 26; 
        if (decrypt) shift = (26 - shift) % 26; 

        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            let charCode = str.charCodeAt(i);
            if (charCode >= 65 && charCode <= 90) {
                char = String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
            } else if (charCode >= 97 && charCode <= 122) {
                char = String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
            }
            result += char;
        }
        return result;
    }

    function initializeGame() {
        const encrypted = caesarCipher(originalMessage, initialShift);
        encryptedMessageElement.textContent = encrypted;
        
        shiftValueInput.value = 3; 
        currentShiftDisplay.textContent = 3;
        
        // Decifra anteprima iniziale
        decryptedInput.value = caesarCipher(encrypted, 3, true);

        // Nascondi tutto all'inizio
        flagDisplay.classList.add('hidden');
        giftArea.classList.add('hidden'); // Nasconde il regalo
        feedbackMessage.textContent = ''; 
    }

    // Slider Listener
    shiftValueInput.addEventListener('input', () => {
        currentShift = parseInt(shiftValueInput.value);
        currentShiftDisplay.textContent = currentShift;
        const encryptedText = encryptedMessageElement.textContent;
        decryptedInput.value = caesarCipher(encryptedText, currentShift, true);
    });

    // Check Button Listener
    checkSolutionButton.addEventListener('click', () => {
        const userDecrypted = decryptedInput.value.trim().toUpperCase(); 
        const expectedDecrypted = correctDecryptedAnswer.toUpperCase(); 

        if (userDecrypted === expectedDecrypted) {
            // SUCCESSO!
            feedbackMessage.textContent = "BRAVISSIMA/O! Codice Corretto! 🥳";
            feedbackMessage.classList.remove('error');
            feedbackMessage.classList.add('success');
            
            // Mostra Flag
            flagTextElement.textContent = actualFlag;
            flagDisplay.classList.remove('hidden');
            
            // MOSTRA IL BOTTONE DEL REGALO
            giftArea.classList.remove('hidden'); 

        } else {
            // ERRORE
            feedbackMessage.textContent = "Non ci siamo ancora... riprova a ruotare la torta! 🎂";
            feedbackMessage.classList.remove('success');
            feedbackMessage.classList.add('error');
            flagDisplay.classList.add('hidden');
            giftArea.classList.add('hidden');
        }
    });

    initializeGame();
});