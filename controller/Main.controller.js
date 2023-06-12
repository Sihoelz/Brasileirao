sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("campeonatobrasileiro.controller.Main", {
            onInit: function () {

                /* (Inicio)
                Comentado a lógica abaixo (live1 e 2 ) para implementar a lógica que traz em tempo real da API 
                // vamos criar um modelo -É um objeto especial que para
                // ser utlizado precisa ser inicializado 

                // antes as variaveis que vão no modelo - um modelo para atualizar o titulo e a rodada

                var dadosGerais = { 
   
                       rodada : '9ª',
                       campeonato : ' BRASILEIRÃO DO CANAL FIORINET '

                 };   

                // agora sim, vms criar um modelo  

                var dadosModel = new JSONModel(); //  1- Criar uma instancia do modelo. No momento vazio!
                dadosModel.setData(dadosGerais); //  2 -Atribuir dados dadosGerais ao modelo 
                var view = this.getView();  // 3- Criar uma instancia da tela 
                view.setModel(dadosModel, "ModeloDadosGerais"); // 4- Atribuir o modelo a view. Cria um alias que será usado nas view 
                 (Fim) */ 


                //Live 03 - traz dados da API em tempo real
                 // 2.0 (1,2 e 3)
                // 1 - Criar 3 objetos vazios 
                var dadosGerais = {};
                var classificacao = {};
                var partidas = {};

                // 2 - Criar 3 modelos  - 1 para cada objeto e ja atribuir 
                // variavel dentro do parênteses substitui o comando "setData"
                var dadosModel = new JSONModel(dadosGerais); 
                var classificacaoModel = new JSONModel(classificacao); 
                var partidasModel = new JSONModel(partidas); 

                // 3 - Atribuir os 3 modelos à tela  -  view 
                this.getView().setModel(dadosModel, "ModeloDadosGerais");
                this.getView().setModel(classificacaoModel, "ModeloClassificacao");
                this.getView().setModel(partidasModel, "ModeloPartidas");

                // 2.4 chamar a funcao do 2.3
                 this.buscarDadosGerais();

                 this.buscarClassificacao();

                 this.buscarPartidas();
            },


            buscarDadosGerais: function() {
                //2.1 obter o model a ser trabalhado
                var dadosModel2 = this.getView().getModel("ModeloDadosGerais");//Obter a instancia da tela com o comando "this.getView()" 
                                                                              // e logo obter o modelo que esta na tela com codigo 
                                                                            //".getModel("ModeloDadosGerais") como o nome do modelo entre parênteses"
                                                                                 
               // Configurar o postman 
               //2.2 Definição do cabeçalho da solicitação 
                const configuracoes = {
                   url :  "https://api.api-futebol.com.br/v1/campeonatos/10", //Copia do postman
                   method : "GET",  // Method de leitura 
                   async : true,   // padrão
                   crossDomain : true, //padrao  -  indica que os dominios sao diferentes
                   headers : {      // aba header do postman - Autenticação
                         "Authorization" :  "Bearer live_2ae2675b869f85dc04cdf0007aa541" 
                   }
                };

               //2.3 Chamada da solicitação à API -  usaremos o comando de busca "ajax"
                $.ajax(configuracoes)
                
                // sucesso
                .done(function(resposta) {     //resposta que esta vindo da API
                   // colocar a resposta dentro do Modelo , da var dadosModel2
                   dadosModel2.setData(resposta); 
                  
                   this.buscarPartidas(resposta.rodada_atual.rodada); //Esta pegando a resposta anterior e pegando a var  rodada_atual.rodada e passando como parâmetro na funçao)
               
                }.bind(this) )

                // erro 
                .fail(function(erro) {
                   
                })

                ;

            },

            buscarClassificacao: function() {
                //2.1 obter o model a ser trabalhado
                var classificacaoModel2 = this.getView().getModel("ModeloClassificacao");//Obter a instancia da tela com o comando "this.getView()" 
                                                                              // e logo obter o modelo que esta na tela com codigo 
                                                                            //".getModel("ModeloClassificao") como o nome do modelo entre parênteses"
                                                                                 
               // Configurar o postman 
               //2.2 Definição do cabeçalho da solicitação 
                const configuracoes = {
                   url :  "https://api.api-futebol.com.br/v1/campeonatos/10/tabela", //Copia do postman
                   method : "GET",  // Method de leitura 
                   async : true,   // padrão
                   crossDomain : true, //padrao  -  indica que os dominios sao diferentes
                   headers : {      // aba header do postman - Autenticação
                         "Authorization" :  "Bearer live_2ae2675b869f85dc04cdf0007aa541" 
                   }
                };

               //2.3 Chamada da solicitação à API -  usaremos o comando de busca "ajax"
                $.ajax(configuracoes)
                
                // sucesso
                .done(function(resposta) {     //resposta que esta vindo da API
                   // colocar a resposta dentro do Modelo , da var classificacaoModel2
                  
                   classificacaoModel2.setData({"Classificacao": resposta}); 
                   
                })

                // erro 
                .fail(function(erro) {
                    

                })

                ;

            },

            buscarPartidas: function(rodada) {
                //2.1 obter o model a ser trabalhado
                var partidasModel2 = this.getView().getModel("ModeloPartidas");//Obter a instancia da tela com o comando "this.getView()" 
                                                                              // e logo obter o modelo que esta na tela com codigo 
                                                                            //".getModel("ModeloClassificao") como o nome do modelo entre parênteses"
                                                                                 
               // Configurar o postman 
               //2.2 Definição do cabeçalho da solicitação 
                const configuracoes = {
                   url :  "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada, //Copia do postman
                   method : "GET",  // Method de leitura 
                   async : true,   // padrão
                   crossDomain : true, //padrao  -  indica que os dominios sao diferentes
                   headers : {      // aba header do postman - Autenticação
                         "Authorization" :  "Bearer live_2ae2675b869f85dc04cdf0007aa541" 
                   }
                };

               //2.3 Chamada da solicitação à API -  usaremos o comando de busca "ajax"
                $.ajax(configuracoes)
                
                // sucesso
                .done(function(resposta){     //resposta que esta vindo da API
                   // colocar a resposta dentro do Modelo , da var classificacaoModel2
                  
                   partidasModel2.setData(resposta); 
                   debugger
                })

                // erro 
                .fail(function(erro) {
                    debugger

                })

                ;

            }


        });
    });
