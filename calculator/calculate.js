function calculate(){
    document.getElementById("anwser").value="";
    var tex=document.getElementById("question").value;
    var result=getAnwser(tex);
    if(document.getElementById("anwser").value!="ERROR")
        document.getElementById("anwser").value=result;
}
function getAnwser(tex){
    if(!isLegalExclam(tex)||hasDivisorZero(tex)){
        document.getElementById("anwser").value="ERROR";
        return;
    }
    while(isExclamExist(tex)){
        tex=getEclamOperand(tex);
        if(tex=="error")
            return;
        if(isLegalExclam(tex)) {
            tex = changeExclamToNormal(tex);
        }
        else{
            return;
        }
    }
    var tmpresult;
    //try..catch..  to test wheter the expression in right form
    try {
        tmpresult = eval(tex);
    }catch(e){
        document.getElementById("anwser").value="ERROR";
        return;
    }
    if(tmpresult=="Infinity"){
        document.getElementById("anwser").value="ERROR";
        return;
    }
    else
        return tmpresult;
}

//get the operand befor exclamatory and check whether it is minus.
function getEclamOperand(expression){
    var tmpAnswer;
    for(var i=0;i<expression.length;i++){
      if(expression.charAt(i).match(/[!！]/)&&expression.charAt(i-1)==")"){
          var rightBracket=1;
          var k=i-2;
          while(rightBracket!=0&&k>=0){
            switch (expression.charAt(k)){
                case '(':
                    rightBracket--;
                    k--;
                    break;
                case ')':
                    rightBracket++;
                    k--;
                    break;
                default:
                    k--;
            }
        }
        if(rightBracket!=0){
            document.getElementById("anwser").value="ERROR";
            return "error";
        }
        var tmpExpression=expression.substr(k+1,i-k-1);
        var tmpResult=eval(tmpExpression);
        if(tmpResult<0){
            document.getElementById("anwser").value="ERROR";
            return "error";
        }
        tmpAnswer=expression.substr(0,k+1)+tmpResult+expression.substr(i,expression.length-i);
        return tmpAnswer;
    }
}
return expression;
}
//check whether the expression is right if exist '!' op(operand cannot be decimal).And other condition can figure out by 'eval' function
function isLegalExclam(expression){
    for(i=0;i<expression.length;i++){
        if(expression.charAt(i).match(/[!！]/)){
            if(i==0)
                return false;
            j=i-1;
            if(expression.charAt(j).match(/[-+*/！!]/))//avoid double operator
                return false;
            while(j>=0){
                if(expression.charAt(j).match(/[-+*/！!\)]/)){
                    break;
                }
                if(!expression.charAt(j).match(/[0-9]/)){
                    return false;
                }
                j--;
            }
        }
    }
    return true;
}

//get the expression ('!'+number) factorial answer and replace its original expression
function changeExclamToNormal(expression){
    for(i=0;i<expression.length;i++){
        if(expression.charAt(i).match(/[!！]/)){
            j=i-1;
            while(j>=0&&expression.charAt(j).match(/[0-9]/)){
                j--;
            }
            var len=0;
            if(j==0)
                len=i;
            else
                len=i-j-1;
            numString=expression.substr(i-len,len);
            num=parseInt(numString);
            result=1;
            for (j = 1; j <= num; j++)
                result = result * j;
            var replacement=expression.substr(0,i-len)+result+expression.substr(i+1,expression.length-i-1);
            return replacement;
        }
    }
}


//check is '!" exist in the exprssion
function isExclamExist(expression){
    for(i=0;i<expression.length;i++){
        if(expression.charAt(i).match(/[!！]/))
            return true;
    }
    return false;
}

//check is divisor zero
function hasDivisorZero(expression){
    for(i=0;i<expression.length;i++){
        if(expression.charAt(i)=='/'){
            if(expression.charAt(i+1)=='0'){
                return true;
            }
        }
    }
    return false;
}
module.exports = getAnwser;