function calculatePurchase() {
    const amount = parseFloat(document.getElementById('purchase-amount').value) || 0;
    let totalCoins = 0;
    let bonusCoins = 0;
    let bonusText = '0%';

    // Calcular promoção: a cada R$ 500 = 600 coins
    if (amount >= 500) {
        const promoPacks = Math.floor(amount / 500);
        const remaining = amount % 500;

        totalCoins = (promoPacks * 600) + remaining;
        bonusCoins = promoPacks * 100;

        const totalBonus = (bonusCoins / (amount - bonusCoins)) * 100;
        bonusText = `${totalBonus.toFixed(1)}%`;
    } else {
        totalCoins = amount;
        bonusCoins = 0;
        bonusText = '0%';
    }

    const baseCoins = amount;
    const costPerCoin = amount > 0 ? amount / totalCoins : 1;

    // Atualizar display
    document.getElementById('base-coins').textContent = Math.floor(baseCoins);
    document.getElementById('bonus-applied').textContent = bonusText;
    document.getElementById('bonus-coins').textContent = bonusCoins;
    document.getElementById('coins-received').textContent = Math.floor(totalCoins);
    document.getElementById('cost-per-coin').textContent = totalCoins > 0 ? `R$ ${costPerCoin.toFixed(2)}` : 'R$ 1,00';

    // Atualizar dica
    const tipElement = document.getElementById('discount-tip');
    if (amount === 0) {
        tipElement.textContent = 'Insira um valor para calcular!';
    } else if (amount >= 500) {
        const promoPacks = Math.floor(amount / 500);
        const remaining = amount % 500;

        if (remaining === 0) {
            tipElement.textContent = `🎉 Parabéns! Você ganhou ${bonusCoins} coins extras!`;
        } else {
            const nextPromo = ((promoPacks + 1) * 500) - amount;
            tipElement.textContent = `💰 Faltam R$ ${nextPromo.toFixed(2)} para ganhar mais 100 coins de bônus!`;
        }
    } else {
        const needed = 500 - amount;
        tipElement.textContent = `💰 Faltam R$ ${needed.toFixed(2)} para a primeira promoção de 600 coins!`;
    }
}

function calculatePlayerPurchase() {
    const coins = parseFloat(document.getElementById('player-coins').value) || 0;
    const price = parseFloat(document.getElementById('player-price').value) || 0;

    if (coins === 0 || price === 0) {
        document.getElementById('player-cost-per-coin').textContent = 'R$ 0,00';
        document.getElementById('player-discount').textContent = '0%';
        document.getElementById('player-savings').textContent = 'R$ 0,00';
        document.getElementById('official-equivalent').textContent = 'R$ 0,00';
        document.getElementById('player-tip').textContent = 'Insira os valores para calcular o preço unitário!';
        return;
    }

    const costPerCoin = price / coins;

    // 💡 Correção: R$ 500 compram 600 coins (1 coin = 500 / 600)
    const officialCostPerCoin = 500 / 600;
    const officialPrice = coins * officialCostPerCoin;

    const discount = ((officialPrice - price) / officialPrice) * 100;
    const savings = officialPrice - price;

    // Atualizar display
    document.getElementById('player-cost-per-coin').textContent = `R$ ${costPerCoin.toFixed(4)}`;
    document.getElementById('player-discount').textContent = `${discount.toFixed(1)}%`;
    document.getElementById('player-savings').textContent = `R$ ${savings.toFixed(2)}`;
    document.getElementById('official-equivalent').textContent = `R$ ${officialPrice.toFixed(2)}`;

    // Atualizar dica
    const tipElement = document.getElementById('player-tip');
    if (discount > 0) {
        tipElement.textContent = `Ótimo negócio! Você economiza ${discount.toFixed(1)}% vs loja oficial.`;
    } else if (discount < -5) {
        tipElement.textContent = `Cuidado! Está pagando ${Math.abs(discount).toFixed(1)}% a mais que a loja oficial.`;
    } else {
        tipElement.textContent = 'Preço similar ao oficial. Considere as vantagens de cada opção.';
    }
}

function calculateGPConversion() {
    const coinsBought = parseFloat(document.getElementById('coins-bought').value) || 0;
    const realPaid = parseFloat(document.getElementById('real-paid').value) || 0;
    const gpPerCoin = parseFloat(document.getElementById('gp-per-coin').value) || 0;

    if (coinsBought === 0 || realPaid === 0 || gpPerCoin === 0) {
        // Reset display if any field is empty
        document.getElementById('real-cost-per-coin').textContent = 'R$ 0,00';
        document.getElementById('total-gp-obtained').textContent = '0 GP';
        document.getElementById('cost-1000-gp').textContent = 'R$ 0,00';
        document.getElementById('cost-100000-gp').textContent = 'R$ 0,00';
        return;
    }

    const realCostPerCoin = realPaid / coinsBought;
    const totalGPObtained = coinsBought * gpPerCoin;
    const costPer1000GP = (realPaid / totalGPObtained) * 1000;
    const costPer100000GP = (realPaid / totalGPObtained) * 100000;

    // Atualizar display
    document.getElementById('real-cost-per-coin').textContent = `R$ ${realCostPerCoin.toFixed(2)}`;
    document.getElementById('total-gp-obtained').textContent = `${totalGPObtained.toLocaleString()} GP`;
    document.getElementById('cost-1000-gp').textContent = `R$ ${costPer1000GP.toFixed(2)}`;
    document.getElementById('cost-100000-gp').textContent = `R$ ${costPer100000GP.toFixed(2)}`;
}

// Event listeners
document.getElementById('purchase-amount').addEventListener('input', calculatePurchase);
document.getElementById('player-coins').addEventListener('input', calculatePlayerPurchase);
document.getElementById('player-price').addEventListener('input', calculatePlayerPurchase);
document.getElementById('coins-bought').addEventListener('input', calculateGPConversion);
document.getElementById('real-paid').addEventListener('input', calculateGPConversion);
document.getElementById('gp-per-coin').addEventListener('input', calculateGPConversion);

// Calcular valores iniciais
calculatePurchase();
calculatePlayerPurchase();
calculateGPConversion();

// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link (mobile)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
});