//Original Solution
/*
let $outputEl = $('#output');
let timerCount = 0;

function fibonacci(num){
  let a = 1,
	  b = 0,
	  temp;

  while (num >= 0) {
	timerCount++;
	$outputEl.html('Running Task for ' + timerCount + ' s');
	
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}

function displayInvalidMessage() {
	$outputEl.text('Valid Fibonacci Value Required');
}

$('#calculateFibonacci').click(function (event) {
	event.preventDefault();
	
	let fibonacciVal = $('#fibonacciInput').val(); //large case example: 299999997
	if(fibonacciVal) {
		fibonacciVal = Math.round(fibonacciVal);
		if(fibonacciVal >= 2) {
			$outputEl.text('Running Task...');
			let result = fibonacci(fibonacciVal); //browser will freeze here for large cases
			$outputEl.html('Fibonacci Result took ' + timerCount + ' s to load</br>Fibonacci Result: ' + result);
			timerCount = 0;
		}
		else {
			displayInvalidMessage();
		}
	}
	else {
		displayInvalidMessage();
	}
});
*/

//New Solution

let $outputEl = $('#output');
let timerCount = 0;

function fibonacci(depth, callback)
{
    let prev = 0;
    let current = 1;
    let workload = 15;

    if(depth === 0) return prev;
    if(depth === 1) return current;

    let processor = function(start)
    {      
        timerCount++;
		$outputEl.html('Running Task for ' + timerCount + ' s');
		
		for(let i = start; i < start+workload; i++)
        {
            let p = current;
            current = current + prev;
            prev = p;
            
            if(i === depth)
            {
                callback(current);
                return;
            }
        }

        setTimeout(function() {
            processor(start + workload);
        }, 0);
    }

    processor(0);
}

function displayInvalidMessage() {
	$outputEl.text('Valid Fibonacci Value Required');
}

$('#calculateFibonacci').click(function (event) {
	event.preventDefault();
	
	let fibonacciVal = $('#fibonacciInput').val(); //large case example: 299999997
	if(fibonacciVal) {
		fibonacciVal = Math.round(fibonacciVal);
		if(fibonacciVal >= 2) {
			$outputEl.text('Running Task...');
			setTimeout(function() {
				fibonacci(fibonacciVal, function(result) {
					$outputEl.html('Fibonacci Result took ' + timerCount + ' s to load</br>Fibonacci Result: ' + result);
					timerCount = 0;
				});
			}, 1000);
		}
		else {
			displayInvalidMessage();
		}
	}
	else {
		displayInvalidMessage();
	}
});
