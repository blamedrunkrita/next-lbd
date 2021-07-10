import React, { createContext, useState } from 'react'

export const PlanContext = createContext()

const PlanContextProvider = (props) => {
  const [plan, setPlan] = useState([])

  const addItem = (item) => {
    setPlan([...plan, item])
  }

  const removeItem = (id) => {
    setPlan([...plan.filter(item => item.id !== id)])
  }

  const removeLastItem = () => {
    setPlan(plan.slice(0, plan.length - 1))
  }

  const resetPlan = () => {
    setPlan([])
  }

  return (
    <PlanContext.Provider value={{ plan, addItem, removeItem, resetPlan, removeLastItem }}>
      {props.children}
    </PlanContext.Provider>
  )
}

export default PlanContextProvider;