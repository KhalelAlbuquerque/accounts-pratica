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
