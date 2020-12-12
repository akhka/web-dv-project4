function checkForName(inputText) {
    console.log("::: Checking URL :::", inputText);
    
    if(inputText == ""){
        alert("Please insert something.")
        return false
    }

    else{
        return true
    }

}

export { checkForName }
