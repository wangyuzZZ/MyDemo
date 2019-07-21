var get_input = document.getElementsByClassName('button');
var inp = document.getElementById('inp');
var arr = [];
var num1 = '';
var x = null;
(function(){
for(var i = 0;i < get_input.length;i++){
    get_input[i].onclick=function(){
        x=this.value;
        main();
    }
    function main(){
        if(!isNaN(x) || x === '.'){
            arr.push(x);
            inp.value=arr.join('')
        }
        else if(x === '+' || x === '-' || x === '*' || x === '/'){
            arr.push(x);
            inp.value=arr.join('')
        }
        else if(x === 'C'){
            num1 ='';
            arr = [];
            x = null; 
            inp.value = ''
        }
        else{
            inp.value=eval(arr.join(''))
        }
    }
}
})();