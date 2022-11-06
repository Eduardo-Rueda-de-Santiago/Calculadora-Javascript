    //Variables globales
   
        //Utilizadas para guardar los operandos.
        var operando_1 = '';
        var simbol = '';
        var operando_2 = '';

        //Utilizada para alamacenar lo que debe enseñar la pantalla de la calculadora.
        var oper_1_display = '';
        var oper_2_display = '';
            
        //Utilizadas para almacenar el resultado y el últimoresultado (para usarlo directamente en operaciones futuras).
        var result = '';

        //Necesaria para cambiar de un operador a otro.
        var oper_state = 0;

        //Utilizada para comprobar el tipo de operación y reslizarla.
        var oper_type;

        //Utilizado para dar mensajes de error.
        var error_msg = 0;


        function nuevo_num (num_new){
            
            if (oper_state === 1){

                oper_state = 2;

            }

                //Añade el nuevo número al primer operando.
                //El oper display se usa para luego añadir el simbolo de la operación (ver función operate).
                if (oper_state === 0){
    
                    operando_1 += num_new;
    
                    oper_1_display = operando_1;
    
                    document.getElementById('calculadora_screen_oper').innerHTML = oper_1_display;
    
                }
                          
                //Añade el nuevo número al segundo operando.
                if (oper_state === 2){
    
                    operando_2 += num_new;

                    oper_2_display = operando_2;
                
                    document.getElementById('calculadora_screen_oper').innerHTML = oper_1_display + simbol + oper_2_display;
    
                }
                
        }

        function check_oper (tipo_oper){
        

            //Algo que chequee si metiste un menos, y asignar simbolo negativo.


            if ((operando_1 === '') && (tipo_oper === '-')){

                operando_1 = '-';

                oper_1_display = operando_1;

                document.getElementById('calculadora_screen_oper').innerHTML = oper_1_display;

            }   
            else if  (operando_1 !== ''){

                    oper_state = 1;

                cambiar_operador (tipo_oper);

            }           

        }
  
        function print_res (){
            
            //Que hacer si no hay operando_2
            if ( (oper_state === 0) || (oper_state === 1)){
                
                result = parseFloat(operando_1);
                end_operation ();

            }
            //Que hacer si los dos operandos existen
            else{

                operar ();
                end_operation ();

            }


        }

        function cambiar_operador (tipo_oper){
            
            if (oper_state === 1){

                switch (tipo_oper){

                    case '+':

                        //Cambia el tipo de operación en función del simbolo clicado
                        oper_type = 0;

                        //Añade el símbolo de la operación al display
                        simbol = '+';

                        //Imprime el display de nuevo
                        document.getElementById('calculadora_screen_oper').innerHTML = oper_1_display + simbol;

                    break;
                    case '-':

                        //Cambia el tipo de operación en función del simbolo clicado
                        oper_type = 1;

                        //Añade el símbolo de la operación al display
                        simbol = '-';

                        //Imprime el display de nuevo
                        document.getElementById('calculadora_screen_oper').innerHTML = oper_1_display + simbol;

                    break;
                    case '*':

                        //Cambia el tipo de operación en función del simbolo clicado
                        oper_type = 2;

                        //Añade el símbolo de la operación al display
                        simbol = '*';

                        //Imprime el display de nuevo
                        document.getElementById('calculadora_screen_oper').innerHTML = oper_1_display + simbol;

                    break;
                    case '/':

                        //Cambia el tipo de operación en función del simbolo clicado
                        oper_type = 3;

                        //Añade el símbolo de la operación al display
                        simbol = '/';

                        //Imprime el display de nuevo
                        document.getElementById('calculadora_screen_oper').innerHTML = oper_1_display + simbol;

                    break;

                }
        
            }
            
        }

        function operar (){

            switch (oper_type){

                case 0 :

                    result = parseFloat(operando_1) + parseFloat(operando_2);

                break;
                case 1 :

                    result = parseFloat(operando_1) - parseFloat(operando_2);

                break;
                case 2 :

                    result = parseFloat(operando_1) * parseFloat(operando_2);

                break;
                case 3 :

                    result = parseFloat(operando_1) / parseFloat(operando_2);

                break;
            }
                
        }

        function end_operation (){

            //Vaciar la casilla e imprimir el nuevo resultado.
            document.getElementById('calculadora_screen_res').innerHTML = ' ';
            document.getElementById('calculadora_screen_res').innerHTML = result;

            //Reiniciar los operandos
            operando_1 = '';
            operando_2 = '';
        
            //Reiniciar lo que se enseña
            oper_1_display = '';
            oper_2_display = '';

            //Reiniciar el estado (los números introducidos pertenecen al operando_1 de nuevo).
            oper_state = 0;

        }

        function anter_res (){

            if (oper_state === 0){
                
                operando_1 = result;

                oper_1_display = operando_1;

                document.getElementById('calculadora_screen_oper').innerHTML = oper_1_display;

            }
            if (oper_state === 1){
                
                operando_2 = result;

                oper_2_display = operando_2;

                document.getElementById('calculadora_screen_oper').innerHTML = oper_1_display + simbol + oper_2_display;

                oper_state = 2;
            }


        }

        function all_clear (){

            //Borra todo y reinicia la calculadora.
            document.getElementById('calculadora_screen_res').innerHTML = ' ';
            document.getElementById('calculadora_screen_oper').innerHTML = ' ';
            operando_1 = '';
            operando_2 = '';
            result = '';
        
            oper_1_display = '';
            oper_2_display = '';
            oper_state = 0;

        }
