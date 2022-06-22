type ExpenseType = 'dinner' | 'breakfast' | 'car-rental'

const Unlimited = 'unlimited'
const ExpenseLimit: { [key in ExpenseType]: number | 'unlimited' } = {
  dinner: 5000,
  breakfast: 1000,
  'car-rental': Unlimited,
}

class Expense {
  type: ExpenseType
  amount: number
  constructor(type: ExpenseType, amount: number) {
    this.type = type
    this.amount = amount
  }

  public getName(): string {
    const names: { [key in ExpenseType]: string } = {
      dinner: 'Dinner',
      breakfast: 'Breakfast',
      'car-rental': 'Car Rental',
    }

    return names[this.type]
  }
}

function printReport(expenses: Expense[]) {
  let totalExpenses: number = 0
  let mealExpenses: number = 0

  process.stdout.write('Expenses: ' + new Date().toISOString().substr(0, 10) + '\n')

  for (const expense of expenses) {
    if (expense.type == 'dinner' || expense.type == 'breakfast') {
      mealExpenses += expense.amount
    }

    let mealOverExpensesMarker =
      (expense.type == 'dinner' && expense.amount > 5000) ||
      (expense.type == 'breakfast' && expense.amount > 1000)
        ? 'X'
        : ' '

    process.stdout.write(
      expense.getName() + '\t' + expense.amount + '\t' + mealOverExpensesMarker + '\n',
    )

    totalExpenses += expense.amount
  }

  process.stdout.write('Meal Expenses: ' + mealExpenses + '\n')
  process.stdout.write('Total Expenses: ' + totalExpenses + '\n')
}

export { printReport, Expense, ExpenseType }
