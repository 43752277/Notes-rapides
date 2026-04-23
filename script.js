(function(){

    const isValid = verifySignature(script, sig, publicKey);

console.log("Signature valide :", isValid);

if (!isValid) {
    console.error("Signature invalide — arrêt");
    return; // 🔴 CRUCIAL
}

// ✅ seulement ici
eval(script);

})();