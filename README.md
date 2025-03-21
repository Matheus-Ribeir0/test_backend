# 📌 Desafio: Categorização

Script do desafio https://github.com/kingjotaro/challenge01.

## 🛠️ Como funciona?

O script em **Node.js** lê um arquivo `data.json` contendo uma lista de produtos e os organiza conforme os seguintes critérios:
- **Produto** (Ex: Leite, Queijo, Arroz, etc.)
- **Fornecedor** (Ex: Piracanjuba, Italac, Parmalat, etc.)
- **Categoria** (Ex: Integral, Desnatado, Semi-Desnatado, etc.)
- **Quantidade** (Ex: 1 Litro, 500g, 900ml, etc.)

### 🔍 Como ele faz isso?
1. **Lê o arquivo JSON** com os produtos.
2. **Identifica o tipo de produto** verificando se há um nome válido na lista predefinida.
3. **Encontra o fornecedor** comparando com os nomes conhecidos.
4. **Classifica a categoria** usando **expressões regulares (Regex)** para evitar confusões como "Desnatado" e "Semi-Desnatado".
5. **Determina a quantidade** ao comparar diferentes variações de medidas.
6. **Organiza os dados** em uma estrutura JSON bem definida.
7. **Salva o resultado** em `resultado.json`.

---

### 📟 Principais Desafios enfrentados
1. **Dividir cada item em categorias e subcategorias dês de fornecedor, titulo dos produtos e quantidade**
2. **Foi necessário aprender sobre regex para fazer as filtragens da melhor forma sem cobinar dados incorretamente**
3. **Estudar como dividir itens com título semelhantes em categorias diferentes**

## 📂 Estrutura dos Arquivos
```
/
├── data.json           # Arquivo de entrada com os produtos
├── index.js            # Código principal que processa os produtos
├── resultado.json      # Saída do script, com os produtos organizados
├── README.md           # Este arquivo de documentação
```

---

## 🚀 Como executar o script

### **1. Instalar o Node.js**
Se ainda não tem o Node.js instalado, faça o download em: [https://nodejs.org/](https://nodejs.org/)

### **2. Rodar o script**
Abra um terminal na pasta do projeto e execute:
```sh
node script.js
```
Isso processará o arquivo `data.json` e salvará o resultado em `resultado.json`.

---

## 📝 Exemplo de Entrada (`data.json`)
```json
[
  {
    "title": "Leite Semi-Desnatado Piracanjuba 1L",
    "supermarket": "Supermercado A"
  },
  {
    "title": "Queijo Mussarela Tirolez 500g",
    "supermarket": "Supermercado B"
  }
]
```

## 📊 Exemplo de Saída (`resultado.json`)
```json
{
  "Leite": {
    "Piracanjuba": {
      "Semi-Desnatado": {
        "1 Litro": {
          "category": "Leite",
          "supplier": "Piracanjuba",
          "type": "Semi-Desnatado",
          "quantidade": "1 Litro",
          "count": 1,
          "products": [
            {
              "title": "Leite Semi-Desnatado Piracanjuba 1L",
              "supermarket": "Supermercado A"
            }
          ]
        }
      }
    }
  }
}
```

---

## 🛠️ Tecnologias Utilizadas
- **Node.js** para processar os dados
- **JavaScript** para manipulação e organização dos produtos
- **Regex** para identificar categorias com precisão

---

## 📌 Observações
- O script **prioriza "Semi-Desnatado" antes de "Desnatado"** para evitar confusão na classificação.
- Se um produto não for reconhecido, ele será marcado como **"Desconhecido"**.
- A lista de fornecedores e produtos pode ser facilmente expandida dentro do código.
