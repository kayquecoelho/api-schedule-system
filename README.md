# api-schedule-system

# Endpoints

<div>
  <details>
    <summary><strong>GET</strong> /lawsuits/balance</summary>
    <div>
      <p> Usado para calcular a soma dos valores dos processos de um cliente </p>
      <div>
        <p> Aceita o envio dos parâmetros 'isActive' e 'clientId' via query string </p>
        <br>
        <ul>
          <li>
          O parâmetro 'isActive' é um filtro para o estado dos processos. Se o valor fornecido é true, retorna balanço de processo ativos. Se false, retorna o balanço de processos inativos. Qualquer outro valor retorna o balanço geral.
          </li>
          <li>
            O parâmetro 'clientId' filtra os processos por cliente.
          </li>
        </ul>
      </div>
    </div>
    <br>
    O formato de saída é:

    ```json 
      {"total": "R$ 1000,00"}
    ```
  </details>

  <details>
    <summary><strong>GET</strong> /lawsuits/average</summary>
    <div>
      <p> Usado para calcular a média de valores dos processos existentes </p>
      <div>
        <p> Aceita o envio dos parâmetros 'state' e 'clientId' via query string </p>
        <br>
        <ul>
          <li>
          O parâmetro 'state' filtra os processos pelo estado no qual este estes estão baseados. Quando fornecido, a média de valores retornada é correspondente apenas ao estado.
          </li>
          <li>
            O parâmetro 'clientId' filtra os processos por cliente.
          </li>
        </ul>
      </div>
    </div>
    <br>
    O formato de saída é:

    ```json 
      {"total": "R$ 1000,00"}
    ```
  </details>

  <details>
    <summary><strong>GET</strong> /lawsuits/count</summary>
    <div>
      <p> Usado para obter a quantidade de processos existentes com valores maiores do que o fornecido </p>
      <div>
        <p> É obrigatório fornecer o parâmetro 'minCharge' via query string</p>
        <br>
        <ul>
          <li>
          O parâmetro 'minCharge' fornece um filtro para que o programa retorne todos os processos que tenham valores maiores do que este.
          </li>
        </ul>
      </div>
    </div>
    <br>
    O formato de saída é:

    ```json 
      {"lawsuitCount": 2}
    ```
  </details>

  <details>
    <summary><strong>GET</strong> /clients</summary>
    <div>
      <p> Usado para obter uma lista com todos os clientes e seus respectivos processos</p>
      <div>
        <p> Aceita o parâmetro 'onlyState' via query string </p>
        <br>
        <ul>
          <li>
          O parâmetro 'onlyState' funciona como um filtro por estado para os processos dos clientes. O valor padrão do onlyState é 'true',o que filtra os processoss para que só seja retornado aqueles que estão no mesmo estado a qual a empresa pertence. Quando fornecido o valor 'false', todos os processos da empresa sao retornados!.
          </li>
        </ul>
      </div>
    </div>
    <br>
    O formato de saída é:

    ```json 
      [
        {
          "id": 2,
          "name": "Empresa A",
          "cnpj": "00000000001",
          "state": "Rio de Janeiro",
          "Lawsuit": [
            {
              "id": 21,
              "initialism": "00001CIVELRJ",
              "isActive": true,
              "createdAt": "2007-10-10T03:00:00.000Z",
              "charge": 20000000,
              "state": "Rio de Janeiro",
              "clientId": 2
            },
            {
              "id": 24,
              "initialism": "00004CIVELRJ",
              "isActive": false,
              "createdAt": "2007-11-10T03:00:00.000Z",
              "charge": 2000000,
              "state": "Rio de Janeiro",
              "clientId": 2
            }
          ]
        },
      ]
    ```
  </details>

  <details>
    <summary><strong>GET</strong> /lawsuits</summary>
    <div>
      <p> Usado para obter uma lista de processos </p>
      <div>
        <p> Aceita os parâmetros 'initialism', 'startDate' e 'endDate' </p>
        <br>
        <ul>
          <li>
            O parâmetro 'initialism' funciona como um filtro para que o programa retorne apenas os processos que contêm o trecho fornecido em seu acrônimo. Por exemplo, se for fornecido 'TRAB' nesse parâmetro, um processo com acrônimo '00010TRABAM' seria incluído no retorno, enquando um processo com acrônimo ”00004CIVELRJ” não.
          </li>
          <li>
            O parâmetro 'startDate' funciona como um filtro para que o programa retorne apenas processos que tenham começado após a data fornecida. O formato de entrada é DD-MM-YYYY
          </li>
          <li>
            O parâmetro 'endDate' funciona como um filtro para que o programa retorne apenas processos que tenham começado antes da data fornecida. O formato de entrada é DD-MM-YYYY
          </li>
        </ul>
      </div>
    </div>
    <br>
    O formato de saída é:

    ```json 
      [
        {
          "id": 21,
          "initialism": "00001CIVELRJ",
          "isActive": true,
          "createdAt": "2007-10-10T03:00:00.000Z",
          "charge": 20000000,
          "state": "Rio de Janeiro",
          "clientId": 2
        },
        {
          "id": 24,
          "initialism": "00004CIVELRJ",
          "isActive": false,
          "createdAt": "2007-11-10T03:00:00.000Z",
          "charge": 2000000,
          "state": "Rio de Janeiro",
          "clientId": 2
        }
      ]
    ```
  </details>
</div>

# Technologies

As seguintes tecnologias foram utilizadas para o desenvolvimento do projeto:

<div style="display: flex; gap: 10px;" >
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
  </a>
  <a href="https://www.prisma.io/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="prisma" />
  </a>
  <a href="https://www.postgresql.org" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="postgresql" />
  </a>
  <a href="https://nodejs.org" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs" />
  </a>
</div>

# Requisitos

### [npm](https://www.npmjs.com/)

<details>
    <summary>install npm</summary>
  </br>

```bash
wget -qO- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh> | bash
## Or this command
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# Close and open terminal
nvm install --lts
nvm use --lts
# Verify node version
node --version # Must show v14.16.1
# Verify npm version
npm -v
```

</details>

### [postgreSQL](https://www.postgresql.org/)

<details>
    <summary>install postgres</summary>
    <br>

```bash
sudo apt install postgresql postgresql-contrib
```

</details>

# Como executar os testes

1. Clone este repositório
2. Instale as dependências

```bash
npm i
```

3. Crie o arquivo .env.test na raiz do projeto e configure conforme o arquivo .env.example

4. Crie a database com o prisma

- abra o terminal e execute os seguintes comandos

```bash
npx prisma migrate dev
```

- Caso o comando seed não tenha sido executado automaticamente, execute o comando: 

```bash
npx prisma db seed
```

5. Execute os testes

```bash
npm run test
```