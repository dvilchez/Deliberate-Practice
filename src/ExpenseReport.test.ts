import { printReport, Expense } from './ExpenseReport'

describe(`ExpenseReport`, () => {
  it(`should keep its original behavior`, () => {
    let interceptedOutput = ''
    jest.spyOn(process.stdout, 'write').mockImplementation((output: string): boolean => {
      interceptedOutput += output
      return true
    })
    printReport([new Expense('dinner', 5001)])
    expect(interceptedOutput).toEqual(
      `Expenses: ${new Date().toISOString().substr(0, 10)}
Dinner\t5001\tX
Meal Expenses: 5001
Total Expenses: 5001
`,
    )
  })
})

