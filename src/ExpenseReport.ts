type ExpenseType = 'dinner' | 'breakfast' | 'car-rental'
type ExpenseCategory = 'meal' | 'other'

type Unlimited = undefined
const EXPENSE_LIMIT: { [key in ExpenseType]: number | Unlimited } = {
  dinner: 5000,
  breakfast: 1000,
  'car-rental': undefined,
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

  public getCategory = () => {
    if (this.type == 'dinner' || this.type == 'breakfast') {
      return 'meal'
    } else {
      return 'other'
    }
  }

  public isLimitExcedeed(): boolean {
    return this.amount > EXPENSE_LIMIT[this.type]
  }
}

function printReport(expenses: Expense[]) {
  let totalExpenses: number = 0
  let mealExpenses: number = 0

  process.stdout.write('Expenses: ' + new Date().toISOString().substr(0, 10) + '\n')

  for (const expense of expenses) {
    if (expense.getCategory() === 'meal') {
      mealExpenses += expense.amount
    }

    let mealOverExpensesMarker = expense.isLimitExcedeed() ? 'X' : ' '

    process.stdout.write(
      expense.getName() + '\t' + expense.amount + '\t' + mealOverExpensesMarker + '\n',
    )

    totalExpenses += expense.amount
  }

  process.stdout.write('Meal Expenses: ' + mealExpenses + '\n')
  process.stdout.write('Total Expenses: ' + totalExpenses + '\n')
}

export { printReport, Expense, ExpenseType }
