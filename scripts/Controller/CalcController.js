class CalcController {

    constructor() {
        this._operations = []
        this._displayCalEl = document.querySelector('#display');
        this.startButtonsEvents();

    }

    clearDisplay(){
        this._operations = []
    }

    clearEntry(){
        this._operations.pop()
        this.setLastNumberOnDisplay()
    }

 
    isOperator(value){
      return ['+','-','+','*'].indexOf(value) > -1
    }

    clearLastPosition(){
        return this._operations.pop();
        this.setLastNumberOnDisplay()
    }

    getLastOperation(){
        return  this._operations[this._operations.length-1] 
  
    }
    setLastOperator(value){
        this._operations[this._operations.length-1] = value
    }
    pushOperator(value){
        this._operations.push(value)

        if(this._operations.length>3){
      
            this.calc()
        }
    }

    calc(){
        let last = this._operations.pop();

       let result = eval(this._operations.join(""))
       this._operations = [result,last]
       this.setLastNumberOnDisplay()
    }

    setLastNumberOnDisplay(){
        let lastNumber;
        for(let i = this._operations.length-1;i>=0;i--){
            if(!isNaN(this._operations[i])){
                lastNumber = this._operations[i];
                break;
            }
        }
        this.displayCalc = lastNumber;  
    }

    addOperation(value){
      
        
        if(isNaN(this.getLastOperation())){ //if true then value it's not a number.

            if(this.isOperator(value)){ 

             this.setLastOperator(value)

            }else if(isNaN(value)){

                console.log("(IsNan) : ",value)
            
            }else{
                this.pushOperator(value)
            }

        }else{ //Numbers

            if(this.isOperator(value)){ 
                this.pushOperator(value)    
                this.setLastNumberOnDisplay()
            }
            else{
                let newValue = this.getLastOperation().toString() + value.toString()
                this.setLastOperator(parseInt(newValue));
            }
     
        } 
        this.setLastNumberOnDisplay();
    }

    setError(){
        return this.displayCalc = 'ERROR'
    }

   
    chooseAnOption(value) {

        switch (value) {

            case 'ce': 
            this.clearEntry()
                break;  
            case 'c':
                this.clearDisplay()
                break;

            case 'seta':
                this.clearLastPosition();
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'adicao':
                this.addOperation('+');
                break;

            case 'virgula':
            case 'ponto':
                this.addOperation('.');
                break;

            case 'igual':
                break;
            
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }
    startButtonsEvents() {
        const buttons = document.querySelectorAll('#primeiro >button,#segundo > button, #terceiro > button, #quarto > button, #quinto > button,#sexto > button')

        buttons.forEach(btn => {
            let buttons = btn.getAttribute("attr")

            btn.addEventListener('click', () => {
                this.chooseAnOption(buttons);
            })
        })
    }


    set displayCalc(value) {
        this._displayCalEl.innerHTML = value;
    }
    get displayCalc() {
        return this._displayCalEl.innerHTML;
    }
}