    /* This regEx follow the official standard RFC 5322. From https://emailregex.com/ (POSIX norme) and adapted for JavaScript (ECMAScript norme) */
    export const regexEmail =
        /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    /* Pattern de regexFirstName : 
        For the 1st letter : 
- the 26 letters of the alphabet used in the French language in upper case,
- 15 letters with diacritical marks in capital letters (À Â Ä Ç É È Ê Ë Î Ï Ô Ö Ù Û Ü),
- 2 ligatures in capital letters (Æ Œ).
        For the following :
- the 26 letters of the alphabet used in the French language in lower case,
- 15 letters with diacritical marks in lower case (à â ä ç é ê ë î ï ô ö ù û ü),
- 2 lowercase ligatures (æ, œ)
- the apostrophe, the hyphen without space before and after (mandatory for compound names)
- The space
- The capital letter is required for the first letter of the second word of the compound name */
    export const regexFirstName =
        /^[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜÆŒ][a-zàâäçéèêëîïôöùûüæœ']+((?:-|\s)[A-Z][a-zàâäçéèêëîïôöùûüæœ']+)*$/;

    /* regexLastName, unlike regexFirstName, accepts fully capitalized names and does not accept hyphens for compound names */
    export const regexLastName =
        /^(([A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜÆŒ][a-zàâäçéèêëîïôöùûüæœ']+)(\s[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜÆŒ][a-zàâäçéèêëîïôöùûüæœ']+)*|([A-Z]+)(\s[A-Z]+)*)$/;

    /* Only for number and name of street, not city and postal code */
    export const regexAddressLine =
    /^[0-9]{1,4}[ ](rue|avenue|boulevard|impasse|place|square)\s[a-zA-Z\u00C0-\u017F\s'-]+$/;

    export const regexCity = /^\d{5}\s[a-zA-Z\u00C0-\u017F\s'-]+$/;