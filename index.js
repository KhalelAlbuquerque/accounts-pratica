const chalk = require('chalk')
const inquirer = require('inquirer')

const fs = require('fs')

operation()

function operation(){

    inquirer.prompt([{
        type:'list',
        name: 'action',
        message: 'O que deseja fazer?',
        choices: [
            'Criar Sonta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ],
    }]).then((answer)=>{
        
        const action = answer['action']

        console.log(action)

    })
    .catch((err)=>{
        console.log(err)
    })

}