const chalk = require("chalk");
const inquirer = require("inquirer");

const fs = require("fs");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action === "Criar Conta") {
        createAccount();
        buildAccount();
      }else if(action === 'Depositar'){
        deposit()
      }else if(action === 'Consultar Saldo'){

      }else if(action === 'Sacar'){

      }else if(action === 'Sair'){
        console.log(chalk.bgBlue.black("Obrigado por usar o accounts!"))
        process.exit()
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//criar conta
function createAccount() {
  console.log(chalk.bgGreen.black("Parabens por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opcoes da sua conta a seguir: "));
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da sua conta: ",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Essa conta ja existe, escolha outro nome")
        );
        buildAccount();
        return
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        "{'balance'}:0",
        function (err) {
          console.log(err);
        }
      );

      console.log(chalk.green("Parabens, a sua conta foi criada"));
      operation()
    })
    .catch((err) => console.log(err));
}


function deposit(){

  inquirer.prompt([
    {
      name:"accountName",
      message: "Qual o nome da sua conta?"
    }
  ]).then((answer)=>{

    const accountName = answer['accountName']

    if(!checkAccount(accountName)){
      return deposit()
    }else{

      inquirer.prompt([
        {
          name:'amount',
          message:'Quanto vc quer depositar?'
        },
      ]).then((answer)=>{

        const amount = answer['amount']

        addAmount(accountName, amount)

        operation()

      }).catch((err)=>console.log(err))

    }

  }).catch((err)=>{
    console.log(err)
  })

}


function checkAccount(accountName){

  if(!fs.existsSync(`accounts/${accountName}.json`)){
    console.log(chalk.bgRed.black("Essa conta nao existe, tente novamente"))
    return false
  }

  return true

}


function addAmount(accountName, amount){

  const accountData = getAccount(accountName)

  if(!amount){
    console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde"))
    return operation()
  }

  accountData.balance = parseFloat(amount)+parseFloat(accountData.balance)

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err)=>{
      console.log(err)
      }
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))

}


function getAccount(accountName){
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    tag:'r'
  })

  return JSON.parse(accountJSON)
}