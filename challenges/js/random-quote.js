var q = [
    "New Zealand is not a small country but a large village", //  Peter Jackson Read more at: https://www.brainyquote.com/quotes/quotes/p/peterjacks169753.html?src=t_zealand',
    "You Can't Beat Wellington (On a Good Day)", // Datsun Violets
    "The reality is even Wellington is dying and we don't know how to turn it around. All you have there is government, Victoria University and Weta Workshop" // John Key
];
var quote = document.getElementsByTagName("blockquote")[0];
var button = document.getElementsByTagName("button")[0];

// add first quote to blockquote
quote.innerHTML += q[0];

button.addEventListener ("click", function() {
    quote.innerHTML = ''; // remove quote
    // https://zenscript.wordpress.com/2013/11/23/how-to-pick-a-random-entry-out-of-an-array-javascript/
    quote.innerHTML += q[Math.floor(Math.random() * q.length)]; // add random quote
});
