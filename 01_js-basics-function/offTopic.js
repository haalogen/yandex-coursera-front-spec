/**
 * <OffTopic>
 * "var" keyword
 * "What is the purpose of the var keyword and when should I use it (or omit it)?" (ES5)
 * https://stackoverflow.com/questions/1470488/what-is-the-purpose-of-the-var-keyword-and-when-should-i-use-it-or-omit-it/1471738#1471738
 */

// Greg's answer: If you're in the global scope then there's not much difference.
// If you're in a function then var will create a local variable, "no var" will look up the scope chain until it finds the variable or hits the global scope (at which point it will create it):

// These are both globals
var foo = 1;
bar = 2;

(function() {
    var foo = 1; // Local
    bar = 2;     // Global

    // Execute an anonymous function
    (function()
    {
        var wibble = 1; // Local
        foo = 2; // Inherits from scope above (creating a closure)
        moo = 3; // Global
    }())
})();


// kangax's answer: There's a difference.
// var x = 1 declares variable x in current scope (aka execution context). If the declaration appears in a function - a local variable is declared; if it's in global scope - a global variable is declared.
// x = 1, on the other hand, is merely a property assignment. It first tries to resolve x against scope chain. If it finds it anywhere in that scope chain, it performs assignment; if it doesn't find x, only then does it creates x property on a global object (which is a top level object in a scope chain).
// Now, notice that it doesn't declare a global variable, it creates a global property.
// The difference between the two is subtle and might be confusing unless you understand that variable declarations also create properties (only on a Variable Object) and that every property in Javascript (well, ECMAScript) have certain flags that describe their properties - ReadOnly, DontEnum and DontDelete.
// Since variable declaration creates property with the DontDelete flag, the difference between var x = 1 and x = 1 (when executed in global scope) is that the former one - variable declaration - creates the DontDelete'able property, and latter one doesn't. As a consequence, the property created via this implicit assignment can then be deleted from the global object, and the former one - the one created via variable declaration - cannot be deleted.

/* </OffTopic> */
