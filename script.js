

//Añado listeners a los botones
document.addEventListener("DOMContentLoaded", () => {

    const generateBtn = document.getElementById("generate-password");
    const copyBtn = document.getElementById("copy-password");

    if (generateBtn) {
        generateBtn.addEventListener("click", () => {
            //console.log("Generate Password button clicked!");
            // Aquí agregaremos la lógica para generar la contraseña

           const selectedSize = document.querySelector('input[name="password-size"]:checked');

           if(selectedSize){

                //console.log(selectedSize.value);
                const password = generatePassword(parseInt(selectedSize.value));
                document.getElementById("generated-password").value = password;
           }

        });
    }

    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            //console.log("Copy to Clipboard button clicked!");
            // Aquí agregaremos la lógica para copiar la contraseña
            const passwordInput = document.getElementById("generated-password");

            //Copiar el texto al portapapeles
            navigator.clipboard.writeText(passwordInput.value)
            .then(() => {

              console.log("Contraseña copiada al portapapeles!");
        
              // Cambiar el texto del botón para mostrar que se copió
              copyBtn.innerHTML = '<i class="ph-bold ph-clipboard-text text-xl"></i> <p class="text-xs">Copied!</p>';
        
              // Volver al texto original del botón después de unos segundos
              setTimeout(() => {
                copyBtn.innerHTML = '<i class="ph-bold ph-clipboard-text text-xl"></i> <p class="text-xs">To Clipboard</p>';
              }, 2000);

            })
            .catch((error) => {

              console.error("Error al copiar al portapapeles: ", error);

            });

        });
    }


});


//Función para generar contraseñas

function generatePassword(length) {

    //Carácteres que se van a utilizar
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+";
    const charset = lower + upper + numbers + symbols;


    //No puede generarse una contraseña con length menor que 8 carácteres
    if (length < 8) {
        console.error("El tamaño mínimo debe ser 4 para incluir todos los tipos de caracteres.");
        return "";
    }

    //Al menos una minúscula, una mayúscula, un número y un símbolo (4 carácteres de tipo obligado)
    let password = [
        lower[Math.floor(Math.random() * lower.length)],
        upper[Math.floor(Math.random() * upper.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];

    // Relleno el resto de la contraseña con caracteres aleatorios
    for (let i = 4; i < length; i++) {
        password.push(charset[Math.floor(Math.random() * charset.length)]);
    }

    /**El valor que la función devuelve determina qué debe ocurrir:
        -> Si devuelve un número negativo, el elemento a se mantiene antes que b.
        -> Si devuelve un número positivo, el elemento b se coloca antes que a.
        -> Si devuelve cero, no se cambia el orden de a y b. 
    */

    password = password.sort(() => Math.random() - 0.5).join(""); //Join para transformar en string

    return password;
}
