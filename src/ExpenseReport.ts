type ExpenseType = 'dinner' | 'breakfast' | 'car-rental'

class Expense {
  type: ExpenseType
  amount: number
  constructor(type: ExpenseType, amount: number) {
    this.type = type
    this.amount = amount
  }
}

type Names = { [key in 'dinner' | 'breakfast' | 'car-rental']: string }

const getExpenseName = (key: keyof Names): string => {
  const names: Names = {
    dinner: 'Dinner',
    breakfast: 'Breakfast',
    'car-rental': 'Car Rental',
  }

  return names[key]
}

function printReport(expenses: Expense[]) {
  let totalExpenses: number = 0
  let mealExpenses: number = 0

  process.stdout.write('Expenses: ' + new Date().toISOString().substr(0, 10) + '\n')

  for (const expense of expenses) {
    if (expense.type == 'dinner' || expense.type == 'breakfast') {
      mealExpenses += expense.amount
    }

    let expenseName = getExpenseName(expense.type)

    let mealOverExpensesMarker =
      (expense.type == 'dinner' && expense.amount > 5000) ||
      (expense.type == 'breakfast' && expense.amount > 1000)
        ? 'X'
        : ' '

    process.stdout.write(expenseName + '\t' + expense.amount + '\t' + mealOverExpensesMarker + '\n')

    totalExpenses += expense.amount
  }

  process.stdout.write('Meal Expenses: ' + mealExpenses + '\n')
  process.stdout.write('Total Expenses: ' + totalExpenses + '\n')
}

export { printReport, Expense, ExpenseType }
