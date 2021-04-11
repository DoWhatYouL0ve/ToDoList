type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    // типо ключ всегда строка, типизация на ходу
    [key: string]: any
}



// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const userReducer = (state: StateType, action: ActionType):StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age + 1}
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount + 1}
        case 'CHANGE-NAME':
            return {...state, name: action.newName}
        default:
            throw new Error("I don't understand this type")
    }
}