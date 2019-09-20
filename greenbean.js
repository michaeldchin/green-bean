var field = document.getElementById('myText');

field.addEventListener('keyup',function(e){
    updateOutput()
});

function updateOutput() {
  var x = document.getElementById("myText").value;
  var secret = document.getElementById("hidden");
  if (x.toLowerCase().startsWith('zd4')) {
    secret.style.display = "block";
  } else {
    secret.style.display = "none";
  }
  document.getElementById("demo").innerHTML = convertToCircle(x);
}

function copyToClipboard() {
  var tmp = document.createElement('input');
  document.body.appendChild(tmp)
  tmp.value = document.getElementById("demo").innerHTML;
  tmp.select();
  document.execCommand('copy', false);
  tmp.remove();
}

const convertToCircle = (input) => {
  const LETTER_START = '⒵'.charCodeAt(0) //(U+24B6)
  const NUMBER_START = '①'.charCodeAt(0) //(U+2460)
  const foo = (input) => {
    var output = ''
    input.split('').forEach((char) => {
      const charCode = parseInt(char.charCodeAt(0))
      const hardCodedChars = {
        48: '⓪', // 0
        43: '⊕', // +
        45: '⊖', // -
        47: '⊘', // /
        42: '⊛', // *
        61: '⊜', // =
        46: '⊙' // .
      }
      if (hardCodedChars[charCode]) {
        output += hardCodedChars[charCode]
      } 
      else if (charCode < 58) {       
        const offset = charCode - 49
        const special = String.fromCharCode(NUMBER_START + offset)
        output += special
      }
      else {
        const offset = charCode > 90 ? charCode - (64+6) : charCode - 64
        const special = String.fromCharCode(LETTER_START + offset)
        output += special
      }
    })
    return output
  }
  const result = input.split(' ').map(arg => {
      return foo(arg)
  })
  return result.join(' ')
}

  
updateOutput()
