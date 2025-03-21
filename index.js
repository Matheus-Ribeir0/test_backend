const fs = require("fs");

const rawData = fs.readFileSync("data.json"); // Lê o arquivo
const data = JSON.parse(rawData); // Converte para objeto

const fornecedores = [
    "Piracanjuba", "Italac", "Parmalat", "Elegê", "Tio João", "Camil",
    "Tirolez", "Scala", "Del Valle", "Natural One", "Maguary", "Aurora",
    "Casa de Madeira", "Friboi", "Seara", "Swift", "Perdigão", "Sadia",
    "Kicaldo", "Soya", "Liza"
];

const produtos = ["Leite", "Queijo", "Arroz", "Feijão", "Suco", "Carne", "Óleo"];

// Mapear categorias com regex para evitar confusão entre "Desnatado" e "Semi-Desnatado"
const categorias = [
    { nome: "Semi-Desnatado", regex: /\bsemi[-\s]?desnatado\b/i },
    { nome: "Desnatado", regex: /\bdesnatado\b/i },
    { nome: "Integral", regex: /\bintegral\b/i },
    { nome: "Carioca", regex: /\bcarioca\b/i },
    { nome: "Preto", regex: /\bpreto\b/i },
    { nome: "Mussarela", regex: /\bmussarela\b/i },
    { nome: "Prato", regex: /\bprato\b/i },
    { nome: "Laranja", regex: /\blaranja\b/i },
    { nome: "Uva", regex: /\buva\b/i },
    { nome: "Branco", regex: /\bbranco\b/i }
];

const quantidades = {
    "1 Litro": ["1 Litro", "1L", "1000ml"],
    "900ml": ["900ml"],
    "1 kg": ["1kg", "1000g"],
    "5kg": ["5kg"],
    "500g": ["500g"]
};

const resultado = {};

data.forEach(obj => {
    const titulo = obj.title.toLowerCase().replace(/-/g, " ");

    const produtoEncontrado = produtos.find(produto => titulo.includes(produto.toLowerCase()));
    if (!produtoEncontrado) return;

    const fornecedorEncontrado = fornecedores.find(fornecedor => titulo.includes(fornecedor.toLowerCase()));
    if (!fornecedorEncontrado) return;

    let categoriaEncontrada = "Desconhecido";
    for (const { nome, regex } of categorias) {
        if (regex.test(titulo)) {
            categoriaEncontrada = nome;
            break;
        }
    }

    let quantidadeEncontrada = "Desconhecido";
    for (const [quantidade, variacoes] of Object.entries(quantidades)) {
        if (variacoes.some(variacao => titulo.includes(variacao.toLowerCase()))) {
            quantidadeEncontrada = quantidade;
            break;
        }
    }

    if (!resultado[produtoEncontrado]) {
        resultado[produtoEncontrado] = {};
    }

    if (!resultado[produtoEncontrado][fornecedorEncontrado]) {
        resultado[produtoEncontrado][fornecedorEncontrado] = {};
    }

    if (!resultado[produtoEncontrado][fornecedorEncontrado][categoriaEncontrada]) {
        resultado[produtoEncontrado][fornecedorEncontrado][categoriaEncontrada] = {};
    }

    if (!resultado[produtoEncontrado][fornecedorEncontrado][categoriaEncontrada][quantidadeEncontrada]) {
        resultado[produtoEncontrado][fornecedorEncontrado][categoriaEncontrada][quantidadeEncontrada] = {
            category: produtoEncontrado,
            supplier: fornecedorEncontrado,
            type: categoriaEncontrada,
            quantidade: quantidadeEncontrada,
            count: 0,
            products: []
        };
    }

    resultado[produtoEncontrado][fornecedorEncontrado][categoriaEncontrada][quantidadeEncontrada].count++;
    resultado[produtoEncontrado][fornecedorEncontrado][categoriaEncontrada][quantidadeEncontrada].products.push({
        title: obj.title,
        supermarket: obj.supermarket
    });
});

fs.writeFileSync("resultado.json", JSON.stringify(resultado, null, 2));

console.log("Filtragem concluída! Resultado salvo em 'resultado.json'.");
