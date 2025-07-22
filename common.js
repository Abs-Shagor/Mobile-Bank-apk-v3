

const sectionsId = ['home-page-id', 'add-money-id', 'cashout-id', 'transfer-money-id', 'get-bonus-id', 'pay-bill-id', 'transaction-id'];
function changingSectionByClicked(id1, id2) {
    document.getElementById(id1).addEventListener('click', function () {
        for (const sectionId of sectionsId) {
            const classes = document.getElementById(sectionId).classList;
            if (!classes.contains('hidden')) {
                classes.add('hidden');
            }
        }
        document.getElementById(id2).classList.remove('hidden');

        if(id2==='transaction-id') {
            document.getElementById('transaction-back-to-home-btn').classList.remove('hidden');
            document.getElementById('view-all-id').classList.add('hidden');
        }
    })
}
function backToHome(id1,id2,id3) {
    document.getElementById(id1).addEventListener('click', function (event) {
        event.preventDefault();
        for (const sectionId of sectionsId) {
            const classes = document.getElementById(sectionId).classList;
            if (!classes.contains('hidden')) {
                classes.add('hidden');
            }
        }
        document.getElementById(id2).classList.remove('hidden');
        document.getElementById(id3).classList.remove('hidden');
        
        if(id1=='transaction-back-to-home-btn') {
            document.getElementById('transaction-back-to-home-btn').classList.add('hidden');
            document.getElementById('view-all-id').classList.remove('hidden');
        }
    })
}

/// calculating New balance
function calculateNewBalance(id1, id2, op) {
    const total_amount = localStorage.getItem('amount');
    
    const balance = document.getElementById(id1);
    const amount = document.getElementById(id2);
    
    let newBalance = '0';
    if (op === 'plus') {
        newBalance = parseInt(total_amount) + parseInt(amount.value);
    }
    else if (op === 'minus') {
        newBalance = parseInt(total_amount) - parseInt(amount.value);
    }
    balance.innerText = String(newBalance);
    localStorage.setItem('amount', String(newBalance));
}

function addingTransactionInHistory(title, amount) {
    // Get current date and time
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    // Create the new transaction entry
    const newChild = document.createElement('div');
    newChild.innerHTML = `
        <div class = "flex justify-between items-center mt-4 bg-white rounded-xl p-3 border border-gray-200 hover:border-[#0874F2] hover:bg-[#e2ecf6] cursor-pointer">
            <div class="flex items-center gap-3">
                <div class="bg-gray-300 p-2 rounded-full">
                    <img src="images/transaction1.png" alt="Bank Deposit">
                </div>
                <div>
                    <div class="flex items-center gap-2">
                        <p class="text-gray-700 font-bold">${title}</p>
                        <p class="text-green-600 font-medium">${amount.value}BDT</p>
                    </div>
                    <p class="text-[12px] text-gray-600">${formattedDateTime}</p>
                </div>
            </div>
            <div>
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
        </div>
    `;
    const history = document.getElementById('payment-history-id');
    history.insertBefore(newChild, history.firstChild); // Adds at the top
    // localStorage.setItem('div1',JSON.stringify(history));
}


///alert system
function alertt(id, messege) {
    const alert = document.getElementById(id);
    alert.innerText = messege;
    alert.classList.remove('hidden');
    setTimeout(() => alert.classList.add('hidden'), 3000);
}


/// reset fields
function reset(...arg) {
    for (const x of arg) {
        x.value = '';
    }
}

// return true if any of the field empty
function checkEmpty(...arg) {
    for (const x of arg) {
        if (x.value === '') {
            return true;
        }
    }
    return false;
}
