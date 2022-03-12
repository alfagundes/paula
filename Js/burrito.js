aProdutos = Array(
	["001", 7, "Burrito Pequeno", "imagem1.png"],
	["002", 9, "Burrito Médio", "imagem2.png"],
	["003", 17.50, "Burrito Grande", "imagem3.png"]
)

function popularListas() {
	// produto1, produto2 e produto3

	// Varrendo a matriz de produtos

	for (let prods = 1; prods <= 3; prods++) {
		let nomeCampo = "produto" + prods

		// Como existem 3 listas de produtos, estas 3 listas serão atualizadas
		for (let n = 0; n < aProdutos.length; n++) {
			let opcao = document.createElement("option")
			opcao.value = aProdutos[n][0] // guarda o código do produto
			opcao.text = aProdutos[n][2] // guarda o nome do produto
			document.getElementById(nomeCampo).appendChild(opcao)
		}
	}
}

function Euro(numero) {
	return (Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'EUR'
	}).format(numero))
}

function Hoje(numDias) {
	// função retorna uma determinada data 
	// num string no formato YYYY-MM-DD
	var hoje = new Date()

	// É para aumentar a data?
	if (numDias > 0) {
		hoje.setDate(hoje.getDate() + numDias)
	}

	// Pegar o dia - e transformar em String (é número)
	// e preencher com 0 à esquerda - 2 dígitos
	var dia = hoje.getDate().toString().padStart(2, '0')

	// Pegar o mês
	var mes = (hoje.getMonth() + 1).toString().padStart(2, '0')
	var ano = hoje.getFullYear()

	// Monta o string de retorno no formato "YYYY-MM-DD"
	var stringData = ano + "-" + mes + "-" + dia

	return (stringData)
}

function formataMoeda(numero) {
	var numeroFormatado = Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'EUR'
	}).format(numero)

	return (numeroFormatado)
}

function qtdProduto(numProd) {
	let nomeCampo = "qtdProduto" + numProd // Traz a qtd do produto
	let qtd = parseInt(document.getElementById(nomeCampo).value)
	return (qtd)
}

function precoProduto(codigo) {
	let valor = 0
	for (let n = 0; n < aProdutos.length; n++) {
		if (aProdutos[n][0] == codigo) {
			// encontrei - atualizo variável
			valor = aProdutos[n][1]
		}
	}
	return (valor)
}


function custoTotalProduto(numProd) {
	let nomeCampo = "produto" + numProd
	let codigoProduto = document.getElementById(nomeCampo).value
	let valorUnitario = precoProduto(codigoProduto)
	let qtd = qtdProduto(numProd)
	let valorTotal = 0

	if ((valorUnitario > 0) && (qtd > 0))
		valorTotal = valorUnitario * qtd

	return (valorTotal)
}

function CalcularTotal() {
	$totalItens = 0 // valor dos itens
	$valorPedido = 0 // zerando variável global valor total pedido

	// Calculando os totais dos itens informados no formulário
	$valorPedido = custoTotalProduto(1) + custoTotalProduto(2) + custoTotalProduto(3)
	$totalItens = $valorPedido

	// Exibindo painel - linha 1
	resumoTotItens.innerHTML = formataMoeda($totalItens)
	// Exibindo painel - linha 5 - 2o subtotal	
	resumoSubTot2.innerHTML = formataMoeda(subTotal)

	// Exibindo painel - linha 7 - 3o subtotal	
	subTotal += $custoEmbalagem
	resumoSubTot3.innerHTML = formataMoeda(subTotal)

	// Exibindo painel - linha 9 - TOTAL DO PEDIDO
	$valorPedido = subTotal
	resumoValorPedido.innerHTML = formataMoeda($valorPedido)

	// mostrando o valor estimado do pedido
	valorEstimadoPedido.innerHTML = formataMoeda($valorPedido)
}

function CalcularProduto(numProd) {
	numProd = parseInt(numProd) // transformando num número inteiro
	if ((numProd > 0) && (numProd <= 3)) {
		// limitando a 3 produtos

		// nome produto1, produto2 ou produto3
		var nomeCampo = "produto" + numProd

		// Pegando o código do produto escolhido
		var codigo = document.getElementById(nomeCampo).value

		var valor = 0 // valor padrão da variável
		var imagem = "" // valor padrão da variável

		// Procurando o código na matriz de produtos
		for (let n = 0; n < aProdutos.length; n++) {
			if (aProdutos[n][0] == codigo) {
				// encontrei - atualizo as variáveis
				valor = aProdutos[n][1]
				imagem = aProdutos[n][3]
			}
		}

		// Se tem imagem vamos mostrar dentro do span areaImagem
		// Se não tem, apaga-se qualquer conteúdo anterior
		areaImagem.innerHTML = ""
		if (imagem !== "") {
			areaImagem.innerHTML = "<img src='imgs/" + imagem + "'>"
		}

		// nome qtdProduto1, qtdProduto2 ou qtdProduto3
		var nomeCampo = "qtdProduto" + numProd
		// Pegando a qtd do produto escolhido
		var qtd = parseInt(document.getElementById("qtdProduto1").value)

		// nome prProduto1, prProduto2 ou prProduto3
		var nomeCampo = "prProduto" + numProd
		// Pegando o campo que armazenará o preço do produto escolhido
		var objPrProd = document.getElementById(nomeCampo)

		// nome somaProduto1, somaProduto2 ou somaProduto3
		var nomeCampo = "somaProduto" + numProd
		// Pegando o campo que armazenará o valor total (preçoxqtd) do produto escolhido
		var objSomaProd = document.getElementById(nomeCampo)

		// Atualizando o preço do produto escolhido
		objPrProd.value = Euro(valor)

		// Calculando o preço atualizado pela qtd do prod. escolhido
		var total = valor * qtd

		// Atualizando a caixa de soma do produto em R$
		objSomaProd.value = Euro(total)
	}

	// Depois de atualizar os dados do produto, calcula-se o total do pedido
	CalcularTotal()
}