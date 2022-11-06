
    //Variables globales
   
        //Utilizadas para guardar los operandos.
        var operando_1 = '';
        var operando_2 = '';

        //Utilizada para alamacenar lo que debe enseñar la pantalla de la calculadora.
        var oper_display = '';
            
        //Utilizadas para almacenar el resultado y el últimoresultado (para usarlo directamente en operaciones futuras).
        var result = '';

        //Necesaria para cambiar de un operador a otro.
        var oper_state = 0;

        //Utilizada para comprobar el tipo de operación y reslizarla.
        var oper_type;

        //Utilizado para dar mensajes de error.
        var error_msg = 0;

    //Funciones (en este programa, como siempre necesita la interacción del usuario no puede haber código fuera de la calculadora).

        //Función para añadir los nuevos números.
        function get_new_number (num_new){

        //If para que si empìezas a poner un nuevo número después de operar borre lo que había antes.
        if (error_msg === 1){

            document.getElementById('calculadora_screen_res').innerHTML = '';  
            error_msg = 0;

        }
            //Añade el nuevo número al primer operando.
            //El oper display se usa para luego añadir el simbolo de la operación (ver función operate).
            if (oper_state === 0){

                operando_1 += num_new;

                oper_display = operando_1;

                document.getElementById('calculadora_screen_oper').innerHTML = oper_display;

            }
                      
            //Añade el nuevo número al segundo operando.
            if (oper_state === 1){

                operando_2 += num_new;
            
                document.getElementById('calculadora_screen_oper').innerHTML = oper_display + operando_2;

            }
            
        }

        //Función para cambiar del primer al seguno operando.
        function check_oper (caso_oper){

           
            if (operando_1 === '' && result != ''){

                //Si el operando 1 está vacio asignarle el valor de reult. De esta forma se evita el error NaN
                operando_1 = result;

                //Imprimir el operando 1, que sino se queda un espacio en blanco, luego la operación, y luego el operando 2.
                document.getElementById('calculadora_screen_oper').innerHTML = operando_1;

                //Cambiar el display para que en la función 'getnumber' se actualice (utilizaba oper_display en vez de operando_1).
                oper_display = operando_1;

            }
            //Si la calculadora ya estaba recibiendo el segundo operando, es decir, ya estaba lista para operar, y aun así se quiere hacer otra operación.
            if (oper_state === 1){

                //Opera primero, para obtener el resultado.
                operar ();

                //El operando_1 será igual al resultado.
                operando_1 = result;

                /*IMPORTANTE: lo que se cambia aquí es el oper_display (lo que el usuario ve) en vez de el operando_1, tus números
                De esta forma el usuario ve la operación desglosada y los operandos y el result no reciben números raros.
                Además como la calculadora seguirá en 'oper_state = 1' no se modificará el oper_display. Esto solo se hace en al función
                'get_new_number' cuando oper_state = 0.
                */
                oper_display = '(' + oper_display + operando_2 + ')';

                //Resetea el operando 2 para que puedas usarlo de nuevo.
                operando_2 = '';

            }
            
            //Elige la operación.
            cambiar_operador (caso_oper);

        }


        function print_res (){
            
            //Que hacer si no hay operando_2
            if (oper_state === 0){
                
                result = parseFloat(operando_1);
                end_operation ();

            }

            else if (operando_2 === ''){

                document.getElementById('calculadora_screen_oper').innerHTML = 'Pendejo';

            }

            //Que hacer si los dos operandos existen
            else{

                operar ();
                end_operation ();

            }


        }
        
        //Función para limpiar los resultados.
        function all_clear (){

            //Borra todo y reinicia la calculadora.
            document.getElementById('calculadora_screen_res').innerHTML = ' ';
            document.getElementById('calculadora_screen_oper').innerHTML = ' ';
            operando_1 = '';
            operando_2 = '';
            result = '';
        
            oper_display = '';
            oper_state = 0;

        }


        //Cambiar que tipo de operación se esta haciendo y representarlo en el display.
        function cambiar_operador (tipo_oper){
            
            //Si tras el anterior check operando 1 sigue siendo '' envia mensaje de error.
            if (operando_1 === ''){
                
                document.getElementById('calculadora_screen_res').innerHTML = "Introduzca un primer operando válido.";
                error_msg = 1;
            }

            //Si operando 1 existe:
            else{

                switch (tipo_oper){

                    case '+':

                        //Cambia quien recibe números de operando 1 a operando 2
                        oper_state = 1;

                        //Cambia el tipo de operación en función del simbolo clicado
                        oper_type = 0;

                        //Añade el símbolo de la operación al display
                        oper_display += '+';

                        //Imprime el display de nuevo
                        document.getElementById('calculadora_screen_oper').innerHTML = oper_display;
    
                    break;
                    case '-':
    
                        oper_state = 1;
                        oper_type = 1;
                        oper_display += '-';
                        document.getElementById('calculadora_screen_oper').innerHTML = oper_display;
    
                    break;
                    case '*':
    
                        oper_state = 1;
                        oper_type = 2;
                        oper_display += '*';
                        document.getElementById('calculadora_screen_oper').innerHTML = oper_display;
    
                    break;
                    case '/':
    
                        oper_state = 1;
                        oper_type = 3;
                        oper_display += '/';
                        document.getElementById('calculadora_screen_oper').innerHTML = oper_display;
    
                    break;
    
                }
            }
            
        }

        //Función que decide como operar en función del tipo de operación introducida.
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
            oper_display = '';

            //Reiniciar el estado (los números introducidos pertenecen al operando_1 de nuevo).
            oper_state = 0;

        }





